#!/usr/bin/env node
/**
 * render-stats-svg.mjs — 从 docs/stats.json 渲染一张「每日 Star × 累计下载量」双轴折线图 SVG。
 *
 *   - 左纵轴 = 累计下载量（npm）
 *   - 右纵轴 = Star 数（GitHub）
 *   - 经典折线图：两条斜向上的折线，配轻量网格、圆点、图例与标题
 *
 * 输出：docs/stats.svg（供 README 引用）。
 *
 * 用法：
 *   node scripts/render-stats-svg.mjs            # 读取 docs/stats.json 输出 docs/stats.svg
 *   node scripts/render-stats-svg.mjs --minimal  # 生成一个极简尺寸（快速预览用）
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STATS_FILE = join(ROOT, 'docs', 'stats.json');
const SVG_FILE = join(ROOT, 'docs', 'stats.svg');

// ---------- 常量（可调） ----------
const W = 960; // 总画布宽
const H = 400; // 总画布高
const PAD = { left: 74, right: 74, top: 46, bottom: 44 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const COL_DOWNLOAD = '#22b8cf'; // 左轴 下载量：清冷青
const COL_STAR = '#9a6bff';      // 右轴 Star：柔和紫
const GRID = '#e6e8f0';
const AXIS = '#9aa0b4';
const TEXT = '#3a4052';
const TITLE = '#20242f';
const POINT = { r: 3 };

// 双轴 tick 数量
const TICKS = 5;

// 用于纵轴上取整到「友好」刻度值：把 v 向方向上取到该量级的一个干净刻度。
// k∈{1,1.25,1.5,2,2.5,3,4,5,6,8,10}，保证 max 不会比数据虚高太多。
function niceCeil(v, base = 10) {
  if (v <= 0) return 0;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  const table = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  let k = table[0];
  for (const t of table) {
    if (t >= n - 1e-6) { k = t; break; }
    k = t;
  }
  const r = k * p;
  // 保证比原始 v 只高一点点（不留太大空档）
  return r < v ? (k + 0.5) * p : r;
}

function niceRound(v, ticks) {
  if (v <= 0) return [0, ticks, 1];
  // step 基于 v/ticks 的量级向上取整，再用 step*ticks 得一个「满刻度」max
  const step = niceCeil(v / ticks);
  let max = step * ticks;
  while (max < v) max += step;
  return [0, max, step];
}

function fmt(n) {
  if (n >= 10000) {
    const v = n / 1000;
    return v % 1 === 0 ? `${v}k` : `${v.toFixed(1)}k`;
  }
  if (n >= 1000) {
    const v = n / 1000;
    return (Math.round(v * 10) / 10) === v ? `${v.toFixed(v % 1 === 0 ? 0 : 1)}k` : `${n}`;
  }
  return `${n}`;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function mapX(i, n) {
  if (n <= 1) return PAD.left + PLOT_W / 2;
  return PAD.left + (PLOT_W * i) / (n - 1);
}

function yDL(v, dlMax) {
  return PAD.top + PLOT_H * (1 - v / dlMax);
}
function yST(v, stMax) {
  return PAD.top + PLOT_H * (1 - v / stMax);
}

function polyline(points, { stroke, width = 2.5, fill = 'none', dash = null, opacity = 1 }) {
  const pts = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return `<polyline points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"${
    dash ? ` stroke-dasharray="${dash}"` : ''
  } stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>`;
}

function circles(points, color) {
  return points
    .map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${POINT.r}" fill="#fff" stroke="${color}" stroke-width="1.8"/>`)
    .join('');
}

function render(series) {
  if (!series || series.length < 1) {
    throw new Error('stats.json 没有数据（series 为空）。先运行 collect-stats.mjs。');
  }

  const dates = series.map((p) => p.date);
  const dlMax0 = Math.max(...series.map((p) => p.downloads));
  const stMax0 = Math.max(...series.map((p) => p.stars));
  const n = series.length;
  const [, dlTop] = niceRound(dlMax0 * 1.05, TICKS);
  const [, stTop] = niceRound(stMax0 * 1.08, TICKS);

  // 网格 + 刻度
  let grid = '';
  let dlLabels = '';
  let stLabels = '';
  for (let t = 0; t <= TICKS; t++) {
    const g = (dlTop / TICKS) * t;
    const y = yDL(g, dlTop);
    const strokeColor = t === 0 ? '#ccd0dd' : GRID;
    grid += `<line x1="${PAD.left}" y1="${y.toFixed(1)}" x2="${W - PAD.right}" y2="${y.toFixed(1)}" stroke="${strokeColor}" stroke-width="1"/>`;
    dlLabels += `<text x="${PAD.left - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="10" fill="${AXIS}">${fmt(Math.round(g))}</text>`;
    stLabels += `<text x="${W - PAD.right + 8}" y="${(y + 3).toFixed(1)}" text-anchor="start" font-size="10" fill="${AXIS}">${fmt(Math.round(stTop - (dlTop - g) * (stTop / dlTop)))}</text>`;
  }

  // X 轴日期刻度（最多放 ~10 个，防重叠）
  const labelEvery = Math.max(1, Math.ceil(n / 10));
  let xLabels = '';
  for (let i = 0; i < n; i++) {
    if (i % labelEvery !== 0 && i !== n - 1) continue;
    const x = mapX(i, n);
    xLabels += `<text x="${x.toFixed(1)}" y="${PAD.top + PLOT_H + 18}" text-anchor="middle" font-size="9" fill="${AXIS}">${dates[i].slice(5)}</text>`;
  }

  // 双边折线
  const dlPts = [];
  const stPts = [];
  for (let i = 0; i < n; i++) {
    const d = series[i];
    dlPts.push([mapX(i, n), yDL(d.downloads, dlTop)]);
    stPts.push([mapX(i, n), yST(d.stars, stTop)]);
  }

  const rangeLabel = `${series[0].date} → ${series[n - 1].date}`;
  const badge = `<rect x="${PAD.left}" y="${PAD.top - 30}" width="${8 + rangeLabel.length * 6.2 + 10}" height="16" rx="8" fill="#eef3ff"/>
    <text x="${PAD.left + 10}" y="${PAD.top - 18}" font-size="10" fill="${TEXT}">${esc(rangeLabel)}</text>`;

  const legend = `
    <g transform="translate(${W - PAD.right - 250}, ${PAD.top - 30})">
      <line x1="0" y1="8" x2="26" y2="8" stroke="${COL_DOWNLOAD}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="20" cy="8" r="2.4" fill="#fff" stroke="${COL_DOWNLOAD}" stroke-width="1.5"/>
      <text x="31" y="12" font-size="11" fill="${TEXT}">累计下载量</text>
      <line x1="128" y1="8" x2="154" y2="8" stroke="${COL_STAR}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="148" cy="8" r="2.4" fill="#fff" stroke="${COL_STAR}" stroke-width="1.5"/>
      <text x="159" y="12" font-size="11" fill="${TEXT}">Star</text>
    </g>
  `;

  const title = `<text x="${W / 2}" y="${22}" text-anchor="middle" font-size="14" font-weight="600" fill="${TITLE}">dsh-dream-skin · 每日成长曲线</text>`;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="dsh-dream-skin 每日 Star 与累计下载量双轴折线图">
  <rect width="${W}" height="${H}" fill="#ffffff"/>
  ${title}
  ${badge}
  ${legend}
  ${grid}
  <g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif">
    ${dlLabels}
    ${stLabels}
  </g>
  <!-- 轴线 -->
  <line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${PAD.top + PLOT_H}" stroke="${AXIS}" stroke-width="1"/>
  <line x1="${PAD.left}" y1="${PAD.top + PLOT_H}" x2="${W - PAD.right}" y2="${PAD.top + PLOT_H}" stroke="${AXIS}" stroke-width="1"/>
  ${polyline(dlPts, { stroke: COL_DOWNLOAD, width: 2.6 })}
  ${polyline(stPts, { stroke: COL_STAR, width: 2.4 })}
  ${circles(dlPts, COL_DOWNLOAD)}
  ${circles(stPts, COL_STAR)}
  ${xLabels}
</svg>
`;
  return svg;
}

async function main() {
  const stats = JSON.parse(await readFile(STATS_FILE, 'utf8'));
  const svg = render(stats.series);
  await writeFile(SVG_FILE, svg, 'utf8');
  console.log(`[render] 已输出 ${SVG_FILE}（${stats.series.length} 天）`);
  console.log(
    `[render] 范围 ${stats.series[0].date} ~ ${stats.series.at(-1).date}`
  );
}

main().catch((err) => {
  console.error('[render] 失败:', err.message);
  process.exit(1);
});
