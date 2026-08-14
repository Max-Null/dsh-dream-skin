<p align="center">
  <strong>中文</strong> · <a href="./README.en.md">English</a>
</p>

<div align="center">

# dsh-dream-skin 🔮

**给 DeepSeek Harness 换一张会呼吸的脸。**

第三方换肤 / 壁纸插件 · 原生接入 DSH 的 `--dsw-*` token 主题系统 · 不改官方安装包

[English](./README.en.md) · [变更日志](./CHANGELOG.md) · [项目说明](./docs/PROJECT.md) · [发布指引](./docs/publishing-to-npm.md)

![npm version](https://img.shields.io/npm/v/dsh-dream-skin?color=4f83f2&label=npm)
![license](https://img.shields.io/github/license/<your-account>/dsh-dream-skin?color=34d399)
![node](https://img.shields.io/badge/node-%3E%3D18-6d9af6)
![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-blueviolet)

</div>

> **致敬 [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin)。** 但实现路径不同：Codex 是往桌面客户端渲染进程
> 注入 CSS（CDP），而 DSH 本身是 **token 驱动的 Web GUI**，官方就提供了「第三方插件注册主题」的能力——所以本插件是
> **纯原生接入**，无注入、不改二进制、不因客户端更新失效。
>
> **不是官方产品。** 仅供美化你的 DeepSeek Harness 工作区。

---

## ✨ 功能一览

| 能力 | 说明 |
|------|------|
| 🎨 **8 套主题预设（Mirage 幻梦）** | 在 **设置 → 常规 → 皮肤** 一键切换，浅色 / 深色兼顾 |
| 🖼️ **自定义壁纸** | 上传本地图（自动压缩 ≤2MB），调节**透明度 / 模糊** |
| 🔤 **内层不透明** | 卡片、输入框、消息气泡不被壁纸盖住，可读性优先 |
| ↩️ **默认还原** | 一键回到 DSH 内置外观（跟随系统） |
| 💾 **本地持久化** | 皮肤与壁纸存 `localStorage`，刷新 / 重开浏览器不丢 |

## 🖼️ 预览

> 截图 / 动图占位：这里放一张开启某套皮肤 + 壁纸时 DSH 界面的实机截图，或一个主题切换的 GIF。

| 深色 · abyss | 浅色 · ivory |
|---|---|
| ![abyss 预览](https://via.placeholder.com/420x240/060a14/4f83f2?text=abyss) | ![ivory 预览](https://via.placeholder.com/420x240/f7f4ee/a16207?text=ivory) |

## 🎲 预设一览

| id | 色系 | 氛围 |
|------|-------|------|
| `abyss` | 🕶️ dark | DeepSeek 深蓝深渊（品牌锚点） |
| `aurora` | 🌌 dark | 极光 · 青绿 |
| `nebula` | 🪐 dark | 星云 · 紫 |
| `ember` | 🔥 dark | 余烬 · 暖橙 |
| `midnight` | 🌚 dark | 纯黑 OLED |
| `ivory` | 📜 light | 象牙暖 · 纸感 |
| `mist` | 🌫️ light | 晨雾蓝 · 冷调 |
| `rose` | 🌸 light | 蔷薇粉 |

## 📦 安装

### 方式一：从源码 / 本地目录

```sh
dsh plugin --profile web add -w /path/to/dsh-dream-skin
```

> `-w` 标志**必需**：每个 profile 自带 `pnpm-workspace.yaml`，pnpm 会把它当作 workspace 根，裸 `add` 会报
> `ERR_PNPM_ADDING_TO_ROOT`。

然后**重启** web 服务：

```sh
# 先停掉正在运行的实例，再：
dsh web
```

打开 **设置 → 常规**，即可看到「皮肤」和「背景图片」两行。

### 方式二：npm 安装（发布后）

```sh
dsh plugin --profile web add -w dsh-dream-skin
```

## 🧩 兼容性

| 项 | 值 |
|------|-----|
| DeepSeek Harness (`dsh`) | `0.1.0-rc.6`（peerDependencies 以 `^0.1.0-rc.6` 对齐） |
| Node.js | `>=18` |
| 浏览器 | 现代 Chromium / WebKit（依赖原生 CSS 变量与 `matchMedia`） |

> 升级 DSH 到新版本时，请同步更新 `package.json` 里的 peerDependencies。

## ⚙️ 工作原理

DSH 的主题系统是 token 化的：web 外壳内置 `--dsw-*` 设计令牌，`ThemeRuntime` 允许第三方插件注册主题去
覆盖别名层（`--dsw-alias-*`）。本插件是标准的「双面」插件：

```text
                ┌─────────────────────────────────────────────┐
                │            dsh-dream-skin (双面插件)          │
                ├────────────────────────────┬────────────────┤
    Host 半边   │  lib/index.js              │  浏览器半边      │
                │  cordis.patch.yml 插入      │  lib/client.js │
                │  dream-skin loader 入口     │  __ModuleLoader__│
                └────────────────────────────┴────────────────┘
                             │                         │
                        profile 树加载              /plugins/dsh-dream-skin/client.js
                                                         │
        ┌────────────────────────────────┬────────────────┐
        │                                │                │
   ctx.theme.register(8套皮肤)      ctx.theme.overrideTokens(壁纸半透明)   ctx.slots.inject('settings.general.item')
```

- **Host 半边**（`lib/index.js`）：`dsh.bundle` patch 层，插入 `dream-skin` loader 入口；`apply` 为空操作，
  与官方 `ui-*` 包同构。
- **浏览器半边**（`lib/client.js`）：
  1. `ctx.theme.register(...)` 注册 8 套皮肤；
  2. 恢复上次保存的皮肤并 `ctx.theme.setTheme(...)` 应用；
  3. 壁纸渲染为 `z-index:-1` 固定背景层，叠加 `ctx.theme.overrideTokens(...)` 让主画布
     （`--dsw-alias-bg-base`）与侧边栏（`--dsw-specific-sidebar-fill`）半透明；
  4. 监听 `theme/change`，切皮肤 / 深浅色时自动重新着色壁纸洗色层；
  5. 把两行 UI 挂进 `settings.general.item` 插槽。

每套皮肤携带自己的 `colorScheme`（`light`/`dark`），驱动 `body[data-ds-dark-theme]`；别名 token 覆盖作为
`<body>` 内联自定义属性由 ui-layout 的 ThemePresenter 应用。

## 💼 持久化说明

- 皮肤与壁纸存于 `localStorage`（键前缀 `dsh-dream-skin:`），**只在当前浏览器生效**。
- 为何不用 Host settings？DSH 的 Host settings 线路只向浏览器暴露一份白名单命名空间
  （`dsh-host-apiproxy` 的 `WEB_SETTINGS_NAMESPACES`），第三方命名空间会返回 `settings-not-exposed`；
  产品本身也把远程浏览器偏好进程化。`localStorage` 恰好匹配这一边界，且跨刷新存活。

## 🛠️ 开发 / 扩展主题

客户端 bundle 直接以 `__ModuleLoader__` 格式编写（即 tsdown 为官方 `ui-*` 包输出的形态），**免构建**。
`lib/client.js` 只能 `require` 模块表实体：平台种子词（`react`、`react/jsx-runtime`、…）与已注册客户端
bundle（`@deepseek-ai/dsh-client-runtime/client`、…）。

**新增一套皮肤**：在 `lib/client.js` 的 `SKINS` 数组加一个对象（`id` + `colorScheme` + `tokens`），它即自动
出现在设置里；记得在 `zh` / `en` 词典补 `skin.<id>` 文案。**换配色**：参考 `--dsw-alias-*` 令牌。

## 📌 Roadmap

- [x] 首版：8 套主题 + 自定义壁纸（透明度 / 模糊）+ 本地持久化
- [ ] 在线色板 / 主题预览 Studio（纯前端）
- [ ] 社区主题库（用户自定义预设的共享 / 导入导出 JSON）
- [ ] 主题包格式（类似 Codex 的 `.zip` 主题导入）
- [ ] 中 / 英 / 更多语言的完整文案与文档

## 🤝 贡献

欢迎提交 Issue 与 PR！请先阅读 [贡献指南](./CONTRIBUTING.md)，并遵循 [Code of Conduct](./CODE_OF_CONDUCT.md)。

## 🔒 安全

发现安全问题？请勿直接开公开 Issue——参见 [安全策略](./SECURITY.md)。

## 📄 开源协议

[MIT](./LICENSE)

## 🙏 致谢

- 架构与 API 参考：DeepSeek Harness 官方
  [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme) 客户端包。
- 概念致敬：[Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin)。
