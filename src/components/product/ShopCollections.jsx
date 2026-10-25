import { Link } from 'react-router-dom';
import { AGE_GROUPS } from '../../data/collections.js';
import { useLocale } from '../../i18n/index.jsx';
import { paths } from '../../lib/routes.js';
import Media from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import { productImage } from '../../data/media.js';

// One real bike from the shop's own stock stands for each age band.
const AGE_IMAGES = {
  'ages-3-5': productImage('sports-boy-12'),
  'ages-5-8': productImage('mulliner-16-mag'),
  'ages-7-10': productImage('arizon-20-mag'),
  'ages-8-12': productImage('bmx-20-csk'),
  'ages-12-plus': productImage('magic-26-speed'),
};

/** The age range as a big number with a small unit, e.g. "3–5 سنين", "12 سنة فأكثر". */
function AgeLabel({ group, lang }) {
  const range = group.max ? `${group.min}–${group.max}` : lang === 'ar' ? `${group.min}` : `${group.min}+`;
  const unit = lang === 'ar'
    ? (group.max ? (group.max > 10 ? 'سنة' : 'سنين') : 'سنة فأكثر')
    : 'years';
  return (
    <span className="flex items-baseline gap-1.5">
      <span dir="ltr" className="tnum [unicode-bidi:isolate] text-2xl font-bold leading-none sm:text-3xl">{range}</span>
      <span className="text-sm text-carbon-300">{unit}</span>
    </span>
  );
}

/** Shop-by-age tiles: a real bike on white over a black bar carrying the age. */
export default function ShopCollections() {
  const { t, tr, path, lang } = useLocale();
  return (
    <section id="shop-by-age" className="container-page py-10 sm:py-14">
      <h2 className="text-2xl font-bold sm:text-3xl">{t('home.categoriesTitle')}</h2>
      <p className="mt-1 muted">{t('home.categoriesSubtitle')}</p>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" role="list">
        {AGE_GROUPS.map((group, i) => {
          const wide = i === AGE_GROUPS.length - 1; // the fifth tile fills the last row on phones
          return (
            <li key={group.slug} className={wide ? 'col-span-2 sm:col-span-1' : ''}>
              <Link
                to={path(paths.byAge(group.slug))}
                aria-label={tr(group.label)}
                className="group flex h-full flex-col overflow-hidden border border-carbon-200 bg-white transition-shadow hover:shadow-menu dark:border-carbon-800"
              >
                <div className={`relative ${wide ? 'aspect-[2/1] sm:aspect-square' : 'aspect-square'}`}>
                  <Media
                    image={AGE_IMAGES[group.slug]}
                    alt=""
                    fill
                    fit="contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    imgClassName="transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-auto flex items-center justify-between gap-2 bg-carbon-950 px-3 py-3 text-white sm:px-4">
                  <AgeLabel group={group} lang={lang} />
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FCC609] text-carbon-950 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                    <Icon name="chevronRight" className="h-4 w-4 flip-rtl" />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
