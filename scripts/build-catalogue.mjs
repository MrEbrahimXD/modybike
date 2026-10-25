// Builds the printable product catalogue in Arabic and English:
//   public/catalogue/modybike-catalogue-ar.pdf
//   public/catalogue/modybike-catalogue-en.pdf
//
//   npm run catalogue
//
// Needs a Chromium. Uses Playwright's own if installed (npx playwright install
// chromium), or set CHROME_PATH to any Chrome/Edge executable.
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import BIKES from '../src/data/products.bikes.js';
import ACCESSORIES from '../src/data/products.accessories.js';
import { productImage } from '../src/data/media.js';
import { SITE } from '../src/config/site.js';

const root = resolve('.');
const outDir = join(root, 'public', 'catalogue');
const tmpDir = join(root, '.ssr-build', 'catalogue');
const file = (p) => pathToFileURL(join(root, 'public', p)).href;
const money = (n) => new Intl.NumberFormat('en-US').format(n);
const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const PUBLIC_URL = 'https://mrebrahimxd.github.io/modybike';

const T = {
  ar: {
    dir: 'rtl', font: 'Readex Pro', title: 'كتالوج الدراجات', currency: 'ج.م', inch: 'بوصة',
    ages: (a, b) => (b ? `من ${a} لـ ${b} سنة` : `من ${a} سنة فأكثر`),
    gears: (g) => (g > 1 ? `${g} سرعة` : 'بدون سرعات'),
    brakes: { 'v-brake': 'فرامل كفة', 'disc-mech': 'فرامل ديسك', 'disc-hydraulic': 'ديسك هيدروليك', coaster: 'فرامل رجل', 'v-brake+coaster': 'كفة + رجل' },
    bikes: 'الدراجات', accessories: 'الإكسسوارات', item: 'المنتج', price: 'السعر',
    note: 'الأسعار وقت إصدار الكتالوج وممكن تتغير. اتأكد من السعر والتوفر على واتساب.',
    order: 'للطلب والاستفسار', whatsapp: 'واتساب', phone: 'تليفون', site: 'الموقع', hours: 'يوميًا من 11 صباحًا لـ 11 مساءً',
    repairs: 'وعندنا صيانة وتركيب لأي دراجة.',
  },
  en: {
    dir: 'ltr', font: 'Archivo', title: 'Bike catalogue', currency: 'EGP', inch: 'inch',
    ages: (a, b) => (b ? `Ages ${a}–${b}` : `Ages ${a}+`),
    gears: (g) => (g > 1 ? `${g} speeds` : 'Single speed'),
    brakes: { 'v-brake': 'V-brakes', 'disc-mech': 'Disc brakes', 'disc-hydraulic': 'Hydraulic disc', coaster: 'Coaster brake', 'v-brake+coaster': 'V-brake + coaster' },
    bikes: 'Bikes', accessories: 'Accessories', item: 'Item', price: 'Price',
    note: 'Prices at the time of printing and may change. Confirm price and stock on WhatsApp.',
    order: 'Orders and questions', whatsapp: 'WhatsApp', phone: 'Phone', site: 'Website', hours: 'Daily, 11 am – 11 pm',
    repairs: 'We also service and assemble any bike.',
  },
};

function card(p, lang) {
  const t = T[lang];
  const img = productImage(p.slug, 0);
  const s = p.specs || {};
  const facts = [
    s.wheelSize ? `${s.wheelSize} ${t.inch}` : null,
    p.fit?.ageMin != null ? t.ages(p.fit.ageMin, p.fit.ageMax) : null,
  ].filter(Boolean).join(' · ');
  const specs = [s.brakes ? t.brakes[s.brakes] : null, s.gears ? t.gears(s.gears) : null].filter(Boolean).join(' · ');
  return `<article class="card">
    <div class="ph">${img ? `<img src="${pathToFileURL(join(tmpDir, `${p.slug}.jpg`)).href}" alt="">` : ''}</div>
    <h3>${esc(p.name[lang])}</h3>
    <p class="facts">${esc(facts)}</p>
    <p class="specs">${esc(specs)}</p>
    <p class="price">${money(p.price)} <span>${t.currency}</span></p>
  </article>`;
}

function html(lang) {
  const t = T[lang];
  const bikes = [...BIKES].sort((a, b) => (a.specs?.wheelSize ?? 0) - (b.specs?.wheelSize ?? 0) || a.price - b.price);
  const pages = [];
  for (let i = 0; i < bikes.length; i += 4) pages.push(bikes.slice(i, i + 4));
  const phone = SITE.contact.phones[0];
  const wa = SITE.contact.whatsappDisplay;
  const footer = (n) => `<footer><span>${esc(SITE.name[lang])}</span><span dir="ltr">${t.whatsapp} ${wa}</span><span>${n}</span></footer>`;

  return `<!doctype html><html lang="${lang}" dir="${t.dir}"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Readex+Pro:wght@400;500;700&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: '${t.font}', 'Segoe UI', Tahoma, sans-serif; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; padding: 16mm 14mm 20mm; position: relative; page-break-after: always; overflow: hidden; }
.cover { display: flex; flex-direction: column; justify-content: space-between; padding: 22mm 18mm; }
.cover .mark { width: 78mm; }
.cover h1 { font-size: 40pt; line-height: 1.1; font-weight: 700; margin-top: 14mm; }
.cover .year { font-size: 14pt; color: #555; margin-top: 4mm; }
.cover .rule { height: 3mm; width: 40mm; background: #FCC609; margin-top: 10mm; }
.cover dl { display: grid; grid-template-columns: auto 1fr; gap: 3mm 8mm; font-size: 12pt; }
.cover dt { color: #666; } .cover dd { font-weight: 600; }
.cover .note { font-size: 9.5pt; color: #666; margin-top: 8mm; max-width: 130mm; }
h2 { font-size: 15pt; font-weight: 700; padding-bottom: 3mm; border-bottom: 0.4mm solid #111; margin-bottom: 6mm; }
.grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 7mm 8mm; height: 240mm; }
.card { display: flex; flex-direction: column; border-top: 0.3mm solid #ccc; padding-top: 4mm; }
.ph { height: 68mm; display: flex; align-items: center; justify-content: center; background: #fff; }
.ph img { max-width: 100%; max-height: 100%; object-fit: contain; }
.card h3 { font-size: 12pt; font-weight: 700; line-height: 1.35; margin-top: 4mm; }
.facts { font-size: 10pt; margin-top: 1.5mm; }
.specs { font-size: 9.5pt; color: #555; margin-top: 1mm; }
.price { font-size: 17pt; font-weight: 700; margin-top: auto; padding-top: 2mm; }
.price span { font-size: 10pt; font-weight: 500; }
table { width: 100%; border-collapse: collapse; font-size: 10pt; }
td { padding: 2.2mm 0; border-bottom: 0.2mm solid #ddd; }
td.p { text-align: end; white-space: nowrap; font-weight: 600; }
footer { position: absolute; bottom: 9mm; left: 14mm; right: 14mm; display: flex; justify-content: space-between; font-size: 8.5pt; color: #777; border-top: 0.2mm solid #ddd; padding-top: 2.5mm; }
.back { display: flex; flex-direction: column; justify-content: center; }
.back h2 { border: 0; font-size: 22pt; }
.back p { font-size: 13pt; margin-top: 3mm; }
.back .mark { width: 40mm; margin-bottom: 10mm; }
</style></head><body>
<section class="page cover">
  <div>
    <img class="mark" src="${file('logo-light.svg')}" alt="">
    <h1>${t.title}</h1>
    <p class="year">${new Date().getFullYear()} · ${bikes.length} ${lang === 'ar' ? 'موديل' : 'models'}</p>
    <div class="rule"></div>
  </div>
  <div>
    <dl>
      <dt>${t.whatsapp}</dt><dd dir="ltr">${wa}</dd>
      <dt>${t.phone}</dt><dd dir="ltr">${phone}</dd>
      <dt>${t.site}</dt><dd dir="ltr">${PUBLIC_URL.replace('https://', '')}</dd>
    </dl>
    <p class="note">${t.note}</p>
  </div>
</section>
${pages.map((group, i) => `<section class="page">
  <h2>${t.bikes}</h2>
  <div class="grid">${group.map((p) => card(p, lang)).join('')}</div>
  ${footer(i + 2)}
</section>`).join('')}
<section class="page">
  <h2>${t.accessories}</h2>
  <table><tbody>${ACCESSORIES.map((a) => `<tr><td>${esc(a.name[lang])}</td><td class="p">${money(a.price)} ${t.currency}</td></tr>`).join('')}</tbody></table>
  ${footer(pages.length + 2)}
</section>
<section class="page back">
  <img class="mark" src="${file('logo-light.svg')}" alt="">
  <h2>${t.order}</h2>
  <p>${t.whatsapp}: <span dir="ltr">${wa}</span></p>
  <p>${t.phone}: <span dir="ltr">${phone}</span></p>
  <p>${t.hours}</p>
  <p dir="ltr">${PUBLIC_URL.replace('https://', '')}</p>
  <p style="margin-top:8mm;color:#555">${t.repairs}</p>
</section>
</body></html>`;
}

await mkdir(outDir, { recursive: true });
await mkdir(tmpDir, { recursive: true });
// Small JPEGs keep the PDF light enough to send on WhatsApp.
for (const p of BIKES) {
  const img = productImage(p.slug, 0);
  if (!img) continue;
  await sharp(join(root, 'public', img.src)).flatten({ background: '#fff' }).resize({ width: 640, withoutEnlargement: true }).jpeg({ quality: 72, mozjpeg: true }).toFile(join(tmpDir, `${p.slug}.jpg`));
}
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
for (const lang of ['ar', 'en']) {
  const src = join(tmpDir, `catalogue-${lang}.html`);
  await writeFile(src, html(lang), 'utf8');
  const page = await browser.newPage();
  await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const out = join(outDir, `modybike-catalogue-${lang}.pdf`);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log(`  wrote ${out}`);
}
await browser.close();
if (!process.env.KEEP_HTML && existsSync(tmpDir)) await rm(tmpDir, { recursive: true, force: true });
