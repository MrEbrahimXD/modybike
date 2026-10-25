/**
 * Side view of a bike standing on the bottom edge of a 200×116 box, as a list
 * of shapes. The shop-by-age tiles and the PDF catalogue both draw from it, so
 * a 12" bike looks the same everywhere and really is smaller than a 26" one.
 *
 * Each shape names its colours by role: `ink` (the line colour) or `sun` (the
 * logo's yellow). Callers decide what those are.
 */
export const BIKE_ART_VIEWBOX = '0 0 200 116';

const f = (n) => Number(n.toFixed(1));
const pt = (a) => `${f(a.x)} ${f(a.y)}`;
const add = (a, dx, dy) => ({ x: a.x + dx, y: a.y + dy });
const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

/** @returns {({kind:'path', d:string} | {kind:'circle', cx:number, cy:number, r:number}) & {stroke?:'ink'|'sun', fill?:'ink'|'sun', width?:number}}[]} */
export function bikeArtShapes({ wheel, training = false, basket = false, mtb = false }) {
  const G = 112;
  const R = wheel * 1.42;
  const W = 3 * R;
  const rx = 100 - (W + 2 * R) / 2 + R;
  const fx = rx + W;
  const ay = G - R;
  const rear = { x: rx, y: ay };
  const front = { x: fx, y: ay };
  const bb = { x: rx + 0.42 * W, y: ay + 0.1 * R };
  const seatTop = add(bb, -0.12 * W, (mtb ? -1.28 : -1.12) * R);
  const headTop = { x: fx - 0.2 * W, y: ay - (mtb ? 1.12 : 1.08) * R };
  const headBottom = { x: fx - 0.15 * W, y: ay - 0.6 * R };
  const stays = lerp(bb, seatTop, mtb ? 0.86 : 0.5);
  const saddle = add(seatTop, -0.04 * W, -0.26 * R);
  const bar = mtb ? add(headTop, 0.05 * W, -0.12 * R) : add(headTop, -0.04 * W, -0.46 * R);
  const trainer = Math.max(7, 0.42 * R);
  const trainerAt = { x: rx - 0.56 * R, y: G - trainer };
  const basketTop = bar.y + 0.16 * R;
  const basketX = headTop.x + 0.08 * R;

  const line = (points, width, stroke = 'ink') => ({ kind: 'path', d: `M${points.map(pt).join(' L')}`, stroke, width });
  const shapes = [];

  if (training) {
    shapes.push(line([rear, trainerAt], 2.2));
    shapes.push({ kind: 'circle', cx: f(trainerAt.x), cy: f(trainerAt.y), r: f(trainer - 1.2), fill: 'sun', stroke: 'ink', width: 2.2 });
  }
  for (const c of [rear, front]) {
    shapes.push({ kind: 'circle', cx: f(c.x), cy: f(c.y), r: f(R - 2.2), stroke: 'ink', width: mtb ? 5 : 4.4 });
    shapes.push({ kind: 'circle', cx: f(c.x), cy: f(c.y), r: f(R - 6.4), stroke: 'sun', width: 2 });
    shapes.push({ kind: 'circle', cx: f(c.x), cy: f(c.y), r: 2, fill: 'ink' });
  }
  shapes.push(
    line([rear, bb], 3),
    line([rear, stays], 3),
    line([bb, seatTop], 3.4),
    line([headTop, mtb ? lerp(bb, seatTop, 0.92) : stays], 3.6),
    line([headBottom, bb], 3.8),
    line([headTop, headBottom], 4.2),
    line([headBottom, front], mtb ? 4.6 : 3.2),
    line([seatTop, saddle], 2.8),
    line([add(saddle, -0.34 * R, 0), add(saddle, 0.22 * R, 0.02 * R)], 5.2, 'sun'),
    mtb ? line([headTop, bar, add(bar, 0.06 * R, -0.01 * R)], 3) : line([headTop, bar, add(bar, -0.4 * R, 0.03 * R)], 3),
    { kind: 'circle', cx: f(bb.x), cy: f(bb.y), r: f(0.18 * R + 1.6), stroke: 'ink', width: 2.2 },
    line([bb, add(bb, 0.16 * R, 0.32 * R)], 2.6),
    line([add(bb, 0.04 * R, 0.32 * R), add(bb, 0.3 * R, 0.32 * R)], 2.6),
  );
  if (basket) {
    shapes.push(line([add(bar, 0, 0.04 * R), { x: basketX + 0.04 * R, y: basketTop }], 2));
    shapes.push({
      kind: 'path',
      d: `M${f(basketX)} ${f(basketTop)} L${f(basketX + 0.66 * R)} ${f(basketTop)} L${f(basketX + 0.59 * R)} ${f(basketTop + 0.44 * R)} L${f(basketX + 0.05 * R)} ${f(basketTop + 0.44 * R)} Z`,
      fill: 'sun',
      stroke: 'ink',
      width: 2.2,
    });
  }
  return shapes;
}

/** Tight box around the drawing (stroke included), for laying bikes out side by side. */
export function bikeArtBounds(options) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const grow = (x, y, pad) => {
    x0 = Math.min(x0, x - pad); y0 = Math.min(y0, y - pad);
    x1 = Math.max(x1, x + pad); y1 = Math.max(y1, y + pad);
  };
  for (const s of bikeArtShapes(options)) {
    const pad = (s.width || 0) / 2;
    if (s.kind === 'circle') grow(s.cx, s.cy, s.r + pad);
    else for (const [, x, y] of s.d.matchAll(/(-?[\d.]+) (-?[\d.]+)/g)) grow(Number(x), Number(y), pad);
  }
  return { x: f(x0), y: f(y0), width: f(x1 - x0), height: f(y1 - y0) };
}

/** The drawing as an SVG string, for pages built outside React (the PDF catalogue). */
export function bikeArtSvg(options, { ink = '#0B0B0A', sun = '#FCC609', flip = false, attrs = '', viewBox = BIKE_ART_VIEWBOX } = {}) {
  const colour = (role) => (role === 'sun' ? sun : role === 'ink' ? ink : 'none');
  const body = bikeArtShapes(options)
    .map((s) => {
      const paint = `fill="${colour(s.fill)}" stroke="${colour(s.stroke)}"${s.width ? ` stroke-width="${s.width}"` : ''} stroke-linecap="round" stroke-linejoin="round"`;
      return s.kind === 'circle' ? `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}" ${paint}/>` : `<path d="${s.d}" ${paint}/>`;
    })
    .join('');
  const [vx, , vw] = viewBox.split(' ').map(Number);
  const inner = flip ? `<g transform="translate(${2 * vx + vw} 0) scale(-1 1)">${body}</g>` : body;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" ${attrs}>${inner}</svg>`;
}
