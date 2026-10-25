/* ============================================================================
 *  Share images — written into dist/ at build time, never committed.
 * ============================================================================
 *  · images/share/products/<slug>.jpg  1200×630, the product on white.
 *    WhatsApp and Facebook previews want an absolute JPEG under ~300 KB; the
 *    site's WebP photos are 4:3 and get cropped badly in link previews.
 *  · images/share/blog/<slug>.jpg      1200×630 crop of the article photo.
 *  · images/feed/<slug>-<n>.jpg        1080×1080 squares for the product feed
 *    (Facebook/Instagram/WhatsApp catalogues ask for JPEG or PNG).
 * ========================================================================== */

import { mkdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const exists = (file) => access(file).then(() => true, () => false);

async function write(pipeline, file) {
  await mkdir(dirname(file), { recursive: true });
  await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(file);
}

/** Product photo centred on a white card of the given size. */
async function onWhite(source, width, height, pad) {
  const photo = await sharp(source)
    .resize(width - pad * 2, height - pad * 2, { fit: 'inside', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .toBuffer();
  return sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .composite([{ input: photo, gravity: 'centre' }]);
}

/**
 * @param {{ distDir: string,
 *           products: { slug: string, images: string[] }[],
 *           posts: { slug: string, image?: string }[] }} options
 * @returns {Promise<{ share: number, feed: number }>}
 */
export async function buildShareImages({ distDir, products, posts }) {
  let share = 0;
  let feed = 0;

  for (const product of products) {
    const sources = [];
    for (const src of product.images) {
      const file = join(distDir, src);
      if (await exists(file)) sources.push(file);
    }
    if (!sources.length) continue;

    await write(await onWhite(sources[0], 1200, 630, 30), join(distDir, 'images', 'share', 'products', `${product.slug}.jpg`));
    share += 1;

    for (const [i, file] of sources.entries()) {
      await write(await onWhite(file, 1080, 1080, 40), join(distDir, 'images', 'feed', `${product.slug}-${i + 1}.jpg`));
      feed += 1;
    }
  }

  for (const post of posts) {
    if (!post.image) continue;
    const file = join(distDir, post.image);
    if (!(await exists(file))) continue;
    await write(sharp(file).resize(1200, 630, { fit: 'cover', position: 'attention' }), join(distDir, 'images', 'share', 'blog', `${post.slug}.jpg`));
    share += 1;
  }

  return { share, feed };
}
