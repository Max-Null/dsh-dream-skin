<p align="center">
  <a href="../../README.md">中文</a> · <a href="./README.en.md">English</a> · <a href="./README.ja.md">日本語</a> · <a href="./README.ko.md">한국어</a> · <a href="./README.es.md">Español</a> · <strong>Français</strong> · <a href="./README.de.md">Deutsch</a> · <a href="./README.ru.md">Русский</a>
</p>

<div align="center">

# dsh-dream-skin 🔮

**Donnez à DeepSeek Harness un visage sobre, net et au rendu soigné.**

Habillage natif · fond d'écran · packs de thèmes partageables — une implémentation élégante, entièrement bâtie sur le système officiel de tokens `--dsw-*` de DSH.

> **En bref : votre espace de code peut être silencieux.**

| 🎨 8 thèmes originaux | 🖼️ fond d'écran + lumière diffuse | 🎯 accent restreint | 📦 packs de thèmes partageables |
|---|---|---|---|

> Installation en 1 ligne · 100 % natif (aucune injection, aucun patch d'installation) · résiste aux mises à jour de DSH

✨ **Design Philosophy — [une déclaration sur ce que « premium » signifie](../../docs/design-philosophy.md)** · avec l'esthétique iOS / Linear comme base, le premium naît de la précision du matériau et de la retenue des couleurs.

[中文](../../README.md) · [Historique](../../CHANGELOG.md) · [Notes du projet](../../docs/PROJECT.md) · [Design Philosophy](../../docs/design-philosophy.md) · [Guide de publication](../../docs/publishing-to-npm.md)

![npm version](https://img.shields.io/npm/v/dsh-dream-skin?color=4f83f2&label=npm)
![license](https://img.shields.io/github/license/RevolutionLA/dsh-dream-skin?color=34d399)
[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
![node](https://img.shields.io/badge/node-%3E%3D18-6d9af6)
![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-blueviolet)
![plugin type](https://img.shields.io/badge/plugin-dual--face%20(dsh.bundle%2Bdsh.client)-4f83f2)
![ci](https://img.shields.io/github/actions/workflow/status/RevolutionLA/dsh-dream-skin/ci.yml?branch=main&label=CI&color=34d399)
![code size](https://img.shields.io/github/languages/code-size/RevolutionLA/dsh-dream-skin?color=orange)

</div>

## ⚡ Installation en une ligne

**Copiez cette phrase dans votre DSH et tout s'installe pour vous :**

> Veuillez installer le plugin de skin dsh-dream-skin (https://github.com/RevolutionLA/dsh-dream-skin, ou le package npm `dsh-dream-skin`), puis indiquez-moi comment redémarrer DSH Web.

Vous préférez la ligne de commande ? Une seule commande :

```sh
dsh plugin --profile web add dsh-dream-skin && dsh web
```

> 🚀 **Désormais sur npm !** DSH installé, ajoutez-le en une seule commande — aucun clonage nécessaire.

> **Un hommage à [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).** Mais l'approche est différente :
> Codex injecte du CSS dans le moteur de rendu du client de bureau via CDP, alors que DSH est une **interface Web pilotée par tokens** qui offre
> en natif des « plugins tiers qui enregistrent des thèmes ». Ce plugin est donc **100 % natif** — aucune injection, aucun patch
> binaire, et il ne cassera pas lors des mises à jour du client.
>
> **Ce n'est pas un produit officiel.** Juste une façon d'habiller votre espace de travail DeepSeek Harness.

---

## 📸 Captures d'écran

> De vraies captures d'écran, pas des maquettes. À gauche : DSH après application d'un skin ; à droite : la section dédiée **Thème / Apparence** dans les Paramètres.

<p align="center">
  <img src="../../docs/screenshots/preview.png" alt="DSH skin preview" width="46%"/>
  &nbsp;&nbsp;
  <img src="../../docs/screenshots/settings.png" alt="Theme section in settings" width="46%"/>
</p>

---

## 🏆 Pourquoi il mérite une étoile (vs les alternatives)

| Fonctionnalité | Nous | Autres skins DSH | Codex-Dream-Skin (bureau) |
|------|:---:|:---:|:---:|
| Thèmes natifs par tokens — aucune injection, aucun patch d'installation | ✅ | ✅ | ❌ (injection CDP) |
| Fond d'écran personnalisé + opacité/flou | ✅ | partiel | ✅ |
| **Import/export de packs de thèmes + liens de partage** | ✅ | ❌ | ✅ (packs zip) |
| **Accent personnalisable par utilisateur** | ✅ | ❌ | partiel |
| **Fond d'écran 2.0 (URL / dégradé / suggestion par skin / atténuation automatique)** | ✅ | ❌ | ✅ |
| Bibliothèque de packs locale + favoris + surprise | ✅ | ❌ | partiel |
| Validation + retour en arrière | ✅ | partiel | ✅ |
| **Interface Web dans le navigateur, multiplateforme nativement** | ✅ | ✅ | ❌ (nécessite l'application de bureau) |

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|------------|-------------|
| 🎨 **8 préréglages inclus (Mirage)** | Basculez instantanément depuis **Paramètres → Thème / Apparence**, clair & sombre |
| 🖼️ **Fond d'écran personnalisé** | Choisissez une image locale (compressée automatiquement ≤2 Mo), réglez **l'opacité / le flou** |
| 🔤 **Surfaces internes opaques** | Les cartes, champs de saisie et bulles de message restent lisibles — jamais délavés |
| ↩️ **Restauration par défaut** | Revenez à l'apparence intégrée de DSH (suivre le système) en un clic |
| 💾 **Persistance locale** | Skin et fond d'écran stockés dans `localStorage`, survivent au rechargement |

## 🚀 Fonctionnalités avancées (P0)

Une différenciation inspirée des projets de skins DSH existants et de l'UX de skin de Codex :

| Fonctionnalité | Description |
|------------|-------------|
| 📦 **Format de pack de thèmes + import/export** | Un pack `*.dsh-theme.json` = marqueur de format + version + manifeste (id/nom/auteur/schéma/accent/tokens). Importez un fichier, appliquez-le en un clic et copiez un **lien de partage** (encodé dans le hash de l'URL) |
| 🌈 **Accent par utilisateur** | Superposez un accent de marque personnalisé sur le skin actif (couche `overrideTokens`, le skin n'est pas modifié) : **12 nuanciers préréglés en un clic**, un sélecteur de couleur, **l'aléatoire** et l'effacement |
| 🖼️ **Fond d'écran 2.0** | Image locale / **URL d'image** / **dégradés préréglés**, avec un **dégradé suggéré par skin** et une **atténuation automatique** ; **Récents** (jusqu'à 5) pour revenir en un clic |
| 🧩 **Bibliothèque de packs locale** | Vos packs de thèmes importés au même endroit ; **appliquez / mettez en favori / supprimez** en un clic (les 8 skins intégrés se trouvent dans la rangée Skins) |
| ✅ **Retour visuel clair de la sélection** | Le changement de skin met à jour la surbrillance cochée/encadrée **instantanément** — plus de cadre blanc obsolète |
| 🎲 **Surprenez-moi** | Basculez aléatoirement vers un thème différent de l'actuel |
| ⭐ **Favoris** | Mettez une étoile sur vos skins préférés et passez de l'un à l'autre rapidement |
| ✅ **Validation + retour en arrière** | L'import d'un pack valide le format / les tokens requis / la validité des couleurs ; en cas d'échec ou de suppression, retour en arrière en toute sécurité |

## ⚡ Démarrage rapide (3 étapes)

```sh
# 1. install
dsh plugin --profile web add dsh-dream-skin
# 2. restart
dsh web
# 3. open Settings → Theme / Appearance → pick a skin → done.
```

> Installe le package npm publié — aucun clonage. Si `dsh plugin add` signale une erreur d'espace de travail, ajoutez `-w`.

## 🧩 Quel type de plugin est-ce

**Un `dsh-plugin` standard « dual-face » dans l'esprit « tout est un plugin » — chargé et utilisé exactement comme le package officiel `ui-theme`.**

La devise de DeepSeek Harness est *tout est un plugin* : modèles, outils, sandboxes, sessions, interface utilisateur, même l'Agent Loop
lui-même sont des plugins. `dsh-dream-skin` fournit l'habillage sous forme de package npm **isomorphe aux packages UI
officiels** :

```text
            ┌──────────── dsh-dream-skin (standard dsh-plugin / dual-face) ─────────────┐
            │  dsh.bundle   → cordis.patch.yml inserts the dream-skin entry  (host half)│
            │  dsh.client   → lib/client.js (browser bundle)                (browser half)│
            └───────────────────────────────────────────────────────────────────────────┘
```

- **La commande d'installation est celle officielle** : `dsh plugin --profile web add dsh-dream-skin`
- **Utilise les points d'extension officiels** : `ctx.theme` (enregistre les thèmes), `ctx.theme.overrideTokens` (couches de remplacement),
  `ctx.slots` (monte l'interface dans une section dédiée **Paramètres → Thème / Apparence**).
- **Le contrat de manifeste correspond aux packages officiels** : `dsh.bundle` + `dsh.client` + `exports["./client"]`.

En d'autres termes : vous n'installez pas un script marginal — c'est un plugin de skin standard dans le système de plugins
officiel de DSH.

## 🖼️ Aperçu — la série Mirage

> Les aperçus ci-dessous sont générés à partir des **vrais tokens** de chaque skin — ce que vous voyez est ce que vous obtenez.

<table>
  <tr>
    <td align="center"><img src="../../docs/previews/abyss.svg" width="220" alt="abyss"/><br/><b>abyss</b> · Bleu profond</td>
    <td align="center"><img src="../../docs/previews/aurora.svg" width="220" alt="aurora"/><br/><b>aurora</b> · Aurora vert</td>
    <td align="center"><img src="../../docs/previews/nebula.svg" width="220" alt="nebula"/><br/><b>nebula</b> · Nébuleuse violette</td>
    <td align="center"><img src="../../docs/previews/ember.svg" width="220" alt="ember"/><br/><b>ember</b> · Ambre</td>
  </tr>
  <tr>
    <td align="center"><img src="../../docs/previews/midnight.svg" width="220" alt="midnight"/><br/><b>midnight</b> · OLED minuit</td>
    <td align="center"><img src="../../docs/previews/ivory.svg" width="220" alt="ivory"/><br/><b>ivory</b> · iOS Flat</td>
    <td align="center"><img src="../../docs/previews/mist.svg" width="220" alt="mist"/><br/><b>mist</b> · Verre liquide</td>
    <td align="center"><img src="../../docs/previews/rose.svg" width="220" alt="rose"/><br/><b>rose</b> · Material rose</td>
  </tr>
</table>

## 🎲 Les préréglages

| id | style | trait |
|------|--------|------|
| `abyss` | 🕶️ Bleu profond | indigo profond et calme, sobre et discret |
| `aurora` | 🌌 Aurora vert | vert sarcelle froid, limpide et translucide, ton froid naturel |
| `nebula` | 🪐 Nébuleuse violette | violet-bleu profond et diffus, brumeux et mystérieux |
| `ember` | 🔥 Ambre | orange ambre chaleureux et sobre |
| `midnight` | 🌚 OLED minuit | noir pur minimaliste, OLED immersif |
| `ivory` | 📐 iOS Flat | blanc plat minimaliste, gris système iOS + bleu sobre |
| `mist` | 🧊 Verre liquide | verre dépoli limpide, translucide + flou |
| `rose` | 🌸 Material rose | rose vif et éclatant, couleurs plates Google Material |

## 📦 Installation

Choisissez l'une des quatre options, puis **redémarrez DSH Web** (la session en cours sera interrompue, mais les sessions DSH sont
persistées sur le disque et se rétablissent après le redémarrage).

### Option A : Depuis npm (publié, **recommandé**)

```sh
dsh plugin --profile web add dsh-dream-skin
```

### Option B : Depuis GitHub (épinglé à un commit vérifié)

```sh
dsh plugin --profile web add 'github:RevolutionLA/dsh-dream-skin#<40-char-commit>'
```

> Épingler au commit d'une release signifie que les nouveaux changements de `main` n'altéreront jamais silencieusement votre copie installée.

### Option C : Depuis une archive Release (hors ligne / sans git)

Téléchargez `dsh-dream-skin-<version>.tgz` depuis la page [Releases](https://github.com/RevolutionLA/dsh-dream-skin/releases)
(elle contient le `lib/client.js` compilé, donc aucun script prepare n'est exécuté à l'installation), puis :

```sh
dsh plugin --profile web add ./dsh-dream-skin-<version>.tgz
```

### Option D : Cloner et installer depuis le chemin local (développement)

```sh
git clone https://github.com/RevolutionLA/dsh-dream-skin.git
cd dsh-dream-skin
dsh plugin --profile web add .
```

> `dsh plugin` ancre les chemins relatifs au répertoire **dans lequel vous exécutez la commande**, en installant une dépendance de lien
> qui pointe vers votre clone : modifiez la source, enregistrez, redémarrez DSH — aucune réinstallation nécessaire.

**Redémarrez et vérifiez :**

```sh
dsh web
dsh --profile web --dump-config | grep -A2 dream-skin   # a dream-skin loader entry should appear
```

Ouvrez **Paramètres → Thème / Apparence** pour voir les rangées **Skins**, **Accent**, **Fond d'écran** / **Fond d'écran avancé** et **Packs de thèmes**.

> L'option `-w` (workspace) est nécessaire sur un `add` nu parce que chaque profil embarque un `pnpm-workspace.yaml` ; pnpm traite
> le répertoire du profil comme une racine d'espace de travail, donc un add nu échoue avec `ERR_PNPM_ADDING_TO_ROOT`. Si votre profil utilise
> déjà l'espace de travail, vous n'aurez pas à la répéter.

## 🔄 Mise à jour / Désinstallation

**Mettre à jour vers la dernière version** (lorsque installé depuis la release npm) :

```sh
dsh plugin --profile web update dsh-dream-skin
dsh web   # restart to pick it up
```

> Bloqué sur une ancienne version après une mise à jour ? La politique pnpm de minimum-release-age (chaîne d'approvisionnement) peut retenir une
> release fraîchement publiée. Dans le répertoire du profil, exécutez :
> `pnpm add dsh-dream-skin@latest --config.minimumReleaseAge=0` pour forcer la mise à jour.

**Désinstaller :**

```sh
dsh plugin --profile web remove dsh-dream-skin
dsh web   # restores the official appearance
```

## 🧩 Compatibilité

| Élément | Valeur |
|------|-------|
| DeepSeek Harness (`dsh`) | `0.1.0-rc.6` (peerDependencies épinglées à `^0.1.0-rc.6`) |
| Node.js | `>=18` |
| Navigateur | Chromium / WebKit moderne (variables CSS natives et `matchMedia`) |

> Lors de la mise à niveau de DSH, mettez à jour les peerDependencies dans `package.json` en conséquence.

## ⚙️ Comment ça marche

Le système de thèmes de DSH est basé sur des tokens : le shell web fournit des tokens de design `--dsw-*`, et `ThemeRuntime` permet aux plugins
tiers d'enregistrer des thèmes qui remplacent la couche d'alias (`--dsw-alias-*`). Ce package est un plugin standard « dual-face » :

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

- **Partie hôte** (`lib/index.js`) — une couche de patch `dsh.bundle` qui insère l'entrée de chargement `dream-skin` ; `apply` est un
  no-op, exactement comme les packages `ui-*` fournis.
- **Partie navigateur** (`lib/client.js`) :
  1. enregistre les 8 skins via `ctx.theme.register(...)` ;
  2. restaure le skin enregistré et l'applique avec `ctx.theme.setTheme(...)` ;
  3. affiche le fond d'écran comme arrière-plan fixe `z-index:-1` et empile `ctx.theme.overrideTokens(...)` pour rendre le
     canevas principal (`--dsw-alias-bg-base`) et la barre latérale (`--dsw-specific-sidebar-fill`) translucides ;
  4. écoute `theme/change` et re-teinte la nappe du fond d'écran lors du changement de skin / de schéma ;
  5. enregistre une section dédiée **Paramètres → Thème / Apparence** (`settings.section`) et monte les cinq
     rangées de fonctionnalités sous le slot `settings.dreamSkin.item`.

Chaque skin porte son `colorScheme` (`light`/`dark`), qui pilote `body[data-ds-dark-theme]` ; les remplacements de tokens d'alias
sont appliqués comme propriétés personnalisées en ligne sur `<body>` par le ThemePresenter d'ui-layout.

## 💼 Notes sur la persistance

- Le skin et le fond d'écran sont stockés dans `localStorage` (clés préfixées `dsh-dream-skin:`), **par navigateur**.
- Pourquoi pas les paramètres Host ? Le canal des paramètres Host n'expose qu'un ensemble de namespaces en liste blanche aux clients navigateur
  (`WEB_SETTINGS_NAMESPACES` dans `dsh-host-apiproxy`), donc un namespace tiers répondrait `settings-not-exposed` ;
  le produit lui-même conserve les préférences du navigateur distant au niveau du processus. `localStorage` respecte cette frontière et
  survit aux rechargements.

## 🛠️ Développement / étendre les thèmes

Le bundle client est écrit directement au format `__ModuleLoader__` (la même forme que tsdown émet pour les packages
`ui-*` fournis), donc **aucune étape de build** n'est requise. `lib/client.js` ne peut `require` que les entités de la table des modules : les
seeds de plateforme (`react`, `react/jsx-runtime`, …) et les bundles client enregistrés (`@deepseek-ai/dsh-client-runtime/client`, …).

- **Ajouter un skin intégré** : ajoutez un objet (`id` + `colorScheme` + `tokens`) au tableau `SKINS` dans `lib/client.js` ;
  il apparaîtra alors automatiquement dans les Paramètres. Ajoutez une clé `skin.<id>` aux **8 dictionnaires de langue** (`zh`/`en`/`ja`/`ko`/`es`/`fr`/`de`/`ru`).
- **Publier un pack de thèmes (recommandé)** : suivez [`docs/examples/sample-theme-pack.json`](../../docs/examples/sample-theme-pack.json) —
  un `*.dsh-theme.json` est importable dans les Paramètres et partageable via un lien, sans aucune modification de code.
- **Ajouter vos propres fonds d'écran** : déposez des images dans [`wallpapers/`](../../wallpapers/) (ne distribuez que ce dont vous avez
  les droits), puis importez-les via la rangée « Fond d'écran » de DSH.
- **Valider** : `npm test` (tests de fumée VM couvrant l'évaluation de la factory, `apply()` et l'import/la persistance des packs).
- **Repeindre** : référez-vous aux tokens `--dsw-alias-*` (contrat complet dans [`docs/themes-spec.md`](../../docs/themes-spec.md)).

## 📌 Feuille de route

- [x] v0.1 : 8 thèmes + fond d'écran personnalisé (opacité / flou) + persistance locale
- [x] Format de pack de thèmes + import / export / lien de partage (JSON + manifeste + validation)
- [x] Accent par utilisateur + aléatoire
- [x] Fond d'écran 2.0 (URL / dégradé / suggestion par skin / atténuation automatique)
- [x] Bibliothèque de packs locale + application en un clic / favoris / surprenez-moi
- [x] Contenus et documentation i18n complets (zh / en / ja / ko / es / fr / de / ru)
- [ ] Palette en ligne / Studio d'aperçu de thèmes (frontend pur, vérificateur de contraste)
- [ ] Galerie de thèmes communautaire (soumettre des packs au dépôt / galerie en ligne)
- [ ] Amélioration du premier affichage (FOUC)

## 🤝 Contribuer

Issues et PR bienvenues ! Veuillez lire le [Guide de contribution](../../CONTRIBUTING.md) et respecter le
[Code de conduite](../../CODE_OF_CONDUCT.md).

## ⭐ Soutenir le projet

Si vous l'aimez : mettez une étoile **⭐** au dépôt, un pouce **👍** sur npm, ou partagez-le avec des amis DSH — cela aide le projet
à être découvert et à rester maintenu. Vous voulez contribuer des thèmes / un Studio en ligne / plus de skins ? Rejoignez-nous.

## 🔒 Sécurité

Vous avez trouvé un problème de sécurité ? N'ouvrez pas d'issue publique — consultez la [Politique de sécurité](../../SECURITY.md).

## 📄 Licence

[MIT](../../LICENSE)

## 🙏 Remerciements

- Référence d'architecture & d'API : le package client [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme)
  officiel de DeepSeek Harness.
- Hommage conceptuel : [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).
