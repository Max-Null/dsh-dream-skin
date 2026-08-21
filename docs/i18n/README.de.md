<p align="center">
  <a href="../../README.md">中文</a> · <a href="./README.en.md">English</a> · <a href="./README.ja.md">日本語</a> · <a href="./README.ko.md">한국어</a> · <a href="./README.es.md">Español</a> · <a href="./README.fr.md">Français</a> · <strong>Deutsch</strong> · <a href="./README.ru.md">Русский</a>
</p>

<div align="center">

# dsh-dream-skin 🔮

**Gib DeepSeek Harness ein Gesicht, das zurückhaltend, klar und von feiner Textur ist.**

Natives Skinning · Wallpaper · teilbare Theme-Pakete — eine elegante Umsetzung, vollständig auf DSHs offiziellem `--dsw-*`-Token-System basierend.

> **TL;DR: Dein Code-Bereich darf leise sein.**

| 🎨 8 Original-Themes | 🖼️ Wallpaper + diffuses Licht | 🎯 zurückhaltender Akzent | 📦 teilbare Theme-Pakete |
|---|---|---|---|

> 1-Zeilen-Installation · rein nativ (keine Injektion, keine Installer-Patches) · übersteht DSH-Updates

✨ **Design Philosophy — [eine Aussage darüber, was „premium" bedeutet](../../docs/design-philosophy.md)** · mit der iOS-/Linear-Ästhetik als Basis entsteht Premium aus der Präzision des Materials und der Zurückhaltung der Farben.

[中文](../../README.md) · [Änderungshistorie](../../CHANGELOG.md) · [Projektnotizen](../../docs/PROJECT.md) · [Design Philosophy](../../docs/design-philosophy.md) · [Veröffentlichungsanleitung](../../docs/publishing-to-npm.md)

![npm version](https://img.shields.io/npm/v/dsh-dream-skin?color=4f83f2&label=npm)
![license](https://img.shields.io/github/license/RevolutionLA/dsh-dream-skin?color=34d399)
[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
![node](https://img.shields.io/badge/node-%3E%3D18-6d9af6)
![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-blueviolet)
![plugin type](https://img.shields.io/badge/plugin-dual--face%20(dsh.bundle%2Bdsh.client)-4f83f2)
![ci](https://img.shields.io/github/actions/workflow/status/RevolutionLA/dsh-dream-skin/ci.yml?branch=main&label=CI&color=34d399)
![code size](https://img.shields.io/github/languages/code-size/RevolutionLA/dsh-dream-skin?color=orange)

</div>

## ⚡ Installation mit einer Zeile

**Kopiere diesen Satz in dein DSH und es installiert alles für dich:**

> Bitte installiere das Skin-Plugin dsh-dream-skin (https://github.com/RevolutionLA/dsh-dream-skin, oder das npm-Paket `dsh-dream-skin`) und sage mir dann, wie ich DSH Web neu starten kann.

Lieber die CLI? Ein Befehl:

```sh
dsh plugin --profile web add dsh-dream-skin && dsh web
```

> 🚀 **Jetzt auf npm!** Bei installiertem DSH fügst du es mit einem einzigen Befehl hinzu — kein Klonen nötig.

> **Eine Hommage an [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).** Aber der Ansatz ist anders:
> Codex injiziert CSS über CDP in den Renderer des Desktop-Clients, während DSH eine **token-gesteuerte Web-GUI** ist,
> die „Third-Party-Plugins, die Themes registrieren“ erstklassig unterstützt. Dieses Plugin ist daher **rein nativ** —
> keine Injektion, keine Binär-Patches, und es bricht nicht bei Client-Updates.
>
> **Kein offizielles Produkt.** Nur eine Möglichkeit, deinen DeepSeek-Harness-Arbeitsbereich aufzumöbeln.

---

## 📸 Screenshots

> Echte Screenshots, keine Mockups. Links: DSH nach dem Anwenden eines Skins; rechts: der dedizierte Bereich **Theme / Appearance** in den Einstellungen.

<p align="center">
  <img src="../../docs/screenshots/preview.png" alt="DSH skin preview" width="46%"/>
  &nbsp;&nbsp;
  <img src="../../docs/screenshots/settings.png" alt="Theme section in settings" width="46%"/>
</p>

---

## 🏆 Warum es einen Stern verdient (im Vergleich zu Alternativen)

| Funktion | Unseres | Anderes DSH-Skinning | Codex-Dream-Skin (Desktop) |
|------|:---:|:---:|:---:|
| Native Token-Themes — keine Injektion, keine Installer-Patches | ✅ | ✅ | ❌ (CDP-Injektion) |
| Eigenes Wallpaper + Deckkraft/Unschärfe | ✅ | teilweise | ✅ |
| **Theme-Paket-Import/-Export + Share-Links** | ✅ | ❌ | ✅ (Zip-Pakete) |
| **Akzent-Override pro Benutzer** | ✅ | ❌ | teilweise |
| **Wallpaper 2.0 (URL / Verlauf / Vorschlag pro Skin / automatisches Abdunkeln)** | ✅ | ❌ | ✅ |
| Lokale Paketbibliothek + Favoriten + Überrasche-mich | ✅ | ❌ | teilweise |
| Validierung + Rollback | ✅ | teilweise | ✅ |
| **Browser-Web-GUI, nativ plattformübergreifend** | ✅ | ✅ | ❌ (braucht Desktop-App) |

## ✨ Funktionen

| Funktion | Beschreibung |
|------------|-------------|
| 🎨 **8 enthaltene Presets (Mirage)** | Sofort umschalten unter **Settings → Theme / Appearance**, hell & dunkel |
| 🖼️ **Eigenes Wallpaper** | Lokales Bild wählen (automatisch komprimiert ≤2 MB), **Deckkraft / Unschärfe** einstellen |
| 🔤 **Undurchsichtige Innenflächen** | Karten, Eingabefelder und Nachrichtenblasen bleiben lesbar — niemals ausgewaschen |
| ↩️ **Standard wiederherstellen** | Mit einem Klick zurück zur integrierten Darstellung von DSH (System folgen) |
| 💾 **Lokale Speicherung** | Skin & Wallpaper werden in `localStorage` gespeichert und überstehen ein Neuladen |

## 🚀 Erweiterte Funktionen (P0)

Die Abgrenzung ist inspiriert von bestehenden DSH-Skin-Projekten und der Skin-UX von Codex:

| Funktion | Beschreibung |
|------------|-------------|
| 📦 **Theme-Paket-Format + Import/Export** | Ein `*.dsh-theme.json`-Paket = Format-Marker + Version + Manifest (id/name/author/scheme/accent/tokens). Datei importieren, mit einem Klick anwenden und einen **Share-Link** kopieren (im URL-Hash kodiert) |
| 🌈 **Akzent pro Benutzer** | Ein eigenes Marken-Akzent über den aktiven Skin legen (`overrideTokens`-Ebene, der Skin bleibt unangetastet): **12 Preset-Farbfelder mit einem Klick**, ein Farbwähler, **Zufallsfunktion** und Zurücksetzen |
| 🖼️ **Wallpaper 2.0** | Lokales Bild / **Bild-URL** / **Verlaufs-Presets**, mit einem **pro Skin vorgeschlagenen Verlauf** und **automatischem Abdunkeln**; **Zuletzt verwendet** (bis zu 5), um mit einem Klick zurückzuschalten |
| 🧩 **Lokale Paketbibliothek** | Deine importierten Theme-Pakete an einem Ort; **anwenden / favorisieren / entfernen** mit einem Klick (die 8 integrierten Skins liegen in der Skin-Reihe) |
| ✅ **Klares Auswahl-Feedback** | Beim Wechseln der Skins wird die Markierung (Häkchen/Rahmen) **sofort** aktualisiert — keine veraltete weiße Markierungsbox |
| 🎲 **Überrasche mich** | Zufällig zu einem Theme wechseln, das sich vom aktuellen unterscheidet |
| ⭐ **Favoriten** | Markiere deine Lieblings-Skins mit einem Stern und wechsle schnell zwischen ihnen |
| ✅ **Validierung + Rollback** | Der Paket-Import validiert Format / erforderliche Tokens / Farbzulässigkeit; Fehler oder Entfernungen fallen sicher zurück |

## ⚡ Schnellstart (3 Schritte)

```sh
# 1. installieren
dsh plugin --profile web add dsh-dream-skin
# 2. neu starten
dsh web
# 3. Settings → Theme / Appearance öffnen → Skin wählen → fertig.
```

> Installiert das veröffentlichte npm-Paket — kein Klonen nötig. Wenn `dsh plugin add` einen Workspace-Fehler meldet, hänge `-w` an.

## 🧩 Was für ein Plugin ist das

**Ein standardmäßiges Dual-Face-`dsh-plugin` nach dem Prinzip „Alles ist ein Plugin“ — geladen und verwendet genau wie das offizielle Paket `ui-theme`.**

Das Motto von DeepSeek Harness lautet *Alles ist ein Plugin*: Modelle, Tools, Sandboxes, Sessions, UI, sogar der Agent
Loop selbst sind Plugins. `dsh-dream-skin` liefert Skinning als npm-Paket, das **isomorph zu den offiziellen
UI-Paketen** ist:

```text
            ┌──────────── dsh-dream-skin (standard dsh-plugin / dual-face) ─────────────┐
            │  dsh.bundle   → cordis.patch.yml inserts the dream-skin entry  (host half)│
            │  dsh.client   → lib/client.js (browser bundle)                (browser half)│
            └───────────────────────────────────────────────────────────────────────────┘
```

- **Installationsbefehl = der offizielle**: `dsh plugin --profile web add dsh-dream-skin`
- **Nutzt offizielle Erweiterungspunkte**: `ctx.theme` (Themes registrieren), `ctx.theme.overrideTokens` (Override-Ebenen),
  `ctx.slots` (UI in einen dedizierten Bereich **Settings → Theme / Appearance** einhängen).
- **Manifest-Vertrag entspricht den offiziellen Paketen**: `dsh.bundle` + `dsh.client` + `exports["./client"]`.

Mit anderen Worten: Du installierst kein Randskript — das ist ein Standard-Skin-Plugin im offiziellen Plugin-System
von DSH.

## 🖼️ Vorschau — die Mirage-Serie

> Die Vorschauen unten werden aus den **echten Tokens** jedes Skins generiert — was du siehst, ist, was du bekommst.

<table>
  <tr>
    <td align="center"><img src="../../docs/previews/abyss.svg" width="220" alt="abyss"/><br/><b>abyss</b> · Tiefes Blau</td>
    <td align="center"><img src="../../docs/previews/aurora.svg" width="220" alt="aurora"/><br/><b>aurora</b> · Aurora Grün</td>
    <td align="center"><img src="../../docs/previews/nebula.svg" width="220" alt="nebula"/><br/><b>nebula</b> · Nebel Lila</td>
    <td align="center"><img src="../../docs/previews/ember.svg" width="220" alt="ember"/><br/><b>ember</b> · Bernstein</td>
  </tr>
  <tr>
    <td align="center"><img src="../../docs/previews/midnight.svg" width="220" alt="midnight"/><br/><b>midnight</b> · OLED Mitternacht</td>
    <td align="center"><img src="../../docs/previews/ivory.svg" width="220" alt="ivory"/><br/><b>ivory</b> · iOS Flat</td>
    <td align="center"><img src="../../docs/previews/mist.svg" width="220" alt="mist"/><br/><b>mist</b> · Flüssiges Glas</td>
    <td align="center"><img src="../../docs/previews/rose.svg" width="220" alt="rose"/><br/><b>rose</b> · Material Pink</td>
  </tr>
</table>

## 🎲 Die Presets

| id | Stil | Charakter |
|------|--------|------|
| `abyss` | 🕶️ Tiefes Blau | ruhiges tiefes Indigo, zurückhaltend und leise |
| `aurora` | 🌌 Aurora Grün | kühles, klares, transluzentes Türkis, natürlicher Kaltton |
| `nebula` | 🪐 Nebel Lila | tiefes, diffuses Violett-Blau, neblig und geheimnisvoll |
| `ember` | 🔥 Bernstein | warmes, zurückhaltendes Amber-Orange |
| `midnight` | 🌚 OLED Mitternacht | minimalistisches reines Schwarz, immersives OLED |
| `ivory` | 📐 iOS Flat | minimalistisches flaches Weiß, iOS-Systemgrau + zurückhaltendes Blau |
| `mist` | 🧊 Flüssiges Glas | klares Milchglas, halbtransparent + unscharf |
| `rose` | 🌸 Material Pink | helles kräftiges Pink, flache Google-Material-Farben |

## 📦 Installation

Wähle eine der vier Optionen und starte dann **DSH Web neu** (die aktuelle Sitzung wird unterbrochen, aber DSH-Sitzungen
werden auf der Festplatte gespeichert und nach dem Neustart wiederhergestellt).

### Option A: Von npm (veröffentlicht, **empfohlen**)

```sh
dsh plugin --profile web add dsh-dream-skin
```

### Option B: Von GitHub (an einen verifizierten Commit gebunden)

```sh
dsh plugin --profile web add 'github:RevolutionLA/dsh-dream-skin#<40-char-commit>'
```

> Die Bindung an den Commit eines Releases bedeutet, dass neue Änderungen auf `main` deine installierte Kopie niemals stillschweigend verändern.

### Option C: Vom Release-Tarball (offline / ohne git)

Lade `dsh-dream-skin-<version>.tgz` von der Seite [Releases](https://github.com/RevolutionLA/dsh-dream-skin/releases)
herunter (das Paket enthält das gebaute `lib/client.js`, sodass beim Installieren kein Prepare-Skript ausgeführt wird), dann:

```sh
dsh plugin --profile web add ./dsh-dream-skin-<version>.tgz
```

### Option D: Klonen und aus dem lokalen Pfad installieren (Entwicklung)

```sh
git clone https://github.com/RevolutionLA/dsh-dream-skin.git
cd dsh-dream-skin
dsh plugin --profile web add .
```

> `dsh plugin` verankert relative Pfade im Verzeichnis, **in dem du den Befehl ausführst**, und installiert eine
> Link-Abhängigkeit, die auf deinen Klon zeigt: Quelle bearbeiten, speichern, DSH neu starten — keine Neuinstallation nötig.

**Neu starten und überprüfen:**

```sh
dsh web
dsh --profile web --dump-config | grep -A2 dream-skin   # a dream-skin loader entry should appear
```

Öffne **Settings → Theme / Appearance**, um die Reihen **Skins**, **Accent**, **Wallpaper** / **Advanced Wallpaper** und **Theme Packs** zu sehen.

> Das Flag `-w` (Workspace) wird bei einem einfachen `add` benötigt, weil jedes Profil eine `pnpm-workspace.yaml` mitbringt; pnpm behandelt
> das Profilverzeichnis als Workspace-Root, daher schlägt ein einfaches `add` mit `ERR_PNPM_ADDING_TO_ROOT` fehl. Wenn dein Profil bereits
> den Workspace nutzt, musst du es nicht wiederholen.

## 🔄 Aktualisieren / Deinstallieren

**Auf die neueste Version aktualisieren** (wenn aus dem npm-Release installiert):

```sh
dsh plugin --profile web update dsh-dream-skin
dsh web   # restart to pick it up
```

> Hängst du nach einem Update an einer alten Version fest? Die Minimum-Release-Alter-Richtlinie (Supply-Chain) von pnpm kann ein
> frisch veröffentlichtes Release zurückhalten. Führe im Profilverzeichnis aus:
> `pnpm add dsh-dream-skin@latest --config.minimumReleaseAge=0`, um es zu erzwingen.

**Deinstallieren:**

```sh
dsh plugin --profile web remove dsh-dream-skin
dsh web   # restores the official appearance
```

## 🧩 Kompatibilität

| Punkt | Wert |
|------|-------|
| DeepSeek Harness (`dsh`) | `0.1.0-rc.6` (peerDependencies auf `^0.1.0-rc.6` festgelegt) |
| Node.js | `>=18` |
| Browser | modernes Chromium / WebKit (native CSS-Variablen & `matchMedia`) |

> Beim Upgraden von DSH die `peerDependencies` in `package.json` entsprechend anheben.

## ⚙️ So funktioniert es

Das Theme-System von DSH ist token-basiert: Die Web-Shell liefert `--dsw-*`-Design-Tokens, und `ThemeRuntime` erlaubt
Drittanbieter-Plugins, Themes zu registrieren, die die Alias-Ebene (`--dsw-alias-*`) überschreiben. Dieses Paket ist ein
standardmäßiges Dual-Face-Plugin:

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

- **Host-Hälfte** (`lib/index.js`) — eine `dsh.bundle`-Patch-Ebene, die den `dream-skin`-Loader-Eintrag einfügt; `apply` ist
  ein No-op, genau wie bei den mitgelieferten `ui-*`-Paketen.
- **Browser-Hälfte** (`lib/client.js`):
  1. registriert die 8 Skins über `ctx.theme.register(...)`;
  2. stellt den gespeicherten Skin wieder her und wendet ihn mit `ctx.theme.setTheme(...)` an;
  3. rendert das Wallpaper als festen Hintergrund mit `z-index:-1` und stapelt `ctx.theme.overrideTokens(...)`, wodurch die
     Hauptfläche (`--dsw-alias-bg-base`) und die Seitenleiste (`--dsw-specific-sidebar-fill`) durchscheinend werden;
  4. lauscht auf `theme/change` und färbt den Wallpaper-Wash beim Wechsel von Skin / Schema neu ein;
  5. registriert einen dedizierten Bereich **Settings → Theme / Appearance** (`settings.section`) und hängt die fünf
     Funktionsreihen in den Slot `settings.dreamSkin.item` ein.

Jeder Skin trägt sein `colorScheme` (`light`/`dark`), das `body[data-ds-dark-theme]` steuert; die Alias-Token-Overrides
werden von ThemePresenter von ui-layout als Inline-Custom-Properties auf `<body>` angewendet.

## 💼 Hinweise zur Speicherung

- Skin & Wallpaper werden in `localStorage` gespeichert (Schlüssel mit Präfix `dsh-dream-skin:`), **pro Browser**.
- Warum nicht die Host-Einstellungen? Die Host-Einstellungs-Schnittstelle legt Browser-Clients nur eine auf die Whitelist
  gesetzte Auswahl von Namespaces offen (`WEB_SETTINGS_NAMESPACES` in `dsh-host-apiproxy`), daher würde ein
  Drittanbieter-Namespace mit `settings-not-exposed` antworten; das Produkt selbst hält Remote-Browser-Einstellungen
  prozesslokal. `localStorage` entspricht dieser Grenze und übersteht Neuladen.

## 🛠️ Entwicklung / Themes erweitern

Das Client-Bundle ist direkt im `__ModuleLoader__`-Format geschrieben (dieselbe Form, die tsdown für die mitgelieferten
`ui-*`-Pakete erzeugt), daher ist **kein Build-Schritt** erforderlich. `lib/client.js` darf nur Module-Table-Entitäten
`require`n: Plattform-Seeds (`react`, `react/jsx-runtime`, …) und registrierte Client-Bundles
(`@deepseek-ai/dsh-client-runtime/client`, …).

- **Einen integrierten Skin hinzufügen**: Füge dem `SKINS`-Array in `lib/client.js` ein Objekt (`id` + `colorScheme` +
  `tokens`) hinzu; es erscheint dann automatisch in den Einstellungen. Füge einen Schlüssel `skin.<id>` in **allen 8 Sprachwörterbüchern** (`zh`/`en`/`ja`/`ko`/`es`/`fr`/`de`/`ru`) hinzu.

- **Ein Theme-Paket ausliefern (empfohlen)**: Folge [`docs/examples/sample-theme-pack.json`](../../docs/examples/sample-theme-pack.json) —
  eine `*.dsh-theme.json` ist in den Einstellungen importierbar und über einen Link teilbar, ohne Codeänderungen.
- **Eigene Wallpaper hinzufügen**: Lege Bilder in [`wallpapers/`](../../wallpapers/) ab (verbreite nur, wofür du die Rechte
  hast) und importiere sie dann über die „Wallpaper“-Reihe von DSH.
- **Validieren**: `npm test` (VM-Smoke-Tests, die Factory-Eval, `apply()` sowie Paket-Import/-Persistenz abdecken).
- **Neu einfärben**: Nutze die `--dsw-alias-*`-Tokens (vollständiger Vertrag in [`docs/themes-spec.md`](../../docs/themes-spec.md)).

## 📌 Roadmap

- [x] v0.1: 8 Themes + eigenes Wallpaper (Deckkraft / Unschärfe) + lokale Speicherung
- [x] Theme-Paket-Format + Import / Export / Share-Link (JSON + Manifest + Validierung)
- [x] Akzent pro Benutzer + Zufallsfunktion
- [x] Wallpaper 2.0 (URL / Verlauf / Vorschlag pro Skin / automatisches Abdunkeln)
- [x] Lokale Paketbibliothek + Anwenden mit einem Klick / Favoriten / Überrasche-mich
- [x] Vollständige i18n-Texte & Doku (zh / en / ja / ko / es / fr / de / ru)
- [ ] Online-Farb-/Theme-Vorschau-Studio (reines Frontend, Kontrastprüfung)
- [ ] Community-Theme-Galerie (Pakete an das Repo / die Online-Galerie senden)
- [ ] Verbesserung des ersten Paintings (FOUC)

## 🤝 Mitwirken

Issues und PRs sind willkommen! Bitte lies den [Contributing Guide](../../CONTRIBUTING.md) und beachte den
[Code of Conduct](../../CODE_OF_CONDUCT.md).

## ⭐ Das Projekt unterstützen

Wenn es dir gefällt: Gib dem Repo einen Stern **⭐**, ein Daumen-hoch **👍** auf npm, oder teile es mit DSH-Freunden — das
hilft dem Projekt, entdeckt zu werden, und hält es gepflegt. Möchtest du Themes / ein Online-Studio / mehr Skins
beisteuern? Mach mit.

## 🔒 Sicherheit

Ein Sicherheitsproblem gefunden? Öffne kein öffentliches Issue — siehe die [Security Policy](../../SECURITY.md).

## 📄 Lizenz

[MIT](../../LICENSE)

## 🙏 Danksagungen

- Architektur- & API-Referenz: das offizielle [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme)-Client-Paket
  von DeepSeek Harness.
- Konzept-Hommage: [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).
