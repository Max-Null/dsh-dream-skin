<p align="center">
  <a href="./README.md">中文</a> · <a href="./README.en.md">English</a> · <strong>日本語</strong> · <a href="./README.ko.md">한국어</a> · <a href="./README.es.md">Español</a> · <a href="./README.fr.md">Français</a> · <a href="./README.de.md">Deutsch</a> · <a href="./README.ru.md">Русский</a>
</p>

<div align="center">

# dsh-dream-skin 🔮

**DeepSeek Harness に、克制され澄んで質感のある「顔」を。**

ネイティブなスキン · 壁紙 · 共有可能なテーマパック — DSH 公式の `--dsw-*` トークンシステムだけで構築した、エレガントな実装。

> **要約：コードを書く場所は、静かでいい。**

| 🎨 オリジナルテーマ 8種 | 🖼️ 壁紙 + 拡散光 | 🎯 克制されたアクセント | 📦 共有可能なテーマパック |
|---|---|---|---|

> 1行インストール · 完全ネイティブ（注入なし・インストーラへのパッチなし）· DSH のアップデート後もそのまま動作

✨ **Design Philosophy — [「高級とは何か」についてのデザイン宣言](./docs/design-philosophy.md)** · iOS / Linear の美学を基準に、高級感を素材の正確さと克制された配色に置く。

[中文](./README.md) · [変更履歴](./CHANGELOG.md) · [プロジェクトメモ](./docs/PROJECT.md) · [Design Philosophy](./docs/design-philosophy.md) · [公開ガイド](./docs/publishing-to-npm.md)

![npm version](https://img.shields.io/npm/v/dsh-dream-skin?color=4f83f2&label=npm)
![license](https://img.shields.io/github/license/RevolutionLA/dsh-dream-skin?color=34d399)
[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
![node](https://img.shields.io/badge/node-%3E%3D18-6d9af6)
![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-blueviolet)
![plugin type](https://img.shields.io/badge/plugin-dual--face%20(dsh.bundle%2Bdsh.client)-4f83f2)
![ci](https://img.shields.io/github/actions/workflow/status/RevolutionLA/dsh-dream-skin/ci.yml?branch=main&label=CI&color=34d399)
![code size](https://img.shields.io/github/languages/code-size/RevolutionLA/dsh-dream-skin?color=orange)

</div>

## ⚡ 1行インストール

**この一文を DSH に貼り付けるだけで、あとはすべて自動でインストールされます：**

> dsh-dream-skin スキンプラグイン（https://github.com/RevolutionLA/dsh-dream-skin、または npm パッケージ `dsh-dream-skin`）をインストールして、DSH Web の再起動方法を教えてください。

CLI がお好みなら、コマンド1つで：

```sh
dsh plugin --profile web add dsh-dream-skin && dsh web
```

> 🚀 **npm でも公開中！** DSH をインストール済みなら、clone 不要でコマンド1つで追加できます。

> **オマージュ：[Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin)。** ただし実装の道筋は異なります。
> Codex は CDP 経由でデスクトップクライアントのレンダラーへ CSS を注入しますが、DSH は「サードパーティプラグインによる
> テーマ登録」を第一級で備えた **トークン駆動の Web GUI** です。したがって本プラグインは **完全ネイティブ** — 注入も
> バイナリへのパッチもなく、クライアントのアップデートで壊れることもありません。
>
> **公式製品ではありません。** ただ、DeepSeek Harness のワークスペースを彩るためのものです。

---

## 📸 スクリーンショット

> モックアップではなく実機のスクリーンショットです。左：スキンを適用した DSH。右：設定内の専用「テーマ / 外観」セクション。

<p align="center">
  <img src="docs/screenshots/preview.png" alt="DSH skin preview" width="46%"/>
  &nbsp;&nbsp;
  <img src="docs/screenshots/settings.png" alt="Theme section in settings" width="46%"/>
</p>

---

## 🏆 スターを付けるべき理由（比較）

| 機能 | 本プラグイン | 他の DSH スキン | Codex-Dream-Skin（デスクトップ） |
|------|:---:|:---:|:---:|
| ネイティブなトークンテーマ — 注入なし・インストーラへのパッチなし | ✅ | ✅ | ❌（CDP 注入） |
| カスタム壁紙 + 不透明度/ぼかし | ✅ | 一部 | ✅ |
| **テーマパックのインポート/エクスポート + 共有リンク** | ✅ | ❌ | ✅（zip パック） |
| **ユーザーごとのアクセント上書き** | ✅ | ❌ | 一部 |
| **壁紙 2.0（URL / グラデーション / スキンごとの提案 / 自動減光）** | ✅ | ❌ | ✅ |
| ローカルパックライブラリ + お気に入り + おまかせ切替 | ✅ | ❌ | 一部 |
| 検証 + ロールバック | ✅ | 一部 | ✅ |
| **ブラウザベースの Web GUI、クロスプラットフォームをネイティブ対応** | ✅ | ✅ | ❌（デスクトップアプリが必要） |

## ✨ 機能

| 機能 | 説明 |
|------------|-------------|
| 🎨 **内蔵プリセット 8種（Mirage）** | **設定 → テーマ / 外観** から、ライト & ダークを即座に切替 |
| 🖼️ **カスタム壁紙** | ローカル画像を選択（自動圧縮 ≤2MB）、**不透明度 / ぼかし** を調整 |
| 🔤 **不透明な内側サーフェス** | カード、入力欄、メッセージバブルは常に読みやすく — 色褪せしない |
| ↩️ **デフォルトに戻す** | DSH 標準の外観（システムに追従）へワンクリックで復元 |
| 💾 **ローカル永続化** | スキンと壁紙を `localStorage` に保存、リロード後も保持 |

## 🚀 高度な機能（P0）

既存の DSH スキンプロジェクトと Codex のスキン UX から着想を得た差別化機能：

| 機能 | 説明 |
|------------|-------------|
| 📦 **テーマパック形式 + インポート/エクスポート** | `*.dsh-theme.json` パック ＝ 形式マーカー + バージョン + マニフェスト（id/name/author/scheme/accent/tokens）。ファイルのインポート、ワンクリック適用、**共有リンク**（URL ハッシュにエンコード）のコピーに対応 |
| 🌈 **ユーザーごとのアクセント** | 現在のスキンの上にカスタムのブランドアクセントを重ねる（`overrideTokens` レイヤーで、スキン本体はそのまま）: **ワンクリックのプリセット色見本 12色**、カラーピッカー、**ランダム**、クリア |
| 🖼️ **壁紙 2.0** | ローカル画像 / **画像 URL** / **グラデーションプリセット**。**スキンごとの推奨グラデーション**と**自動減光**付き。**最近使ったもの**（最大5件）からワンクリックで戻せる |
| 🧩 **ローカルパックライブラリ** | インポートしたテーマパックを一箇所に集約。**適用 / お気に入り / 削除**をワンクリックで（内蔵 8スキンは Skins 行に並ぶ） |
| ✅ **明確な選択フィードバック** | スキン切替時にチェック/枠線のハイライトが**即座に**更新 — 古い白いハイライト枠が残らない |
| 🎲 **おまかせ切替** | 現在のテーマとは別のテーマへランダムに切替 |
| ⭐ **お気に入り** | お気に入りのスキンにスターを付けて、すばやく切替 |
| ✅ **検証 + ロールバック** | パックのインポート時に形式 / 必須トークン / 色の妥当性を検証。失敗や削除時は安全にフォールバック |

## ⚡ クイックスタート（3ステップ）

```sh
# 1. install
dsh plugin --profile web add dsh-dream-skin
# 2. restart
dsh web
# 3. open Settings → Theme / Appearance → pick a skin → done.
```

> 公開済みの npm パッケージをインストール — clone 不要。`dsh plugin add` がワークスペースエラーを報告する場合は `-w` を付けてください。

## 🧩 これはどんなプラグインか

**標準的なデュアルフェイス「すべてはプラグイン」`dsh-plugin` — 公式の `ui-theme` パッケージとまったく同じように読み込まれ、使われます。**

DeepSeek Harness のモットーは「*すべてはプラグイン*」: モデル、ツール、サンドボックス、セッション、UI、さらには Agent Loop そのものまでが
プラグインです。`dsh-dream-skin` は、公式 UI パッケージと **同型（isomorphic）** の npm パッケージとして
スキン機能を提供します：

```text
            ┌──────────── dsh-dream-skin (standard dsh-plugin / dual-face) ─────────────┐
            │  dsh.bundle   → cordis.patch.yml inserts the dream-skin entry  (host half)│
            │  dsh.client   → lib/client.js (browser bundle)                (browser half)│
            └───────────────────────────────────────────────────────────────────────────┘
```

- **インストールコマンドは公式と同一**: `dsh plugin --profile web add dsh-dream-skin`
- **公式の拡張ポイントを使用**: `ctx.theme`（テーマの登録）、`ctx.theme.overrideTokens`（オーバーライドレイヤー）、
  `ctx.slots`（専用の **設定 → テーマ / 外観** セクションへの UI マウント）。
- **マニフェストの契約は公式パッケージと一致**: `dsh.bundle` + `dsh.client` + `exports["./client"]`。

つまり、これは変わり種のスクリプトではなく、DSH の公式プラグインシステムの中で動作する
標準的なスキンプラグインなのです。

## 🖼️ プレビュー — Mirage シリーズ

> 以下のプレビューは各スキンの**実際のトークン**から生成されています — 見たものがそのまま手に入ります。

<table>
  <tr>
    <td align="center"><img src="docs/previews/abyss.svg" width="220" alt="abyss"/><br/><b>abyss</b></td>
    <td align="center"><img src="docs/previews/aurora.svg" width="220" alt="aurora"/><br/><b>aurora</b></td>
    <td align="center"><img src="docs/previews/nebula.svg" width="220" alt="nebula"/><br/><b>nebula</b></td>
    <td align="center"><img src="docs/previews/ember.svg" width="220" alt="ember"/><br/><b>ember</b></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/previews/midnight.svg" width="220" alt="midnight"/><br/><b>midnight</b></td>
    <td align="center"><img src="docs/previews/ivory.svg" width="220" alt="ivory"/><br/><b>ivory</b></td>
    <td align="center"><img src="docs/previews/mist.svg" width="220" alt="mist"/><br/><b>mist</b></td>
    <td align="center"><img src="docs/previews/rose.svg" width="220" alt="rose"/><br/><b>rose</b></td>
  </tr>
</table>

## 🎲 プリセット

| id | scheme | 雰囲気 |
|------|--------|------|
| `abyss` | 🕶️ dark | DeepSeek の深い青の深淵（アンカー） |
| `aurora` | 🌌 dark | オーロラのティールグリーン |
| `nebula` | 🪐 dark | 宇宙のパープル |
| `ember` | 🔥 dark | 温かい残り火のオレンジ |
| `midnight` | 🌚 dark | 純黒の OLED |
| `ivory` | 📜 light | 温かいアイボリー / 紙 |
| `mist` | 🌫️ light | 涼しげな青い霧 |
| `rose` | 🌸 light | ローズピンク / ほんのり赤み |

## 📦 インストール

次の4つのいずれかの方法でインストールし、その後 **DSH Web を再起動**してください（現在のセッションは中断されますが、DSH のセッションは
ディスクに保存され、再起動後に復元されます）。

### 方法 A: npm から（公開済み・**推奨**）

```sh
dsh plugin --profile web add dsh-dream-skin
```

### 方法 B: GitHub から（検証済みコミットに固定）

```sh
dsh plugin --profile web add 'github:RevolutionLA/dsh-dream-skin#<40-char-commit>'
```

> リリースのコミットに固定しておけば、`main` の新しい変更がインストール済みのコピーを静かに書き換えることはありません。

### 方法 C: Release の tarball から（オフライン / git 不要）

[Releases](https://github.com/RevolutionLA/dsh-dream-skin/releases) ページから `dsh-dream-skin-<version>.tgz` をダウンロードします（ビルド済みの `lib/client.js` が同梱されているため、インストール時に prepare スクリプトは実行されません）。
その後：

```sh
dsh plugin --profile web add ./dsh-dream-skin-<version>.tgz
```

### 方法 D: clone してローカルパスからインストール（開発用）

```sh
git clone https://github.com/RevolutionLA/dsh-dream-skin.git
cd dsh-dream-skin
dsh plugin --profile web add .
```

> `dsh plugin` は相対パスを**コマンドを実行したディレクトリ**に基準づけし、あなたの clone を指すリンク依存関係をインストールします: ソースを編集して保存し、
> DSH を再起動するだけ — 再インストールは不要です。

**再起動して確認:**

```sh
dsh web
dsh --profile web --dump-config | grep -A2 dream-skin   # a dream-skin loader entry should appear
```

**設定 → テーマ / 外観** を開くと、**Skins**（スキン）、**Accent**（アクセント）、**Wallpaper / Advanced Wallpaper**（壁紙 / 高度な壁紙）、**Theme Packs**（テーマパック）の各セクションが表示されます。

> フラグなしの `add` では `-w`（workspace）フラグが必要です。すべてのプロファイルには `pnpm-workspace.yaml` が同梱されており、pnpm はプロファイルディレクトリを
> ワークスペースのルートとみなすため、フラグなしの add は `ERR_PNPM_ADDING_TO_ROOT` で失敗します。プロファイルがすでに
> ワークスペースを使っている場合は、繰り返す必要はありません。

## 🔄 更新 / アンインストール

**最新版に更新**（npm リリースからインストールした場合）：

```sh
dsh plugin --profile web update dsh-dream-skin
dsh web   # restart to pick it up
```

> 更新したのに古いバージョンのまま？pnpm の minimum-release-age（サプライチェーン）ポリシーが、公開直後のリリースを保留することがあります。
> プロファイルディレクトリで
> `pnpm add dsh-dream-skin@latest --config.minimumReleaseAge=0` を実行すると強制できます。

**アンインストール:**

```sh
dsh plugin --profile web remove dsh-dream-skin
dsh web   # restores the official appearance
```

## 🧩 互換性

| 項目 | 値 |
|------|-------|
| DeepSeek Harness（`dsh`） | `0.1.0-rc.6`（peerDependencies は `^0.1.0-rc.6` に固定） |
| Node.js | `>=18` |
| ブラウザ | モダンな Chromium / WebKit（ネイティブの CSS 変数と `matchMedia`） |

> DSH をアップグレードする際は、`package.json` の peerDependencies も合わせて引き上げてください。

## ⚙️ 仕組み

DSH のテーマシステムはトークン方式です: Web シェルが `--dsw-*` デザイントークンを提供し、`ThemeRuntime` によってサードパーティプラグインが
エイリアスレイヤー（`--dsw-alias-*`）を上書きするテーマを登録できます。本パッケージは標準的なデュアルフェイスプラグインです：

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
   ctx.theme.register(8 skins)     ctx.theme.overrideTokens(wallpaper)   ctx.slots.inject('settings.section' + 'settings.dreamSkin.item')
```

- **ホスト側**（`lib/index.js`）— `dsh.bundle` のパッチレイヤーで `dream-skin` ローダーエントリを挿入。`apply` は
  公式の `ui-*` パッケージと同様に no-op です。
- **ブラウザ側**（`lib/client.js`）:
  1. `ctx.theme.register(...)` で 8つのスキンを登録;
  2. 保存済みのスキンを復元し、`ctx.theme.setTheme(...)` で適用;
  3. 壁紙を `z-index:-1` の固定バックドロップとして描画し、`ctx.theme.overrideTokens(...)` を重ねて
     メインキャンバス（`--dsw-alias-bg-base`）とサイドバー（`--dsw-specific-sidebar-fill`）を半透明に;
  4. `theme/change` を監視し、スキン / スキームの切替時に壁紙の色合いを塗り直す;
  5. 専用の **設定 → テーマ / 外観** セクション（`settings.section`）を登録し、5つの機能行を
     `settings.dreamSkin.item` スロットにマウント。

各スキンは `colorScheme`（`light`/`dark`）を持ち、`body[data-ds-dark-theme]` を駆動します。エイリアストークンのオーバーライドは、
ui-layout の ThemePresenter によって `<body>` へのインラインカスタムプロパティとして適用されます。

## 💼 永続化のメモ

- スキンと壁紙は `localStorage`（キーは `dsh-dream-skin:` プレフィックス）に保存され、**ブラウザごと**に保持されます。
- なぜ Host 設定にしないのか？Host 設定の配線は、ブラウザクライアントに対して許可リスト方式の名前空間セットしか公開しません
  （`dsh-host-apiproxy` の `WEB_SETTINGS_NAMESPACES`）。そのため、サードパーティの名前空間は `settings-not-exposed` と応答されます。
  製品側もリモートブラウザのプリファレンスをプロセスローカルに保持しています。`localStorage` はその境界に合致し、
  リロード後も保持されます。

## 🛠️ 開発 / テーマの拡張

クライアントバンドルは `__ModuleLoader__` 形式で直接記述されています（公式の `ui-*` パッケージに対して tsdown が出力するものと同じ形）ので、
**ビルドステップは不要** です。`lib/client.js` が `require` できるのはモジュールテーブルのエンティティのみ: プラットフォームシード
（`react`、`react/jsx-runtime`、…）と登録済みのクライアントバンドル（`@deepseek-ai/dsh-client-runtime/client`、…）です。

- **内蔵スキンを追加する**: `lib/client.js` の `SKINS` 配列にオブジェクト（`id` + `colorScheme` + `tokens`）を追加するだけ。
  Settings には自動的に表示されます。**全 8 言語の辞書**（`zh`/`en`/`ja`/`ko`/`es`/`fr`/`de`/`ru`）に `skin.<id>` キーを追加してください。
- **テーマパックを配布する（推奨）**: [`docs/examples/sample-theme-pack.json`](./docs/examples/sample-theme-pack.json) に従って —
  `*.dsh-theme.json` を1つ用意すれば Settings からインポートでき、リンクで共有も可能。コードの変更は不要です。
- **自分で壁紙を追加する**: [`wallpapers/`](./wallpapers/) に画像を配置し（配布権のあるものだけを）、
  DSH の「Wallpaper」行からインポートします。
- **検証する**: `npm test`（ファクトリの評価、`apply()`、パックのインポート/永続化をカバーする VM スモークテスト）。
- **塗り直す**: `--dsw-alias-*` トークンを参照（完全な仕様は [`docs/themes-spec.md`](./docs/themes-spec.md)）。

## 📌 ロードマップ

- [x] v0.1: 8テーマ + カスタム壁紙（不透明度 / ぼかし）+ ローカル永続化
- [x] テーマパック形式 + インポート / エクスポート / 共有リンク（JSON + マニフェスト + 検証）
- [x] ユーザーごとのアクセント + ランダム
- [x] 壁紙 2.0（URL / グラデーション / スキンごとの提案 / 自動減光）
- [x] ローカルパックライブラリ + ワンクリック適用 / お気に入り / おまかせ切替
- [x] i18n の完全対応：翻訳文とドキュメント（zh / en / ja / ko / es / fr / de / ru）
- [ ] オンラインのパレット / テーマプレビュー Studio（フロントエンドのみ、コントラストチェッカー付き）
- [ ] コミュニティテーマギャラリー（リポジトリ / オンラインギャラリーへのパック投稿）
- [ ] 初回描画（FOUC）の改善

## 🤝 コントリビューション

Issue や PR を歓迎します！[コントリビューションガイド](./CONTRIBUTING.md) をお読みの上、
[行動規範](./CODE_OF_CONDUCT.md) に従ってください。

## ⭐ プロジェクトを支援する

気に入っていただけたら: リポジトリにスター **⭐**、npm でいいね **👍**、または DSH 仲間にシェアしてください — プロジェクトの
認知度が高まり、メンテナンスが続きます。テーマ / オンライン Studio / 追加スキンのコントリビューションに興味があれば、ぜひ参加してください。

## 🔒 セキュリティ

セキュリティ上の問題を発見しましたか？公開の Issue は開かず、[セキュリティポリシー](./SECURITY.md) を確認してください。

## 📄 ライセンス

[MIT](./LICENSE)

## 🙏 謝辞

- アーキテクチャ & API の参考: 公式 DeepSeek Harness の
  [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme) クライアントパッケージ。
- コンセプトのオマージュ: [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin)。
