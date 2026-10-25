import { Link } from 'react-router-dom';
import { AGE_GROUPS } from '../../data/collections.js';
import { queryProducts } from '../../data/products.js';
import { useLocale } from '../../i18n/index.jsx';
import { paths } from '../../lib/routes.js';

/** What each age tile draws: the bike grows from tile to tile. */
const AGE_ART = {
  'ages-3-5': { wheel: 12, training: true, basket: true },
  'ages-5-8': { wheel: 16, training: true, basket: true },
  'ages-7-10': { wheel: 20, basket: true },
  'ages-8-12': { wheel: 23, basket: true },
  'ages-12-plus': { wheel: 26, mtb: true },
};

const f = (n) => n.toFixed(1);
const pt = (a) => `${f(a.x)} ${f(a.y)}`;
const add = (a, dx, dy) => ({ x: a.x + dx, y: a.y + dy });
const lerp = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

/**
 * Side view of a bike standing on the bottom edge of a 200×116 box. Every
 * tile shares the box, so a 12" bike really is drawn smaller than a 26" one.
 */
function BikeArt({ wheel, training = false, basket = false, mtb = false, className = '' }) {
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
  const line = (points, width, stroke = 'currentColor') => (
    <path d={`M${points.map(pt).join(' L')}`} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />
  );
  const trainer = Math.max(7, 0.42 * R);
  const trainerAt = { x: rx - 0.56 * R, y: G - trainer };
  const basketTop = bar.y + 0.16 * R;
  const basketX = headTop.x + 0.08 * R;

  return (
    <svg viewBox="0 0 200 116" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false" className={className}>
      {training ? (
        <>
          {line([rear, trainerAt], 2.2)}
          <circle cx={f(trainerAt.x)} cy={f(trainerAt.y)} r={f(trainer - 1.2)} className="fill-sun" stroke="currentColor" strokeWidth="2.2" />
        </>
      ) : null}
      {[rear, front].map((c) => (
        <g key={c.x}>
          <circle cx={f(c.x)} cy={f(c.y)} r={f(R - 2.2)} fill="none" stroke="currentColor" strokeWidth={mtb ? 5 : 4.4} />
          <circle cx={f(c.x)} cy={f(c.y)} r={f(R - 6.4)} fill="none" className="stroke-sun" strokeWidth="2" />
          <circle cx={f(c.x)} cy={f(c.y)} r="2" fill="currentColor" />
        </g>
      ))}
      {line([rear, bb], 3)}
      {line([rear, stays], 3)}
      {line([bb, seatTop], 3.4)}
      {line([headTop, mtb ? lerp(bb, seatTop, 0.92) : stays], 3.6)}
      {line([headBottom, bb], 3.8)}
      {line([headTop, headBottom], 4.2)}
      {line([headBottom, front], mtb ? 4.6 : 3.2)}
      {line([seatTop, saddle], 2.8)}
      <path d={`M${pt(add(saddle, -0.34 * R, 0))} L${pt(add(saddle, 0.22 * R, 0.02 * R))}`} className="stroke-sun" strokeWidth="5.2" strokeLinecap="round" />
      {mtb
        ? line([headTop, bar, add(bar, 0.06 * R, -0.01 * R)], 3)
        : line([headTop, bar, add(bar, -0.4 * R, 0.03 * R)], 3)}
      <circle cx={f(bb.x)} cy={f(bb.y)} r={f(0.18 * R + 1.6)} fill="none" stroke="currentColor" strokeWidth="2.2" />
      {line([bb, add(bb, 0.16 * R, 0.32 * R)], 2.6)}
      {line([add(bb, 0.04 * R, 0.32 * R), add(bb, 0.3 * R, 0.32 * R)], 2.6)}
      {basket ? (
        <>
          {line([add(bar, 0, 0.04 * R), { x: basketX + 0.04 * R, y: basketTop }], 2)}
          <path
            d={`M${f(basketX)} ${f(basketTop)} L${f(basketX + 0.66 * R)} ${f(basketTop)} L${f(basketX + 0.59 * R)} ${f(basketTop + 0.44 * R)} L${f(basketX + 0.05 * R)} ${f(basketTop + 0.44 * R)} Z`}
            className="fill-sun"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </>
      ) : null}
    </svg>
  );
}

/** The age range as a big number with a small unit, e.g. "3–5 سنين", "12 سنة فأكثر". */
function AgeLabel({ group, lang }) {
  const range = group.max ? `${group.min}–${group.max}` : lang === 'ar' ? `${group.min}` : `${group.min}+`;
  const unit = lang === 'ar'
    ? (group.max ? (group.max > 10 ? 'سنة' : 'سنين') : 'سنة فأكثر')
    : 'years';
  return (
    <span className="flex items-baseline gap-1.5">
      <span dir="ltr" className="tnum [unicode-bidi:isolate] text-3xl font-bold leading-none sm:text-4xl">{range}</span>
      <span className="text-[15px] font-medium muted">{unit}</span>
    </span>
  );
}

/** Shop-by-age tiles: the age, the cheapest bike in the band, and a bike drawn to scale. */
export default function ShopCollections() {
  const { t, tr, path, lang, price } = useLocale();
  return (
    <section id="shop-by-age" className="container-page py-10 sm:py-14">
      <h2 className="text-2xl font-bold sm:text-3xl">{t('home.categoriesTitle')}</h2>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5" role="list">
        {AGE_GROUPS.map((group, i) => {
          const bikes = queryProducts({ ageGroup: group.slug, productType: 'bikes' });
          const from = bikes.length ? Math.min(...bikes.map((b) => b.price)) : null;
          const wide = i === AGE_GROUPS.length - 1; // the fifth tile fills the last row on phones
          return (
            <li key={group.slug} className={wide ? 'col-span-2 md:col-span-1' : ''}>
              <Link
                to={path(paths.byAge(group.slug))}
                aria-label={`${tr(group.label)}${from ? ` — ${t('common.from')} ${price(from)}` : ''}`}
                className="group flex h-full flex-col overflow-hidden bg-sun-soft transition-shadow hover:shadow-menu dark:bg-carbon-900"
              >
                <span className="block px-4 pt-4">
                  <AgeLabel group={group} lang={lang} />
                  {from ? (
                    <span className="mt-1.5 block text-sm font-medium text-carbon-700 dark:text-carbon-300">
                      {t('common.from')} <span className="tnum">{price(from)}</span>
                    </span>
                  ) : null}
                </span>
                <BikeArt
                  {...AGE_ART[group.slug]}
                  className="mx-auto mt-auto block h-[96px] w-full px-2 pt-3 text-carbon-950 transition-transform duration-300 group-hover:-translate-y-0.5 flip-rtl dark:text-paper sm:h-[124px]"
                />
                <span aria-hidden="true" className="block h-1.5 bg-carbon-950 dark:bg-sun" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
