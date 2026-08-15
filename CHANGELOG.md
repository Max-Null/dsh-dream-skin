# Changelog

记录 `dsh-dream-skin` 的可观变更。格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，版本遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [0.2.1] - 2026-08-15

### 修复（重要）
- **修复壁纸叠加导致的无限递归 / 设置页卡死**：`applyWallpaper2 → overrideTokens` 会触发 `theme/change`，
  我们的 `syncSkin` 又去重新应用壁纸 → `overrideTokens` → 死循环，导致浏览器 `Maximum call stack size exceeded`，
  DSH 的 slot 机制把受影响入口当「崩溃」剔除（表现为预置主题色不显示、透明度/模糊拉杆按不动）。
  改为在 `applyWallpaper2` 里加重入保护（re-entrancy guard），每次着色只调一次 `overrideTokens`。
- **修复壁纸预览图 URL 错误**：`syncWallpaper` 之前把 CSS 包装的 `url("data:...")` 存进 store 的 `url`，
  用于 `<img>` 预览时产生非法请求（431）。改为存储纯 data URL。
- **移除 `AccentRow` JXS 属性里对 `useMemo` 的调用**（改为普通计算），避免 Hooks 用法的潜在隐患。

### 新增
- 回归测试：`apply()` 在 `overrideTokens` 同步触发 `theme/change` 时不会栈溢出（`tests/client.smoke.test.cjs`）。

## [0.2.0] - 2026-08-14

### 新增（P0 差异化能力）
- **主题包格式 + 导入 / 导出**：`*.dsh-theme.json` = 格式标记 + 版本 + manifest（id/name/作者/色系/accent/tokens）；支持导入文件、一键应用、复制分享链接（编码进 URL hash，拿到链接的人打开即自动导入）。
- **每用户强调色 Accent**：为当前皮肤叠加自定义品牌强调色（`overrideTokens` 层，不动皮肤本身），支持「随机」与「恢复主题色」。
- **壁纸 2.0**：支持图片 URL 与渐变预设、每皮肤建议渐变、自动弱化（聚焦任务时降低干扰）。
- **本地主题包库**：内置皮肤 + 导入的主题包集中展示，一键应用 / 收藏。
- **换一个试试（surprise me）** 与 **收藏**。
- **校验 + 回滚**：导入时校验格式 / 必填 token / 颜色合法性；失败或移除时安全回退。
- **冒烟测试**：`npm test`（VM 测试覆盖 factory 求值、`apply` 挂载、主题包导入/持久化）。
- 示例主题包：[`docs/examples/sample-theme-pack.json`](./docs/examples/sample-theme-pack.json)；规格见 [`docs/themes-spec.md`](./docs/themes-spec.md)。

### 修正
- 统一 `window.location` / `window.history` 引用，避免依赖全局单字。

## [0.1.0] - 2026-08-14

### 新增
- 首个可用版本：向 DSH web GUI 注册 **Mirage 幻梦** 系列 8 套主题预设。
- 在 **设置 → 常规** 新增两行：
  - **皮肤 / Skins**：8 套预设 + 「默认」（跟随系统）。
  - **背景图片 / Wallpaper**：上传本地图片 + 透明度 + 模糊 + 移除。
- 壁纸以 `z-index: -1` 背景层 + `overrideTokens` 半透明叠加实现，内层表面保持不透明可读。
- 皮肤 / 壁纸设置通过 `localStorage` 持久化，跨刷新存活。
- 双插件结构（host `lib/index.js` + 浏览器 `lib/client.js`），支持 `dsh plugin --profile web add -w <path>` 安装。

### 说明
- 与 Codex-Dream-Skin 不同，本插件原生接入 DSH 的 `--dsw-*` token 主题系统，无需 CDP 注入、不改安装包。
