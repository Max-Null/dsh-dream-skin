<p align="center">
  <a href="./README.md">中文</a> · <a href="./README.en.md">English</a> · <a href="./README.ja.md">日本語</a> · <strong>한국어</strong> · <a href="./README.es.md">Español</a> · <a href="./README.fr.md">Français</a> · <a href="./README.de.md">Deutsch</a> · <a href="./README.ru.md">Русский</a>
</p>

<div align="center">

# dsh-dream-skin 🔮

**DeepSeek Harness에 절제되고 맑으며 질감 있는 '얼굴'을 선물하세요.**

네이티브 스키닝 · 월페이퍼 · 공유 가능한 테마 팩 — 전적으로 DSH 공식 `--dsw-*` 토큰 시스템 위에 만들어진, 우아한 구현입니다.

> **TL;DR: 코드를 쓰는 곳은 조용해도 좋다.**

| 🎨 오리지널 테마 8종 | 🖼️ 월페이퍼 + 확산광 | 🎯 절제된 엑센트 | 📦 공유 가능한 테마 팩 |
|---|---|---|---|

> 1줄 설치 · 순수 네이티브 (주입 없음, 설치 프로그램 패치 없음) · DSH 업데이트에도 안전

✨ **Design Philosophy — ["고급"이란 무엇인가에 대한 디자인 선언](./docs/design-philosophy.md)** · iOS / Linear 미학을 기준으로, 고급감을 소재의 정확성과 절제된 배색에 둡니다.

[中文](./README.md) · [변경 내역](./CHANGELOG.md) · [프로젝트 노트](./docs/PROJECT.md) · [Design Philosophy](./docs/design-philosophy.md) · [배포 가이드](./docs/publishing-to-npm.md)

![npm version](https://img.shields.io/npm/v/dsh-dream-skin?color=4f83f2&label=npm)
![license](https://img.shields.io/github/license/RevolutionLA/dsh-dream-skin?color=34d399)
[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
![node](https://img.shields.io/badge/node-%3E%3D18-6d9af6)
![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-blueviolet)
![plugin type](https://img.shields.io/badge/plugin-dual--face%20(dsh.bundle%2Bdsh.client)-4f83f2)
![ci](https://img.shields.io/github/actions/workflow/status/RevolutionLA/dsh-dream-skin/ci.yml?branch=main&label=CI&color=34d399)
![code size](https://img.shields.io/github/languages/code-size/RevolutionLA/dsh-dream-skin?color=orange)

</div>

## ⚡ 1줄 설치

**이 문장을 DSH에 붙여넣으면 모든 것이 자동으로 설치됩니다:**

> dsh-dream-skin 스킨 플러그인을 설치해 주세요 (https://github.com/RevolutionLA/dsh-dream-skin 또는 npm 패키지 `dsh-dream-skin`), 그리고 DSH Web을 재시작하는 방법을 알려주세요.

CLI가 더 편하신가요? 명령어 하나면 됩니다:

```sh
dsh plugin --profile web add dsh-dream-skin && dsh web
```

> 🚀 **이제 npm에서 제공됩니다!** DSH가 설치되어 있다면 클론 없이 명령어 하나로 추가하세요.

> [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin)에 대한 오마주입니다. 다만 접근 방식은 다릅니다:
> Codex는 CDP를 통해 데스크톱 클라이언트의 렌더러에 CSS를 주입하지만, DSH는 **토큰 기반 Web GUI**로서
> "서드파티 플러그인이 테마를 등록하는" 일급 기능을 제공합니다. 그래서 이 플러그인은 **순수 네이티브**입니다 — 주입도, 바이너리
> 패치도 없으며 클라이언트 업데이트에도 안전합니다.
>
> **공식 제품이 아닙니다.** DeepSeek Harness 작업 공간을 꾸미는 하나의 방법일 뿐입니다.

---

## 📸 스크린샷

> 목업이 아닌 실제 스크린샷입니다. 왼쪽: 스킨 적용 후의 DSH; 오른쪽: 설정(Settings)의 전용 **테마 / 모양(Theme / Appearance)** 섹션.

<p align="center">
  <img src="docs/screenshots/preview.png" alt="DSH skin preview" width="46%"/>
  &nbsp;&nbsp;
  <img src="docs/screenshots/settings.png" alt="Theme section in settings" width="46%"/>
</p>

---

## 🏆 대안들과 비교해 별을 받을 만한 이유

| 기능 | 우리 | 기타 DSH 스킨 | Codex-Dream-Skin (데스크톱) |
|------|:---:|:---:|:---:|
| 네이티브 토큰 테마 — 주입 없음, 설치 프로그램 패치 없음 | ✅ | ✅ | ❌ (CDP 주입) |
| 커스텀 월페이퍼 + 투명도/블러 | ✅ | 부분 지원 | ✅ |
| **테마 팩 가져오기/내보내기 + 공유 링크** | ✅ | ❌ | ✅ (zip 팩) |
| **사용자별 엑센트(Accent) 오버라이드** | ✅ | ❌ | 부분 지원 |
| **월페이퍼 2.0 (URL / 그라데이션 / 스킨별 추천 / 자동 어둡게)** | ✅ | ❌ | ✅ |
| 로컬 팩 라이브러리 + 즐겨찾기 + surprise-me | ✅ | ❌ | 부분 지원 |
| 검증 + 롤백 | ✅ | 부분 지원 | ✅ |
| **브라우저 Web GUI, 크로스 플랫폼 네이티브** | ✅ | ✅ | ❌ (데스크톱 앱 필요) |

## ✨ 주요 기능

| 기능 | 설명 |
|------------|-------------|
| 🎨 **번들 프리셋 8종 (Mirage)** | **설정(Settings) → 테마 / 모양(Theme / Appearance)**에서 라이트 & 다크를 즉시 전환 |
| 🖼️ **커스텀 월페이퍼** | 로컬 이미지를 선택하고(자동 압축 ≤2MB), **투명도 / 블러**를 조절 |
| 🔤 **불투명 내부 표면** | 카드, 입력창, 메시지 버블이 항상 또렷하게 읽힘 — 색이 빠지지 않음 |
| ↩️ **기본값 복원** | 원클릭으로 DSH 기본 모양(시스템 설정 따름)으로 복귀 |
| 💾 **로컬 영속화** | 스킨과 월페이퍼를 `localStorage`에 저장, 새로고침에도 유지 |

## 🚀 고급 기능 (P0)

기존 DSH 스킨 프로젝트와 Codex의 스킨 UX에서 영감을 얻은 차별화 포인트:

| 기능 | 설명 |
|------------|-------------|
| 📦 **테마 팩 형식 + 가져오기/내보내기** | `*.dsh-theme.json` 팩 = 형식 마커 + 버전 + 매니페스트(id/name/author/scheme/accent/tokens). 파일을 가져와 원클릭 적용하고 **공유 링크**(URL 해시에 인코딩)를 복사 |
| 🌈 **사용자별 엑센트(Accent)** | 활성 스킨 위에 커스텀 브랜드 엑센트를 얹습니다(`overrideTokens` 레이어, 스킨은 그대로): **원클릭 프리셋 스와치 12종**, 컬러 피커, **랜덤**, 초기화 |
| 🖼️ **월페이퍼 2.0** | 로컬 이미지 / **이미지 URL** / **그라데이션 프리셋**, **스킨별 추천 그라데이션**과 **자동 어둡게(auto-dim)**; **최근 사용**(최대 5개)으로 원클릭 복귀 |
| 🧩 **로컬 팩 라이브러리** | 가져온 테마 팩을 한곳에서 관리; 원클릭 **적용 / 즐겨찾기 / 삭제** (기본 내장 스킨 8종은 Skins 행에 표시) |
| ✅ **명확한 선택 피드백** | 스킨 전환 시 체크/테두리 하이라이트가 **즉시** 갱신 — 낡은 흰색 하이라이트 박스 없음 |
| 🎲 **Surprise me** | 현재와 다른 테마로 무작위 전환 |
| ⭐ **즐겨찾기** | 마음에 드는 스킨에 별표를 달고 빠르게 전환 |
| ✅ **검증 + 롤백** | 팩 가져오기 시 형식 / 필수 토큰 / 색상 유효성을 검증; 실패하거나 삭제해도 안전하게 기본값으로 복귀 |

## ⚡ 빠른 시작 (3단계)

```sh
# 1. install
dsh plugin --profile web add dsh-dream-skin
# 2. restart
dsh web
# 3. open Settings → Theme / Appearance → pick a skin → done.
```

> 게시된 npm 패키지를 설치합니다 — 클론 불필요. `dsh plugin add`가 워크스페이스 오류를 보고하면 `-w`를 붙이세요.

## 🧩 어떤 종류의 플러그인인가요

**표준 듀얼 페이스 "everything-is-a-plugin" `dsh-plugin`입니다 — 공식 `ui-theme` 패키지와 똑같이 로드되고 사용됩니다.**

DeepSeek Harness의 모토는 *everything is a plugin*입니다: 모델, 도구, 샌드박스, 세션, UI, 심지어 Agent Loop
자체도 플러그인입니다. `dsh-dream-skin`은 스키닝을 **공식 UI 패키지와 동형(isomorphic)**인 npm 패키지로
제공합니다:

```text
            ┌──────────── dsh-dream-skin (standard dsh-plugin / dual-face) ─────────────┐
            │  dsh.bundle   → cordis.patch.yml inserts the dream-skin entry  (host half)│
            │  dsh.client   → lib/client.js (browser bundle)                (browser half)│
            └───────────────────────────────────────────────────────────────────────────┘
```

- **설치 명령 = 공식 명령**: `dsh plugin --profile web add dsh-dream-skin`
- **공식 확장 포인트 사용**: `ctx.theme` (테마 등록), `ctx.theme.overrideTokens` (오버라이드 레이어),
  `ctx.slots` (전용 **설정(Settings) → 테마 / 모양(Theme / Appearance)** 섹션에 UI 마운트).
- **매니페스트 계약이 공식 패키지와 일치**: `dsh.bundle` + `dsh.client` + `exports["./client"]`.

다시 말해, 변두리 스크립트를 설치하는 것이 아닙니다 — DSH 공식 플러그인 시스템 안의 표준 스킨 플러그인입니다.

## 🖼️ 미리보기 — Mirage 시리즈

> 아래 미리보기는 각 스킨의 **실제 토큰**으로 생성되었습니다 — 보이는 그대로입니다.

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

## 🎲 프리셋

| id | scheme | 분위기 |
|------|--------|------|
| `abyss` | 🕶️ dark | DeepSeek 딥블루 심연 (앵커) |
| `aurora` | 🌌 dark | 오로라 틸-그린 |
| `nebula` | 🪐 dark | 코스믹 퍼플 |
| `ember` | 🔥 dark | 따뜻한 잔불 오렌지 |
| `midnight` | 🌚 dark | 순수 블랙 OLED |
| `ivory` | 📜 light | 따뜻한 아이보리 / 종이 |
| `mist` | 🌫️ light | 차가운 블루 포그 |
| `rose` | 🌸 light | 로즈 핑크 / 블러셔 |

## 📦 설치

네 가지 옵션 중 하나를 선택한 뒤 **DSH Web을 재시작**하세요 (현재 세션은 중단되지만, DSH 세션은 디스크에
저장되어 재시작 후 복구됩니다).

### 옵션 A: npm에서 설치 (게시 버전, **권장**)

```sh
dsh plugin --profile web add dsh-dream-skin
```

### 옵션 B: GitHub에서 설치 (검증된 커밋에 고정)

```sh
dsh plugin --profile web add 'github:RevolutionLA/dsh-dream-skin#<40-char-commit>'
```

> 릴리스 커밋에 고정하면 `main`의 새 변경 사항이 설치된 복사본을 조용히 바꿔치기하지 않습니다.

### 옵션 C: 릴리스 tarball에서 설치 (오프라인 / git 없음)

`dsh-dream-skin-<version>.tgz`를 [Releases](https://github.com/RevolutionLA/dsh-dream-skin/releases)
페이지에서 다운로드하세요 (빌드된 `lib/client.js`가 포함되어 있어 설치 시 prepare 스크립트가 실행되지 않습니다), 그런 다음:

```sh
dsh plugin --profile web add ./dsh-dream-skin-<version>.tgz
```

### 옵션 D: 클론 후 로컬 경로에서 설치 (개발용)

```sh
git clone https://github.com/RevolutionLA/dsh-dream-skin.git
cd dsh-dream-skin
dsh plugin --profile web add .
```

> `dsh plugin`은 상대 경로를 **명령을 실행한 디렉터리** 기준으로 해석하며, 클론을 가리키는 링크 의존성을
> 설치합니다: 소스를 수정하고 저장한 뒤 DSH를 재시작하면 됩니다 — 재설치 불필요.

**재시작 및 확인:**

```sh
dsh web
dsh --profile web --dump-config | grep -A2 dream-skin   # a dream-skin loader entry should appear
```

**설정(Settings) → 테마 / 모양(Theme / Appearance)**을 열면 **Skins**, **Accent**, **Wallpaper** / **고급 월페이퍼(Advanced Wallpaper)**, **Theme Packs** 행이 보입니다.

> 단순 `add`에는 `-w` (워크스페이스) 플래그가 필요합니다. 모든 프로필에 `pnpm-workspace.yaml`이 포함되어 있어
> pnpm이 프로필 디렉터리를 워크스페이스 루트로 취급하므로, 플래그 없이 추가하면 `ERR_PNPM_ADDING_TO_ROOT` 오류가 납니다.
> 프로필이 이미 워크스페이스를 사용한다면 다시 붙일 필요가 없습니다.

## 🔄 업데이트 / 제거

**최신 버전으로 업데이트** (npm 릴리스에서 설치한 경우):

```sh
dsh plugin --profile web update dsh-dream-skin
dsh web   # restart to pick it up
```

> 업데이트 후에도 이전 버전에 머물러 있나요? pnpm의 minimum-release-age (공급망) 정책이 갓 게시된 릴리스를
> 보류할 수 있습니다. 프로필 디렉터리에서 다음을 실행하세요:
> `pnpm add dsh-dream-skin@latest --config.minimumReleaseAge=0` 강제 적용됩니다.

**제거:**

```sh
dsh plugin --profile web remove dsh-dream-skin
dsh web   # restores the official appearance
```

## 🧩 호환성

| 항목 | 값 |
|------|-------|
| DeepSeek Harness (`dsh`) | `0.1.0-rc.6` (peerDependencies가 `^0.1.0-rc.6`으로 고정) |
| Node.js | `>=18` |
| 브라우저 | 최신 Chromium / WebKit (네이티브 CSS 변수 & `matchMedia`) |

> DSH를 업그레이드할 때는 `package.json`의 peerDependencies도 함께 올려주세요.

## ⚙️ 동작 원리

DSH의 테마 시스템은 토큰 기반입니다: 웹 셸이 `--dsw-*` 디자인 토큰을 제공하고, `ThemeRuntime`은 서드파티
플러그인이 별칭 레이어(`--dsw-alias-*`)를 오버라이드하는 테마를 등록할 수 있게 합니다. 이 패키지는 표준 듀얼 페이스 플러그인입니다:

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

- **호스트 절반** (`lib/index.js`) — `dream-skin` 로더 엔트리를 삽입하는 `dsh.bundle` 패치 레이어; `apply`는
  기본 제공되는 `ui-*` 패키지와 똑같이 no-op입니다.
- **브라우저 절반** (`lib/client.js`):
  1. `ctx.theme.register(...)`로 스킨 8종을 등록;
  2. 저장된 스킨을 복원하고 `ctx.theme.setTheme(...)`로 적용;
  3. 월페이퍼를 `z-index:-1` 고정 배경으로 렌더링하고 `ctx.theme.overrideTokens(...)`를 쌓아
     메인 캔버스(`--dsw-alias-bg-base`)와 사이드바(`--dsw-specific-sidebar-fill`)를 반투명하게 처리;
  4. `theme/change` 이벤트를 수신해 스킨 / scheme 전환 시 월페이퍼 워시 색상을 다시 조정;
  5. 전용 **설정(Settings) → 테마 / 모양(Theme / Appearance)** 섹션(`settings.section`)을 등록하고 다섯 개
     기능 행을 `settings.dreamSkin.item` 슬롯에 마운트.

각 스킨은 자체 `colorScheme`(`light`/`dark`)을 가지며 `body[data-ds-dark-theme]`를 구동합니다; 별칭 토큰 오버라이드는
ui-layout의 ThemePresenter가 `<body>`에 인라인 커스텀 프로퍼티로 적용합니다.

## 💼 영속성 관련 참고

- 스킨과 월페이퍼는 `localStorage`에 저장됩니다 (키 접두어 `dsh-dream-skin:`), **브라우저별로**.
- 왜 Host 설정을 안 쓰나요? Host 설정 와이어는 브라우저 클라이언트에 허용 목록(allowlist)에 등록된 네임스페이스만 노출합니다
  (`dsh-host-apiproxy`의 `WEB_SETTINGS_NAMESPACES`), 그래서 서드파티 네임스페이스는 `settings-not-exposed`를 응답하게 됩니다;
  제품 자체도 원격 브라우저 기본 설정을 프로세스 로컬로 유지합니다. `localStorage`는 그 경계와 일치하면서
  새로고침에도 유지됩니다.

## 🛠️ 개발 / 테마 확장

클라이언트 번들은 `__ModuleLoader__` 형식으로 직접 작성되어 있습니다 (기본 제공 `ui-*` 패키지에 tsdown이
생성하는 형태와 동일), 그래서 **빌드 단계가 필요 없습니다**. `lib/client.js`는 모듈 테이블 엔티티만 `require`할 수 있습니다: 플랫폼
시드(`react`, `react/jsx-runtime`, …)와 등록된 클라이언트 번들(`@deepseek-ai/dsh-client-runtime/client`, …).

- **기본 스킨 추가**: `lib/client.js`의 `SKINS` 배열에 객체(`id` + `colorScheme` + `tokens`)를 추가하면
  설정(Settings)에 자동으로 나타납니다. **8개 언어 사전 전체**(`zh`/`en`/`ja`/`ko`/`es`/`fr`/`de`/`ru`)에 `skin.<id>` 키를 추가하세요.
- **테마 팩 배포 (권장)**: [`docs/examples/sample-theme-pack.json`](./docs/examples/sample-theme-pack.json)을 따르세요 —
  `*.dsh-theme.json` 하나로 설정(Settings)에서 가져오기 가능하고 링크로 공유할 수 있으며, 코드 변경이 필요 없습니다.
- **자체 월페이퍼 추가**: [`wallpapers/`](./wallpapers/)에 이미지를 넣으세요 (권리 보유 이미지만 배포), 그런 다음
  DSH의 "Wallpaper" 행에서 가져오면 됩니다.
- **검증**: `npm test` (factory eval, `apply()`, 팩 가져오기/영속성 등을 다루는 VM 스모크 테스트).
- **리페인트**: `--dsw-alias-*` 토큰을 참조하세요 (전체 계약은 [`docs/themes-spec.md`](./docs/themes-spec.md)에).

## 📌 로드맵

- [x] v0.1: 테마 8종 + 커스텀 월페이퍼 (투명도 / 블러) + 로컬 영속화
- [x] 테마 팩 형식 + 가져오기 / 내보내기 / 공유 링크 (JSON + 매니페스트 + 검증)
- [x] 사용자별 엑센트(Accent) + 랜덤
- [x] 월페이퍼 2.0 (URL / 그라데이션 / 스킨별 추천 / 자동 어둡게)
- [x] 로컬 팩 라이브러리 + 원클릭 적용 / 즐겨찾기 / surprise-me
- [x] 전체 i18n 번역 및 문서 (zh / en / ja / ko / es / fr / de / ru)
- [ ] 온라인 팔레트 / 테마 미리보기 스튜디오 (순수 프론트엔드, 대비 검사기)
- [ ] 커뮤니티 테마 갤러리 (리포지토리 / 온라인 갤러리에 팩 제출)
- [ ] 첫 페인트(FOUC) 개선

## 🤝 기여하기

이슈와 PR 환영합니다! [기여 가이드](./CONTRIBUTING.md)를 읽고
[행동 강령](./CODE_OF_CONDUCT.md)을 따라주세요.

## ⭐ 프로젝트 지원하기

마음에 드신다면: 리포지토리에 별 **⭐**을 눌러주시고, npm에서 좋아요 **👍**를 눌러주시거나 DSH 친구들과
공유해 주세요 — 프로젝트가 더 많이 발견되고 지속적으로 관리되는 데 큰 도움이 됩니다. 테마 / 온라인 스튜디오 / 더 많은
스킨에 기여하고 싶으신가요? 함께해 주세요.

## 🔒 보안

보안 문제를 발견하셨나요? 공개 이슈로 열지 말고 [보안 정책](./SECURITY.md)을 참고하세요.

## 📄 라이선스

[MIT](./LICENSE)

## 🙏 감사의 말

- 아키텍처 및 API 참고: 공식 DeepSeek Harness
  [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme) 클라이언트 패키지.
- 컨셉 오마주: [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).
