// Generate minimal, refined "color-card" previews for each skin —
// ONLY the skin's real 弥散光 gradient + a tiny glass swatch with a few small
// accent/text dots + a discreet name/hex label. Nearly no prose, tiny elements,
// generous whitespace. Screenshot via headless Chrome → docs/previews/*.png.
const fs = require('node:fs');
const path = require('node:path');
const { SKINS } = require('./skin-data.cjs');

const OUT = path.join(__dirname, '..', 'tmp-skin-mockups');
fs.mkdirSync(OUT, { recursive: true });

function colorCard(s) {
  const dark = s.colorScheme === 'dark';
  // small label text color clamped for contrast on dark vs light base
  const label = dark ? 'rgba(230,234,240,.72)' : 'rgba(30,35,48,.66)';
  return `<!DOCTYPE html>
<html lang="zh-CN" ${dark ? 'data-ds-dark-theme' : 'data-ds-light-theme'}>
<head>
<meta charset="utf-8"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:100%;height:100%}
  body{font-family:-apple-system,"SF Pro Display","Segoe UI",system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
  .bg{position:fixed;inset:0;background:
    ${s.bg.join(',\n    ')};}
  /* centered glass card */
  .glass{
    position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);
    width:252px;height:150px;border-radius:20px;
    background:${s.panel};
    border:1px solid ${s.panelBorder};
    box-shadow:0 26px 70px rgba(0,0,0,${dark?'.42':'.12'}),
               inset 0 1px 0 rgba(255,255,255,${dark?'.055':'.7'});
    ${dark?'':'backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);'}
    display:flex;align-items:center;justify-content:center;gap:16px;
  }
  .glass .sun{width:44px;height:44px;border-radius:50%;
    background:linear-gradient(140deg,${s.accent},${lighten(s.accent)});
    box-shadow:0 6px 22px ${shade(s.accent,.4)}}
  .glass .bars{display:flex;flex-direction:column;gap:7px}
  .glass .b{width:74px;height:7px;border-radius:4px}
  .glass .b.one{background:${s.text1};opacity:.85}
  .glass .b.two{background:${s.text2};opacity:.55}
  .glass .b.three{width:56px;background:${s.text3};opacity:.4}
  /* tiny accent pins inside the glass */
  .glass .pins{position:absolute;right:14px;top:14px;display:flex;gap:5px}
  .glass .pin{width:7px;height:7px;border-radius:50%}
  /* discreet bottom-left label */
  .name{position:absolute;left:18px;bottom:16px;font-size:12px;font-weight:700;color:${label};letter-spacing:.4px}
  .hex{position:absolute;left:18px;bottom:6px;font-size:10px;color:${s.text3};opacity:.85;letter-spacing:.3px}
  .tag{position:absolute;right:18px;bottom:16px;font-size:9.5px;font-weight:700;letter-spacing:.6px;
    color:${dark?'#b9c4ff':'#7d8794'};padding:3px 9px;border-radius:999px;
    background:${dark?'rgba(130,150,255,.16)':'rgba(0,0,0,.05)'}}
</style>
</head>
<body>
  <div class="bg"></div>
  <div class="glass">
    <div class="pins">
      <span class="pin" style="background:${s.accent}"></span>
      <span class="pin" style="background:${s.text1}"></span>
      <span class="pin" style="background:${s.text2}"></span>
    </div>
    <div class="sun"></div>
    <div class="bars">
      <span class="b one"></span>
      <span class="b two"></span>
      <span class="b three"></span>
    </div>
  </div>
  <div class="name">${s.labels.en}</div>
  <div class="hex">${s.accent}</div>
  <div class="tag">${s.zh.split(' · ')[0]}</div>
</body>
</html>
`;
}

function hexToRgb(h){
  h = h.replace('#','');
  if(h.length===3) h=h.split('').map(c=>c+c).join('');
  return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];
}
function lighten(h,amt=0.3){
  const [r,g,b]=hexToRgb(h);
  const m=(c)=>Math.min(255,Math.round(c+(255-c)*amt));
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}
function shade(h,apl){
  const [r,g,b]=hexToRgb(h);
  return `rgba(${r},${g},${b},${apl})`;
}

for (const s of Object.values(SKINS)) {
  fs.writeFileSync(path.join(OUT, `${s.id}.html`), colorCard(s), 'utf8');
}
console.log('wrote', Object.keys(SKINS).length, 'color-card mockups →', OUT);
