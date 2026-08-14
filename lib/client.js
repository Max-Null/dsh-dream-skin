// dsh-dream-skin — browser half (client plugin bundle).
//
// Loaded by dsh-client-modules at /plugins/dsh-dream-skin/client.js and
// executed through the vendored cordis Loader's lazy-CJS module table
// (window.__ModuleLoader__.load). The factory body is plain CJS with
// require() resolved against the shell's module table — the same shape the
// shipped ui-* packages' tsdown bundles emit. Only platform seed words and
// registered client bundles may be required.
//
// Persistence note: the skin choice and wallpaper settings are stored in
// localStorage. DSH's Host settings wire only exposes an allowlisted set of
// namespaces to browser clients (dsh-host-apiproxy's WEB_SETTINGS_NAMESPACES),
// so a third-party namespace would answer `settings-not-exposed`; the product
// itself keeps remote browser preferences process-local, and localStorage
// matches that boundary for visual preferences while surviving reloads on the
// same origin.

window.__ModuleLoader__.load({
	id: "dsh-dream-skin",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _react = require("react");
		let _runtime_client = require("@deepseek-ai/dsh-client-runtime/client");

		//#region dsh-dream-skin: constants & presets
		/** The settings row's locale namespace. */
		const SETTINGS_NS = "settings.dreamSkin";
		/** localStorage key holding the selected skin id. */
		const STORAGE_KEY = "dsh-dream-skin:skin";
		/** localStorage key holding the wallpaper image (data URL). */
		const WALLPAPER_KEY = "dsh-dream-skin:wallpaper";
		/** localStorage key holding the wallpaper wash opacity (0..1). */
		const WALLPAPER_OPACITY_KEY = "dsh-dream-skin:wallpaper-opacity";
		/** localStorage key holding the wallpaper blur radius (px). */
		const WALLPAPER_BLUR_KEY = "dsh-dream-skin:wallpaper-blur";
		/** Sentinel meaning "no custom skin — follow the built-in appearance". */
		const DEFAULT_SKIN = "system";
		/** Default wash opacity (0..1) applied to the translucent surfaces. */
		const DEFAULT_WALLPAPER_OPACITY = 0.8;
		/** Default wallpaper blur radius in px. */
		const DEFAULT_WALLPAPER_BLUR = 0;
		/** Source identity for the wallpaper's token override layer. */
		const OVERRIDE_SOURCE = "dsh-dream-skin:wallpaper";
		/** Built-in base colors used when no skin token owns a scheme. */
		const BUILTIN_BASE = {
			light: "rgb(255, 255, 255)",
			dark: "rgb(21, 21, 23)"
		};

		/**
		 * The curated "Mirage" skin catalog. Every skin is a third-party theme
		 * for the built-in ThemeRuntime: an id, the base palette it builds on
		 * (colorScheme drives body[data-ds-dark-theme]), and --dsw-alias-*
		 * overrides applied as inline custom properties on <body> by ui-layout's
		 * ThemePresenter. Values are concrete CSS colors (no var() indirection),
		 * tuned per skin for contrast on both surface and text roles. Add your
		 * own entries here and they appear in the Settings picker automatically.
		 */
		const SKINS = [
			{
				id: "abyss",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#060a14",
					"--dsw-alias-bg-layer-1": "#0d1424",
					"--dsw-alias-bg-layer-2": "#141e36",
					"--dsw-alias-bg-layer-3": "#1a2744",
					"--dsw-alias-bg-overlay": "#1b2947",
					"--dsw-alias-border-l1": "rgba(148, 168, 210, 0.13)",
					"--dsw-alias-border-l2": "rgba(148, 168, 210, 0.24)",
					"--dsw-alias-label-primary": "#eef2fa",
					"--dsw-alias-label-secondary": "#9fb2d4",
					"--dsw-alias-label-tertiary": "#788eb6",
					"--dsw-alias-brand-primary": "#4f83f2",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#6f9af6",
					"--dsw-alias-button-primary-dimmed": "#141e36",
					"--dsw-alias-state-business-primary": "#4f83f2",
					"--dsw-alias-state-business-tertiary": "#141e36",
					"--dsw-alias-interactive-bg-hover": "rgba(79, 131, 242, 0.13)",
					"--dsw-alias-interactive-bg-active": "rgba(79, 131, 242, 0.22)",
					"--dsw-alias-markdown-code-block": "#0b1120",
					"--dsw-alias-markdown-inline-code": "#141e36",
					"--dsw-specific-sidebar-fill": "#0b1120",
					"--dsw-specific-sidebar-nav-item-active": "#141e36",
					"--dsw-specific-sidebar-nav-item-hover": "#101828",
					"--dsw-alias-scrollbar-bg-l1": "#1a2744",
					"--dsw-alias-scrollbar-bg-l2": "#1f2f52",
					"--dsw-alias-scrollbar-hover-l1": "#26375f",
					"--dsw-alias-scrollbar-hover-l2": "#26375f"
				}
			},
			{
				id: "aurora",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#04120f",
					"--dsw-alias-bg-layer-1": "#0a1d18",
					"--dsw-alias-bg-layer-2": "#102a23",
					"--dsw-alias-bg-layer-3": "#16372e",
					"--dsw-alias-bg-overlay": "#183a31",
					"--dsw-alias-border-l1": "rgba(110, 231, 183, 0.12)",
					"--dsw-alias-border-l2": "rgba(110, 231, 183, 0.22)",
					"--dsw-alias-label-primary": "#eafaf2",
					"--dsw-alias-label-secondary": "#92d5b8",
					"--dsw-alias-label-tertiary": "#6fb398",
					"--dsw-alias-brand-primary": "#34d399",
					"--dsw-alias-brand-text": "#03211a",
					"--dsw-alias-button-primary-hover": "#57e0b0",
					"--dsw-alias-button-primary-dimmed": "#102a23",
					"--dsw-alias-state-business-primary": "#34d399",
					"--dsw-alias-state-business-tertiary": "#102a23",
					"--dsw-alias-interactive-bg-hover": "rgba(52, 211, 153, 0.13)",
					"--dsw-alias-interactive-bg-active": "rgba(52, 211, 153, 0.22)",
					"--dsw-alias-markdown-code-block": "#081712",
					"--dsw-alias-markdown-inline-code": "#102a23",
					"--dsw-specific-sidebar-fill": "#081712",
					"--dsw-specific-sidebar-nav-item-active": "#102a23",
					"--dsw-specific-sidebar-nav-item-hover": "#0c231c",
					"--dsw-alias-scrollbar-bg-l1": "#16372e",
					"--dsw-alias-scrollbar-bg-l2": "#1b4438",
					"--dsw-alias-scrollbar-hover-l1": "#225344",
					"--dsw-alias-scrollbar-hover-l2": "#225344"
				}
			},
			{
				id: "nebula",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#0f0a1c",
					"--dsw-alias-bg-layer-1": "#17102b",
					"--dsw-alias-bg-layer-2": "#1f1638",
					"--dsw-alias-bg-layer-3": "#271c46",
					"--dsw-alias-bg-overlay": "#291e49",
					"--dsw-alias-border-l1": "rgba(216, 180, 254, 0.12)",
					"--dsw-alias-border-l2": "rgba(216, 180, 254, 0.22)",
					"--dsw-alias-label-primary": "#f4eefc",
					"--dsw-alias-label-secondary": "#c6aee6",
					"--dsw-alias-label-tertiary": "#a28dc7",
					"--dsw-alias-brand-primary": "#a78bfa",
					"--dsw-alias-brand-text": "#150c26",
					"--dsw-alias-button-primary-hover": "#bca7fd",
					"--dsw-alias-button-primary-dimmed": "#1f1638",
					"--dsw-alias-state-business-primary": "#a78bfa",
					"--dsw-alias-state-business-tertiary": "#1f1638",
					"--dsw-alias-interactive-bg-hover": "rgba(167, 139, 250, 0.14)",
					"--dsw-alias-interactive-bg-active": "rgba(167, 139, 250, 0.24)",
					"--dsw-alias-markdown-code-block": "#130c22",
					"--dsw-alias-markdown-inline-code": "#1f1638",
					"--dsw-specific-sidebar-fill": "#130c22",
					"--dsw-specific-sidebar-nav-item-active": "#1f1638",
					"--dsw-specific-sidebar-nav-item-hover": "#191230",
					"--dsw-alias-scrollbar-bg-l1": "#271c46",
					"--dsw-alias-scrollbar-bg-l2": "#312356",
					"--dsw-alias-scrollbar-hover-l1": "#3a2c66",
					"--dsw-alias-scrollbar-hover-l2": "#3a2c66"
				}
			},
			{
				id: "ember",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#120a08",
					"--dsw-alias-bg-layer-1": "#1b120e",
					"--dsw-alias-bg-layer-2": "#241913",
					"--dsw-alias-bg-layer-3": "#2d1f18",
					"--dsw-alias-bg-overlay": "#2f211a",
					"--dsw-alias-border-l1": "rgba(253, 186, 116, 0.12)",
					"--dsw-alias-border-l2": "rgba(253, 186, 116, 0.22)",
					"--dsw-alias-label-primary": "#fdf1e7",
					"--dsw-alias-label-secondary": "#d6ab8c",
					"--dsw-alias-label-tertiary": "#b68a6c",
					"--dsw-alias-brand-primary": "#fb923c",
					"--dsw-alias-brand-text": "#24110a",
					"--dsw-alias-button-primary-hover": "#fdad6a",
					"--dsw-alias-button-primary-dimmed": "#241913",
					"--dsw-alias-state-business-primary": "#fb923c",
					"--dsw-alias-state-business-tertiary": "#241913",
					"--dsw-alias-interactive-bg-hover": "rgba(251, 146, 60, 0.14)",
					"--dsw-alias-interactive-bg-active": "rgba(251, 146, 60, 0.24)",
					"--dsw-alias-markdown-code-block": "#160e0a",
					"--dsw-alias-markdown-inline-code": "#241913",
					"--dsw-specific-sidebar-fill": "#160e0a",
					"--dsw-specific-sidebar-nav-item-active": "#241913",
					"--dsw-specific-sidebar-nav-item-hover": "#1e1510",
					"--dsw-alias-scrollbar-bg-l1": "#2d1f18",
					"--dsw-alias-scrollbar-bg-l2": "#3a281d",
					"--dsw-alias-scrollbar-hover-l1": "#473225",
					"--dsw-alias-scrollbar-hover-l2": "#473225"
				}
			},
			{
				id: "midnight",
				colorScheme: "dark",
				tokens: {
					"--dsw-alias-bg-base": "#000000",
					"--dsw-alias-bg-layer-1": "#0b0b0f",
					"--dsw-alias-bg-layer-2": "#141419",
					"--dsw-alias-bg-layer-3": "#1c1c23",
					"--dsw-alias-bg-overlay": "#1d1d24",
					"--dsw-alias-border-l1": "rgba(255, 255, 255, 0.06)",
					"--dsw-alias-border-l2": "rgba(255, 255, 255, 0.12)",
					"--dsw-alias-label-primary": "#e8e8ee",
					"--dsw-alias-label-secondary": "#9d9daa",
					"--dsw-alias-label-tertiary": "#7c7c88",
					"--dsw-alias-brand-primary": "#7c8cff",
					"--dsw-alias-brand-text": "#05050a",
					"--dsw-alias-button-primary-hover": "#9aa7ff",
					"--dsw-alias-button-primary-dimmed": "#141419",
					"--dsw-alias-state-business-primary": "#7c8cff",
					"--dsw-alias-state-business-tertiary": "#141419",
					"--dsw-alias-interactive-bg-hover": "rgba(124, 140, 255, 0.13)",
					"--dsw-alias-interactive-bg-active": "rgba(124, 140, 255, 0.22)",
					"--dsw-alias-markdown-code-block": "#08080b",
					"--dsw-alias-markdown-inline-code": "#141419",
					"--dsw-specific-sidebar-fill": "#08080b",
					"--dsw-specific-sidebar-nav-item-active": "#141419",
					"--dsw-specific-sidebar-nav-item-hover": "#0e0e13",
					"--dsw-alias-scrollbar-bg-l1": "#1c1c23",
					"--dsw-alias-scrollbar-bg-l2": "#26262f",
					"--dsw-alias-scrollbar-hover-l1": "#31313c",
					"--dsw-alias-scrollbar-hover-l2": "#31313c"
				}
			},
			{
				id: "ivory",
				colorScheme: "light",
				tokens: {
					"--dsw-alias-bg-base": "#f7f4ee",
					"--dsw-alias-bg-layer-1": "#ffffff",
					"--dsw-alias-bg-layer-2": "#f0ead8",
					"--dsw-alias-bg-layer-3": "#e7dfcb",
					"--dsw-alias-bg-overlay": "#fffdf8",
					"--dsw-alias-border-l1": "rgba(122, 96, 44, 0.1)",
					"--dsw-alias-border-l2": "rgba(122, 96, 44, 0.18)",
					"--dsw-alias-label-primary": "#2e2920",
					"--dsw-alias-label-secondary": "#6f6656",
					"--dsw-alias-label-tertiary": "#8d8373",
					"--dsw-alias-brand-primary": "#a16207",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#c67c0f",
					"--dsw-alias-button-primary-dimmed": "#f0ead8",
					"--dsw-alias-state-business-primary": "#a16207",
					"--dsw-alias-state-business-tertiary": "#f0ead8",
					"--dsw-alias-interactive-bg-hover": "rgba(161, 98, 7, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(161, 98, 7, 0.14)",
					"--dsw-alias-markdown-code-block": "#f0ead8",
					"--dsw-alias-markdown-inline-code": "#ece5d2",
					"--dsw-specific-sidebar-fill": "#f0ead8",
					"--dsw-specific-sidebar-nav-item-active": "#e7dfcb",
					"--dsw-specific-sidebar-nav-item-hover": "#ece4d0",
					"--dsw-alias-scrollbar-bg-l1": "#e0d6bd",
					"--dsw-alias-scrollbar-bg-l2": "#d8ccb0",
					"--dsw-alias-scrollbar-hover-l1": "#cdbfa0",
					"--dsw-alias-scrollbar-hover-l2": "#cdbfa0"
				}
			},
			{
				id: "mist",
				colorScheme: "light",
				tokens: {
					"--dsw-alias-bg-base": "#f0f3f7",
					"--dsw-alias-bg-layer-1": "#ffffff",
					"--dsw-alias-bg-layer-2": "#e7edf4",
					"--dsw-alias-bg-layer-3": "#dbe4ee",
					"--dsw-alias-bg-overlay": "#ffffff",
					"--dsw-alias-border-l1": "rgba(51, 65, 85, 0.1)",
					"--dsw-alias-border-l2": "rgba(51, 65, 85, 0.18)",
					"--dsw-alias-label-primary": "#1e293b",
					"--dsw-alias-label-secondary": "#64748b",
					"--dsw-alias-label-tertiary": "#94a3b8",
					"--dsw-alias-brand-primary": "#2563eb",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#3b82f6",
					"--dsw-alias-button-primary-dimmed": "#e7edf4",
					"--dsw-alias-state-business-primary": "#2563eb",
					"--dsw-alias-state-business-tertiary": "#e7edf4",
					"--dsw-alias-interactive-bg-hover": "rgba(37, 99, 235, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(37, 99, 235, 0.14)",
					"--dsw-alias-markdown-code-block": "#e7edf4",
					"--dsw-alias-markdown-inline-code": "#dbe4ee",
					"--dsw-specific-sidebar-fill": "#e7edf4",
					"--dsw-specific-sidebar-nav-item-active": "#dbe4ee",
					"--dsw-specific-sidebar-nav-item-hover": "#e2e9f2",
					"--dsw-alias-scrollbar-bg-l1": "#cbd5e1",
					"--dsw-alias-scrollbar-bg-l2": "#c1ccda",
					"--dsw-alias-scrollbar-hover-l1": "#b4c0d0",
					"--dsw-alias-scrollbar-hover-l2": "#b4c0d0"
				}
			},
			{
				id: "rose",
				colorScheme: "light",
				tokens: {
					"--dsw-alias-bg-base": "#fbf3f5",
					"--dsw-alias-bg-layer-1": "#ffffff",
					"--dsw-alias-bg-layer-2": "#f7e4ea",
					"--dsw-alias-bg-layer-3": "#f0d2dc",
					"--dsw-alias-bg-overlay": "#fffdfd",
					"--dsw-alias-border-l1": "rgba(190, 90, 120, 0.1)",
					"--dsw-alias-border-l2": "rgba(190, 90, 120, 0.18)",
					"--dsw-alias-label-primary": "#3a2230",
					"--dsw-alias-label-secondary": "#90647a",
					"--dsw-alias-label-tertiary": "#a47d92",
					"--dsw-alias-brand-primary": "#e11d78",
					"--dsw-alias-brand-text": "#ffffff",
					"--dsw-alias-button-primary-hover": "#ec4a96",
					"--dsw-alias-button-primary-dimmed": "#f7e4ea",
					"--dsw-alias-state-business-primary": "#e11d78",
					"--dsw-alias-state-business-tertiary": "#f7e4ea",
					"--dsw-alias-interactive-bg-hover": "rgba(225, 29, 120, 0.08)",
					"--dsw-alias-interactive-bg-active": "rgba(225, 29, 120, 0.15)",
					"--dsw-alias-markdown-code-block": "#f7e4ea",
					"--dsw-alias-markdown-inline-code": "#f0d2dc",
					"--dsw-specific-sidebar-fill": "#f7e4ea",
					"--dsw-specific-sidebar-nav-item-active": "#f0d2dc",
					"--dsw-specific-sidebar-nav-item-hover": "#f4dae2",
					"--dsw-alias-scrollbar-bg-l1": "#eccfd9",
					"--dsw-alias-scrollbar-bg-l2": "#e5c0cd",
					"--dsw-alias-scrollbar-hover-l1": "#d9afbf",
					"--dsw-alias-scrollbar-hover-l2": "#d9afbf"
				}
			}
		];

		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"skin.title": "皮肤（Mirage 幻梦）",
			"skin.default": "默认",
			"skin.abyss": "深海渊",
			"skin.aurora": "极光",
			"skin.nebula": "星云",
			"skin.ember": "余烬",
			"skin.midnight": "午夜",
			"skin.ivory": "象牙暖",
			"skin.mist": "晨雾蓝",
			"skin.rose": "蔷薇粉",
			"background.title": "背景图片（壁纸）",
			"background.choose": "选择图片",
			"background.remove": "移除图片",
			"background.opacity": "透明度",
			"background.blur": "模糊",
			"background.hint": "图片显示在主内容区与侧边栏的半透明底上，消息等内层表面保持不透明以保证可读性"
		};

		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"skin.title": "Skins (Mirage)",
			"skin.default": "Default",
			"skin.abyss": "Abyss",
			"skin.aurora": "Aurora",
			"skin.nebula": "Nebula",
			"skin.ember": "Ember",
			"skin.midnight": "Midnight",
			"skin.ivory": "Ivory",
			"skin.mist": "Mist",
			"skin.rose": "Rose",
			"background.title": "Wallpaper",
			"background.choose": "Choose image",
			"background.remove": "Remove",
			"background.opacity": "Opacity",
			"background.blur": "Blur",
			"background.hint": "The image shows through the translucent main canvas and sidebar; inner surfaces stay opaque for readability"
		};
		//#endregion

		//#region dsh-dream-skin: persistence
		/** Read a localStorage string value (null on absence or error). */
		function readStorage(key) {
			try {
				const value = window.localStorage.getItem(key);
				return typeof value === "string" ? value : null;
			} catch {
				return null;
			}
		}

		/** Write (or remove with null) a localStorage value. */
		function writeStorage(key, value) {
			try {
				if (value === null) window.localStorage.removeItem(key);
				else window.localStorage.setItem(key, value);
			} catch {
				// storage unavailable / quota — the preference stays process-local
			}
		}

		/** Saved skin id (may be unknown/absent). */
		function readSavedSkin() {
			return readStorage(STORAGE_KEY);
		}

		/** Persist a skin choice; DEFAULT_SKIN clears the stored value. */
		function writeSavedSkin(id) {
			writeStorage(STORAGE_KEY, id === DEFAULT_SKIN ? null : id);
		}

		/** Wallpaper data URL (null when unset). */
		function readWallpaper() {
			const value = readStorage(WALLPAPER_KEY);
			return value !== null && value.length > 0 ? value : null;
		}

		/** Wash opacity 0..1 (clamped; default when unset). */
		function readWallpaperOpacity() {
			const raw = readStorage(WALLPAPER_OPACITY_KEY);
			if (raw === null) return DEFAULT_WALLPAPER_OPACITY;
			const value = Number(raw);
			return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : DEFAULT_WALLPAPER_OPACITY;
		}

		/** Blur radius in px (clamped to 0..60; default when unset). */
		function readWallpaperBlur() {
			const raw = readStorage(WALLPAPER_BLUR_KEY);
			if (raw === null) return DEFAULT_WALLPAPER_BLUR;
			const value = Number(raw);
			return Number.isFinite(value) ? Math.min(60, Math.max(0, value)) : DEFAULT_WALLPAPER_BLUR;
		}
		//#endregion

		//#region dsh-dream-skin: wallpaper layer + token shading
		/** The fixed backdrop layer (z-index -1), created lazily. */
		let wallpaperEl = null;
		/** Disposer for the current token-override layer. */
		let wallpaperOverrideDispose = null;

		/** Parse a hex or rgb()/rgba() color into rgba() with the given alpha. */
		function toRgba(color, alpha) {
			const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
			if (hex !== null) {
				let digits = hex[1];
				if (digits.length === 3) digits = digits.split("").map((char) => char + char).join("");
				const n = parseInt(digits, 16);
				return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
			}
			const rgb = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)$/i.exec(color.trim());
			if (rgb !== null) return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${alpha})`;
			return color.trim();
		}

		/**
		 * The base color for one scheme: the active skin's `--dsw-alias-bg-base`
		 * when it owns that scheme, otherwise the built-in base. The wash always
		 * carries the active skin's tint (and re-shades on theme/change).
		 */
		function resolveBase(scheme, active) {
			if (active.colorScheme === scheme && typeof active.tokens["--dsw-alias-bg-base"] === "string") {
				return active.tokens["--dsw-alias-bg-base"];
			}
			return BUILTIN_BASE[scheme];
		}

		/**
		 * Stack the wallpaper's token override layer: the main canvas
		 * (--dsw-alias-bg-base) and the sidebar (--dsw-specific-sidebar-fill)
		 * become translucent at the configured opacity, so the fixed backdrop
		 * shows through while inner surfaces (cards, inputs, bubbles) stay
		 * opaque and readable. Re-calling with the same source replaces the
		 * whole layer (per the ThemeRuntime contract — note override tokens must
		 * be { light, dark } pairs, unlike registered-theme tokens which are
		 * scalar strings).
		 */
		function shadeTokens(ctx) {
			const snapshot = ctx.theme.getTheme();
			const alpha = readWallpaperOpacity();
			const sidebarAlpha = Math.min(1, alpha + 0.1);
			const overrides = {
				"--dsw-alias-bg-base": {
					light: toRgba(resolveBase("light", snapshot.active), alpha),
					dark: toRgba(resolveBase("dark", snapshot.active), alpha)
				},
				"--dsw-specific-sidebar-fill": {
					light: toRgba(resolveBase("light", snapshot.active), sidebarAlpha),
					dark: toRgba(resolveBase("dark", snapshot.active), sidebarAlpha)
				}
			};
			wallpaperOverrideDispose?.();
			wallpaperOverrideDispose = ctx.theme.overrideTokens(OVERRIDE_SOURCE, overrides);
		}

		/** Apply (or clear) the wallpaper layer and its token shading. */
		function applyWallpaper(ctx) {
			const url = readWallpaper();
			if (url === null) {
				wallpaperEl?.remove();
				wallpaperEl = null;
				wallpaperOverrideDispose?.();
				wallpaperOverrideDispose = null;
				return;
			}
			if (wallpaperEl === null || !document.body.contains(wallpaperEl)) {
				wallpaperEl = document.createElement("div");
				wallpaperEl.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;background-size:cover;background-position:center;background-repeat:no-repeat;";
				document.body.prepend(wallpaperEl);
			}
			const blur = readWallpaperBlur();
			wallpaperEl.style.backgroundImage = `url("${url}")`;
			wallpaperEl.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
			shadeTokens(ctx);
		}

		/** Remove the wallpaper layer and its token overrides (fiber unload). */
		function teardownWallpaper() {
			wallpaperEl?.remove();
			wallpaperEl = null;
			wallpaperOverrideDispose?.();
			wallpaperOverrideDispose = null;
		}
		//#endregion

		//#region dsh-dream-skin: image compression
		/**
		 * Downscale an image onto a canvas and return a JPEG data URL, so a
		 * wallpaper stays well inside the localStorage quota (≤ ~2MB).
		 */
		function compressImage(image, maxSide, quality) {
			const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(image.width * scale));
			canvas.height = Math.max(1, Math.round(image.height * scale));
			const context = canvas.getContext("2d");
			context.drawImage(image, 0, 0, canvas.width, canvas.height);
			return canvas.toDataURL("image/jpeg", quality);
		}

		/** Read a picked file into a compressed data URL (null on failure). */
		function readImageAsDataUrl(file, onDone) {
			const reader = new FileReader();
			reader.onerror = () => onDone(null);
			reader.onload = () => {
				const image = new Image();
				image.onerror = () => onDone(null);
				image.onload = () => {
					try {
						let dataUrl = compressImage(image, 1600, 0.75);
						if (dataUrl.length > 2000000) dataUrl = compressImage(image, 1000, 0.6);
						if (dataUrl.length > 2000000) dataUrl = compressImage(image, 800, 0.5);
						onDone(dataUrl);
					} catch {
						onDone(null);
					}
				};
				image.src = reader.result;
			};
			reader.readAsDataURL(file);
		}
		//#endregion

		//#region dsh-dream-skin: settings row stores
		/**
		 * Skin row slot store: a mirror of the theme service snapshot. The
		 * plugin's apply-world change listener is the only writer; the row
		 * component reads via props.useStore.
		 */
		function createSkinStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					skin: "system",
					revision: -1
				}),
				actions: {
					sync: (d, skin, revision) => {
						if (revision <= d.revision) return;
						d.skin = skin;
						d.revision = revision;
					}
				}
			});
		}

		/** Wallpaper row store: url + opacity + blur, written only by this plugin. */
		function createWallpaperStore() {
			return (0, _runtime_client.defineStore)({
				init: () => ({
					url: null,
					opacity: DEFAULT_WALLPAPER_OPACITY,
					blur: DEFAULT_WALLPAPER_BLUR,
					revision: -1
				}),
				actions: {
					sync: (d, url, opacity, blur, revision) => {
						if (revision <= d.revision) return;
						d.url = url;
						d.opacity = opacity;
						d.blur = blur;
						d.revision = revision;
					}
				}
			});
		}
		//#endregion

		//#region dsh-dream-skin: settings rows
		/** Inline style sheet for the rows (kept dependency-free). */
		const styles = {
			group: {
				borderBottom: "1px solid var(--dsw-alias-border-l2)",
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				padding: "16px 0"
			},
			title: {
				color: "var(--dsw-alias-label-primary)",
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "22px"
			},
			hint: {
				color: "var(--dsw-alias-label-tertiary)",
				fontSize: "12px",
				lineHeight: "18px"
			},
			grid: {
				display: "flex",
				flexWrap: "wrap",
				gap: "10px"
			},
			card: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "6px",
				width: "96px",
				padding: "3px",
				borderRadius: "10px",
				border: "2px solid transparent",
				background: "transparent",
				cursor: "pointer",
				font: "inherit",
				boxSizing: "border-box"
			},
			cardSelected: {
				borderColor: "var(--dsw-alias-brand-primary)",
				background: "var(--dsw-alias-interactive-bg-hover)"
			},
			cardLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				lineHeight: "16px",
				whiteSpace: "nowrap"
			},
			cardLabelSelected: {
				color: "var(--dsw-alias-label-primary)"
			},
			swatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				padding: "8px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: "6px"
			},
			swatchLine: {
				height: "7px",
				borderRadius: "4px"
			},
			defaultSwatch: {
				width: "100%",
				height: "52px",
				borderRadius: "8px",
				boxSizing: "border-box",
				display: "flex",
				overflow: "hidden",
				border: "1px solid var(--dsw-alias-border-l2)"
			},
			button: {
				height: "32px",
				padding: "0 14px",
				borderRadius: "8px",
				border: "1px solid var(--dsw-alias-border-l2)",
				background: "var(--dsw-alias-button-elevated-fill)",
				color: "var(--dsw-alias-label-primary)",
				cursor: "pointer",
				fontSize: "13px",
				font: "inherit",
				boxSizing: "border-box"
			},
			buttonDanger: {
				color: "var(--dsw-alias-state-error-primary)"
			},
			preview: {
				width: "72px",
				height: "44px",
				objectFit: "cover",
				borderRadius: "6px",
				border: "1px solid var(--dsw-alias-border-l2)"
			},
			actionRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				flexWrap: "wrap"
			},
			sliderRow: {
				display: "flex",
				alignItems: "center",
				gap: "10px",
				minWidth: "240px"
			},
			sliderLabel: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "13px",
				whiteSpace: "nowrap",
				width: "52px"
			},
			slider: {
				flex: 1,
				accentColor: "var(--dsw-alias-brand-primary)"
			},
			sliderValue: {
				color: "var(--dsw-alias-label-secondary)",
				fontSize: "12px",
				whiteSpace: "nowrap",
				width: "44px",
				textAlign: "right"
			}
		};

		/** Mini palette preview driven by one skin's token table. */
		function Swatch({ tokens }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: {
					...styles.swatch,
					background: tokens["--dsw-alias-bg-layer-1"],
					border: `1px solid ${tokens["--dsw-alias-border-l2"]}`
				},
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "70%",
							background: tokens["--dsw-alias-label-primary"],
							opacity: 0.85
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "45%",
							background: tokens["--dsw-alias-brand-primary"]
						}
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: {
							...styles.swatchLine,
							width: "55%",
							background: tokens["--dsw-alias-label-secondary"],
							opacity: 0.55
						}
					})
				]
			});
		}

		/** "Default" chip: follow the built-in appearance (light + dark halves). */
		function DefaultSwatch() {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.defaultSwatch,
				children: [
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#f4f4f5" } }),
					(0, react_jsx_runtime.jsx)("div", { style: { flex: 1, background: "#1c1c20" } })
				]
			});
		}

		/** One selectable skin card. */
		function SkinCard({ skin, selected, onSelect, t }) {
			return (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onSelect,
				"aria-pressed": selected,
				style: {
					...styles.card,
					...(selected ? styles.cardSelected : {})
				},
				children: [
					(0, react_jsx_runtime.jsx)(Swatch, { tokens: skin.tokens }),
					(0, react_jsx_runtime.jsx)("span", {
						style: {
							...styles.cardLabel,
							...(selected ? styles.cardLabelSelected : {})
						},
						children: t(`skin.${skin.id}`)
					})
				]
			});
		}

		/**
		 * Skin picker row registered into the Settings → General item slot,
		 * right after the built-in Appearance row: title + a "Default" chip and
		 * one swatch card per curated skin.
		 */
		function SkinRow({ t, setSkin, useStore }) {
			const skin = useStore((s) => s.skin);
			const selected = SKINS.some((candidate) => candidate.id === skin) ? skin : null;
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("skin.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.grid,
						children: [
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSkin(DEFAULT_SKIN),
								"aria-pressed": selected === null,
								style: {
									...styles.card,
									...(selected === null ? styles.cardSelected : {})
								},
								children: [
									(0, react_jsx_runtime.jsx)(DefaultSwatch, {}),
									(0, react_jsx_runtime.jsx)("span", {
										style: {
											...styles.cardLabel,
											...(selected === null ? styles.cardLabelSelected : {})
										},
										children: t("skin.default")
									})
								]
							}),
							SKINS.map((skinDefinition) => (0, react_jsx_runtime.jsx)(SkinCard, {
								skin: skinDefinition,
								selected: selected === skinDefinition.id,
								onSelect: () => setSkin(skinDefinition.id),
								t
							}, skinDefinition.id))
						]
					})
				]
			});
		}

		/** One labeled slider (opacity or blur). */
		function Slider({ label, value, min, max, step, format, onChange }) {
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.sliderRow,
				children: [
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.sliderLabel,
						children: label
					}),
					(0, react_jsx_runtime.jsx)("input", {
						type: "range",
						min,
						max,
						step,
						value,
						style: styles.slider,
						onChange: (event) => onChange(Number(event.target.value))
					}),
					(0, react_jsx_runtime.jsx)("span", {
						style: styles.sliderValue,
						children: format(value)
					})
				]
			});
		}

		/**
		 * Wallpaper row: choose (compressed to a data URL), preview, tune the
		 * wash opacity and blur, and remove the wallpaper.
		 */
		function WallpaperRow({ t, setWallpaper, setOpacity, setBlur, useStore }) {
			const url = useStore((s) => s.url);
			const opacity = useStore((s) => s.opacity);
			const blur = useStore((s) => s.blur);
			const inputRef = (0, _react.useRef)(null);
			const onPick = () => inputRef.current?.click();
			const onFile = (event) => {
				const file = event.target.files?.[0];
				if (file === void 0) return;
				readImageAsDataUrl(file, (dataUrl) => {
					if (dataUrl !== null) setWallpaper(dataUrl);
					event.target.value = "";
				});
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				style: styles.group,
				children: [
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.title,
						children: t("background.title")
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						style: styles.actionRow,
						children: [
							url !== null ? (0, react_jsx_runtime.jsx)("img", {
								src: url,
								alt: "",
								style: styles.preview
							}) : null,
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: styles.button,
								onClick: onPick,
								children: t("background.choose")
							}),
							url !== null ? (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								style: {
									...styles.button,
									...styles.buttonDanger
								},
								onClick: () => setWallpaper(null),
								children: t("background.remove")
							}) : null,
							(0, react_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: "image/*",
								style: { display: "none" },
								onChange: onFile
							})
						]
					}),
					(0, react_jsx_runtime.jsx)(Slider, {
						label: t("background.opacity"),
						value: Math.round(opacity * 100),
						min: 0,
						max: 100,
						step: 1,
						format: (v) => `${v}%`,
						onChange: setOpacity
					}),
					(0, react_jsx_runtime.jsx)(Slider, {
						label: t("background.blur"),
						value: blur,
						min: 0,
						max: 60,
						step: 1,
						format: (v) => `${v}px`,
						onChange: setBlur
					}),
					(0, react_jsx_runtime.jsx)("div", {
						style: styles.hint,
						children: t("background.hint")
					})
				]
			});
		}
		//#endregion

		//#region dsh-dream-skin: client plugin body
		/**
		 * Required services: theme runtime (skins, switching, token override
		 * layers), slots/locale (the settings rows). Persistence is
		 * localStorage, so no settings transport is needed.
		 */
		const inject = [
			"slots",
			"locale",
			"theme"
		];

		/**
		 * Client plugin body: register the curated skins into the theme runtime,
		 * restore the saved skin and wallpaper, keep the rows' stores in sync
		 * with theme/change, and register both rows into Settings → General.
		 * @param ctx - client cordis context.
		 */
		function apply(ctx) {
			const disposers = SKINS.map((skinDefinition) => ctx.theme.register(skinDefinition));
			ctx.effect(() => () => {
				for (const dispose of disposers) dispose();
			}, "dsh-dream-skin: theme registration");

			// Restore the saved skin once (before any user interaction).
			const saved = readSavedSkin();
			if (typeof saved === "string" && saved !== DEFAULT_SKIN && SKINS.some((skinDefinition) => skinDefinition.id === saved)) {
				const current = ctx.theme.getTheme().preference;
				if (current !== saved) ctx.theme.setTheme(saved);
			}

			// Wallpaper bookkeeping.
			let wallpaperRevision = 0;
			const wallpaperStore = createWallpaperStore();
			let wallpaperBound;
			const syncWallpaper = () => {
				wallpaperRevision += 1;
				wallpaperBound?.sync(readWallpaper(), readWallpaperOpacity(), readWallpaperBlur(), wallpaperRevision);
			};
			applyWallpaper(ctx);
			syncWallpaper();
			ctx.effect(() => () => {
				teardownWallpaper();
			}, "dsh-dream-skin: wallpaper cleanup");

			const skinStore = createSkinStore();
			let skinBound;
			const syncSkin = (snapshot) => {
				skinBound?.sync(snapshot.preference, snapshot.revision);
				// A skin/scheme switch changes the base color; re-shade the wash.
				if (readWallpaper() !== null) applyWallpaper(ctx);
			};
			ctx.on("theme/change", syncSkin);

			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "dsh-dream-skin: settings row dictionaries");

			const skinInjected = (actions) => {
				skinBound = actions;
				syncSkin(ctx.theme.getTheme());
				return {
					setSkin: (id) => {
						ctx.theme.setTheme(id);
						writeSavedSkin(id);
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "dream-skin",
				order: 20,
				store: skinStore,
				locale: SETTINGS_NS,
				inject: skinInjected
			}, SkinRow));

			const wallpaperInjected = (actions) => {
				wallpaperBound = actions;
				syncWallpaper();
				return {
					setWallpaper: (url) => {
						writeStorage(WALLPAPER_KEY, url);
						applyWallpaper(ctx);
						syncWallpaper();
					},
					setOpacity: (percent) => {
						const value = Math.min(1, Math.max(0, percent / 100));
						writeStorage(WALLPAPER_OPACITY_KEY, String(value));
						applyWallpaper(ctx);
						syncWallpaper();
					},
					setBlur: (px) => {
						const value = Math.min(60, Math.max(0, px));
						writeStorage(WALLPAPER_BLUR_KEY, String(value));
						applyWallpaper(ctx);
						syncWallpaper();
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "dream-skin-wallpaper",
				order: 30,
				store: wallpaperStore,
				locale: SETTINGS_NS,
				inject: wallpaperInjected
			}, WallpaperRow));
		}
		//#endregion

		exports.SETTINGS_NS = SETTINGS_NS;
		exports.SKINS = SKINS;
		exports.DEFAULT_SKIN = DEFAULT_SKIN;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
