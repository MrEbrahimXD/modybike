/* ============================================================================
 *  build-images.mjs — خط إنتاج الصور | the image pipeline
 * ============================================================================
 *  بيقرا صورك الأصلية من  assets-src/  وبيطلّع منها:
 *    · نسخ WebP بمقاسات متعددة (srcset) عشان الموبايل ما يحمّلش صورة ديسكتوب
 *    · صورة blur صغيرة (LQIP) بتتحط جوه الكود نفسه فبتظهر فورًا
 *    · تحديث src/data/media.js
 *
 *  الاستخدام:  npm run images
 *
 *  الصور اللي مش موجودة في assets-src بتفضل زي ما هي في media.js،
 *  فتقدر تستبدل صورة واحدة بس من غير ما تلخبط الباقي.
 *
 *  Reads your own photographs from assets-src/ and emits responsive WebP plus
 *  an inlined blur-up placeholder, then merges the result into src/data/media.js.
 *  Anything absent from assets-src is left untouched.
 * ========================================================================== */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src');
const OUT = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'src', 'data', 'media.js');

/** Aspect ratio and output widths per group. */
const GROUPS = {
  editorial: { ratio: 16 / 9, widths: [640, 1024, 1600, 2200] },
  categories: { ratio: 3 / 4, widths: [420, 640, 900] },
  products: { ratio: 4 / 3, widths: [400, 760, 1200] },
  journal: { ratio: 16 / 9, widths: [480, 800, 1280] },
};

/** Editorial keys that want an ultra-wide crop instead of 16:9. */
const WIDE_EDITORIAL = new Set(['hero-primary', 'hero-range', 'hero-cta', 'hero-contact']);

const EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

function readCurrentMedia() {
  if (!fs.existsSync(MANIFEST)) return null;
  return import(pathToFileURL(MANIFEST).href)
    .then((m) => m.MEDIA)
    .catch(() => null);
}

async function emit(group, slug, file, ratio) {
  const { widths } = GROUPS[group];
  const dir = path.join(OUT, group);
  fs.mkdirSync(dir, { recursive: true });

  const outs = [];
  for (const w of widths) {
    const h = Math.round(w / ratio);
    const name = `${slug}-${w}.webp`;
    await sharp(file)
      .rotate()
      .resize(w, h, { fit: 'cover', position: 'attention' })
      .webp({ quality: 74, effort: 5 })
      .toFile(path.join(dir, name));
    outs.push({ w, h, src: `/images/${group}/${name}` });
  }

  const lqip = await sharp(file)
    .rotate()
    .resize(14, Math.max(1, Math.round(14 / ratio)), { fit: "cover", position: "attention" })
    .webp({ quality: 24 })
    .toBuffer();

  const largest = outs[outs.length - 1];
  return {
    src: largest.src,
    srcset: outs.map((o) => `${o.src} ${o.w}w`).join(', '),
    w: largest.w,
    h: largest.h,
    ratio: Number(ratio.toFixed(4)),
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
}

const BANNER = `/* ============================================================================
 *  Media manifest — GENERATED. لا تعدّله بإيدك | do not hand-edit.
 * ============================================================================
 *  حط صورك في  assets-src/<group>/<slug>.jpg  وشغّل  npm run images
 *  المصادر والتراخيص للصور المؤقتة في /public/images/CREDITS.json
 *
 *  Drop your own photographs into assets-src/<group>/<slug>.jpg and run
 *  \`npm run images\`. Anything you do not supply is left untouched.
 * ========================================================================== */
`;

function serialise(media) {
  return (
    `${BANNER}\n` +
    `export const MEDIA = ${JSON.stringify(media, null, 2)};\n\n` +
    `export const editorialImage = (k) => MEDIA.editorial[k] || null;\n` +
    `export const categoryImage = (k) => MEDIA.categories[k] || null;\n` +
    `export const journalImage = (k) => MEDIA.journal[k] || null;\n` +
    `export const productImages = (slug) => MEDIA.products[slug] || [];\n` +
    `export const productImage = (slug, i = 0) => (MEDIA.products[slug] || [])[i] || null;\n\n` +
    `export default MEDIA;\n`
  );
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.log(
      [
        '',
        '  لسه مفيش مجلد assets-src — اعمله وحط صورك جواه كده:',
        '  No assets-src/ folder yet. Create one and lay your photos out like this:',
        '',
        '    assets-src/products/rock-26.jpg        ← الصورة الأساسية للمنتج',
        '    assets-src/products/rock-26__2.jpg     ← صورة إضافية (اختياري)',
        '    assets-src/categories/mountain.jpg',
        '    assets-src/journal/tyre-pressure-guide.jpg',
        '    assets-src/editorial/hero-primary.jpg',
        '',
        '  بعدين شغّل تاني:  npm run images',
        '',
      ].join('\n'),
    );
    return;
  }

  const media = (await readCurrentMedia()) || {
    editorial: {},
    categories: {},
    products: {},
    journal: {},
  };
  // structuredClone so we never mutate the imported module object
  const next = structuredClone(media);

  let count = 0;

  for (const group of Object.keys(GROUPS)) {
    const dir = path.join(SRC, group);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter((f) => EXT.test(f));

    if (group === 'products') {
      /* A product can have several shots: slug.jpg, slug__2.jpg, slug__3.jpg …
         The separator is a double underscore, not a dash, because the slugs
         themselves end in numbers (rock-26, e-mtb-275) and `-2` would be
         indistinguishable from part of the name. */
      const bySlug = new Map();
      for (const f of files) {
        const base = f.replace(EXT, '');
        const m = base.match(/^(.+?)__(\d+)$/);
        const slug = m ? m[1] : base;
        const index = m ? Math.max(0, Number(m[2]) - 1) : 0;
        if (!bySlug.has(slug)) bySlug.set(slug, []);
        bySlug.get(slug)[index] = path.join(dir, f);
      }
      for (const [slug, shots] of bySlug) {
        const list = [];
        for (const file of shots.filter(Boolean)) {
          list.push(await emit(group, slug, file, GROUPS.products.ratio));
          count++;
        }
        next.products[slug] = list;
        console.log(`  products/${slug} — ${list.length} shot(s)`);
      }
      continue;
    }

    for (const f of files) {
      const slug = f.replace(EXT, '');
      const ratio =
        group === 'editorial' && WIDE_EDITORIAL.has(slug) ? 21 / 9 : GROUPS[group].ratio;
      next[group][slug] = await emit(group, slug, path.join(dir, f), ratio);
      count++;
      console.log(`  ${group}/${slug}`);
    }
  }

  if (!count) {
    console.log('\n  assets-src موجود بس مفيش صور جواه. No images found in assets-src/.\n');
    return;
  }

  fs.writeFileSync(MANIFEST, serialise(next));
  console.log(`\n  ✓ ${count} صورة اتعملت | ${count} source image(s) processed`);
  console.log(`  ✓ media.js updated\n`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
