/**
 * dsh-dream-skin — host-half persistence tests.
 *
 * Loads lib/index.js (ESM) via dynamic import, mounts its `apply(ctx)` with a
 * fake webServer/webRuntime, captures the registered route handler, and drives
 * it with mocked req/res objects against a throwaway DSH_HOME directory. Covers
 * the fenced JSON API contract: get/set/merge/null-clear, method errors,
 * content-type fence, size cap (413), trust fence (403), and unknown method.
 */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

let mod;
async function loadIndex() {
	if (!mod) mod = await import('../lib/index.js');
	return mod;
}

/** Minimal connectivity.EventEmitter-ish req consumed by readJsonBody. */
function makeReq({ method = 'POST', body = null, headers = {} }) {
	const events = {};
	return {
		method,
		headers,
		on(ev, fn) { events[ev] = fn; },
		destroy() {},
		_push() {
			if (body != null && events.data) events.data(Buffer.from(body));
			if (events.end) events.end();
			if (events.error) events.error(); // ensure nothing hangs (readJsonBody resolves on end)
		}
	};
}

function makeRes() {
	return {
		status: 0, payload: null, headers: {},
		writeHead(s, h) { this.status = s; this.headers = h; },
		end(b) { this.payload = b != null ? JSON.parse(b.toString()) : null; }
	};
}

/** Build a ctx that captures the registered route handler. */
function makeHarness(overrides = {}) {
	let captured = null;
	const ctx = {
		webRuntime: { trustedHosts: overrides.trustedHosts || [] },
		webServer: { register(route) { captured = route; return () => {}; } },
		effect(fn) { fn(); }
	};
	return {
		ctx,
		async run(reqOpts) {
			assert.ok(captured && captured.handler, 'handler not registered');
			const req = makeReq(reqOpts);
			const res = makeRes();
			// handler is async: start it (readJsonBody suspends awaiting data/end),
			// then push body events so the promise resolves, then await completion.
			const handlerPromise = captured.handler(req, res);
			req._push();
			await handlerPromise;
			return res;
		}
	};
}

const J = { 'content-type': 'application/json' };
const H = '127.0.0.1:8080';

// -------------------------------------------------------------------------
// Each test gets its own throwaway DSH_HOME so state files never leak between
// tests (statePath() reads process.env.DSH_HOME at request time).
const realDsHome = process.env.DSH_HOME;
function freshHome(t) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-skin-home-'));
	process.env.DSH_HOME = dir;
	t.after(() => {
		try { fs.rmSync(dir, { recursive: true, force: true }); } catch {}
	});
	return dir;
}
require('node:test').after(() => {
	if (realDsHome === undefined) delete process.env.DSH_HOME;
	else process.env.DSH_HOME = realDsHome;
});
function stateFile(home) { return path.join(home, 'dream-skin.json'); }
function readStateFile(home) {
	try { return JSON.parse(fs.readFileSync(stateFile(home), 'utf8')); }
	catch { return null; }
}
// current-home helper so tests can read their own DSH_HOME file
const fh = (t) => {
	freshHome(t);
	return process.env.DSH_HOME;
};
// -------------------------------------------------------------------------

test('registers a prefix route and applies trusted-host config', async (t) => {
	await loadIndex();
	const harness = makeHarness();
	mod.apply(harness.ctx);
	assert.equal(typeof mod.apply, 'function');
	// handler mounted; a non-loopback, non-trusted host gets 403
	const res = await harness.run({ headers: { 'content-type': 'application/json', host: 'evil.example' }, body: '{"method":"get"}' });
	assert.equal(res.status, 403, 'untrusted authority blocked');
});

test('rejects non-JSON content-type with 415', async (t) => {
	await loadIndex();
	const harness = makeHarness();
	mod.apply(harness.ctx);
	const res = await harness.run({ headers: { 'content-type': 'text/plain', host: H }, body: '{"method":"get"}' });
	assert.equal(res.status, 415);
});

test('get returns {} when file absent', async (t) => {
	await loadIndex();
	fh(t); // fresh DSH_HOME, no state file yet
	const harness = makeHarness();
	mod.apply(harness.ctx);
	const res = await harness.run({ headers: { ...J, host: H, 'sec-fetch-site': 'same-origin' }, body: '{"method":"get"}' });
	assert.equal(res.status, 200);
	assert.deepEqual(res.payload, { ok: true, value: {} });
});

test('set merges across writers (multi-window safety) and null clears one key', async (t) => {
	await loadIndex();
	const home = fh(t);
	const harness = makeHarness();
	mod.apply(harness.ctx);
	const mk = (patch) => ({ headers: { ...J, host: H, 'sec-fetch-site': 'same-origin' }, body: JSON.stringify({ method: 'set', patch }) });
	await harness.run(mk({ accent: '#123456' }));
	await harness.run(mk({ wallpaper: 'data:image/png,AAAA' })); // writer B must not wipe accent
	assert.deepEqual(readStateFile(home), { accent: '#123456', wallpaper: 'data:image/png,AAAA' });
	await harness.run(mk({ accent: null }));
	assert.deepEqual(readStateFile(home), { wallpaper: 'data:image/png,AAAA' });
});

test('set drops non-string/non-null values (type fence)', async (t) => {
	await loadIndex();
	const home = fh(t);
	const harness = makeHarness();
	mod.apply(harness.ctx);
	await harness.run({ headers: { ...J, host: H, 'sec-fetch-site': 'same-origin' }, body: JSON.stringify({ method: 'set', patch: { bad: { x: 1 }, ok: 'v' } }) });
	assert.deepEqual(readStateFile(home), { ok: 'v' });
});

test('method guard: GET is 405 and unknown method is 404', async (t) => {
	await loadIndex();
	const harness = makeHarness();
	mod.apply(harness.ctx);
	const r405 = await harness.run({ method: 'GET', headers: { ...J, host: H, 'sec-fetch-site': 'same-origin' } });
	assert.equal(r405.status, 405);
	const r404 = await harness.run({ headers: { ...J, host: H, 'sec-fetch-site': 'same-origin' }, body: '{"method":"wat"}' });
	assert.equal(r404.status, 404);
});

test('oversized body returns 413 (no 500 leak)', async (t) => {
	await loadIndex();
	const harness = makeHarness();
	mod.apply(harness.ctx);
	const big = JSON.stringify({ method: 'set', patch: { x: 'a'.repeat(40 * 1024 * 1024) } });
	const res = await harness.run({ headers: { ...J, host: 'localhost', 'sec-fetch-site': 'same-origin' }, body: big });
	assert.equal(res.status, 413);
});

test('malformed JSON returns 400', async (t) => {
	await loadIndex();
	const harness = makeHarness();
	mod.apply(harness.ctx);
	const res = await harness.run({ headers: { ...J, host: H, 'sec-fetch-site': 'same-origin' }, body: '{not json' });
	assert.equal(res.status, 400);
});
