<p align="center">
  <a href="./README.md">中文</a> · <strong>English</strong>
</p>

<div align="center">

# dsh-dream-skin 🔮

**Give DeepSeek Harness a face that breathes.**

Third-party skin / wallpaper plugin · native integration with DSH's `--dsw-*` token theming · no patches to the official installer

[中文](./README.md) · [Changelog](./CHANGELOG.md) · [Project Notes](./docs/PROJECT.md) · [Publishing Guide](./docs/publishing-to-npm.md)

![npm version](https://img.shields.io/npm/v/dsh-dream-skin?color=4f83f2&label=npm)
![license](https://img.shields.io/github/license/RevolutionLA/dsh-dream-skin?color=34d399)
![node](https://img.shields.io/badge/node-%3E%3D18-6d9af6)
![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-blueviolet)

</div>

> **Homage to [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).** But the approach is different:
> Codex injects CSS into the desktop client's renderer via CDP, whereas DSH is a **token-driven Web GUI** that ships
> first-class "third-party plugins registering themes". So this plugin is **purely native** — no injection, no binary
> patches, and it won't break on client updates.
>
> **Not an official product.** Just a way to dress up your DeepSeek Harness workspace.

---

## ✨ Features

| Capability | Description |
|------------|-------------|
| 🎨 **8 bundled presets (Mirage)** | Switch instantly under **Settings → General → Skins**, light & dark |
| 🖼️ **Custom wallpaper** | Pick a local image (auto-compressed ≤2MB), tune **opacity / blur** |
| 🔤 **Opaque inner surfaces** | Cards, inputs, message bubbles stay readable — never washed out |
| ↩️ **Default restore** | Back to DSH's built-in appearance (follow system) in one click |
| 💾 **Local persistence** | Skin & wallpaper stored in `localStorage`, survives reload |

## 🖼️ Preview

> Screenshot / animation placeholder: drop a real DSH screenshot with a skin + wallpaper applied, or a theme-switch GIF.

| Dark · abyss | Light · ivory |
|--------------|---------------|
| ![abyss preview](https://via.placeholder.com/420x240/060a14/4f83f2?text=abyss) | ![ivory preview](https://via.placeholder.com/420x240/f7f4ee/a16207?text=ivory) |

## 🎲 The presets

| id | scheme | vibe |
|------|--------|------|
| `abyss` | 🕶️ dark | DeepSeek deep-blue abyss (anchor) |
| `aurora` | 🌌 dark | aurora teal-green |
| `nebula` | 🪐 dark | cosmic purple |
| `ember` | 🔥 dark | warm ember orange |
| `midnight` | 🌚 dark | pure-black OLED |
| `ivory` | 📜 light | warm ivory / paper |
| `mist` | 🌫️ light | cool blue fog |
| `rose` | 🌸 light | rose pink / blush |

## 📦 Install

### Option A: From source / a local directory

```sh
dsh plugin --profile web add -w /path/to/dsh-dream-skin
```

> The `-w` flag is **required**: every profile ships a `pnpm-workspace.yaml`, so pnpm treats the profile directory
> as a workspace root and a bare `add` fails with `ERR_PNPM_ADDING_TO_ROOT`.

Then **restart** the web server:

```sh
# stop the running instance, then:
dsh web
```

Open **Settings → General** to see the **Skins** and **Wallpaper** rows.

### Option B: From npm (after publishing)

```sh
dsh plugin --profile web add -w dsh-dream-skin
```

## 🧩 Compatibility

| Item | Value |
|------|-------|
| DeepSeek Harness (`dsh`) | `0.1.0-rc.6` (peerDependencies pinned to `^0.1.0-rc.6`) |
| Node.js | `>=18` |
| Browser | modern Chromium / WebKit (native CSS variables & `matchMedia`) |

> When upgrading DSH, bump the peerDependencies in `package.json` accordingly.

## ⚙️ How it works

DSH's theme system is token-based: the web shell ships `--dsw-*` design tokens, and `ThemeRuntime` lets third-party
plugins register themes that override the alias layer (`--dsw-alias-*`). This package is a standard dual-face plugin:

```text
                ┌─────────────────────────────────────────────┐
                │          dsh-dream-skin (dual-face plugin)    │
                ├────────────────────────────┬────────────────┤
    Host half   │  lib/index.js              │  Browser half  │
                │  cordis.patch.yml inserts  │  lib/client.js │
                │  dream-skin loader entry   │  __ModuleLoader__│
                └────────────────────────────┴────────────────┘
                             │                         │
                     profile tree loaded      /plugins/dsh-dream-skin/client.js
                                                         │
        ┌────────────────────────────────┬────────────────┐
        │                                │                │
   ctx.theme.register(8 skins)     ctx.theme.overrideTokens(wallpaper)   ctx.slots.inject('settings.general.item')
```

- **Host half** (`lib/index.js`) — a `dsh.bundle` patch layer inserting the `dream-skin` loader entry; `apply` is a
  no-op, exactly like the shipped `ui-*` packages.
- **Browser half** (`lib/client.js`):
  1. registers the 8 skins via `ctx.theme.register(...)`;
  2. restores the saved skin and applies it with `ctx.theme.setTheme(...)`;
  3. renders the wallpaper as a `z-index:-1` fixed backdrop and stacks `ctx.theme.overrideTokens(...)` making the
     main canvas (`--dsw-alias-bg-base`) and sidebar (`--dsw-specific-sidebar-fill`) translucent;
  4. listens for `theme/change` and re-shades the wallpaper wash on skin / scheme switch;
  5. mounts both rows into the `settings.general.item` slot.

Each skin carries its `colorScheme` (`light`/`dark`), driving `body[data-ds-dark-theme]`; the alias-token overrides
are applied as inline custom properties on `<body>` by ui-layout's ThemePresenter.

## 💼 Persistence notes

- Skin & wallpaper are stored in `localStorage` (keys prefixed `dsh-dream-skin:`), **per browser**.
- Why not Host settings? The Host settings wire only exposes an allowlisted set of namespaces to browser clients
  (`WEB_SETTINGS_NAMESPACES` in `dsh-host-apiproxy`), so a third-party namespace would answer `settings-not-exposed`;
  the product itself keeps remote browser preferences process-local. `localStorage` matches that boundary and
  survives reloads.

## 🛠️ Development / extending themes

The client bundle is written directly in the `__ModuleLoader__` format (the same shape tsdown emits for the shipped
`ui-*` packages), so **no build step** is required. `lib/client.js` may `require` only module-table entities: platform
seeds (`react`, `react/jsx-runtime`, …) and registered client bundles (`@deepseek-ai/dsh-client-runtime/client`, …).

**Add a skin**: append an object (`id` + `colorScheme` + `tokens`) to the `SKINS` array in `lib/client.js`; it then
appears in Settings automatically. Add a `skin.<id>` key to both the `zh` and `en` dictionaries. **Repaint**:
reference the `--dsw-alias-*` tokens.

## 📌 Roadmap

- [x] v0.1: 8 themes + custom wallpaper (opacity / blur) + local persistence
- [ ] Online palette / theme-preview Studio (pure frontend)
- [ ] Community theme gallery (share / import-export presets as JSON)
- [ ] Theme-pack format (like Codex's `.zip` theme import)
- [ ] Full i18n copy & docs (zh / en / more)

## 🤝 Contributing

Issues and PRs welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) and follow the
[Code of Conduct](./CODE_OF_CONDUCT.md).

## 🔒 Security

Found a security issue? Don't open a public issue — see the [Security Policy](./SECURITY.md).

## 📄 License

[MIT](./LICENSE)

## 🙏 Acknowledgments

- Architecture & API reference: the official DeepSeek Harness
  [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme) client package.
- Concept homage: [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).
