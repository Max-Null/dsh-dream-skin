<p align="center">
  <strong>English</strong> · <a href="./README.en.md">English (EN)</a>
</p>

<p align="center">
  <strong>给 DeepSeek Harness 换一张会呼吸的脸。</strong><br>
  第三方换肤插件 · 原生 token 主题系统 · 不修改官方二进制
</p>

<p align="center">
  一张图，一种心情 · 写代码，也要有氛围感 🎨
</p>

<p align="center">
  灵感来自 <a href="https://github.com/Fei-Away/Codex-Dream-Skin">Codex-Dream-Skin</a>。<br>
  不是官方产品，也不修改 DSH 的安装包 —— 是基于 DSH 自己内置的 <code>--dsw-*</code> token 主题系统。
</p>

---

## 这是什么？

**dsh-dream-skin** 是 [DeepSeek Harness (dsh)](https://github.com/deepseek-ai/deepseek-harness) 的一款
**换肤 / 壁纸插件**，概念上对标 Codex 的 Dream Skin 主题工具。

它向 DSH 的 web GUI 中注册一套自带的主题（Mirage 幻梦系列 8 套配色），并允许你上传一张自己的背景图片
作为壁纸，配合透明度和模糊调节，让主内容区与侧边栏变成半透明质感。所有选择都保存在本地，刷新不丢。

> 与 Codex 不同的是：Codex-Dream-Skin 用 CDP 往桌面客户端的渲染进程注入 CSS；DSH 本身就是一个
> **token 驱动的 Web GUI**，官方就提供了「第三方插件注册主题」的能力。所以这个插件是**纯原生接入**，
> 不需要注入、不需要改安装包、也不会因为客户端更新而失效。

## 功能一览

- **8 套主题预设（Mirage 幻梦）**：在 **设置 → 常规 → 皮肤** 一键切换，浅色 / 深色都有。
- **自定义壁纸**：上传本地图片（自动压缩到 ≤2MB，存为 data URL，仅保存在当前浏览器），
  调节**透明度**与**模糊**，让图片透过半透明画布和侧边栏显示出来。
- **内层表面保持不透明**：卡片、输入框、消息气泡不会被壁纸盖住，可读性优先。
- **默认还原**：选「默认」即可回到 DSH 内置外观（跟随系统）。
- **本地持久化**：皮肤与壁纸设置保存在 `localStorage`，刷新 / 重开浏览器不丢。

## 预览预设

| id       | 色系       | 氛围                        |
|----------|------------|-----------------------------|
| `abyss`  | dark       | DeepSeek 深蓝深渊（品牌锚点） |
| `aurora` | dark       | 极光 · 青绿                  |
| `nebula` | dark       | 星云 · 紫                    |
| `ember`  | dark       | 余烬 · 暖橙                  |
| `midnight`| dark      | 纯黑 OLED                    |
| `ivory`  | light      | 象牙暖 · 纸感                 |
| `mist`   | light      | 晨雾蓝 · 冷调                 |
| `rose`   | light      | 蔷薇粉                       |

## 安装

### 方式一：从源码（本仓库/本地目录）

```sh
# 在任意目录执行（把 <path> 换成仓库的绝对路径）
dsh plugin --profile web add -w /path/to/dsh-dream-skin
```

> `-w` 标志是必需的：每个 profile 都自带 `pnpm-workspace.yaml`，pnpm 9 会把 profile 目录当作 workspace 根，
> 裸的 `add` 会报 `ERR_PNPM_ADDING_TO_ROOT`。

然后**重启** web 服务：

```sh
# 先停掉正在运行的实例，然后：
dsh web
```

打开 **设置 → 常规**，就可以看到「皮肤」和「背景图片」两行了。

### 方式二：npm 发布后（开箱即用）

```sh
dsh plugin --profile web add -w dsh-dream-skin
# 然后重启 dsh web
```

## 它是怎么工作的？

DSH 的主题系统是 token 化的：web 外壳内置 `--dsw-*` 设计令牌，`ThemeRuntime` 允许第三方插件注册
主题去覆盖别名层（`--dsw-alias-*`）。本插件是一个标准的「双面」插件：

- **Host 半边**（`lib/index.js`）—— 一个 `dsh.bundle` patch 层，插入一个 `dream-skin` loader 入口；
  `apply` 是空操作，与官方 `ui-*` 包相同。
- **浏览器半边**（`lib/client.js`）—— 一个 `dsh.client` bundle（由 `dsh-client-modules` 在
  `/plugins/dsh-dream-skin/client.js` 提供），它：
  1. 用 `ctx.theme.register(...)` 把 8 套皮肤注册进内置主题运行时；
  2. 恢复上次保存的皮肤并 `ctx.theme.setTheme(...)` 应用；
  3. 把壁纸渲染成一个 `z-index: -1` 的固定背景层，并叠加一层 token override
     （`ctx.theme.overrideTokens(...)`），让主画布（`--dsw-alias-bg-base`）和侧边栏
     （`--dsw-specific-sidebar-fill`）变半透明；
  4. 通过 `theme/change` 事件保持设置行与主题同步（切皮肤 / 深浅色时自动重新着色壁纸洗色层）；
  5. 把两行 UI 挂进 `settings.general.item` 插槽。

每套皮肤携带自己的 `colorScheme`（`light`/`dark`），它驱动 `body[data-ds-dark-theme]`，别名 token 覆盖
则作为 `<body>` 上的内联自定义属性由 ui-layout 的 ThemePresenter 应用。

## 持久化说明

- 皮肤与壁纸设置保存在 `localStorage`（键名带 `dsh-dream-skin:` 前缀），**只在当前浏览器生效**。
- 为什么不用 Host settings？DSH 的 Host settings 线路只向浏览器客户端暴露一份**白名单**命名空间
  （`dsh-host-apiproxy` 的 `WEB_SETTINGS_NAMESPACES`），第三方命名空间会返回 `settings-not-exposed`；
  产品本身也把远程浏览器偏好保持在进程内。`localStorage` 恰好匹配这个边界，又能跨刷新存活。

## 开发 / 扩展主题

客户端 bundle 直接以 `__ModuleLoader__` 的 bundle 格式编写（就是 tsdown 为官方 `ui-*` 包输出的形态），
**无需构建步骤**。`lib/client.js` 只能 `require` 模块表里的实体：平台种子词
（`react`、`react/jsx-runtime`、…）和已注册的客户端 bundle
（`@deepseek-ai/dsh-client-runtime/client`、…）。

**新增一套皮肤**：在 `lib/client.js` 的 `SKINS` 数组里加一个对象（`id` + `colorScheme` + `tokens`），
它就会自动出现在设置里；记得在 `zh` / `en` 词典里补上 `skin.<id>` 的文案。

**换配色**：参考 `--dsw-alias-*` 令牌（背景、层级、文字、品牌色、边框、滚动条等）。

## 平台边界（给使用者）

- 浏览器侧偏好存于 `localStorage`（第三方 settings 命名空间暂未开放给浏览器）。
- 客户端 bundle 只能 `require` 模块表实体（平台种子 + 已注册客户端 bundle）。

## 开源协议

[MIT](./LICENSE)

## 致谢

- 架构与 API 参考来自 DeepSeek Harness 官方的 [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme) 客户端包。
- 概念致敬 [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin)。
