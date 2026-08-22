// Shared per-skin visual data for preview generation.
// Values mirror lib/client.js SKINS tokens + wallpapersSuggestionsFor 弥散光背景,
// so the preview is "所见即所得" against the real skin.

const SKINS = {
  abyss: {
    id: "abyss", colorScheme: "dark", zh: "沉静蓝 · 深海渊",
    labels: { en: "abyss", style: "靛蓝 · iOS/Linear 清透冷调", tag: "暗" },
    accent: "#5e6ad2",
    base: "#101014",
    bg: [
      "radial-gradient(1100px 620px at 82% -8%, rgba(94,106,210,.38), transparent 60%)",
      "radial-gradient(820px 520px at 10% 110%, rgba(56,189,248,.22), transparent 55%)",
      "radial-gradient(1300px 820px at 48% 44%, rgba(30,34,48,.5), transparent 72%)",
      "linear-gradient(165deg,#121216 0%,#0d0d11 55%,#101016 100%)"
    ],
    sidebar: "rgba(16,16,20,.92)", sidebarActive: "rgba(255,255,255,.09)",
    panel: "rgba(255,255,255,.06)", panelBorder: "rgba(255,255,255,.07)",
    bubble: "rgba(37,42,58,.9)", text1: "#f4f5f7", text2: "#a5adb8", text3: "#7b838f",
    hover: "rgba(94,106,210,.16)", brandText: "#fff"
  },
  aurora: {
    id: "aurora", colorScheme: "dark", zh: "极光青 · 冷冽清透",
    labels: { en: "aurora", style: "青绿 → 天蓝低温系", tag: "暗" },
    accent: "#2dd4bf",
    base: "#0e1316",
    bg: [
      "radial-gradient(1100px 620px at 84% -8%, rgba(45,212,191,.32), transparent 60%)",
      "radial-gradient(820px 520px at 8% 110%, rgba(56,189,248,.16), transparent 55%)",
      "radial-gradient(1300px 820px at 50% 44%, rgba(16,32,32,.5), transparent 72%)",
      "linear-gradient(165deg,#0f151a 0%,#0c1212 55%,#0e1518 100%)"
    ],
    sidebar: "rgba(14,19,22,.92)", sidebarActive: "rgba(255,255,255,.085)",
    panel: "rgba(255,255,255,.05)", panelBorder: "rgba(110,231,183,.12)",
    bubble: "rgba(30,42,44,.9)", text1: "#eefaf4", text2: "#9fc9b8", text3: "#74a494",
    hover: "rgba(45,212,191,.14)", brandText: "#03211b"
  },
  nebula: {
    id: "nebula", colorScheme: "dark", zh: "星云紫 · 深邃漫射",
    labels: { en: "nebula", style: "紫青 · 神秘弥漫", tag: "暗" },
    accent: "#8b7cf6",
    base: "#12101a",
    bg: [
      "radial-gradient(1100px 620px at 82% -8%, rgba(139,124,246,.34), transparent 60%)",
      "radial-gradient(820px 520px at 12% 110%, rgba(126,96,220,.18), transparent 55%)",
      "radial-gradient(1300px 820px at 48% 44%, rgba(28,24,44,.5), transparent 72%)",
      "linear-gradient(165deg,#18141f 0%,#120f1c 55%,#14111e 100%)"
    ],
    sidebar: "rgba(18,16,26,.92)", sidebarActive: "rgba(255,255,255,.085)",
    panel: "rgba(255,255,255,.05)", panelBorder: "rgba(196,181,253,.12)",
    bubble: "rgba(40,36,56,.9)", text1: "#f3f0fb", text2: "#b6a8d9", text3: "#8a7cb0",
    hover: "rgba(139,124,246,.14)", brandText: "#0d0a1c"
  },
  ember: {
    id: "ember", colorScheme: "dark", zh: "余烬橙 · 暖光收敛",
    labels: { en: "ember", style: "暖橙 · 克制干净", tag: "暗" },
    accent: "#f59e5b",
    base: "#16110d",
    bg: [
      "radial-gradient(1100px 620px at 84% -8%, rgba(245,158,91,.30), transparent 60%)",
      "radial-gradient(820px 520px at 8% 110%, rgba(200,96,40,.16), transparent 55%)",
      "radial-gradient(1300px 820px at 50% 44%, rgba(34,24,16,.5), transparent 72%)",
      "linear-gradient(165deg,#1c1712 0%,#161210 55%,#191310 100%)"
    ],
    sidebar: "rgba(22,17,13,.92)", sidebarActive: "rgba(255,255,255,.085)",
    panel: "rgba(255,255,255,.05)", panelBorder: "rgba(253,186,116,.12)",
    bubble: "rgba(48,38,28,.9)", text1: "#fdf0e6", text2: "#d0a98a", text3: "#a48266",
    hover: "rgba(245,158,91,.14)", brandText: "#1f0f06"
  },
  midnight: {
    id: "midnight", colorScheme: "dark", zh: "午夜黑 · 极简 OLED",
    labels: { en: "midnight", style: "中性纯黑 · 沉浸", tag: "暗" },
    accent: "#7c8cff",
    base: "#0b0b0e",
    bg: [
      "radial-gradient(1000px 600px at 82% -8%, rgba(124,140,255,.22), transparent 60%)",
      "radial-gradient(1300px 800px at 48% 44%, rgba(24,24,30,.5), transparent 74%)",
      "linear-gradient(165deg,#0e0e12 0%,#08080c 55%,#0c0c10 100%)"
    ],
    sidebar: "rgba(11,11,14,.92)", sidebarActive: "rgba(255,255,255,.085)",
    panel: "rgba(255,255,255,.05)", panelBorder: "rgba(255,255,255,.07)",
    bubble: "rgba(30,30,38,.9)", text1: "#f2f2f6", text2: "#a4a4b2", text3: "#787884",
    hover: "rgba(124,140,255,.12)", brandText: "#05050f"
  },
  ivory: {
    id: "ivory", colorScheme: "light", zh: "IOS 扁平 · 纸感清爽",
    labels: { en: "ivory", style: "极简白 · iOS 系统灰 + 蓝", tag: "亮" },
    accent: "#0071e3",
    base: "#f4f4f6",
    bg: [
      "radial-gradient(1000px 560px at 84% -6%, rgba(196,164,120,.28), transparent 60%)",
      "radial-gradient(780px 500px at 10% 110%, rgba(210,190,235,.20), transparent 58%)",
      "radial-gradient(1200px 780px at 50% 44%, rgba(255,255,255,.9), transparent 74%)",
      "linear-gradient(170deg,#faf7f1 0%,#f5f1e8 55%,#f8f4ec 100%)"
    ],
    sidebar: "#f4f4f6", sidebarActive: "#e4e4e8",
    panel: "rgba(255,255,255,.96)", panelBorder: "rgba(0,0,0,.08)",
    bubble: "#ffffff", text1: "#1c1c1e", text2: "#6e6e73", text3: "#86868b",
    hover: "rgba(0,113,227,.10)", brandText: "#fff"
  },
  mist: {
    id: "mist", colorScheme: "light", zh: "液态玻璃 · 清透晨雾",
    labels: { en: "mist", style: "半透明毛玻璃 + 冷蓝光晕", tag: "亮" },
    accent: "#2196f3",
    base: "#e9eef6",
    bg: [
      "radial-gradient(1000px 560px at 84% -6%, rgba(159,190,245,.30), transparent 60%)",
      "radial-gradient(780px 500px at 10% 110%, rgba(140,196,220,.20), transparent 58%)",
      "radial-gradient(1200px 780px at 50% 44%, rgba(255,255,255,.92), transparent 74%)",
      "linear-gradient(170deg,#f6f8fb 0%,#f1f5fa 55%,#f5f8fc 100%)"
    ],
    sidebar: "rgba(255,255,255,.5)", sidebarActive: "rgba(255,255,255,.72)",
    panel: "rgba(255,255,255,.6)", panelBorder: "rgba(30,41,59,.10)",
    bubble: "rgba(255,255,255,.7)", text1: "#0f1b33", text2: "#3d5270", text3: "#6b80a0",
    hover: "rgba(33,150,243,.12)", brandText: "#fff"
  },
  rose: {
    id: "rose", colorScheme: "light", zh: "蔷薇粉 · Material 现代",
    labels: { en: "rose", style: "明快品牌粉 + 紫点缀", tag: "亮" },
    accent: "#e91e63",
    base: "#f7f0f3",
    bg: [
      "radial-gradient(1000px 560px at 84% -6%, rgba(214,120,160,.26), transparent 60%)",
      "radial-gradient(780px 500px at 10% 110%, rgba(230,180,205,.18), transparent 58%)",
      "radial-gradient(1200px 780px at 50% 44%, rgba(255,255,255,.92), transparent 74%)",
      "linear-gradient(170deg,#f8f4f6 0%,#f4eef2 55%,#f7f2f5 100%)"
    ],
    sidebar: "#f6e9ef", sidebarActive: "#f5d4e2",
    panel: "rgba(255,255,255,.98)", panelBorder: "rgba(154,55,118,.12)",
    bubble: "#ffffff", text1: "#3a1424", text2: "#8a4a63", text3: "#a86b82",
    hover: "rgba(233,30,99,.10)", brandText: "#fff"
  }
};

module.exports = { SKINS };
