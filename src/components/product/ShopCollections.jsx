import { Link } from 'react-router-dom';
import { AGE_GROUPS } from '../../data/collections.js';
import { useLocale } from '../../i18n/index.jsx';
import { paths } from '../../lib/routes.js';
import Media from '../ui/Media.jsx';
import { productImage } from '../../data/media.js';

// One real bike from the shop's own stock stands for each age band.
const AGE_IMAGES = {
  'ages-3-5': productImage('sports-boy-12'),
  'ages-5-8': productImage('mulliner-16-mag'),
  'ages-7-10': productImage('arizon-20-mag'),
  'ages-8-12': productImage('bmx-20-csk'),
  'ages-12-plus': productImage('magic-26-speed'),
};

/** Shop-by-age tiles: photo of a real bike and the age band, nothing else. */
export default function ShopCollections() {
  const { t, tr, path } = useLocale();
  return (
    <section id="shop-by-age" className="container-page py-10 sm:py-14">
      <h2 className="text-2xl font-bold sm:text-3xl">{t('home.categoriesTitle')}</h2>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" role="list">
        {AGE_GROUPS.map((group) => (
          <li key={group.slug}>
            <Link
              to={path(paths.byAge(group.slug))}
              className="group block border transition-colors rule hover:border-carbon-950 dark:hover:border-carbon-300"
            >
              <Media image={AGE_IMAGES[group.slug]} alt="" ratio="1/1" fit="contain" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
              <span className="block border-t px-3 py-3 text-center text-[15px] font-bold rule group-hover:underline sm:text-base">
                {tr(group.label)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
