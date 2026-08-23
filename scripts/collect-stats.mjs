#!/usr/bin/env node
/**
 * collect-stats.mjs — 收集 dsh-dream-skin 的每日 Star 数与下载量，写入 docs/stats.json。
 *
 * 数据来源：
 *   - downloads：npm 官方 API /downloads/range（按天增量），再累加得到「累计下载量」日序列
 *   - stars：GitHub REST API /stargazers（Accept: application/vnd.github.star+json，
 *     返回每次 star 的 starred_at 时间戳），重建「每日累计 Star」日序列
 *
 * 运行方式：
 *   - node scripts/collect-stats.mjs             # 追加/更新今天（GitHub Actions 每日 cron 用）
 *   - GITHUB_TOKEN=... node scripts/collect-stats.mjs   # 带上认证，避免限流（本机不传会降级）
 *
 * 首次运行（无 docs/stats.json）会做「历史回填」：下载量用 npm range 重建整条累计曲线
 * （从发布日 2026-08-15 起）；Star 用 stargazers 时间戳重建每日累计。之后每天只追加当天。
 *
 * 输出：docs/stats.json —— { meta, series: [{ date, stars, downloads }] }
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const STATS_FILE = join(ROOT, 'docs', 'stats.json');

const OWNER = 'RevolutionLA';
const REPO = 'dsh-dream-skin';
const PACKAGE = 'dsh-dream-skin';
const RELEASE_DATE = '2026-08-15'; // npm 包创建日（回填下载量的窗口起点）

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GH_ACCEPT = 'application/vnd.github.star+json';

/** YYYY-MM-DD（UTC）今天 */
function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

async function ghFetch(url) {
  const headers = { 'User-Agent': 'dsh-dream-skin-stats', 'Accept': GH_ACCEPT };
  if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} for ${url}`);
  }
  return res;
}

/**
 * 下载量：npm range 数据（每日增量）。
 * 返回 [{ date, downloads }]（按 date 升序）。
 */
async function fetchNpmDailyDownloads(start, end) {
  const url = `https://api.npmjs.org/downloads/range/${start}:${end}/${PACKAGE}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`npm ${res.status} for ${url}`);
  const json = await res.json();
  return (json.downloads || [])
    .map((d) => ({ date: d.day, downloads: d.downloads || 0 }))
    .filter((d) => d.date >= start && d.date <= end);
}

/**
 * Star 数：拉取全部 stargazers 的时间戳（分页），返回按日期分组计数。
 * 依赖 GitHub token；无 token 时星标历史无法获取，降级为仅当前 star 数。
 */
async function fetchStarHistory() {
  const starred = []; // [{date, count}]
  const countedByDate = new Map();
  let page = 1;
  for (; ; page++) {
    let res;
    try {
      res = await ghFetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/stargazers?per_page=100&page=${page}`
      );
    } catch (e) {
      if (page === 1) {
        console.warn(`[warn] 无法获取 star 历史（${e.message}）。将降级为仅记录当前 star 数。`);
        return null; // 无 token/限流：放弃历史回填
      }
      break; // 后续页失败，保留已拿到的
    }
    const json = await res.json();
    if (!Array.isArray(json) || json.length === 0) break;
    for (const item of json) {
      const date = (item.starred_at || '').slice(0, 10);
      if (date) countedByDate.set(date, (countedByDate.get(date) || 0) + 1);
    }
    // 解析 Link 头判断是否还有下一页
    const link = res.headers.get('link') || '';
    if (!/rel="next"/.test(link)) break;
    if (page > 12) break; // 防御：最多 12 页
  }
  if (countedByDate.size === 0) return null;
  // 排重为累计日序列
  const dates = [...countedByDate.keys()].sort();
  let acc = 0;
  return dates.map((date) => {
    acc += countedByDate.get(date);
    return { date, stars: acc };
  });
}

/** 把 JSON 文件读成对象，不存在则返回 null。 */
async function readStats() {
  try {
    return JSON.parse(await readFile(STATS_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function clampDateRange(start, end) {
  if (end < start) { const t = start; start = end; end = t; }
  return [start, end];
}

/**
 * 合并逻辑：
 *  - 下载量：每天存「累计值」（单调不减）。
 *  - Star：每天存「当天值」。
 *  - 已有历史时，用今天的新值覆盖当天并让后续日期保持单调。
 */
function mergeSeries(existing, dailyDownloads, dailyStars) {
  const map = new Map();
  const norm = (v) => (Number.isFinite(v) ? Math.max(0, Math.round(v)) : 0);

  // 现有历史 → map，并求出「最后一个已记录日期的累计下载量」作为接续基准
  for (const p of existing || []) {
    map.set(p.date, { date: p.date, stars: norm(p.stars), downloads: norm(p.downloads) });
  }
  const sortedDates = [...map.keys()].sort();
  const lastKnownDate = sortedDates.at(-1);
  // 基准 = 已有数据里晚于 dailyDownloads 首日之前的最后累计值；默认 0
  const dlBaseDate =
    dailyDownloads.length && lastKnownDate != null && lastKnownDate > dailyDownloads[0].date
      ? lastKnownDate
      : null;
  const baseCum = dlBaseDate != null ? norm(map.get(dlBaseDate).downloads) : 0;

  // 下载量累计：对新日期（晚于已有记录），用「baseCum + 当日增量」逐日累加。
  // 对已存在日期的累计值原样保留（不再用增量覆盖，避免把 0 增量写坏既有累计）。
  let dlAcc = baseCum;
  for (const r of dailyDownloads || []) {
    const exists = map.has(r.date);
    if (exists) continue; // 已有累计，跳过（<=dlBaseDate 的那部分）
    dlAcc += norm(r.downloads);
    const cur = map.get(r.date) || { date: r.date, stars: 0, downloads: 0 };
    cur.downloads = dlAcc;
    map.set(r.date, cur);
  }

  // Star 回填：若拿到了完整星标历史，则用它整体重建 star 曲线（丢弃 existing 的旧 star）。
  // dailyStars 是「每日累计 star」的升序序列。其首日之前的日期 star=0，后续保持单调。
  if (dailyStars && dailyStars.length) {
    // 先清空旧 star，避免演示/旧值与真实回填混杂
    for (const p of map.values()) p.stars = 0;
    for (const s of dailyStars) {
      const rec = map.get(s.date);
      if (rec) {
        rec.stars = norm(s.stars);
      } else {
        map.set(s.date, { date: s.date, stars: norm(s.stars), downloads: 0 });
      }
    }
    // star 单调兜底：若某天 star 为空但后续有值，向前填充第一个已知值之前的日期为 0，
    // 后续日期用最近的已知 star（防止某日 token 拉取不全导致回退）。
    const stDates = [...map.keys()].sort();
    let lastStar = 0;
    for (const d of stDates) {
      const p = map.get(d);
      if (p.stars > 0) lastStar = p.stars;
    }
    // 对缺 star 的日子做前向填充（使用它之前的最后一个已知 star）
    let runVal = 0;
    for (const d of stDates) {
      const p = map.get(d);
      if (p.stars > 0) { runVal = p.stars; continue; }
      p.stars = runVal;
    }
    void lastStar;
  }

  const series = [...map.values()]
    .sort((a, b) => (a.date < b.date ? -1 : 1));
  return series;
}

async function main() {
  const today = todayUTC();
  const existing = await readStats();

  let start = existing
    ? existing.series[existing.series.length - 1].date
    : RELEASE_DATE;
  const [s, e] = clampDateRange(start, today);
  const end = today;

  console.log(`[collect] 拉取 npm 每日下载量: ${s} ~ ${end}`);
  const dailyDownloads = await fetchNpmDailyDownloads(s, end);
  if (!dailyDownloads.length) {
    console.warn('[warn] npm 未返回任何下载数据行。');
  }

  console.log('[collect] 拉取 GitHub star 历史...');
  const dailyStars = await fetchStarHistory();

  const series = mergeSeries(existing?.series, dailyDownloads, dailyStars);

  const out = {
    meta: {
      owner: OWNER,
      repo: REPO,
      package: PACKAGE,
      release: RELEASE_DATE,
      generatedAt: new Date().toISOString(),
    },
    series,
  };

  await writeFile(STATS_FILE, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`[collect] 已写出 ${series.length} 天数据 -> ${STATS_FILE}`);
  console.log(
    `[collect] 最新: ${series.at(-1).date}  stars=${series.at(-1).stars}  downloads=${series.at(-1).downloads}`
  );
}

main().catch((err) => {
  console.error('[collect] 失败:', err.message);
  process.exit(1);
});
