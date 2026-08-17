# 贡献指南 (Contributing Guide)

感谢你愿意为 **dsh-dream-skin** 贡献！请花一分钟读完下面的规则，能让协作更顺畅。

## 目录
- [开发环境](#开发环境)
- [提交 Issue](#提交-issue)
- [提 PR](#提-pr)
- [代码规范](#代码规范)
- [新增/修改主题](#新增修改主题)
- [发布](#发布)

## 开发环境

- Node.js `>=18`，pnpm（本机 pnpm `>=9`）。
- 本地有一份可运行的 DeepSeek Harness Web（`dsh web`），已按
  [README → 安装](./README.md#安装) 把插件接入 `web` profile。

建议用 `link:` 方式管理本地包：
```sh
dsh plugin --profile web add -w /path/to/dsh-dream-skin
```

## 提交 Issue

- **先搜**是否已有相同 Issue。
- 描述**复现步骤**、**期望行为**、**实际行为**、**DSH 版本**（`dsh --version`）、**浏览器**。
- 皮肤配色相关：附上截图 / 色值预期最好。

## 提 PR

1. Fork 本仓库，切一个功能分支（`feat/xxx` 或 `fix/xxx`）。
2. 小步提交，Commit message 用清晰的中/英文描述，遵循
   [Conventional Commits](https://www.conventionalcommits.org/) 更好。
3. 改动尽量局限在一个主题文件（如 `lib/client.js`）或只加文档。
4. 完成后提 PR，说明改动动机与验证方式。维护者会尽快 review。

## 代码规范

- `lib/client.js` 只允许 `require` **模块表实体**（平台种子 + 已注册客户端 bundle），不要引入其它 npm 包。
- 新增 UI 组件的样式用内联 `style` 对象（与现有 `styles` 保持一致），不引组件库 / Tailwind。
- 新增 `skin.<id>` 时，**所有语言词典都要成对**补上 `skin.<id>` 文案（zh / en / ja / ko / es / fr / de / ru）；
  新增 / 修改 UI 文案 key 时同样 8 种语言同步，`npm test` 会校验词典完整性。
- 用 `window.localStorage` 做持久化，键名前缀 `dsh-dream-skin:`。

## 新增 / 修改主题

在 `lib/client.js` 的 `SKINS` 数组加：

```js
{
  id: "my-skin",
  colorScheme: "dark",          // "light" | "dark"
  tokens: {
    "--dsw-alias-bg-base": "#…",
    // …… 参考现有皮肤补充
  }
},
```

然后在**全部 8 种语言词典**（`zh` / `en` / `ja` / `ko` / `es` / `fr` / `de` / `ru`）里补 `"skin.my-skin": "名称"`，
`npm test` 会校验所有词典 key 与占位符完整性。

## 发布

发新版本时：
1. 更新 `CHANGELOG.md`；
2. `npm version <major|minor|patch>`（只更新 `package.json` 版本并打 git tag；README 的版本徽章是
   shields.io 动态徽章，发布后自动显示新版本，无需手动同步）；
3. 用官方源发布：`npm publish --registry https://registry.npmjs.org`。

详见 [docs/publishing-to-npm.md](./docs/publishing-to-npm.md)。

## 自带技能

仓库自带的 `.agents/skills/dsh-skin-install/` 是给 DSH agent 用的安装/切换技能（dsh 在仓库目录内运行时自动
发现）。改动它时保持 frontmatter 的 `name`/`description` 与流程步骤同步，勿在技能里写死版本号（以现场读取为准）。
