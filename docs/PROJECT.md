# dsh-dream-skin — 项目说明 (PROJECT.md)

## 背景

GitHub 上 [Fei-Away/Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin) 非常火：它用本机回环 CDP
向 Codex 桌面客户端注入 CSS，为开发者提供「换肤 / 换背景」的玩法。

**deepseek-harness (dsh)** 的用户也有同样的诉求。好消息是 dsh 本身就是一个 token 驱动的 Web GUI，官方在
`packages/client/ui-theme` 里提供了**第三方插件注册主题**的一等能力。所以本项目的路线是**做原生接入**，
而不是复制 Codex 的 CDP 注入方案：

- 不需要修改任何官方二进制 / 安装包。
- 不会因为客户端更新而失效。
- 皮肤选择、壁纸、透明度/模糊全部由 token + 浏览器侧状态完成。

## 目标

把「换肤 + 自定义壁纸」作为一套**独立开源、可分发（npm）的 dsh 插件**发布出去，让 DSH 用户一条命令装完就能换皮肤。

## 能力范围（第一版）

- 8 套主题预设（Mirage 幻梦），浅/深色兼顾，品牌锚点用 DeepSeek 蓝。
- 自选背景壁纸，含透明度和模糊调节。
- `localStorage` 持久化。
- 在 `Settings → General` 里出现「皮肤 / 背景图片」两行。

> Codex-Dream-Skin 的「桌面托盘 / 主题库在线一键换肤 / 一键恢复」依赖桌面端 CDP 与原生托盘，DSH 是浏览器
> Web GUI，不在第一版范围。

## 技术要点

- 插件 = **双面插件**：host 半边插入 loader 入口；浏览器半边为 `dsh.client` bundle。
- 主题注册：`ctx.theme.register({ id, colorScheme, tokens })`，token 为**标量字符串**（每个色系一份）。
- 壁纸叠加：`ctx.theme.overrideTokens(source, { '--token': { light, dark } })`，注意 override 层要求
  **`{ light, dark }` 成对字符串**（与注册主题的标量 token 不同）。
- 设置插槽：`ctx.slots.inject('settings.general.item', () => ctx.slots.register({...}, Component))`。
- 持久化边界：浏览器只能用 `localStorage`（Host settings 白名单未对第三方浏览器客户端开放）。

## 目录结构

```
dsh-dream-skin/
├─ package.json            # dsh.bundle + dsh.client 清单、exports
├─ cordis.patch.yml        # 插入 dream-skin loader 入口
├─ lib/
│  ├─ index.js             # host 半边（no-op apply）
│  ├─ client.js            # 浏览器半边（__ModuleLoader__ bundle）
│  └─ types/               # 类型声明（辅助，非运行时）
├─ docs/
│  ├─ PROJECT.md           # 本文（项目说明）
│  └─ publishing-to-npm.md # npm / GitHub 发布指引
├─ .github/                # Issue / PR 模板
├─ README.md / README.en.md
├─ CONTRIBUTING.md         # 贡献指南
├─ CODE_OF_CONDUCT.md      # 行为准则
├─ SECURITY.md             # 安全策略
├─ CHANGELOG.md
└─ LICENSE (MIT)
```

## 快速搭建 / 验证

```sh
# 1. 装入本地 web profile 并重启
dsh plugin --profile web add -w /path/to/dsh-dream-skin
dsh web

# 2. 无头验证 loader 是否进树
dsh --profile web --dump-config   # 应出现 `- id: dream-skin / name: dsh-dream-skin`

# 3. 语法自检
node --check lib/client.js && node --check lib/index.js
```

## 社区规范

- 想改代码：见 [CONTRIBUTING.md](../CONTRIBUTING.md)。
- 报安全漏洞：见 [SECURITY.md](../SECURITY.md)。
- 提交 Issue / PR 模板在 [`.github/`](../.github/)。

## 安全 / 版权说明

- 不直接修改 DSH 官方安装包或任何 `@deepseek-ai/*` 包的产物；本仓库仅依赖接口声明。
- 库内不包含任何需授权的图像素材；用户上传的背景仅保存在自己浏览器里。
- 如拟使用他人图像 / 主题，需自行确认授权。
