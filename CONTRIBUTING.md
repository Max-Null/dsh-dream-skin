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
- 新增 `skin.<id>` 时，**中英文文案要成对**写在 `zh` / `en` 词典里。
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

然后补 `zh` / `en` 里的 `"skin.my-skin": "名称"`。

## 发布

发新版本时：
1. 更新 `CHANGELOG.md`；
2. `npm version <major|minor|patch>`（会自动同步 README 徽章版本视角）；
3. 用官方源发布：`npm publish --registry https://registry.npmjs.org`。

详见 [docs/publishing-to-npm.md](./docs/publishing-to-npm.md)。
