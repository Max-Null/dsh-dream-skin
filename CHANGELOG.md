# Changelog

记录 `dsh-dream-skin` 的可观变更。格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，版本遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [0.1.0] - 2025-08-14

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
