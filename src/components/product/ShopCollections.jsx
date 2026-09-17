import { Link } from 'react-router-dom';
import { AGE_GROUPS, PRODUCT_TYPES } from '../../data/collections.js';
import { useLocale } from '../../i18n/index.jsx';
import { paths } from '../../lib/routes.js';
import Icon from '../ui/Icon.jsx';
import Media from '../ui/Media.jsx';
import { categoryImage, productImage } from '../../data/media.js';

// Reuse the responsive placeholder photography from the original catalogue.
const AGE_IMAGES = {
  'ages-3-5': categoryImage('kids'),
  'ages-5-8': productImage('junior-sport-16'),
  'ages-7-10': productImage('adventure-20'),
  'ages-8-12': productImage('teen-trail-24'),
  'ages-12-plus': categoryImage('mountain'),
};

export default function ShopCollections() {
  const { lang, tr, path } = useLocale();
  return <section id="shop-by-age" className="bg-paper-sunk py-16 dark:bg-carbon-900 sm:py-24">
    <div className="container-page">
      <p className="label text-signal-600 dark:text-signal-400">{lang === 'ar' ? 'مودي بايك · لكل مرحلة اختيار' : 'ModyBike · A choice for every stage'}</p>
      <h2 className="mt-4 text-display-md">{lang === 'ar' ? 'نبدأ بالعمر. ونختار سوا.' : 'Start with their age. Choose together.'}</h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed muted">{lang === 'ar' ? 'عجلة لأول مشوار، سكوتر للفسحة، أو عربية للعب. اختار العمر وبعدها النوع، وإحنا نساعدك في المقاس المناسب.' : 'A bike for a first ride, a scooter for the park, or a car for play. Start with an age and a product type; we will help with the fit.'}</p>
      <nav aria-label={lang === 'ar' ? 'الأقسام حسب العمر' : 'Shop by age'} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {AGE_GROUPS.map((group, index) => (
          <Link
            key={group.slug}
            to={path(paths.byAge(group.slug))}
            className={`group relative isolate block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-500 ${index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
          >
            <div className="zoom-frame">
              <Media
                image={AGE_IMAGES[group.slug]}
                alt=""
                ratio="4/3"
                sizes={index < 2 ? '(max-width: 639px) 100vw, 50vw' : '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'}
              />
            </div>
            <div className="absolute inset-0 scrim-b" aria-hidden="true" />
            <span className="label absolute start-5 top-5 text-white/80">0{index + 1}</span>
            <div className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-8">
              <h3 className="text-xl font-bold text-white sm:text-2xl">{tr(group.label)}</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-signal-300">
                {lang === 'ar' ? 'تصفّح القسم' : 'Explore collection'}
                <Icon name="chevronRight" className="h-4 w-4 flip-rtl transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </nav>
      <h3 className="mt-12 text-xl font-bold">{lang === 'ar' ? 'أو اختار نوع المنتج' : 'Or choose a product type'}</h3>
      <nav aria-label={lang === 'ar' ? 'الأقسام حسب النوع' : 'Shop by type'} className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {PRODUCT_TYPES.map((type) => <Link key={type.slug} to={path(paths.byType(type.slug))} className="flex items-center justify-between gap-2 border px-5 py-6 font-bold rule transition-colors hover:border-signal-500">{tr(type.label)}<Icon name="arrowRight" className="h-4 w-4 shrink-0 flip-rtl" /></Link>)}
      </nav>
    </div>
  </section>;
}
