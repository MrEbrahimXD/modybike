import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { AGE_GROUPS, PRODUCT_TYPES, matchesAgeGroup } from '../src/data/collections.js';
import { queryProducts } from '../src/data/products.js';
import { getRoutes, render, SITE } from '../.ssr-build/entry-server.js';

// Boundary regressions: overlapping bands, open-ended 12+, and unknown ages.
assert.equal(matchesAgeGroup({ fit: { ageMin: 5, ageMax: 8 } }, 'ages-3-5'), true);
assert.equal(matchesAgeGroup({ fit: { ageMin: 6, ageMax: 8 } }, 'ages-3-5'), false);
assert.equal(matchesAgeGroup({ fit: { ageMin: 17 } }, 'ages-12-plus'), true);
assert.equal(matchesAgeGroup({}, 'ages-12-plus'), false);
assert.equal(matchesAgeGroup({ fit: { ageMin: 5 } }, 'missing'), false);
for (const group of AGE_GROUPS) {
  const products = queryProducts({ ageGroup: group.slug, productType: 'bikes' });
  assert.ok(products.length > 0, `Empty demonstration age band: ${group.slug}`);
  assert.ok(products.every((p) => matchesAgeGroup(p, group.slug)));
  assert.equal(queryProducts({ ageGroup: group.slug, productType: 'scooters' }).length, 0);
}

const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const robots = await readFile('dist/robots.txt', 'utf8');
assert.ok(robots.includes(`Sitemap: ${SITE.baseUrl}/sitemap.xml`));
assert.ok(!robots.includes('Disallow: /cart'), 'Allow crawling to read noindex');
await access('dist/og-default.png');
let checked = 0;
for (const route of getRoutes()) {
  const html = await readFile(`dist${route.url === '/' ? '' : route.url}/index.html`, 'utf8');
  const canonical = `${SITE.baseUrl}${route.url}`;
  assert.ok(html.includes(`<link rel="canonical" href="${canonical}">`), `Canonical: ${route.url}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `H1: ${route.url}`);
  assert.ok(html.includes('<meta name="description" content="'), `Description: ${route.url}`);
  assert.ok(html.includes('https://wa.me/201102637511'), `WhatsApp: ${route.url}`);
  assert.ok(!html.includes('201000000000'), `Old WhatsApp: ${route.url}`);
  if (SITE.basePath) {
    for (const [, url] of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) {
      const pathname = new URL(url, SITE.baseUrl).pathname;
      assert.ok(pathname.startsWith(`${SITE.basePath}/`) || pathname === SITE.basePath, `Unprefixed URL on ${route.url}: ${url}`);
    }
    for (const [, srcset] of html.matchAll(/srcSet="([^"]*)"/gi)) {
      for (const candidate of srcset.split(',')) assert.ok(candidate.trim().startsWith(`${SITE.basePath}/`), `Unprefixed responsive image: ${route.url}`);
    }
  }
  const schemas = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));
  if (SITE.isPlaceholderContent) assert.ok(!schemas.some((s) => s['@type'] === 'Product'), `Demo offer: ${route.url}`);
  const noindex = html.includes('content="noindex, follow"');
  assert.equal(sitemap.includes(`<loc>${canonical}</loc>`), !noindex, `Sitemap inclusion: ${route.url}`);
  checked++;
}
for (const prefix of ['', '/en']) {
  for (const group of AGE_GROUPS) {
    const url = `${prefix}/shop/age/${group.slug}`;
    const { html, head } = await render(url);
    assert.ok(html.includes(group.label[prefix ? 'en' : 'ar']));
    assert.equal(head.noindex, false);
    assert.equal(head.alternates.ar, `${SITE.baseUrl}/shop/age/${group.slug}`);
    assert.equal(head.alternates.en, `${SITE.baseUrl}/en/shop/age/${group.slug}`);
  }
  for (const type of PRODUCT_TYPES) {
    const { head } = await render(`${prefix}/shop/type/${type.slug}`);
    assert.ok(head.title.includes(type.label[prefix ? 'en' : 'ar']));
  }
  const { head } = await render(`${prefix}/shop/age/ages-5-8?type=scooters`);
  assert.equal(head.noindex, true);
  assert.equal(head.canonical, `${SITE.baseUrl}${prefix}/shop/age/ages-5-8`);
  const missing = await render(`${prefix}/shop/age/unknown`);
  assert.equal(missing.head.noindex, true);
}
console.log(`Verified ${checked} prerendered pages, age/type filtering, bilingual canonicals, sitemap and structured data.`);
