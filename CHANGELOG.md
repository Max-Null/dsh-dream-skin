# Changelog

记录 `dsh-dream-skin` 的可观变更。格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，版本遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [0.3.0] - 2026-08-17

### 新增
- **多语言（i18n）**：设置 UI 词典新增 **日本語 / 한국어 / Español / Français / Deutsch / Русский** 六种语言
  （与既有中/英共 8 种），跟随浏览器语言自动生效；README 同步提供 8 种语言版本，顶部含语言切换导航。
  新增测试强制所有语言词典 key 与占位符完整性。
- **自带安装技能**：`.agents/skills/dsh-skin-install/`（SKILL.md）——dsh 在仓库目录内运行时自动发现，
  用户说「安装一下这个皮肤包」即可由 agent 完成定位、确认、安装与验证全流程（借鉴 dsh-deep-whale 的
  `dsh-skin-install` 模式）。
- **README 全面重构**：顶部新增「⚡ 一句话安装」区块（复制一句话给 DSH 或一条 CLI 命令即可安装）；
  安装章节扩展为 **npm / GitHub 固定 commit / Release tarball / 本地克隆** 四种方式，附验证命令。
- **皮肤市场收录**：dsh-skin-market 的 `registry/skins/RevolutionLA__dsh-dream-skin.yml` 条目已更新到
  0.3.0（固定 commit 安装目标 + 新描述），收录 PR 见 dsh-skin-market #2。

### 文档
- README 多语言：`README.ja.md` / `README.ko.md` / `README.es.md` / `README.fr.md` / `README.de.md` /
  `README.ru.md`（社区翻译）。
- README / README.en 同步修正过时的插槽名：`settings.general.item` → `settings.section` +
  `settings.dreamSkin.item`（与 0.2.4 独立「外观 / Theme」分节的实现一致）。
- CONTRIBUTING.md：修正「`npm version` 会自动同步 README 徽章」的错误说法（徽章是动态的，无需同步）；
  新增「自带技能」章节说明维护规范。

## [0.2.6] - 2026-08-17

### 修复
- **高级壁纸 / 清除壁纸操作抛 `ReferenceError`（严重）**：`removeWallpaper` 与 `setWallpaperKind` 是模块级
  函数，却调用定义在 `apply()` 内部的 `syncWallpaper` 局部变量——每次点「应用链接 / 渐变」或「清除壁纸」
  都会抛错，设置页 store 不刷新、UI 停在旧状态。已将壁纸 store 的 bookkeeping（`syncWallpaper` 与其
  revision/绑定）提升到模块作用域，未绑定时安全空操作。
- **先设渐变/URL 后再选本地图片无效**：`setWallpaper` 现在会先把 kind 重置为 `image`，否则
  `wallpaperBackgroundCss()` 仍返回旧的渐变/URL，背景不变而预览显示新图。
- **本地图片不进入「最近使用」**：`setWallpaper` 现在会 `pushWallpaperHistory("image", …)`，与 URL/渐变一致。
- **URL 历史缩略图空白**：URL 项缩略图现在也包 `url("…")`（裸 URL 不是合法 CSS background 值）。
- **分享链接冲突覆盖 / 失败消费链接**：`tryImportFromHash` 对已存在于库中的包 id 不再静默覆盖注册
  （避免库显示旧 manifest 而运行时用新 tokens）；注册失败时保留 hash，下次加载可重试。
- **Accent 行的基准色不随换肤刷新**：`theme/change` 现在同步 accent store 的 `base`（品牌色），
  无自定义强调色时不再显示上一个皮肤的颜色。
- **`ctx.locale.bind` 无兜底**：`localeT` 现在在 locale 服务缺 `bind` 时回退为恒等翻译，alert 不再可能
  拖垮整个设置分节。
- **刷新后强调色 UI 不恢复**：`accentInjected` 首次同步写死 `revision: -1`，被 store 守卫
  （`revision <= d.revision`）永远拒绝，导致已保存的强调色在重载后不在设置页显示。改为与用户操作
  同款递增计数器，首次同步即可通过守卫。
- **分享链接重复导入**：`tryImportFromHash` 在 `importedPacks` 未查重，同一链接反复打开可能重复
  注册同一主题包；现在与 `importPack` 一致去重。
- **主题包卡片显示技术 id**：包库卡片改显示 `manifest.name`（包名），不再裸露 `dream-pack:` 前缀 id。
- **本地化补齐**：「移除」按钮与导入/移除提示（alert）从硬编码中/英文改为走 `t()` 词典，
  跟随当前界面语言（`ctx.locale.bind`）。

### 清理
- 删除无调用者的旧版 `applyWallpaper` / `shadeTokens` 与专属常量（合并后已由 `applyWallpaper2` /
  `shadeTokens2` 取代），消除死代码。
- `shadeTokens2` 移除已不再使用的 `sidebarAlpha` 参数（侧边栏透明度统一读 `readSidebarOpacity()`）。
- `syncAdvWallpaper` 的 revision 改为前置 `++`，与其它 store 风格一致。

### 文档
- README / README.en / PROJECT.md 与 `packs.empty` 文案同步：主题包库只展示**导入的包**，
  内置 8 套皮肤在「皮肤」行选择。

## [0.2.5] - 2026-08-15

### 🎉 里程碑
- **已被 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 收录**（PR #354 merged）。
- README 顶部新增 **"Awesome DSH Plugin"** 徽章。
- 插件会**自动出现在 dsh-market 的主题 Tab**（数据源 `awesome-dsh-plugin.com/plugins.json` 已含 `dsh-dream-skin`）。

## [0.2.4] - 2026-08-15

### 变更
- **设置里新增独立的「外观 / Theme」分节**：皮肤、强调色、背景图片、高级壁纸、主题包全部收进这一个分类，
  不再平铺在「常规」页面（更干净、更像一个完整「皮肤」入口）。
- **皮肤选中态优化**：选中的皮肤卡片用「品牌色光圈 + ✓ 徽标」唯一高亮，切换皮肤时即时跟随，
  不再残留白色高亮框；点击皮肤同步刷新 store（单调 revision）。
- **强调色显示优化**：当前强调色改为「小圆点 + hex 文本 + 「选色…」按钮」，取代原先难看的
  「圆角矩形套矩形」取色块；保留 12 个典型色块点选与「随机 / 恢复主题色」。

### 新增
- 新的壁纸示例（`wallpapers/`）与 README 实机截图（`docs/screenshots/`）。
- README 补充「安装 / 更新 / 卸载」新手指引与「支持本项目」号召。

## [0.2.3] - 2026-08-15

### 新增 / 改进
- **皮肤选中态更清晰**：选中的皮肤卡片现在带**右上角 ✓ 徽标** + 稳定的中性选中背景（不再依赖可能发白的 `interactive-bg-hover`），切换皮肤时选中框/✓ **立即跟随**（`setSkin` 直接同步 store + 重着色，不依赖事件时序）。
- **强调色提供 12 个典型色块预设**：点击即选（蓝色系/绿色/青色/紫/橙/红/黄/粉等），同时保留选色盘与「随机」。选中色块有描边高亮。
- **壁纸「最近使用」历史**：最近最多 5 张壁纸（本地图 / URL / 渐变）以缩略图展示，点击即可换回。

### 说明
- 若你在**旧版崩溃（递归栈溢出）后的同一浏览器会话**里看不到皮肤/强调色生效，请**完整重启 `dsh web` 并 Ctrl+Shift+R 强刷**——DSH 会把崩溃过的设置项标记为「待重载」，重启后即恢复正常。

## [0.2.2] - 2026-08-15### 修复
- **强调色的「随机 / 恢复主题色」无响应**：`accentInjected` 每次 `sync` 传固定 `revision=0`，而 store 的 revision 防抖
  （`revision <= d.revision`）会在第一次更新后（`d.revision=0`）拒绝后续更新 → 点第二次之后没反应。改为维护递增的
  `accentRevision`。
- **高级壁纸的渐变预设小框显示灰色**：渐变按钮只设置了 `presetswatches`（尺寸/边框）而**没有背景**，导致按钮显示
  默认灰/白。改为 `background: g`（直接使用渐变值）。
- **皮肤设置标题去掉括号系列名**：`皮肤（Mirage 幻梦）` → `皮肤`（中英同步），避免观感怪异。
- 说明：皮肤/强调色等设置在**旧版崩溃（递归栈溢出）后的 session** 里会被 DSH 标记为「崩溃剔除」（abdicated）导致
  点选无响应/选择框不移动；0.2.1 已修复递归，**升级后请完整重启 DSH 并强刷**，使被剔除的入口重新加载。

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
