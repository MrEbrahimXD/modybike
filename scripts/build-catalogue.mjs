// Builds the printable bike catalogue in Arabic and English:
//   public/catalogue/modybike-catalogue-ar.pdf
//   public/catalogue/modybike-catalogue-en.pdf
//
//   npm run catalogue
//
// A brochure of its own, not a print of the website: black-and-yellow cover,
// a size chart drawn to scale, bikes grouped by wheel size with price
// stickers, and a WhatsApp QR code on every bike.
//
// Needs a Chromium: Playwright's own (npx playwright install chromium) or any
// Chrome/Edge via CHROME_PATH.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import QRCode from 'qrcode';
import sharp from 'sharp';
import BIKES from '../src/data/products.bikes.js';
import { productImages } from '../src/data/media.js';
import { colorInfo } from '../src/data/colors.js';
import { SITE } from '../src/config/site.js';
import { bikeArtBounds, bikeArtSvg } from '../src/lib/bikeArt.js';

const root = resolve('.');
const outDir = join(root, 'public', 'catalogue');
const tmpDir = join(root, '.ssr-build', 'catalogue');
const PUBLIC_URL = 'https://modybike.com';
const YEAR = new Date().getFullYear();

const file = (p) => pathToFileURL(join(root, p)).href;
const money = (n) => new Intl.NumberFormat('en-US').format(n);
const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const latin = (s = '') => String(s).replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
const wa = (text) => `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(text)}`;
const qr = (text, dark = '#0B0B0A') => QRCode.toString(text, { type: 'svg', margin: 0, errorCorrectionLevel: 'L', color: { dark, light: '#0000' } });

/* ------------------------------------------------------------------ words */

const T = {
  ar: {
    dir: 'rtl',
    catalogue: 'كتالوج',
    bikes: 'العجل',
    coverLine: 'عجل أطفال وشباب وكبار، من 12 لـ 26 بوصة، والسعر على كل موديل.',
    models: (n) => `${n} موديل`,
    inch: 'بوصة',
    currency: 'جنيه',
    years: (a, b) => (b && b < 99 ? `${a}–${b} ${b > 10 ? 'سنة' : 'سنين'}` : `${a} سنة فأكثر`),
    forAges: (a, b) => (b && b < 99 ? `لسن ${a}–${b} ${b > 10 ? 'سنة' : 'سنين'}` : `من سن ${a} سنة`),
    height: (a, b) => `طول ${a}–${b} سم`,
    sizeTitle: 'اختار المقاس الصح',
    sizeLead: 'مقاس العجلة بيتحدد بطول الطفل أكتر من سنه. قيس طوله وشوف الجدول.',
    wheel: 'مقاس',
    age: 'السن',
    tall: 'الطول',
    page: 'صفحة',
    tip: 'لو الطفل بين مقاسين، خد الأصغر: هيتحكم فيها أسهل وهيتعلم أسرع.',
    priceNote: 'الأسعار وقت إصدار الكتالوج. اتأكد من السعر والتوفر على واتساب قبل الطلب.',
    contents: 'في الكتالوج',
    section: (w) => (w.length > 1 ? `عجل مقاس ${w.join(' و')}` : `عجل مقاس ${w[0]}`),
    gears: (g) => (g > 1 ? `${g} سرعة` : 'بدون سرعات'),
    brakes: { 'v-brake': 'فرامل كفة', 'disc-mech': 'فرامل ديسك', 'disc-hydraulic': 'ديسك هيدروليك', coaster: 'فرامل رجل', 'v-brake+coaster': 'كفة + رجل' },
    suspension: { front: 'مساعدين قدام', full: 'مساعدين قدام وورا' },
    colors: 'الألوان',
    helpKids: 'مش متأكد من المقاس؟',
    helpKidsText: 'ابعت لنا طول الطفل وسنه على واتساب، ونقولك المقاس المناسب والموديلات المتاحة.',
    helpAdult: 'محتار بين موديلين؟',
    helpAdultText: 'ابعت لنا طولك وهتركب فين على واتساب، ونرشّح لك الأنسب.',
    helpMsg: 'عايز أعرف المقاس المناسب',
    scan: 'امسح الكود أو دوس عليه',
    orderOnWa: 'واطلب على واتساب',
    code: 'كود',
    orderMsg: (p) => `عايز أطلب من الكتالوج: ${p.sku}`,
    backTitle: 'اطلب على واتساب',
    backScan: 'امسح الكود وابعت لنا',
    phone: 'تليفون',
    hours: 'مفتوح يوميًا من 11 الصبح لـ 11 بالليل',
    address: `${SITE.address.city.ar}، ${SITE.address.region.ar}`,
    delivery: 'نوصّل لحد باب البيت',
    repairs: 'وعندنا صيانة لكل أنواع العجل',
    site: 'الموقع',
  },
  en: {
    dir: 'ltr',
    catalogue: 'Bike',
    bikes: 'Catalogue',
    coverLine: 'Bikes for kids, teens and adults, 12 to 26 inch, with the price on every model.',
    models: (n) => `${n} models`,
    inch: 'inch',
    currency: 'EGP',
    years: (a, b) => (b && b < 99 ? `${a}–${b} years` : `${a}+ years`),
    forAges: (a, b) => (b && b < 99 ? `Ages ${a}–${b}` : `Ages ${a}+`),
    height: (a, b) => `${a}–${b} cm tall`,
    sizeTitle: 'Pick the right size',
    sizeLead: 'Wheel size depends on height more than age. Measure the rider and check the chart.',
    wheel: 'Wheel',
    age: 'Age',
    tall: 'Height',
    page: 'Page',
    tip: 'Between two sizes? Take the smaller one: easier to control and quicker to learn on.',
    priceNote: 'Prices at the time of printing. Confirm price and stock on WhatsApp before ordering.',
    contents: 'Inside',
    section: (w) => `${w.join(' & ')}-inch bikes`,
    gears: (g) => (g > 1 ? `${g} speeds` : 'Single speed'),
    brakes: { 'v-brake': 'V-brakes', 'disc-mech': 'Disc brakes', 'disc-hydraulic': 'Hydraulic disc', coaster: 'Coaster brake', 'v-brake+coaster': 'V-brake + coaster' },
    suspension: { front: 'Front suspension', full: 'Full suspension' },
    colors: 'Colours',
    helpKids: 'Not sure about the size?',
    helpKidsText: 'Send us the child’s height and age on WhatsApp and we will tell you the right size and the models in stock.',
    helpAdult: 'Torn between two models?',
    helpAdultText: 'Send us your height and where you will ride on WhatsApp and we will recommend the best fit.',
    helpMsg: 'I need help choosing a bike size',
    scan: 'Scan or tap the code',
    orderOnWa: 'to order on WhatsApp',
    code: 'Code',
    orderMsg: (p) => `I would like to order from the catalogue: ${p.sku}`,
    backTitle: 'Order on WhatsApp',
    backScan: 'Scan the code and message us',
    phone: 'Phone',
    hours: 'Open daily, 11 am to 11 pm',
    address: `${SITE.address.city.en}, ${SITE.address.region.en}`,
    delivery: 'Delivered to your door',
    repairs: 'We also repair every kind of bike',
    site: 'Website',
  },
};

/* --------------------------------------------------------------- sections */

/** Height and age bands per wheel size, as on the website's size guide. */
const FIT = {
  12: { ages: [3, 5], height: [85, 105] },
  16: { ages: [4, 8], height: [105, 120] },
  20: { ages: [6, 12], height: [120, 135] },
  24: { ages: [10, null], height: [135, 150] },
  26: { ages: [12, null], height: [150, 190] },
};
const ART = {
  12: { wheel: 12, training: true, basket: true },
  16: { wheel: 16, training: true, basket: true },
  20: { wheel: 20, basket: true },
  24: { wheel: 23, basket: true },
  26: { wheel: 26, mtb: true },
};

const SECTIONS = [[12, 16], [20], [24], [26]]
  .map((wheels) => ({
    wheels,
    bikes: BIKES.filter((b) => wheels.includes(b.specs?.wheelSize)).sort((a, b) => a.specs.wheelSize - b.specs.wheelSize || a.price - b.price),
  }))
  .filter((s) => s.bikes.length);

function sectionFacts(section) {
  const ages = section.bikes.map((b) => b.fit || {});
  const min = Math.min(...ages.map((a) => a.ageMin ?? 99));
  const max = Math.max(...ages.map((a) => (a.ageMax && a.ageMax < 99 ? a.ageMax : 99)));
  const hMin = Math.min(...ages.map((a) => a.heightMin ?? 999));
  const hMax = Math.max(...ages.map((a) => a.heightMax ?? 0));
  return { ageMin: min, ageMax: max === 99 ? null : max, hMin, hMax };
}

/* ------------------------------------------------------------------ pieces */

function logo(dark) {
  return `<img class="logo" src="${file(`public/${dark ? 'logo-dark' : 'logo-light'}.svg`)}" alt="">`;
}

function price(p, t) {
  return `<div class="sticker"><b>${money(p.price)}</b><span>${t.currency}</span></div>`;
}

function chips(p, t) {
  const s = p.specs || {};
  return [
    s.wheelSize ? `${t.wheel} ${s.wheelSize}` : null,
    p.fit?.ageMin != null ? t.forAges(p.fit.ageMin, p.fit.ageMax) : null,
    s.brakes ? t.brakes[s.brakes] : null,
    s.gears ? t.gears(s.gears) : null,
    s.suspension && s.suspension !== 'none' ? t.suspension[s.suspension] : null,
  ]
    .filter(Boolean)
    .map((c) => `<li>${esc(c)}</li>`)
    .join('');
}

async function item(p, lang, flip) {
  const t = T[lang];
  const features = (p.features?.[lang] || []).slice(0, 3);
  const colors = (p.specs?.colors || []).map(colorInfo);
  const order = wa(t.orderMsg(p));
  return `<article class="item${flip ? ' flip' : ''}">
    <div class="photo">
      <img src="${pathToFileURL(join(tmpDir, `${p.slug}.jpg`)).href}" alt="">
      ${price(p, t)}
    </div>
    <div class="info">
      ${p.brand ? `<p class="brand">${esc(p.brand)}</p>` : ''}
      <h3>${latin(p.name[lang]).split(' — ').map((part, i) => (i ? `<span>${esc(part)}</span>` : esc(part))).join('')}</h3>
      ${p.tagline ? `<p class="tagline">${esc(latin(p.tagline[lang]))}</p>` : ''}
      <ul class="chips">${chips(p, t)}</ul>
      ${features.length ? `<ul class="features">${features.map((x) => `<li>${esc(latin(x))}</li>`).join('')}</ul>` : ''}
      ${colors.length ? `<p class="colors"><span>${t.colors}</span>${colors.map((c) => `<i style="background:${c.hex}"></i>${esc(c[lang])}`).join(' ')}</p>` : ''}
      <a class="order" href="${esc(order)}">
        <span class="qr">${await qr(order)}</span>
        <span class="order-text"><b>${t.scan}</b><br>${t.orderOnWa}<br><small>${t.code} <span dir="ltr">${esc(p.sku)}</span></small></span>
      </a>
    </div>
  </article>`;
}

async function help(section, lang) {
  const t = T[lang];
  const adult = sectionFacts(section).ageMin >= 12;
  const chat = wa(t.helpMsg);
  const art = ART[Math.max(...section.wheels)];
  return `<aside class="help">
    <div class="help-art">${bikeArtSvg(art, { flip: lang === 'ar', attrs: 'class="art"' })}</div>
    <div class="help-text">
      <h4>${adult ? t.helpAdult : t.helpKids}</h4>
      <p>${adult ? t.helpAdultText : t.helpKidsText}</p>
      <a class="order" href="${esc(chat)}">
        <span class="qr">${await qr(chat)}</span>
        <span class="order-text"><b>${t.scan}</b><br><span dir="ltr">WhatsApp ${SITE.contact.whatsappDisplay}</span></span>
      </a>
    </div>
  </aside>`;
}

function band(section, lang) {
  const t = T[lang];
  const f = sectionFacts(section);
  return `<header class="band">
    <div class="size${section.wheels.length > 1 ? ' two' : ''}"><b>${section.wheels.join('/')}</b><span>${t.inch}</span></div>
    <div class="band-text">
      <h2>${esc(t.section(section.wheels))}</h2>
      <p>${esc(t.forAges(f.ageMin, f.ageMax))} · ${esc(t.height(f.hMin, f.hMax))}</p>
    </div>
    ${logo(false)}
  </header>`;
}

function footer(n, lang) {
  return `<footer class="foot">
    <span class="num">${n}</span>
    <span>${esc(SITE.name[lang])}</span>
    <span dir="ltr">WhatsApp ${SITE.contact.whatsappDisplay}</span>
    <span dir="ltr">${PUBLIC_URL.replace('https://', '')}</span>
  </footer>`;
}

/* ------------------------------------------------------------------- pages */

/** The five sizes side by side at one scale, so the 12" really is the small one. */
function lineup(lang, { width, gap, ink }) {
  const boxes = [12, 16, 20, 24, 26].map((w) => ({ w, box: bikeArtBounds(ART[w]) }));
  const scale = (width - gap * (boxes.length - 1)) / boxes.reduce((sum, b) => sum + b.box.width, 0);
  const mm = (n) => `${(n * scale).toFixed(2)}mm`;
  const row = (cell) => boxes.map(({ w, box }) => `<span style="width:${mm(box.width)}">${cell(w, box)}</span>`).join('');
  return `<div class="lineup">
    <div class="bikes" style="gap:${gap}mm">${row((w, box) => bikeArtSvg(ART[w], {
      ink, flip: lang === 'ar', viewBox: `${box.x} ${box.y} ${box.width} ${box.height}`, attrs: `style="width:100%;height:${mm(box.height)}"`,
    }))}</div>
    <div class="labels" style="gap:${gap}mm">${row((w) => `${w}″`)}</div>
  </div>`;
}

function cover(lang) {
  const t = T[lang];
  return `<section class="page cover">
    <div class="cover-top">${logo(true)}<span class="year">${YEAR}</span></div>
    <h1><span>${t.catalogue}</span><span class="hl">${t.bikes}</span></h1>
    <p class="cover-line">${t.coverLine}</p>
    ${lineup(lang, { width: 178, gap: 5, ink: '#FFFFFF' })}
    <div class="cover-foot">
      <span class="pill">${t.models(BIKES.length)}</span>
      <span dir="ltr">WhatsApp ${SITE.contact.whatsappDisplay}</span>
      <span dir="ltr">${PUBLIC_URL.replace('https://', '')}</span>
    </div>
  </section>`;
}

function sizeGuide(lang, firstPage) {
  const t = T[lang];
  const flip = lang === 'ar';
  const pageOf = (w) => firstPage.get(SECTIONS.find((s) => s.wheels.includes(w)));
  const rows = [12, 16, 20, 24, 26]
    .map((w) => {
      const f = FIT[w];
      return `<li>
        <span class="row-art">${bikeArtSvg(ART[w], { flip, attrs: 'class="art"' })}</span>
        <span class="row-size"><b>${w}″</b></span>
        <span class="row-cell"><small>${t.age}</small>${esc(t.years(f.ages[0], f.ages[1]))}</span>
        <span class="row-cell"><small>${t.tall}</small>${f.height[0]}–${f.height[1]} ${lang === 'ar' ? 'سم' : 'cm'}</span>
        <span class="row-page">${t.page} ${pageOf(w)}</span>
      </li>`;
    })
    .join('');
  return `<section class="page guide">
    <h2 class="guide-title">${t.sizeTitle}</h2>
    <p class="guide-lead">${t.sizeLead}</p>
    <ol class="chart">${rows}</ol>
    <p class="tip">${t.tip}</p>
    <div class="contents">
      <h3>${t.contents}</h3>
      <ul>${SECTIONS.map((s) => `<li><span>${esc(t.section(s.wheels))}</span><span class="dots"></span><span>${firstPage.get(s)}</span></li>`).join('')}</ul>
    </div>
    <p class="note">${t.priceNote}</p>
    ${footer(2, lang)}
  </section>`;
}

async function back(lang) {
  const t = T[lang];
  const chat = `https://wa.me/${SITE.contact.whatsapp}`;
  return `<section class="page back">
    ${logo(true)}
    <h2>${t.backTitle}</h2>
    <a class="back-qr" href="${chat}">${await qr(chat)}</a>
    <p class="back-scan">${t.backScan}</p>
    <p class="back-wa" dir="ltr">${SITE.contact.whatsappDisplay}</p>
    <ul class="back-list">
      <li><span>${t.phone}</span><b dir="ltr">${SITE.contact.phones[0]}</b></li>
      <li><span>${t.site}</span><b dir="ltr">${PUBLIC_URL.replace('https://', '')}</b></li>
      <li><span></span><b>${esc(t.address)}</b></li>
      <li><span></span><b>${t.hours}</b></li>
    </ul>
    ${lineup(lang, { width: 120, gap: 4, ink: '#FFFFFF' })}
    <p class="back-tags"><span>${t.delivery}</span><span>${t.repairs}</span></p>
  </section>`;
}

/* -------------------------------------------------------------------- page */

async function html(lang) {
  const t = T[lang];
  const pages = [];
  const firstPage = new Map();
  let n = 3;
  for (const section of SECTIONS) {
    firstPage.set(section, n);
    for (let i = 0; i < section.bikes.length; i += 2) {
      const pair = section.bikes.slice(i, i + 2);
      const items = await Promise.all(pair.map((p, j) => item(p, lang, j % 2 === 1)));
      if (items.length === 1) items.push(await help(section, lang));
      pages.push(`<section class="page list">${band(section, lang)}<div class="items">${items.join('')}</div>${footer(n, lang)}</section>`);
      n += 1;
    }
  }
  const fonts = [
    ['Alexandria', 400], ['Alexandria', 700], ['Alexandria', 900],
  ]
    .flatMap(([family, weight]) => ['arabic', 'latin'].map((subset) => `@font-face { font-family: '${family}'; font-weight: ${weight}; src: url('${file(`node_modules/@fontsource/alexandria/files/alexandria-${subset}-${weight}-normal.woff2`)}') format('woff2'); }`))
    .concat(['arabic', 'latin'].map((subset) => `@font-face { font-family: 'Lalezar'; font-weight: 400; src: url('${file(`node_modules/@fontsource/lalezar/files/lalezar-${subset}-400-normal.woff2`)}') format('woff2'); }`))
    .join('\n');

  return `<!doctype html><html lang="${lang}" dir="${t.dir}"><head><meta charset="utf-8">
<style>
${fonts}
@page { size: A4; margin: 0; }
:root { --sun: #FCC609; --ink: #0B0B0A; --mute: #5E5A53; --line: #E7E3DA; --tint: #FFF4CC; --panel: #F4F3F0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: 'Alexandria', sans-serif; color: var(--ink); font-size: 10pt; line-height: 1.5; }
a { color: inherit; text-decoration: none; }
.page { width: 210mm; height: 297mm; position: relative; overflow: hidden; page-break-after: always; background: #fff; }
.display { font-family: 'Lalezar', 'Alexandria', sans-serif; font-weight: 400; }
.art { display: block; width: 100%; height: 100%; }

/* cover */
.cover { background: var(--ink); color: #fff; padding: 16mm 16mm 14mm; display: flex; flex-direction: column; }
.cover-top { display: flex; align-items: center; justify-content: space-between; }
.cover .logo { width: 46mm; height: 46mm; }
.cover .year { font-weight: 900; font-size: 18pt; color: var(--sun); border: 0.6mm solid var(--sun); border-radius: 30mm; padding: 1.5mm 7mm; }
.cover h1 { font-family: 'Lalezar', 'Alexandria', sans-serif; font-weight: 400; line-height: 0.95; margin-top: 16mm; }
.cover h1 span { display: block; font-size: 66pt; }
.cover h1 .hl { color: var(--sun); font-size: 120pt; }
.cover-line { font-size: 14pt; color: #E9E6DF; margin-top: 7mm; max-width: 150mm; line-height: 1.6; }
.lineup { display: flex; flex-direction: column; align-items: center; }
.lineup .bikes, .lineup .labels { display: flex; align-items: flex-end; justify-content: center; }
.lineup .bikes { border-bottom: 1.4mm solid var(--sun); padding: 0 4mm; }
.lineup .bikes span, .lineup .labels span { flex: none; display: block; }
.lineup svg { display: block; }
.lineup .labels span { text-align: center; font-weight: 900; font-size: 13pt; color: var(--sun); margin-top: 2mm; direction: ltr; }
.cover .lineup { margin-top: auto; }
.back .lineup { margin-top: auto; margin-bottom: 7mm; }
.back .lineup .labels span { font-size: 9pt; }
.cover-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 8mm; font-size: 11pt; color: #E9E6DF; }
.cover-foot .pill { background: var(--sun); color: var(--ink); font-weight: 900; padding: 2mm 6mm; border-radius: 20mm; }

/* size guide */
.guide { padding: 16mm 16mm 24mm; }
.guide-title { font-family: 'Lalezar', 'Alexandria', sans-serif; font-weight: 400; font-size: 40pt; line-height: 1.1; }
.guide-lead { font-size: 12pt; color: var(--mute); margin-top: 2mm; }
.chart { list-style: none; margin-top: 7mm; border-top: 0.4mm solid var(--ink); }
.chart li { display: grid; grid-template-columns: 50mm 24mm 1fr 1fr 22mm; align-items: center; gap: 4mm; border-bottom: 0.3mm solid var(--line); padding: 2.4mm 0; }
.chart li:nth-child(odd) { background: var(--tint); }
.row-art { height: 20mm; display: block; }
.row-size b { font-weight: 900; font-size: 24pt; direction: ltr; display: inline-block; }
.row-cell { font-size: 12pt; font-weight: 700; }
.row-cell small { display: block; font-size: 8.5pt; font-weight: 400; color: var(--mute); }
.row-page { font-size: 9.5pt; font-weight: 700; background: var(--ink); color: #fff; text-align: center; border-radius: 10mm; padding: 1.2mm 2mm; }
.tip { margin-top: 6mm; background: var(--sun); padding: 5mm 7mm; font-size: 12.5pt; font-weight: 700; border-radius: 4mm; }
.contents { margin-top: 6mm; }
.contents h3 { font-size: 13pt; font-weight: 900; margin-bottom: 2mm; }
.contents ul { list-style: none; }
.contents li { display: flex; align-items: baseline; gap: 3mm; font-size: 11.5pt; padding: 1.1mm 0; }
.contents .dots { flex: 1; border-bottom: 0.4mm dotted #B8B3A8; }
.note { font-size: 9pt; color: var(--mute); margin-top: 4mm; }

/* bike pages */
.list { padding: 0 0 18mm; display: flex; flex-direction: column; }
.band { background: var(--sun); display: flex; align-items: center; gap: 5mm; padding: 5mm 14mm; }
.band .size { width: 24mm; height: 24mm; border-radius: 50%; background: var(--ink); color: var(--sun); display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1; flex: none; }
.band .size b { font-weight: 900; font-size: 22pt; direction: ltr; }
.band .size.two b { font-size: 14pt; }
.band .size span { font-size: 7.5pt; color: #fff; margin-top: 1mm; }
.band-text { flex: 1; }
.band h2 { font-family: 'Lalezar', 'Alexandria', sans-serif; font-weight: 400; font-size: 25pt; line-height: 1.1; }
.band p { font-size: 11pt; font-weight: 700; }
.band .logo { width: 20mm; height: 20mm; }
.items { flex: 1; display: grid; grid-template-rows: 1fr 1fr; padding: 6mm 14mm 0; gap: 6mm; min-height: 0; }
.item { display: grid; grid-template-columns: 96mm 1fr; gap: 7mm; align-items: stretch; min-height: 0; }
.items > * + * { border-top: 0.4mm dashed #CFC9BC; padding-top: 6mm; }
.help { display: grid; grid-template-columns: 70mm 1fr; gap: 8mm; align-items: center; }
.help-art { background: var(--tint); border-radius: 5mm; height: 100%; display: flex; align-items: center; padding: 0 6mm; }
.help-art .art { height: auto; border-bottom: 1.2mm solid var(--ink); }
.help h4 { font-family: 'Lalezar', 'Alexandria', sans-serif; font-weight: 400; font-size: 26pt; line-height: 1.15; }
.help p { font-size: 12pt; margin-top: 2mm; line-height: 1.6; }
.help .order { margin-top: 6mm; }
.item.flip { grid-template-columns: 1fr 96mm; }
.item.flip .photo { order: 2; }
.photo { position: relative; background: var(--panel); border-radius: 5mm; display: flex; align-items: center; justify-content: center; padding: 6mm 4mm 4mm; overflow: visible; }
.photo img { width: 100%; height: 100%; max-height: 100mm; object-fit: contain; border-radius: 2mm; }
.sticker { position: absolute; top: -3mm; inset-inline-start: -3mm; width: 31mm; height: 31mm; border-radius: 50%; background: var(--sun); display: flex; flex-direction: column; align-items: center; justify-content: center; transform: rotate(-8deg); box-shadow: 0 0 0 1.2mm #fff; line-height: 1; }
.sticker b { font-weight: 900; font-size: 19pt; direction: ltr; }
.sticker span { font-size: 9pt; font-weight: 700; margin-top: 1mm; }
.info { display: flex; flex-direction: column; min-width: 0; }
.brand { font-size: 8.5pt; font-weight: 700; letter-spacing: 0.04em; color: var(--mute); }
.info h3 { font-size: 15.5pt; font-weight: 900; line-height: 1.3; }
.info h3 span { display: block; font-weight: 700; }
.tagline { font-size: 10.5pt; color: var(--mute); margin-top: 0.5mm; }
.chips { list-style: none; display: flex; flex-wrap: wrap; gap: 1.5mm; margin-top: 3mm; }
.chips li { font-size: 8.5pt; font-weight: 700; border: 0.35mm solid var(--ink); border-radius: 10mm; padding: 0.6mm 2.6mm; }
.chips li:first-child { background: var(--ink); color: #fff; }
.features { list-style: none; margin-top: 3mm; font-size: 9.5pt; line-height: 1.55; }
.features li { position: relative; padding-inline-start: 5mm; margin-top: 0.8mm; }
.features li::before { content: ''; position: absolute; inset-inline-start: 0; top: 1.6mm; width: 2.6mm; height: 2.6mm; border-radius: 50%; background: var(--sun); box-shadow: inset 0 0 0 0.5mm var(--ink); }
.colors { font-size: 9pt; margin-top: 2.5mm; display: flex; align-items: center; flex-wrap: wrap; gap: 1.4mm; }
.colors span { color: var(--mute); margin-inline-end: 1mm; }
.colors i { display: inline-block; width: 3.4mm; height: 3.4mm; border-radius: 50%; border: 0.3mm solid rgba(0,0,0,.35); }
.order { margin-top: auto; display: flex; align-items: center; gap: 3.5mm; padding-top: 3mm; }
.qr { width: 21mm; height: 21mm; flex: none; background: #fff; padding: 1.2mm; border: 0.4mm solid var(--ink); border-radius: 2mm; }
.qr svg { width: 100%; height: 100%; display: block; }
.order-text { font-size: 9pt; line-height: 1.45; }
.order-text b { font-weight: 900; font-size: 10pt; }
.order-text small { color: var(--mute); font-size: 8pt; }

.foot { position: absolute; bottom: 7mm; left: 14mm; right: 14mm; display: flex; align-items: center; gap: 5mm; font-size: 8pt; color: var(--mute); border-top: 0.3mm solid var(--line); padding-top: 2.5mm; }
.foot .num { background: var(--ink); color: var(--sun); font-weight: 900; width: 7mm; height: 7mm; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 8.5pt; }
.foot span:last-child { margin-inline-start: auto; }

/* back cover */
.back { background: var(--ink); color: #fff; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 18mm 20mm 16mm; }
.back .logo { width: 40mm; height: 40mm; }
.back h2 { font-family: 'Lalezar', 'Alexandria', sans-serif; font-weight: 400; font-size: 40pt; color: var(--sun); margin-top: 8mm; line-height: 1.1; }
.back-qr { display: block; width: 62mm; height: 62mm; background: #fff; padding: 5mm; border-radius: 5mm; margin-top: 7mm; }
.back-qr svg { width: 100%; height: 100%; display: block; }
.back-scan { margin-top: 4mm; font-size: 12pt; color: #E9E6DF; }
.back-wa { font-weight: 900; font-size: 30pt; color: #fff; margin-top: 2mm; letter-spacing: 0.02em; }
.back-list { list-style: none; margin-top: 7mm; width: 120mm; }
.back-list li { display: flex; justify-content: space-between; gap: 6mm; border-top: 0.3mm solid #3A3833; padding: 2.6mm 0; font-size: 12pt; }
.back-list li span { color: #A9A49A; }
.back-list li b { font-weight: 700; }
.back-list li:has(span:empty) { justify-content: center; }
.back-tags { margin-top: auto; display: flex; gap: 4mm; }
.back-tags span { background: var(--sun); color: var(--ink); font-weight: 900; font-size: 12pt; padding: 2.4mm 6mm; border-radius: 20mm; }
</style></head><body>
${cover(lang)}
${sizeGuide(lang, firstPage)}
${pages.join('\n')}
${await back(lang)}
</body></html>`;
}

/* ------------------------------------------------------------------ build */

await mkdir(outDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });
// One JPEG per bike keeps each PDF small enough to send on WhatsApp.
for (const p of BIKES) {
  const img = productImages(p.slug)[0];
  if (!img) continue;
  await sharp(join(root, 'public', img.src))
    .flatten({ background: '#ffffff' })
    .resize({ width: 1000, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(join(tmpDir, `${p.slug}.jpg`));
}

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
for (const lang of ['ar', 'en']) {
  const src = join(tmpDir, `catalogue-${lang}.html`);
  await writeFile(src, await html(lang), 'utf8');
  const page = await browser.newPage();
  await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = join(outDir, `modybike-catalogue-${lang}.pdf`);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await page.close();
  const size = (await readFile(out)).length;
  console.log(`  wrote ${out} (${(size / 1024 / 1024).toFixed(1)} MB)`);
}
await browser.close();
if (!process.env.KEEP_HTML && existsSync(tmpDir)) await rm(tmpDir, { recursive: true, force: true });
