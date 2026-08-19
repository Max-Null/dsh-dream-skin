<p align="center">
  <a href="./README.md">中文</a> · <a href="./README.en.md">English</a> · <a href="./README.ja.md">日本語</a> · <a href="./README.ko.md">한국어</a> · <strong>Español</strong> · <a href="./README.fr.md">Français</a> · <a href="./README.de.md">Deutsch</a> · <a href="./README.ru.md">Русский</a>
</p>

<div align="center">

# dsh-dream-skin 🔮

**Dale a DeepSeek Harness una cara sobria, nítida y de textura cuidada.**

Skinning nativo · wallpaper · paquetes de temas compartibles — una implementación elegante construida íntegramente sobre el sistema oficial de tokens `--dsw-*` de DSH.

> **TL;DR: tu espacio de código puede ser silencioso.**

| 🎨 8 temas originales | 🖼️ wallpaper + brillo difuso | 🎯 acento restringido | 📦 paquetes de temas compartibles |
|---|---|---|---|

> Instalación en 1 línea · 100 % nativo (sin inyección, sin parches al instalador) · sobrevive a las actualizaciones de DSH

✨ **Design Philosophy — [una declaración sobre qué significa «premium»](./docs/design-philosophy.md)** · con la estética de iOS / Linear como base, lo premium nace de la precisión del material y la restricción del color.

[中文](./README.md) · [Historial de cambios](./CHANGELOG.md) · [Notas del proyecto](./docs/PROJECT.md) · [Design Philosophy](./docs/design-philosophy.md) · [Guía de publicación](./docs/publishing-to-npm.md)

![npm version](https://img.shields.io/npm/v/dsh-dream-skin?color=4f83f2&label=npm)
![license](https://img.shields.io/github/license/RevolutionLA/dsh-dream-skin?color=34d399)
[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)
![node](https://img.shields.io/badge/node-%3E%3D18-6d9af6)
![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.6-blueviolet)
![plugin type](https://img.shields.io/badge/plugin-dual--face%20(dsh.bundle%2Bdsh.client)-4f83f2)
![ci](https://img.shields.io/github/actions/workflow/status/RevolutionLA/dsh-dream-skin/ci.yml?branch=main&label=CI&color=34d399)
![code size](https://img.shields.io/github/languages/code-size/RevolutionLA/dsh-dream-skin?color=orange)

</div>

## ⚡ Instalación en una línea

**Copia esta frase en tu DSH y él se encargará de instalar todo por ti:**

> Por favor, instala el plugin de skins dsh-dream-skin (https://github.com/RevolutionLA/dsh-dream-skin, o el paquete npm `dsh-dream-skin`) y luego dime cómo reiniciar DSH Web.

¿Prefieres la CLI? Un solo comando:

```sh
dsh plugin --profile web add dsh-dream-skin && dsh web
```

> 🚀 **¡Ya en npm!** Con DSH instalado, añádelo con un solo comando: no hace falta clonar nada.

> **Un homenaje a [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).** Pero el enfoque es diferente:
> Codex inyecta CSS en el renderer del cliente de escritorio mediante CDP, mientras que DSH es una **interfaz
> web basada en tokens** con soporte de primera clase para «plugins de terceros que registran temas». Así que este
> plugin es **100 % nativo**: sin inyección, sin parches binarios, y no se romperá con las actualizaciones del cliente.
>
> **No es un producto oficial.** Solo una forma de vestir tu espacio de trabajo de DeepSeek Harness.

---

## 📸 Capturas de pantalla

> Capturas reales, no maquetas. Izquierda: DSH después de aplicar un skin; derecha: la sección dedicada **Theme / Appearance** en Ajustes.

<p align="center">
  <img src="docs/screenshots/preview.png" alt="DSH skin preview" width="46%"/>
  &nbsp;&nbsp;
  <img src="docs/screenshots/settings.png" alt="Theme section in settings" width="46%"/>
</p>

---

## 🏆 Por qué se merece una estrella (frente a las alternativas)

| Capacidad | El nuestro | Otro skinning de DSH | Codex-Dream-Skin (escritorio) |
|------|:---:|:---:|:---:|
| Temas nativos basados en tokens: sin inyección, sin parches al instalador | ✅ | ✅ | ❌ (inyección CDP) |
| Wallpaper personalizado + opacidad/desenfoque | ✅ | parcial | ✅ |
| **Importar/exportar paquetes de temas + enlaces para compartir** | ✅ | ❌ | ✅ (paquetes zip) |
| **Accent personalizado por usuario** | ✅ | ❌ | parcial |
| **Wallpaper 2.0 (URL / degradado / sugerencia por skin / atenuado automático)** | ✅ | ❌ | ✅ |
| Biblioteca local de paquetes + favoritos + sorpréndeme | ✅ | ❌ | parcial |
| Validación + reversión | ✅ | parcial | ✅ |
| **GUI web en el navegador, multiplataforma de forma nativa** | ✅ | ✅ | ❌ (requiere la app de escritorio) |

## ✨ Características

| Capacidad | Descripción |
|------------|-------------|
| 🎨 **8 ajustes predefinidos incluidos (Mirage)** | Cambia al instante desde **Ajustes → Theme / Appearance**, claro y oscuro |
| 🖼️ **Wallpaper personalizado** | Elige una imagen local (comprimida automáticamente a ≤2 MB) y ajusta **opacidad / desenfoque** |
| 🔤 **Superficies interiores opacas** | Las tarjetas, los campos de entrada y las burbujas de mensajes se mantienen legibles: nunca lavadas |
| ↩️ **Restaurar el valor predeterminado** | Vuelve a la apariencia integrada de DSH (sigue el sistema) con un clic |
| 💾 **Persistencia local** | El skin y el wallpaper se guardan en `localStorage` y sobreviven a la recarga |

## 🚀 Capacidades avanzadas (P0)

Diferenciación inspirada en los proyectos de skinning existentes de DSH y en la experiencia de skins de Codex:

| Capacidad | Descripción |
|------------|-------------|
| 📦 **Formato de paquete de temas + importar/exportar** | Un paquete `*.dsh-theme.json` = marcador de formato + versión + manifiesto (id/nombre/autor/esquema/acento/tokens). Importa un archivo, aplícalo con un clic y copia un **enlace para compartir** (codificado en el hash de la URL) |
| 🌈 **Accent por usuario** | Superpone un acento de marca personalizado sobre el skin activo (capa `overrideTokens`, sin tocar el skin): **12 muestras predefinidas con un clic**, un selector de color, **aleatorizar** y limpiar |
| 🖼️ **Wallpaper 2.0** | Imagen local / **URL de imagen** / **degradados predefinidos**, con un **degradado sugerido por skin** y **atenuado automático**; **Recientes** (hasta 5) para volver a cambiar con un clic |
| 🧩 **Biblioteca local de paquetes** | Tus paquetes de temas importados en un solo lugar; **aplicar / marcar favorito / eliminar** con un clic (los 8 skins integrados viven en la fila Skins) |
| ✅ **Retroalimentación de selección clara** | Cambiar de skin actualiza el resaltado marcado/con borde **al instante**: sin recuadros blancos obsoletos |
| 🎲 **Sorpréndeme** | Cambia aleatoriamente a un tema distinto del actual |
| ⭐ **Favoritos** | Marca con una estrella tus skins favoritos y cambia entre ellos rápidamente |
| ✅ **Validación + reversión** | La importación de paquetes valida el formato / los tokens obligatorios / la legalidad de los colores; los fallos o las eliminaciones revierten de forma segura |

## ⚡ Inicio rápido (3 pasos)

```sh
# 1. install
dsh plugin --profile web add dsh-dream-skin
# 2. restart
dsh web
# 3. open Settings → Theme / Appearance → pick a skin → done.
```

> Instala el paquete npm publicado, sin clonar nada. Si `dsh plugin add` informa de un error de workspace, añade `-w`.

## 🧩 Qué tipo de plugin es este

**Un `dsh-plugin` estándar de doble cara del tipo «todo es un plugin», que se carga y se usa exactamente igual que el paquete oficial `ui-theme`.**

El lema de DeepSeek Harness es *todo es un plugin*: los modelos, las herramientas, las sandboxes, las sesiones, la UI
e incluso el propio Agent Loop son plugins. `dsh-dream-skin` distribuye el skinning como un paquete npm que es
**isomorfo con los paquetes oficiales de UI**:

```text
            ┌──────────── dsh-dream-skin (standard dsh-plugin / dual-face) ─────────────┐
            │  dsh.bundle   → cordis.patch.yml inserts the dream-skin entry  (host half)│
            │  dsh.client   → lib/client.js (browser bundle)                (browser half)│
            └───────────────────────────────────────────────────────────────────────────┘
```

- **El comando de instalación es el oficial**: `dsh plugin --profile web add dsh-dream-skin`
- **Usa puntos de extensión oficiales**: `ctx.theme` (registrar temas), `ctx.theme.overrideTokens` (capas de sobrescritura),
  `ctx.slots` (montar la UI en una sección dedicada **Ajustes → Theme / Appearance**).
- **El contrato del manifiesto coincide con los paquetes oficiales**: `dsh.bundle` + `dsh.client` + `exports["./client"]`.

En otras palabras: no estás instalando un script marginal: es un plugin de skins estándar dentro del sistema oficial
de plugins de DSH.

## 🖼️ Vista previa: la serie Mirage

> Las vistas previas de abajo se generan a partir de los **tokens reales** de cada skin: lo que ves es lo que obtienes.

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

## 🎲 Los ajustes predefinidos

| id | esquema | vibra |
|------|--------|------|
| `abyss` | 🕶️ dark | abismo azul profundo de DeepSeek (ancla) |
| `aurora` | 🌌 dark | verde azulado tipo aurora |
| `nebula` | 🪐 dark | púrpura cósmico |
| `ember` | 🔥 dark | naranja brasa cálido |
| `midnight` | 🌚 dark | OLED negro puro |
| `ivory` | 📜 light | marfil cálido / papel |
| `mist` | 🌫️ light | niebla azul fría |
| `rose` | 🌸 light | rosa / rubor |

## 📦 Instalación

Elige cualquiera de las cuatro opciones y, después, **reinicia DSH Web** (la sesión actual se interrumpirá, pero las
sesiones de DSH se guardan en disco y se recuperan tras el reinicio).

### Opción A: desde npm (publicado, **recomendada**)

```sh
dsh plugin --profile web add dsh-dream-skin
```

### Opción B: desde GitHub (fijado a un commit verificado)

```sh
dsh plugin --profile web add 'github:RevolutionLA/dsh-dream-skin#<40-char-commit>'
```

> Fijar el commit de un release significa que los cambios nuevos en `main` nunca alterarán silenciosamente tu copia instalada.

### Opción C: desde un tarball de Release (sin conexión / sin git)

Descarga `dsh-dream-skin-<version>.tgz` desde la página de [Releases](https://github.com/RevolutionLA/dsh-dream-skin/releases)
(incluye el `lib/client.js` ya compilado, por lo que no se ejecuta ningún script de prepare al instalar), y después:

```sh
dsh plugin --profile web add ./dsh-dream-skin-<version>.tgz
```

### Opción D: clonar e instalar desde la ruta local (desarrollo)

```sh
git clone https://github.com/RevolutionLA/dsh-dream-skin.git
cd dsh-dream-skin
dsh plugin --profile web add .
```

> `dsh plugin` ancla las rutas relativas al directorio **desde el que ejecutas el comando**, instalando una dependencia
> de enlace que apunta a tu clon: edita el código, guarda, reinicia DSH: no hace falta reinstalar.

**Reinicia y verifica:**

```sh
dsh web
dsh --profile web --dump-config | grep -A2 dream-skin   # a dream-skin loader entry should appear
```

Abre **Ajustes → Theme / Appearance** para ver las filas **Skins**, **Accent**, **Wallpaper** / **Advanced Wallpaper** y **Theme Packs**.

> La bandera `-w` (workspace) es necesaria en un `add` simple porque cada perfil incluye un `pnpm-workspace.yaml`; pnpm
> trata el directorio del perfil como raíz de workspace, por lo que un `add` simple falla con `ERR_PNPM_ADDING_TO_ROOT`.
> Si tu perfil ya usa el workspace, no tendrás que repetirlo.

## 🔄 Actualizar / desinstalar

**Actualiza a la última versión** (cuando se instaló desde el release de npm):

```sh
dsh plugin --profile web update dsh-dream-skin
dsh web   # restart to pick it up
```

> ¿Te quedas atascado en una versión antigua tras una actualización? La política de minimum-release-age (cadena de
> suministro) de pnpm puede retener un release recién publicado. En el directorio del perfil ejecuta:
> `pnpm add dsh-dream-skin@latest --config.minimumReleaseAge=0` para forzarlo.

**Desinstalar:**

```sh
dsh plugin --profile web remove dsh-dream-skin
dsh web   # restores the official appearance
```

## 🧩 Compatibilidad

| Elemento | Valor |
|------|-------|
| DeepSeek Harness (`dsh`) | `0.1.0-rc.6` (peerDependencies fijadas a `^0.1.0-rc.6`) |
| Node.js | `>=18` |
| Navegador | Chromium / WebKit modernos (variables CSS nativas y `matchMedia`) |

> Al actualizar DSH, sube las peerDependencies en `package.json` en consecuencia.

## ⚙️ Cómo funciona

El sistema de temas de DSH se basa en tokens: la web shell incluye tokens de diseño `--dsw-*`, y `ThemeRuntime` permite
a plugins de terceros registrar temas que sobrescriben la capa de alias (`--dsw-alias-*`). Este paquete es un plugin estándar de doble cara:

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

- **Mitad host** (`lib/index.js`): una capa de parche `dsh.bundle` que inserta la entrada del loader `dream-skin`; `apply`
  es un no-op, exactamente igual que los paquetes `ui-*` incluidos.
- **Mitad del navegador** (`lib/client.js`):
  1. registra los 8 skins mediante `ctx.theme.register(...)`;
  2. restaura el skin guardado y lo aplica con `ctx.theme.setTheme(...)`;
  3. renderiza el wallpaper como un fondo fijo con `z-index:-1` y apila `ctx.theme.overrideTokens(...)` para que
     el lienzo principal (`--dsw-alias-bg-base`) y la barra lateral (`--dsw-specific-sidebar-fill`) queden translúcidos;
  4. escucha `theme/change` y recolorea el lavado del wallpaper al cambiar de skin o esquema;
  5. registra una sección dedicada **Ajustes → Theme / Appearance** (`settings.section`) y monta las cinco
     filas de funciones en el slot `settings.dreamSkin.item`.

Cada skin lleva su `colorScheme` (`light`/`dark`), que controla `body[data-ds-dark-theme]`; las sobrescrituras de tokens
de alias se aplican como propiedades personalizadas en línea en `<body>` mediante el ThemePresenter de ui-layout.

## 💼 Notas sobre la persistencia

- El skin y el wallpaper se guardan en `localStorage` (claves con prefijo `dsh-dream-skin:`), **por navegador**.
- ¿Por qué no en los ajustes del Host? El cable de ajustes del Host solo expone a los clientes del navegador un
  conjunto de namespaces en lista blanca (`WEB_SETTINGS_NAMESPACES` en `dsh-host-apiproxy`), por lo que un namespace
  de terceros respondería `settings-not-exposed`; el propio producto mantiene las preferencias del navegador remoto
  como locales al proceso. `localStorage` respeta ese límite y sobrevive a las recargas.

## 🛠️ Desarrollo / ampliar temas

El bundle del cliente está escrito directamente en el formato `__ModuleLoader__` (la misma forma que tsdown genera para
los paquetes `ui-*` incluidos), por lo que **no se necesita ningún paso de build**. `lib/client.js` solo puede `require`
entidades de la tabla de módulos: semillas de plataforma (`react`, `react/jsx-runtime`, …) y bundles de cliente registrados (`@deepseek-ai/dsh-client-runtime/client`, …).

- **Añadir un skin integrado**: añade un objeto (`id` + `colorScheme` + `tokens`) al array `SKINS` en `lib/client.js`;
  aparecerá automáticamente en Ajustes. Añade una clave `skin.<id>` a **los 8 diccionarios de idioma** (`zh`/`en`/`ja`/`ko`/`es`/`fr`/`de`/`ru`).
- **Publicar un paquete de temas (recomendado)**: sigue [`docs/examples/sample-theme-pack.json`](./docs/examples/sample-theme-pack.json):
  un único `*.dsh-theme.json` es importable en Ajustes y compartible mediante un enlace, sin necesidad de cambios de código.
- **Añadir tus propios wallpapers**: coloca las imágenes en [`wallpapers/`](./wallpapers/) (distribuye solo aquello sobre
  lo que tengas derechos) e impórtalas desde la fila «Wallpaper» de DSH.
- **Validar**: `npm test` (pruebas de humo en VM que cubren la evaluación de la factory, `apply()` y la importación/persistencia de paquetes).
- **Repintar**: consulta los tokens `--dsw-alias-*` (contrato completo en [`docs/themes-spec.md`](./docs/themes-spec.md)).

## 📌 Hoja de ruta

- [x] v0.1: 8 temas + wallpaper personalizado (opacidad / desenfoque) + persistencia local
- [x] Formato de paquete de temas + importar / exportar / enlace para compartir (JSON + manifiesto + validación)
- [x] Accent por usuario + aleatorizar
- [x] Wallpaper 2.0 (URL / degradado / sugerencia por skin / atenuado automático)
- [x] Biblioteca local de paquetes + aplicar con un clic / favoritos / sorpréndeme
- [x] Traducción i18n completa y documentación (zh / en / ja / ko / es / fr / de / ru)
- [ ] Studio en línea de paleta / vista previa de temas (frontend puro, comprobador de contraste)
- [ ] Galería de temas de la comunidad (enviar paquetes al repo / galería en línea)
- [ ] Mejora del primer pintado (FOUC)

## 🤝 Contribuciones

¡Las issues y los PRs son bienvenidos! Lee la [Guía de contribución](./CONTRIBUTING.md) y sigue el
[Código de conducta](./CODE_OF_CONDUCT.md).

## ⭐ Apoya el proyecto

Si te gusta: dale una estrella **⭐** al repo, un pulgar arriba **👍** en npm o compártelo con tus amigos de DSH:
ayuda a que el proyecto sea descubierto y se mantenga. ¿Quieres aportar temas, un Studio en línea o más skins? Únete.

## 🔒 Seguridad

¿Has encontrado un problema de seguridad? No abras una issue pública: consulta la [Política de seguridad](./SECURITY.md).

## 📄 Licencia

[MIT](./LICENSE)

## 🙏 Agradecimientos

- Referencia de arquitectura y API: el paquete cliente
  [ui-theme](https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/client/ui-theme) oficial de DeepSeek Harness.
- Homenaje conceptual: [Codex-Dream-Skin](https://github.com/Fei-Away/Codex-Dream-Skin).
