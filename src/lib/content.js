/**
 * Blog body loader.
 *
 * Article bodies are the heaviest data on the site, so they are NOT bundled with
 * the app. Each one is its own chunk, imported on demand.
 *
 * On the server the prerenderer awaits the body, renders it into static HTML and
 * serialises the same object into the page as `window.__MB_CONTENT__`. The client
 * seeds this cache from that payload before hydrating, so the first paint of a
 * prerendered article hydrates with identical markup and no extra request.
 */
const loaders = import.meta.glob('../content/posts/*.js');

/** slug -> body module */
const cache = new Map();

function pathFor(slug) {
  return `../content/posts/${slug}.js`;
}

export function getCachedPost(slug) {
  return cache.get(slug) || null;
}

export function seedContentCache(payload) {
  if (!payload) return;
  Object.entries(payload).forEach(([slug, body]) => {
    if (body) cache.set(slug, body);
  });
}

export function dumpContentCache(slugs = []) {
  const out = {};
  slugs.forEach((slug) => {
    const body = cache.get(slug);
    if (body) out[slug] = body;
  });
  return out;
}

export function hasPostLoader(slug) {
  return Boolean(loaders[pathFor(slug)]);
}

/** Loads (and caches) one article body. Returns null for an unknown slug. */
export async function loadPost(slug) {
  if (cache.has(slug)) return cache.get(slug);
  const loader = loaders[pathFor(slug)];
  if (!loader) return null;
  const mod = await loader();
  const body = mod.default || mod;
  cache.set(slug, body);
  return body;
}

export const POST_SLUGS = Object.keys(loaders).map((p) =>
  p.replace('../content/posts/', '').replace(/\.js$/, ''),
).filter((s) => s !== 'index');
