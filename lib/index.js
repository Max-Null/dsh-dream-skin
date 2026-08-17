/**
 * dsh-dream-skin — host half.
 *
 * Durable, origin-independent persistence for the browser half.
 *
 * The browser half previously stored every preference in localStorage, which
 * is scoped per origin (scheme + host + port). DSH Desktop binds its web
 * server to an OS-assigned port on every launch (profile.js forces the
 * webserver row to `port: 0`, and the launcher passes `--port 0`), so the GUI
 * origin changes on every restart and localStorage "forgets" the saved skin,
 * wallpaper and settings — the data is still in the leveldb, just under the
 * previous port's origin.
 *
 * This host half gives the browser half a stable channel that survives
 * origin changes:
 *
 *   - a state file at `$DSH_HOME/dream-skin.json` (default `~/.dsh/...`),
 *     written atomically (tmp + rename);
 *   - a fenced JSON API at `/dream-skin/api` — POST `{method:"get"}` returns
 *     the whole state object, POST `{method:"set", patch:{...}}` replaces it
 *     (full replacement, so keys removed on the client disappear too).
 *
 * The browser half seeds its in-memory cache from localStorage (so the first
 * paint is correct), then loads the authoritative state from this API and
 * re-applies it; writes are debounced and pushed here as the full state.
 *
 * Route security: the same trust fence as dsh-better-sidebar's /sidebar
 * routes — loopback (or a configured trusted authority) Host header and
 * same-origin browser markers only. This is a DNS-rebinding / cross-site
 * defense, not authentication.
 */

import { homedir } from "node:os";
import { readFileSync, writeFileSync, renameSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

/** State file name inside the DSH home directory. */
const STATE_FILENAME = "dream-skin.json";
/** Max accepted request body (wallpapers are base64 data URLs, can be MBs). */
const MAX_BODY_BYTES = 32 * 1024 * 1024;
/** Route prefix owned by this plugin. */
const API_PREFIX = "/dream-skin/api";

/** Plugin identity for cordis.yml rows. */
export const name = "dsh-dream-skin";
/** Services required before mounting: the web server routes and the trust fence host list. */
export const inject = ["webServer", "webRuntime"];

// ── state file ─────────────────────────────────────────────────────────────

/** Absolute path of the state file under the DSH home directory. */
function statePath() {
	const home = process.env.DSH_HOME && process.env.DSH_HOME.length > 0 ? process.env.DSH_HOME : join(homedir(), ".dsh");
	return join(home, STATE_FILENAME);
}

/** Read the state object; `{}` when absent or corrupt. */
function readState() {
	try {
		const parsed = JSON.parse(readFileSync(statePath(), "utf8"));
		return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
	} catch {
		return {};
	}
}

/** Persist the state object atomically (tmp + rename, direct-write fallback). */
function writeState(state) {
	const file = statePath();
	mkdirSync(dirname(file), { recursive: true });
	const tmp = `${file}.tmp`;
	const body = JSON.stringify(state);
	writeFileSync(tmp, body, "utf8");
	try {
		renameSync(tmp, file);
	} catch {
		// rename can fail on Windows if the target is transiently locked; a
		// direct write is a safe fallback for this single-process case.
		writeFileSync(file, body, "utf8");
	}
}

// ── trust fence (mirror of dsh-better-sidebar/src/trust-fence.ts) ─────────

/** Normalized URL of a Host-header authority, or undefined when unparsable. */
function parseAuthority(authority) {
	try {
		return new URL(`http://${authority}`);
	} catch {
		return undefined;
	}
}

/** Whether a normalized URL hostname names the local loopback authority. */
function isLoopbackHostname(hostname) {
	if (hostname === "localhost" || hostname === "[::1]") return true;
	const parts = hostname.split(".");
	return parts.length === 4
		&& parts[0] === "127"
		&& parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
}

/** Canonical authority form: hostname, or hostname:port when a port was written. */
function canonicalAuthority(entry, entryUrl) {
	const port = entryUrl.port !== "" ? entryUrl.port : new URL(`https://${entry}`).port;
	return port === "" ? entryUrl.hostname : `${entryUrl.hostname}:${port}`;
}

/** Whether the request authority matches a trustedHosts entry (exact or port-less). */
function isTrustedAuthority(hostUrl, trustedHosts) {
	return trustedHosts.some((entry) => {
		const entryUrl = parseAuthority(entry);
		if (entryUrl === undefined) return false;
		return canonicalAuthority(entry, entryUrl) === entryUrl.hostname
			? entryUrl.hostname === hostUrl.hostname
			: entryUrl.host === hostUrl.host;
	});
}

/**
 * Decide whether one request may reach the plugin routes.
 * @param req - node HTTP request facts (headers).
 * @param trustedHosts - non-loopback authorities this deployment serves.
 * @returns true when the Host is ours (loopback or trusted) and browser markers are same-origin.
 */
function isTrustedApiRequest(req, trustedHosts) {
	const host = typeof req.headers.host === "string" ? req.headers.host : undefined;
	if (host === undefined) return false;
	const hostUrl = parseAuthority(host);
	if (hostUrl === undefined) return false;
	if (!isLoopbackHostname(hostUrl.hostname) && !isTrustedAuthority(hostUrl, trustedHosts)) return false;
	if (req.headers["sec-fetch-site"] === "cross-site") return false;
	const origin = req.headers.origin;
	if (origin === undefined) return true;
	try {
		return new URL(origin).host === hostUrl.host;
	} catch {
		return false;
	}
}

// ── JSON body / response helpers ───────────────────────────────────────────

/** Read a JSON request body, capped at MAX_BODY_BYTES; null when invalid. */
function readJsonBody(req) {
	return new Promise((resolve, reject) => {
		const chunks = [];
		let size = 0;
		req.on("data", (chunk) => {
			size += chunk.length;
			if (size > MAX_BODY_BYTES) {
				req.destroy();
				reject(new Error("request body too large"));
				return;
			}
			chunks.push(chunk);
		});
		req.on("end", () => {
			try {
				const parsed = JSON.parse(Buffer.concat(chunks).toString("utf8"));
				resolve(parsed);
			} catch {
				resolve(null);
			}
		});
		req.on("error", reject);
	});
}

/** Write a JSON response with the given status code. */
function writeJson(res, status, value) {
	const body = JSON.stringify(value);
	res.writeHead(status, {
		"content-type": "application/json",
		"cache-control": "no-store"
	});
	res.end(body);
}

/** Handle one fenced API request. */
async function handleApi(req, res) {
	if (req.method !== "POST") {
		writeJson(res, 405, { ok: false, error: { code: "method-error", message: "method not allowed" } });
		return;
	}
	const payload = await readJsonBody(req);
	if (payload === null || typeof payload !== "object" || typeof payload.method !== "string") {
		writeJson(res, 400, { ok: false, error: { code: "bad-request", message: "bad request" } });
		return;
	}
	if (payload.method === "get") {
		writeJson(res, 200, { ok: true, value: readState() });
		return;
	}
	if (payload.method === "set") {
		const patch = payload.patch;
		if (patch === null || typeof patch !== "object" || Array.isArray(patch)) {
			writeJson(res, 400, { ok: false, error: { code: "bad-request", message: "patch must be a plain object" } });
			return;
		}
		// Full replacement of the state object. Only string / null values are
		// accepted (null clears a key), so a compromised page cannot smuggle
		// non-JSON types into the file.
		const next = {};
		for (const [key, value] of Object.entries(patch)) {
			if (typeof key !== "string") continue;
			if (value === null || typeof value === "string") next[key] = value;
		}
		writeState(next);
		writeJson(res, 200, { ok: true });
		return;
	}
	writeJson(res, 404, { ok: false, error: { code: "not-found", message: `unknown method "${payload.method}"` } });
}

/**
 * Host loader entry: mount the fenced persistence API.
 * @param ctx - host cordis context (webServer, webRuntime).
 */
export function apply(ctx) {
	ctx.effect(() => ctx.webServer.register({
		kind: "prefix",
		path: API_PREFIX,
		handler: async (req, res) => {
			if (!isTrustedApiRequest(req, ctx.webRuntime.trustedHosts)) {
				writeJson(res, 403, { ok: false, error: { code: "forbidden", message: "forbidden" } });
				return;
			}
			try {
				await handleApi(req, res);
			} catch (error) {
				writeJson(res, 500, { ok: false, error: { code: "internal", message: error instanceof Error ? error.message : String(error) } });
			}
		}
	}), "dsh-dream-skin: persistence API routes");
}
