// Generate a gorgeous HTML mockup of the DSH workspace for each skin,
// using each skin's REAL tokens + 弥散光 gradient. Output → /tmp / preview build dir.
// Screenshot with headless Chrome (vision_html_screenshot) to produce docs/previews/*.png.
const fs = require('node:fs');
const path = require('node:path');
const { SKINS } = require('./skin-data.cjs');

const OUT = path.join(__dirname, '..', 'tmp-skin-mockups');
fs.mkdirSync(OUT, { recursive: true });

function mockup(s) {
  const dark = s.colorScheme === 'dark';
  // tone-appropriate default text/bubble colors
  return `<!DOCTYPE html>
<html lang="zh-CN" ${dark ? 'data-ds-dark-theme' : 'data-ds-light-theme'}>
<head>
<meta charset="utf-8"/>
<title>${s.id}</title>
<style>
  :root{
    --accent:${s.accent};
    --base:${s.base};
    --sidebar:${s.sidebar};
    --sidebar-active:${s.sidebarActive};
    --panel:${s.panel};
    --p-border:${s.panelBorder};
    --bubble:${s.bubble};
    --t1:${s.text1};
    --t2:${s.text2};
    --t3:${s.text3};
    --hover:${s.hover};
    --brand-text:${s.brandText};
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%}
  body{
    font-family:-apple-system,"SF Pro Display","Segoe UI",system-ui,sans-serif;
    color:var(--t1);-webkit-font-smoothing:antialiased;overflow:hidden;
  }
  .bg{position:fixed;inset:0;z-index:0;background:
    ${s.bg.join(',\n    ')};}
  .app{position:absolute;inset:0;z-index:1;display:flex}
  /* sidebar */
  .side{
    width:180px;min-width:180px;background:var(--sidebar);
    border-right:1px solid var(--p-border);
    display:flex;flex-direction:column;padding:16px 12px;gap:3px;
    ${!dark ? 'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);' : ''}
  }
  .brand{display:flex;align-items:center;gap:8px;padding:4px 8px 18px;font-weight:700;font-size:13px}
  .brand .cube{width:22px;height:22px;border-radius:6px;flex:none;
    background:linear-gradient(140deg,${s.accent},${lighten(s.accent)});
    box-shadow:0 2px 12px ${shade(s.accent,.45)}}
  .nav{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:9px;
    font-size:12.5px;color:var(--t2)}
  .nav.act{background:var(--sidebar-active);color:var(--t1)}
  .nav:hover{background:${s.hover}}
  .nav .ic{width:14px;height:14px;border-radius:4px;flex:none;display:grid;place-items:center;font-size:9px;opacity:.85}
  .sp{flex:1}
  .foot{font-size:10.5px;color:var(--t3);padding:10px 8px;border-top:1px solid var(--p-border);line-height:1.6}
  /* main */
  .main{flex:1;display:flex;flex-direction:column;min-width:0}
  .bar{display:flex;align-items:center;gap:10px;padding:14px 26px;font-size:13px;font-weight:650;
    border-bottom:1px solid var(--p-border);
    ${dark ? 'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);' : ''}}
  .bar .title{opacity:.9}
  .badge{margin-left:auto;font-size:10.5px;font-weight:650;color:var(--brand-text);
    background:linear-gradient(135deg,${s.accent},${lighten(s.accent)});
    padding:5px 13px;border-radius:999px;
    box-shadow:0 3px 14px ${shade(s.accent,.4)}}
  .thread{flex:1;display:flex;flex-direction:column;gap:14px;padding:22px 30px;overflow:hidden}
  .msg{max-width:78%;display:flex;gap:10px;align-items:flex-start}
  .ava{width:30px;height:30px;border-radius:9px;flex:none;display:grid;place-items:center;font-weight:700;font-size:11px;color:#fff;
    background:linear-gradient(140deg,${s.accent},${lighten(s.accent)})}
  .bubble{background:var(--bubble);border:1px solid var(--p-border);border-radius:13px;
    padding:11px 15px;font-size:12.5px;line-height:1.65;color:var(--t1);
    box-shadow:0 10px 34px rgba(0,0,0,${dark?'.30':'.08'}), inset 0 1px 0 rgba(255,255,255,${dark?'.05':'.6'});
    ${dark?'':'backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);'}}
  .bubble .met{display:block;font-size:10px;letter-spacing:.3px;font-weight:700;color:var(--accent);margin-bottom:4px}
  .bubble code{background:${s.hover};border-radius:5px;padding:1px 6px;font-size:11px;color:var(--accent)}
  .msg.user{justify-content:flex-end;align-self:flex-end}
  .composer{display:flex;align-items:center;gap:12px;padding:14px 28px 22px;border-top:1px solid var(--p-border);
    ${dark ? 'backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);' : ''}}
  .cinput{flex:1;background:var(--panel);border:1px solid var(--p-border);border-radius:12px;
    padding:12px 16px;font-size:12.5px;color:var(--t3);
    box-shadow:inset 0 1px 4px rgba(0,0,0,${dark?'.25':'.05'})}
  .csend{width:36px;height:36px;border-radius:10px;flex:none;display:grid;place-items:center;font-size:15px;color:var(--brand-text);
    background:linear-gradient(140deg,${s.accent},${lighten(s.accent)});
    box-shadow:0 4px 16px ${shade(s.accent,.4)}}
  .spark{position:absolute;z-index:2;bottom:12px;right:16px;font-size:10px;letter-spacing:.4px;color:var(--t3);opacity:.75}
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="app">
    <div class="side">
      <div class="brand"><div class="cube"></div>DeepSeek Harness</div>
      <div class="nav act"><span class="ic">▸</span>新会话</div>
      <div class="nav"><span class="ic">✦</span>皮肤 M·${s.id}</div>
      <div class="nav"><span class="ic">▦</span>主题库</div>
      <div class="nav"><span class="ic">◉</span>壁纸</div>
      <div class="sp"></div>
      <div class="foot">dsh-dream-skin<br/><span style="opacity:.65">Mirage 幻梦 · ${s.zh}</span></div>
    </div>
    <div class="main">
      <div class="bar"><span class="title">Mirage ${s.labels.en} — ${s.labels.style}</span>
        <span class="badge">dsh-dream-skin</span></div>
      <div class="thread">
        <div class="msg">
          <div class="ava">A</div>
          <div class="bubble"><span class="met">ASSISTANT</span>这是一套<b>${s.zh}</b>，底色 ${s.base}，
            强调色 <code>${s.accent}</code>。${s.labels.style}，弥散光与玻璃面板通透明净。</div>
        </div>
        <div class="msg user">
          <div class="bubble"><span class="met">YOU</span>清透、克制、耐看，质感就位的“高级感”。</div>
        </div>
      </div>
      <div class="composer">
        <div class="cinput">向智能体发送消息…</div>
        <div class="csend">➤</div>
      </div>
    </div>
  </div>
  <div class="spark">Mirage · ${s.labels.en}</div>
</body>
</html>
`;
}

function hexToRgb(h){
  h = h.replace('#','');
  if(h.length===3) h=h.split('').map(c=>c+c).join('');
  return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];
}
function lighten(h,amt=0.32){
  const [r,g,b]=hexToRgb(h);
  const m=(c)=>Math.min(255,Math.round(c+(255-c)*amt));
  return rgb(m(r),m(g),m(b));
}
function rgb(r,g,b){ return `rgb(${r},${g},${b})`; }
function shade(h,apl){
  const [r,g,b]=hexToRgb(h);
  return `rgba(${r},${g},${b},${apl})`;
}

for (const s of Object.values(SKINS)) {
  const file = path.join(OUT, `${s.id}.html`);
  fs.writeFileSync(file, mockup(s), 'utf8');
  console.log('wrote', file);
}
console.log('done', Object.keys(SKINS).length, 'mockups in', OUT);
