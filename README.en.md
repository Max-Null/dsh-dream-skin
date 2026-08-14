<p align="center">
  <a href="./README.md">中文</a> · <strong>English</strong>
</p>

<p align="center">
  <strong>Give DeepSeek Harness a face that breathes.</strong><br>
  Third-party skin plugin · native token theming · no patches to the official binary
</p>

<p align="center">
  One image, one mood · code with atmosphere 🎨
</p>

<p align="center">
  Inspired by <a href="https://github.com/Fei-Away/Codex-Dream-Skin">Codex-Dream-Skin</a>.<br>
  Not an official product, and it does not touch DSH's installer — it plugs into DSH's own
  built-in <code>--dsw-*</code> token theming system.
</p>

---

## What is this?

**dsh-dream-skin** is a **skin / wallpaper plugin** for [DeepSeek Harness (dsh)](https://github.com/deepseek-ai/deepseek-harness),
conceptually the counterpart of Codex's Dream Skin tool.

It registers a bundled set of themes (the **Mirage** series — 8 palettes) into the DSH web GUI, and lets
you upload your own background image as a wallpaper with opacity and blur controls, making the main canvas
and sidebar translucent. All choices are persisted locally and survive reloads.

> Unlike Codex: Codex-Dream-Skin injects CSS into the desktop client's renderer via CDP, whereas DSH is a
> **token-driven Web GUI** that ships first-class support for "third-party plugins registering themes". So this
> plugin is **purely native** — no injection, no installer patching, and it won't break on client updates.

## Features

- **8 bundled theme presets (Mirage)** — switch instantly under **Settings → General → Skins**, light & dark.
- **Custom wallpaper** — pick a local image (auto-compressed to ≤2MB, stored as a data URL, kept in this
  browser only), tune **opacity** and **blur** so the image shows through the translucent canvas & sidebar.
- **Inner surfaces stay opaque** — cards, inputs, message bubbles are not washed out; readability first.
- **Default restore** — pick "Default" to go back to DSH's built-in appearance (follow system).
- **Local persistence** — skin & wallpaper stored in `localStorage`, survives refresh / reopen.

## The presets

| id        | scheme | vibe                          |
|-----------|--------|-------------------------------|
| `abyss`   | dark   | DeepSeek deep-blue abyss (anchor) |
| `aurora`  | dark   | aurora teal-green             |
| `nebula`  | dark   | cosmic purple                 |
| `ember`   | dark   | warm ember orange             |
| `midnight`| dark   | pure-black OLED               |
| `ivory`   | light  | warm paper / ivory            |
| `mist`    | light  | cool blue fog                 |
| `rose`    | light  | rose pink / blush             |

## Install

### From source / a local directory

```sh
dsh plugin --profile web add -w /path/to/dsh-dream-skin
```

> The `-w` flag is required: every profile ships a `pnpm-workspace.yaml`, so pnpm 9 treats the profile
> directory as a workspace root and refuses a bare `add` with `ERR_PNPM_ADDING_TO_ROOT`.

Then **restart** the web server:

```sh
# stop the running instance, then:
dsh web
```

Open **Settings → General** to see the **Skins** and **Wallpaper** rows.

### From npm (after publishing)

```sh
dsh plugin --profile web add -w dsh-dream-skin
# then restart dsh web
```

## How it works

DSH's theme system is token-based: the web shell ships `--dsw-*` design tokens, and `ThemeRuntime` lets
third-party plugins register themes that override the alias layer (`--dsw-alias-*`). This package is a standard
dual-face plugin:

- **Host half** (`lib/index.js`) — a `dsh.bundle` patch layer inserting one `dream-skin` loader entry;
  `apply` is a no-op, exactly like the shipped `ui-*` packages.
- **Browser half** (`lib/client.js`) — a `dsh.client` bundle (served at `/plugins/dsh-dream-skin/client.js` by
  `dsh-client-modules`) that:
  1. registers the 8 skins via `ctx.theme.register(...)`;
  2. restores the saved skin and applies it with `ctx.theme.setTheme(...)`;
  3. renders the wallpaper as a fixed backdrop layer (`z-index: -1`) and stacks a token override
     (`ctx.theme.overrideTokens(...)`) making the main canvas (`--dsw-alias-bg-base`) and sidebar
     (`--dsw-specific-sidebar-fill`) translucent;
  4. keeps the slot stores in sync with `theme/change` (re-shading the wallpaper wash when the skin or
     light/dark scheme changes);
  5. mounts both rows into the `settings.general.item` slot.

Each skin carries its `colorScheme` (`light`/`dark`), which drives `body[data-ds-dark-theme]`; the alias-token
overrides are applied as inline custom properties on `<body>` by ui-layout's ThemePresenter.

## Persistence notes

- Skin & wallpaper are stored in `localStorage` (keys prefixed `dsh-dream-skin:`), **per browser**.
- Why not Host settings? DSH's Host settings wire only exposes an allowlisted set of namespaces to browser
  clients (`WEB_SETTINGS_NAMESPACES` in `dsh-host-apiproxy`), so a third-party namespace would answer
  `settings-not-exposed`; the product itself keeps remote browser preferences process-local. `localStorage`
  matches that boundary for a visual preference while surviving reloads on the same origin.

## Development / extending themes

The client bundle is written directly in the `__ModuleLoader__` bundle format (the same shape tsdown emits for
the shipped `ui-*` packages), so **no build step** is required. `lib/client.js` may `require` only module-table
entities: platform seed words (`react`, `react/jsx-runtime`, …) and registered client bundles
(`@deepseek-ai/dsh-client-runtime/client`, …).

**Add a skin**: append an object (`id` + `colorScheme` + `tokens`) to the `SKINS` array in `lib/client.js`; it
appears in Settings automatically. Add a `skin.<id>` key to both the `zh` and `en` dictionaries.

## Platform boundaries (for users)

- Browser-side preferences live in `localStorage` (third-party settings namespaces are not exposed over the
  wire yet).
- The client bundle may only `require` module-table entities (platform seeds + registered client bundles).

## License

[MIT](./LICENSE)

## Acknowledgments

- Architecture & API reference from the official DeepSeek Harness
  [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme) client package.
- Concept homage to [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).
