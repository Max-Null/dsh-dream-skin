/**
 * dsh-dream-skin — browser-half smoke tests (run with `node --test`).
 *
 * These load the hand-written `__ModuleLoader__` bundle inside a VM with a
 * minimal browser-ish environment and verify that:
 *   1. the factory evaluates without throwing and exports the expected surface;
 *   2. `apply(ctx)` mounts every settings slot and registers the built-in skins;
 *   3. a theme-pack can be imported through the share-link URL path and is
 *      persisted to localStorage.
 *
 * The DOM/react/localStorage are mocks; this is a smoke/regression gate, not a
 * browser integration suite.
 */
const { test } = require('node:test');
const assert = require('node:assert');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');

const CODE = fs.readFileSync(path.join(__dirname, '..', 'lib', 'client.js'), 'utf8');

function makeEl() {
	return {
		style: {}, dataset: {}, children: [],
		setAttribute() {}, removeAttribute() {},
		appendChild(c) { this.children.push(c); },
		prepend() {}, click() {}, remove() { this.removed = true; }
	};
}

function buildSandbox(overrides = {}) {
	const body = makeEl();
	const document = { body, createElement: () => makeEl(), createTextNode: () => ({}), querySelector: () => null, head: makeEl() };
	const store = new Map();
	// seed localStorage from overrides.seed
	if (overrides.seed) for (const [k, v] of Object.entries(overrides.seed)) store.set(k, String(v));
	const localStorage = {
		getItem: (k) => (store.has(k) ? store.get(k) : null),
		setItem: (k, v) => store.set(k, String(v)),
		removeItem: (k) => store.delete(k)
	};
	const btoa = (s) => Buffer.from(s, 'binary').toString('base64');
	const atob = (s) => Buffer.from(s, 'base64').toString('binary');
	const unescapeB = (s) => s.replace(/%([0-9A-Fa-f]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
	const escapeB = (s) => s.replace(/[^\x21-\x7e]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'));
	const loc = { origin: 'http://x', pathname: '/', search: '', hash: '', ...(overrides.hash ? { hash: overrides.hash } : {}) };
	let factory = null;
	const sandbox = {
		window: {}, document, navigator: { clipboard: { writeText: () => Promise.resolve() } }, localStorage,
		matchMedia: undefined, console, location: loc, history: { replaceState(n, t, url) { loc.hash = ''; loc.pathname = url; } },
		btoa, atob, unescape: unescapeB, escape: escapeB, encodeURIComponent, decodeURIComponent,
		URL: { createObjectURL: () => 'blob:x', revokeObjectURL() {} },
		Blob: class {}, FileReader: class {}, Image: function () {}, setTimeout, clearTimeout, alert: () => {},
		...overrides,
	};
	sandbox.window.__ModuleLoader__ = { load: (o) => { factory = o.factory; } };
	sandbox.window.location = loc;
	sandbox.window.history = sandbox.history;
	for (const k of ['document', 'localStorage', 'btoa', 'atob']) sandbox.window[k] = sandbox[k];
	const context = vm.createContext(sandbox);
	vm.runInContext(CODE + '\nwindow.__LOGGED__=1;', context);
	return { factory, loc, localStorage, registered: [], slots: { count: 0 } };
}

function makeApplyContext(harness) {
	const theme = {
		register(def) {
			const id = def.id;
			assert.ok(!harness.registered.includes(id), 'duplicate theme id ' + id);
			harness.registered.push(id);
			return () => {};
		},
		setTheme() {},
		getTheme() {
			return { preference: 'system', active: { id: 'dark', colorScheme: 'dark', tokens: { '--dsw-alias-brand-primary': '#4f83f2' } }, themes: [], revision: 1 };
		},
		overrideTokens() { return () => {}; }
	};
	return {
		theme,
		slots: { inject(n, f) { harness.slots.count++; f(); }, register() { return {}; } },
		locale: {
			register() {},
			bind() { return (key) => key; } // identity translator for alerts in tests
		},
		on() { return () => {}; },
		effect(t) { const d = t(); if (typeof d === 'function') d(); }
	};
}

const REACT = { useRef: () => ({ current: {} }), useMemo: (f) => (typeof f === 'function' ? f() : f), useState: (init) => [init, () => {}] };

/**
 * defineStore mock: records every store spec (so tests can exercise the
 * `sync` guard directly) and exposes a `syncLog` array where injected
 * action bags' `sync` calls are captured (keyed by store id when the slot
 * registration declares one).
 */
function makeRuntime() {
	const specs = [];
	const syncLog = []; // { storeId, args }
	const RT = {
		defineStore(d) {
			specs.push(d);
			return { spec: d, create() {} };
		}
	};
	return {
		RT,
		specs,
		syncLog,
		findSpec(initKey) {
			return specs.find((s) => Object.prototype.hasOwnProperty.call(s.init(), initKey));
		}
	};
}

function makeRequire(RT) {
	return (s) => {
		if (s === 'react/jsx-runtime') return { jsx: () => 0, jsxs: () => 0 };
		if (s === 'react') return REACT;
		if (s === '@deepseek-ai/dsh-client-runtime/client') return RT;
		throw new Error('unexpected require: ' + s);
	};
}

test('bundle factory evaluates and exports the expected surface', () => {
	const h = buildSandbox();
	const e = h.factory(makeRequire(makeRuntime().RT));
	assert.equal(typeof e.apply, 'function');
	assert.ok(Array.isArray(e.inject));
	assert.ok(Array.isArray(e.SKINS));
	assert.ok(e.SKINS.length > 0);
	assert.ok('SETTINGS_NS' in e);
});

test('apply() mounts slot rows and registers built-in skins without throwing', () => {
	const h = buildSandbox();
	const e = h.factory(makeRequire(makeRuntime().RT));
	const ctx = makeApplyContext(h);
	assert.doesNotThrow(() => e.apply(ctx));
	assert.equal(h.registered.length, e.SKINS.length, 'all built-in skins registered');
	assert.ok(h.slots.count >= 4, 'accent + wallpaper + advanced wallpaper + packs should mount');
});

test('accent store first sync passes the revision guard so a saved accent restores', () => {
	// Regression: accentInjected used to sync with a fixed revision -1, which the
	// store guard (`revision <= d.revision`, init revision -1) always rejected —
	// a saved accent never reached the row UI after reload.
	const h = buildSandbox({ seed: { 'dsh-dream-skin:accent': '#12ab34' } });
	const rt = makeRuntime();
	const e = h.factory(makeRequire(rt.RT));
	const ctx = makeApplyContext(h);
	assert.doesNotThrow(() => e.apply(ctx));

	const accentSpec = rt.findSpec('accent');
	assert.ok(accentSpec, 'accent store spec defined');

	// Guard semantics: a revision equal to or below init (-1) is rejected;
	// a monotonic increment (> -1) — as the fixed plugin now sends — passes.
	const sync = accentSpec.actions.sync;
	const state = accentSpec.init();
	sync(state, '#12ab34', '#4f83f2', -1);
	assert.equal(state.accent, 'system', 'revision -1 must be rejected (the old bug)');
	sync(state, '#12ab34', '#4f83f2', 1);
	assert.equal(state.accent, '#12ab34', 'accent restored into the store');
	assert.equal(state.revision, 1, 'accepted revision recorded');
});

test('packs row store receives manifest names so cards show pack names', () => {
	const h = buildSandbox();
	const rt = makeRuntime();
	const e = h.factory(makeRequire(rt.RT));
	const ctx = makeApplyContext(h);
	e.apply(ctx);
	// The pack store spec must exist and its sync must accept a names map.
	const packSpec = rt.findSpec('ids');
	assert.ok(packSpec, 'pack store spec defined');
	const d = packSpec.init();
	packSpec.actions.sync(d, ['dream-pack:x'], { 'dream-pack:x': 'Nice Pack' }, [], 'system', null, 1);
	assert.equal(d.names['dream-pack:x'], 'Nice Pack', 'names map carried into the pack store');
});

test('share-link theme pack import registers and persists', () => {
	const pack = {
		format: 'dsh-dream-skin/pack', version: 1,
		manifest: {
			id: 'test-skin', name: 'Test Skin', colorScheme: 'dark',
			accent: '#123456',
			tokens: {
				'--dsw-alias-bg-base': '#111111',
				'--dsw-alias-bg-layer-1': '#1c1c1c',
				'--dsw-alias-brand-primary': '#ff8800',
				'--dsw-alias-label-primary': '#ffffff',
				'--dsw-alias-label-secondary': '#aaaaaa',
				'--dsw-alias-border-l1': '#333333',
				'--dsw-alias-border-l2': '#444444'
			}
		}
	};
	const json = JSON.stringify(pack);
	const b64 = Buffer.from(unescape(encodeURIComponent(json)), 'binary').toString('base64');
	const h = buildSandbox({ hash: '#dream-skin-pack=' + b64 });
	const e = h.factory(makeRequire(makeRuntime().RT));
	const ctx = makeApplyContext(h);
	e.apply(ctx);
	assert.ok(h.registered.includes('dream-pack:test-skin'), 'pack imported via share link');
	const persisted = h.localStorage.getItem('dsh-dream-skin:packs');
	assert.ok(persisted && persisted.indexOf('dream-pack:test-skin') !== -1, 'pack persisted to localStorage');
});

test('wallpaper apply does not recurse into a stack overflow when overrideTokens emits theme/change', () => {
	// Regression: applyWallpaper2 -> shadeTokens2 -> ctx.theme.overrideTokens, which
	// the real ThemeRuntime answers by emitting `theme/change` synchronously; our
	// syncSkin listener re-applies the wallpaper, which used to call overrideTokens
	// again -> infinite recursion -> "Maximum call stack size exceeded" (which DSH's
	// slot boundaries then report as a crashed/abdicated entry). A re-entrancy guard
	// must keep this to a single overrideTokens call.
	const h = buildSandbox({ seed: { 'dsh-dream-skin:wallpaper': 'data:image/png;base64,AAAA' } });
	const e = h.factory(makeRequire(makeRuntime().RT));

	let themeChangeHandler = null;
	let overrideCount = 0;
	const theme = {
		register() { return () => {}; },
		setTheme() {},
		getTheme() {
			return { preference: 'dark', active: { id: 'dark', colorScheme: 'dark', tokens: { '--dsw-alias-brand-primary': '#4f83f2', '--dsw-alias-bg-base': '#000' } }, themes: [], revision: 1 };
		},
		overrideTokens() {
			overrideCount += 1;
			// mimic ThemeRuntime.publish: emit theme/change synchronously
			if (themeChangeHandler) themeChangeHandler({ preference: 'dark', active: { id: 'dark', colorScheme: 'dark', tokens: {} }, revision: overrideCount });
			return () => {};
		}
	};
	const ctx = {
		theme,
		slots: { inject() {}, register() { return {}; } },
		locale: { register() {}, bind() { return (key) => key; } },
		on(ev, fn) { if (ev === 'theme/change') themeChangeHandler = fn; return () => {}; },
		effect(t) { const d = t(); if (typeof d === 'function') d(); }
	};

	assert.doesNotThrow(() => e.apply(ctx), 'apply with wallpaper set must not overflow the stack');
	assert.ok(overrideCount >= 1, 'overrideTokens was applied');
	assert.ok(overrideCount < 10, `re-entrancy guard kept overrideTokens finite (got ${overrideCount})`);
});
