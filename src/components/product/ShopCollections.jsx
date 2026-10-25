import { Link } from 'react-router-dom';
import { AGE_GROUPS } from '../../data/collections.js';
import { queryProducts } from '../../data/products.js';
import { useLocale } from '../../i18n/index.jsx';
import { paths } from '../../lib/routes.js';
import { BIKE_ART_VIEWBOX, bikeArtShapes } from '../../lib/bikeArt.js';

/** What each age tile draws: the bike grows from tile to tile. */
const AGE_ART = {
  'ages-3-5': { wheel: 12, training: true, basket: true },
  'ages-5-8': { wheel: 16, training: true, basket: true },
  'ages-7-10': { wheel: 20, basket: true },
  'ages-8-12': { wheel: 23, basket: true },
  'ages-12-plus': { wheel: 26, mtb: true },
};

/** Brand-yellow parts take a Tailwind class so dark mode can keep them yellow. */
const paint = (role) => (role === 'ink' ? 'currentColor' : 'none');

/** A bike drawn to scale for its wheel size (shared with the PDF catalogue). */
function BikeArt({ className = '', ...options }) {
  return (
    <svg viewBox={BIKE_ART_VIEWBOX} preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false" className={className}>
      {bikeArtShapes(options).map((s, i) => {
        const props = {
          fill: paint(s.fill),
          stroke: paint(s.stroke),
          strokeWidth: s.width,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          className: [s.fill === 'sun' && 'fill-sun', s.stroke === 'sun' && 'stroke-sun'].filter(Boolean).join(' ') || undefined,
        };
        return s.kind === 'circle' ? <circle key={i} cx={s.cx} cy={s.cy} r={s.r} {...props} /> : <path key={i} d={s.d} {...props} />;
      })}
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
