// Oracle guide site — Pop design (Golf's pick): chunky borders, light/dark mode, TOC + scrollspy.
import { readFileSync, writeFileSync } from 'node:fs'

const GIST = 'https://gist.github.com/mymint0840-web/71b9bc690e67686c64831fbc72b592bb'
const BOOK1 = 'https://mymint0840-web.github.io/ai-assistant-guide-web/'

// inject ids into h2s and collect TOC entries
const toc = []
let i = 0
const body = readFileSync('body.html', 'utf8').replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
  i += 1
  const id = `s-${i}`
  toc.push({ id, label: inner.replace(/<[^>]+>/g, '').trim() })
  return `<h2 id="${id}">${inner}</h2>`
})
const tocLinks = toc.map((t) => `<a href="#${t.id}" data-target="${t.id}">${t.label}</a>`).join('\n')

const html = `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Oracle — AI ที่มีตัวตน มีความจำ และโตไปกับคุณ</title>
<meta name="description" content="คู่มือภาษาไทย: รู้จัก Oracle, มี Oracle ตัวแรกของตัวเอง, ทำงานเต็มระบบหลายตัว และข้ามเครื่อง — เขียนโดย Oracle ตัวจริง">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Mitr:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root {
  --cream: #fff8e7; --ink: #000; --paper: #fff;
  --yellow: #ffd43b; --pink: #ff8fab; --mint: #8ce99a; --sky: #74c0fc; --lav: #d0bfff;
  --bd: 3px solid var(--ink);
  --pop: 6px 6px 0 var(--ink);
  --pop-sm: 4px 4px 0 var(--ink);
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: 'Mitr', sans-serif; background: var(--cream); color: var(--ink); line-height: 1.9; font-weight: 400;
  background-image: radial-gradient(rgba(0,0,0,.08) 1.5px, transparent 1.5px); background-size: 26px 26px; }
a { color: var(--ink); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; }
a:hover { background: var(--yellow); }
.wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

/* ── hero ── */
.hero { padding: 70px 0 60px; text-align: center; border-bottom: var(--bd);
  background: repeating-linear-gradient(-45deg, var(--cream), var(--cream) 28px, #f3e8ff 28px, #f3e8ff 56px); }
.hero .kicker { display: inline-block; font-size: .9rem; font-weight: 600; background: var(--lav);
  border: var(--bd); box-shadow: var(--pop-sm); padding: 6px 18px; margin-bottom: 26px;
  transform: rotate(-2deg); border-radius: 4px; color: #111; }
.hero .headline-card { display: inline-block; background: var(--yellow); border: var(--bd); box-shadow: var(--pop);
  padding: 26px 34px 20px; margin: 0 auto 18px; transform: rotate(-1deg); border-radius: 8px; max-width: 860px; }
.hero h1 { font-size: clamp(1.7rem, 4.6vw, 2.9rem); font-weight: 700; line-height: 1.4; margin: 0; color: #111; }
.hero p.sub { font-size: clamp(1rem, 2.2vw, 1.15rem); max-width: 660px; margin: 14px auto 36px; }
.cta { display: flex; gap: 18px; justify-content: center; flex-wrap: wrap; margin-bottom: 54px; }
.btn { font: inherit; font-weight: 600; padding: 13px 28px; cursor: pointer; border: var(--bd);
  box-shadow: var(--pop); font-size: 1.05rem; border-radius: 8px; transition: transform .1s, box-shadow .1s; color: #111; }
.btn.primary { background: var(--mint); }
.btn.ghost { background: var(--sky); }
.btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--ink); }
.btn:active { transform: translate(6px, 6px); box-shadow: 0 0 0 var(--ink); }

/* memory demo — same chat, 30 days apart */
.demo { max-width: 500px; margin: 0 auto; text-align: left; background: var(--paper);
  border: var(--bd); box-shadow: var(--pop); padding: 22px 20px 16px; border-radius: 12px; transform: rotate(.6deg); }
.demo .day { font-size: .78rem; font-weight: 600; text-align: center; margin: 10px 0 2px; opacity: .65; }
.msg { opacity: 0; transform: translateY(10px); animation: popIn .45s forwards;
  border: 2.5px solid var(--ink); padding: 9px 15px; margin: 10px 0; font-size: .92rem; max-width: 88%; border-radius: 14px; color: #111; }
.msg.user { background: var(--sky); margin-left: auto; animation-delay: .4s; box-shadow: 3px 3px 0 var(--ink); }
.msg.bot  { background: var(--yellow); animation-delay: 1.2s; box-shadow: -3px 3px 0 var(--ink); }
.msg.user.m2 { animation-delay: 2.4s; } .msg.bot.m2 { animation-delay: 3.4s; }
@keyframes popIn { to { opacity: 1; transform: none; } }

/* feature cards */
.features { padding: 64px 0 14px; }
.features h2 { text-align: center; font-size: 1.8rem; font-weight: 700; margin: 0 0 38px; }
.features h2 span { background: var(--pink); border: var(--bd); box-shadow: var(--pop-sm); padding: 4px 22px;
  display: inline-block; transform: rotate(-1.2deg); border-radius: 6px; color: #111; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 22px; }
.feat { border: var(--bd); box-shadow: var(--pop); padding: 20px 22px; border-radius: 10px; background: var(--paper);
  transition: transform .12s, box-shadow .12s; color: #111; }
.feat:nth-child(6n+1) { background: var(--yellow); transform: rotate(-.5deg); }
.feat:nth-child(6n+2) { background: var(--mint); transform: rotate(.5deg); }
.feat:nth-child(6n+3) { background: var(--sky); transform: rotate(-.4deg); }
.feat:nth-child(6n+4) { background: var(--pink); transform: rotate(.6deg); }
.feat:nth-child(6n+5) { background: var(--lav); transform: rotate(-.6deg); }
.feat:nth-child(6n+6) { background: var(--yellow); transform: rotate(.4deg); }
.feat:hover { transform: rotate(0) translate(-2px, -2px); box-shadow: 8px 8px 0 var(--ink); }
.feat .ic { font-size: 2rem; }
.feat .t { font-weight: 600; font-size: 1.05rem; margin: 6px 0 4px; }
.feat .d { font-size: .9rem; line-height: 1.7; }

/* ── reading area ── */
.reader { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 36px; padding: 50px 0 80px; align-items: start; }
aside.toc { position: sticky; top: 16px; max-height: calc(100vh - 32px); overflow-y: auto;
  background: var(--paper); border: var(--bd); box-shadow: var(--pop); border-radius: 10px; padding: 18px 12px 18px 18px; }
.toc .toc-title { font-weight: 700; font-size: .95rem; margin-bottom: 10px; display: inline-block;
  background: var(--yellow); border: 2px solid var(--ink); padding: 2px 12px; transform: rotate(-1deg); border-radius: 4px; color: #111; }
.toc a { display: block; font-size: .88rem; padding: 6px 10px; line-height: 1.5; text-decoration: none;
  border: 2px solid transparent; border-radius: 6px; margin: 2px 0; }
.toc a:hover { background: var(--yellow); border-color: var(--ink); color: #111; }
.toc a.on { background: var(--mint); border-color: var(--ink); box-shadow: 3px 3px 0 var(--ink); font-weight: 600; color: #111; }

article { min-width: 0; background: var(--paper); border: var(--bd); box-shadow: var(--pop);
  border-radius: 10px; padding: 34px clamp(20px, 4vw, 44px) 46px; }
article h1 { font-size: 1.65rem; font-weight: 700; line-height: 1.45; margin: 2.4em 0 .6em; }
article h2 { font-size: 1.4rem; font-weight: 700; line-height: 1.45; margin: 2.6em 0 .7em; padding-top: .7em;
  border-top: 3px dashed var(--ink); }
article h2::before { content: ""; display: inline-block; width: 14px; height: 14px; border: 2.5px solid var(--ink);
  background: var(--pink); margin-right: 12px; border-radius: 3px; transform: rotate(8deg); }
article h3 { font-size: 1.12rem; font-weight: 600; margin: 1.8em 0 .5em; }
article h3::before { content: "▸ "; }
article > :first-child { margin-top: 0; }
article p, article li { color: #1a1a1a; }
article strong { background: var(--yellow); padding: 0 4px; border-radius: 3px; color: #111; }
article table { border-collapse: collapse; width: 100%; margin: 1.2em 0; font-size: .92rem; display: block; overflow-x: auto; }
article th { background: var(--sky); font-weight: 600; color: #111; }
article th, article td { border: 2px solid var(--ink); padding: 9px 13px; text-align: left; vertical-align: top; }
article pre { background: #16181d; color: #f1f3f5; border: var(--bd); box-shadow: var(--pop-sm); border-radius: 10px;
  padding: 38px 18px 16px; overflow-x: auto; font-size: .84rem; line-height: 1.65; position: relative; }
article pre::before { content: "● ● ●"; position: absolute; top: 10px; left: 14px; font-size: .6rem; letter-spacing: 3px; color: #ffd43b; }
article code { font-family: "SF Mono", Menlo, Consolas, monospace; }
article pre code { color: #c3e6ff; }
article :not(pre) > code { background: var(--mint); border: 1.5px solid var(--ink); padding: 1px 7px; border-radius: 5px; font-size: .85em; color: #111; }
article blockquote { margin: 1.2em 0; padding: 13px 18px; background: var(--cream);
  border: 2.5px solid var(--ink); border-left-width: 10px; border-radius: 6px; box-shadow: var(--pop-sm); }
article blockquote p { margin: .3em 0; }
article hr { border: none; border-top: 3px dashed var(--ink); margin: 2.5em 0; }
article img { max-width: 100%; border: var(--bd); border-radius: 8px; }

footer { border-top: var(--bd); padding: 34px 24px 60px; text-align: center; font-size: .9rem; background: var(--yellow); color: #111; }
footer p { margin: .5em 0; }
footer a { color: #111; }

/* ── dark mode ── */
body.dark {
  --cream: #17171d; --ink: #f2f2ec; --paper: #222230;
  background-image: radial-gradient(rgba(255,255,255,.07) 1.5px, transparent 1.5px);
}
body.dark .hero { background: repeating-linear-gradient(-45deg, #17171d, #17171d 28px, #221c2e 28px, #221c2e 56px); }
body.dark article p, body.dark article li { color: #e3e3dc; }
body.dark a:hover { color: #111; }
body.dark footer a { color: #111; }

.mode-toggle { position: fixed; top: 16px; right: 16px; z-index: 60; font-size: 1.25rem; line-height: 1;
  background: var(--paper); border: var(--bd); box-shadow: var(--pop-sm); border-radius: 999px;
  padding: 10px 13px; cursor: pointer; transition: transform .1s, box-shadow .1s; }
.mode-toggle:hover { transform: translate(1px, 1px); box-shadow: 2px 2px 0 var(--ink); }

/* mobile */
.toc-fab { display: none; }
@media (max-width: 900px) {
  .reader { grid-template-columns: 1fr; }
  aside.toc { position: fixed; inset: auto 14px 84px 14px; top: auto; z-index: 50; max-height: 60vh;
    transform: translateY(20px); opacity: 0; pointer-events: none; transition: .2s; }
  aside.toc.open { transform: none; opacity: 1; pointer-events: auto; }
  .toc-fab { display: flex; position: fixed; bottom: 20px; right: 18px; z-index: 51; gap: 8px; align-items: center;
    font: inherit; font-weight: 700; background: var(--pink); color: #111; border: var(--bd); border-radius: 999px;
    padding: 13px 22px; cursor: pointer; box-shadow: var(--pop); }
  .toc-fab:active { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--ink); }
}
</style>
</head>
<body>
<script>if (localStorage.getItem('oracle-mode') === 'dark') document.body.classList.add('dark')</script>
<button class="mode-toggle" onclick="toggleMode()" title="สลับโหมดสว่าง/มืด">🌙</button>

<section class="hero">
  <div class="wrap">
    <div class="kicker">🔮 เล่มที่ 1 — จุดเริ่มต้นของซีรีส์</div>
    <div class="headline-card">
      <h1>Oracle — AI ที่มีตัวตน มีความจำ<br>และโตไปกับคุณ</h1>
    </div>
    <p class="sub">เลิกสอน AI ใหม่ทุกเช้า — รู้จักวิธีมี AI ที่จำคุณได้ จำงานได้ จำบทเรียนได้ ตลอดไป · เขียนโดย Oracle ตัวจริง</p>
    <div class="cta">
      <button class="btn primary" onclick="document.getElementById('reader').scrollIntoView({behavior:'smooth'})">📖 เริ่มอ่าน</button>
      <a class="btn ghost" style="display:inline-block;text-decoration:none" href="${BOOK1}">เล่มที่ 2: ผู้ช่วย AI บน Discord →</a>
    </div>
    <div class="demo">
      <div class="day">— วันแรกที่รู้จักกัน —</div>
      <div class="msg user">ผมชอบกาแฟดำ ไม่ใส่น้ำตาล จำไว้นะ</div>
      <div class="msg bot">รับทราบครับ บันทึกลงความทรงจำแล้ว ☕</div>
      <div class="day">— 30 วันต่อมา —</div>
      <div class="msg user m2">เดี๋ยวมีลูกค้ามาคุยที่ออฟฟิศ เตรียมอะไรดี</div>
      <div class="msg bot m2">จัดกาแฟดำไม่ใส่น้ำตาลให้กอล์ฟ ส่วนลูกค้าผมดูจากนัดแล้ว คุณ A ชอบชาเขียวครับ 📋</div>
    </div>
  </div>
</section>

<section class="features">
  <div class="wrap">
    <h2><span>Oracle ต่างจาก AI ทั่วไปยังไง</span></h2>
    <div class="grid">
      <div class="feat"><div class="ic">🪪</div><div class="t">มีตัวตน</div><div class="d">ชื่อ บุคลิก หน้าที่ — เพื่อนร่วมงาน ไม่ใช่เครื่องมือ</div></div>
      <div class="feat"><div class="ic">🧠</div><div class="t">ความจำถาวร</div><div class="d">จำข้ามวัน ข้ามเดือน ข้ามปี — ไม่ต้องสอนซ้ำ</div></div>
      <div class="feat"><div class="ic">🏠</div><div class="t">อยู่ในเครื่องคุณ</div><div class="d">ทุกความทรงจำเป็นไฟล์ที่คุณเปิดอ่านได้ เป็นของคุณ 100%</div></div>
      <div class="feat"><div class="ic">🌱</div><div class="t">โตขึ้นทุกวัน</div><div class="d">ยิ่งทำงานด้วยกัน ยิ่งรู้ใจ ยิ่งเก่งในงานของคุณ</div></div>
      <div class="feat"><div class="ic">👥</div><div class="t">ขยายเป็นทีมได้</div><div class="d">หลายตัว แบ่งหน้าที่ ส่งงานกันเอง ตรวจงานกันเอง</div></div>
      <div class="feat"><div class="ic">🌐</div><div class="t">ข้ามเครื่องได้</div><div class="d">บ้าน + โน้ตบุ๊ค + เซิร์ฟเวอร์ ทำงานเป็นเครือข่ายเดียว</div></div>
    </div>
  </div>
</section>

<div class="wrap reader" id="reader">
  <aside class="toc" id="toc">
    <div class="toc-title">สารบัญ — กดข้ามได้เลย</div>
    <nav class="active">${tocLinks}</nav>
  </aside>
  <article id="content">${body}</article>
</div>

<button class="toc-fab" onclick="document.getElementById('toc').classList.toggle('open')">📑 สารบัญ</button>

<footer>
  <p>📚 อ่านต่อ: <a href="${BOOK1}">เล่มที่ 2 — สร้างผู้ช่วย AI ส่วนตัวบน Discord</a></p>
  <p>🙏 เครดิตผู้สร้างทาง: <a href="https://www.facebook.com/nat.wrw" target="_blank">Nat Weerawan</a> ผู้ให้กำเนิดแนวคิด Oracle · <a href="https://www.facebook.com/profile.php?id=61563658892025" target="_blank">ARRA Oracle Community &amp; Conference</a> และพี่ ๆ ในคอมมูนิตี้ทุกท่าน</p>
  <p>🤖 เขียนโดย <strong>regulus</strong> (Oracle ตัวจริง) จาก Golf → regulus-oracle</p>
</footer>

<script>
function toggleMode() {
  const dark = document.body.classList.toggle('dark')
  localStorage.setItem('oracle-mode', dark ? 'dark' : 'light')
  document.querySelector('.mode-toggle').textContent = dark ? '☀️' : '🌙'
}
if (document.body.classList.contains('dark')) document.querySelector('.mode-toggle').textContent = '☀️'

// scrollspy
const links = [...document.querySelectorAll('.toc nav a')]
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle('on', l.dataset.target === en.target.id))
  })
}, { rootMargin: '0px 0px -75% 0px' })
document.querySelectorAll('article h2[id]').forEach(h => spy.observe(h))
// ปิดสารบัญมือถือเมื่อกดลิงก์
links.forEach(a => a.addEventListener('click', () => document.getElementById('toc').classList.remove('open')))
</script>
</body>
</html>`

writeFileSync('index.html', html)
console.log('built oracle index.html — TOC:', toc.length, 'items')
