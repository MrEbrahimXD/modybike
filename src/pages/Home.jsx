import { Link } from 'react-router-dom';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button } from '../components/ui/primitives.jsx';
import { ProductGrid, ProductRow } from '../components/product/ProductCard.jsx';
import SizeCalculator from '../components/product/SizeCalculator.jsx';
import ShopCollections from '../components/product/ShopCollections.jsx';
import { Seo, organizationSchema, websiteSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { featuredProducts, featuredAccessories } from '../data/products.js';
import { LOCATIONS } from '../data/locations.js';
import { POSTS_SORTED } from '../content/posts/index.js';
import { editorialImage, journalImage } from '../data/media.js';
import { SITE } from '../config/site.js';

/* ==========================================================================
   Home — a shop front: short banner, shop by age, the bikes themselves,
   repairs, accessories, sizing, delivery cities, guides.
   ========================================================================== */

/** Section heading with an optional "see all" link on the far side. */
function Head({ title, to, linkLabel }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      {to ? (
        <Link to={to} className="inline-flex shrink-0 items-center gap-1 text-[15px] font-semibold text-signal-700 hover:underline dark:text-signal-400">
          {linkLabel}
          <Icon name="chevronRight" className="h-4 w-4 flip-rtl" />
        </Link>
      ) : null}
    </div>
  );
}

function Hero() {
  const { t, path } = useLocale();
  return (
    <section className="relative isolate">
      <Media image={editorialImage('hero-primary')} alt="" sizes="100vw" priority fill position="center 45%" />
      <div className="absolute inset-0 scrim-b" aria-hidden="true" />
      <div className="container-page relative flex min-h-[min(52svh,560px)] flex-col justify-end pb-10 pt-28 sm:pb-14">
        <h1 className="max-w-[16ch] text-display-lg text-white">{t('home.heroTitle')}</h1>
        <p className="mt-3 max-w-xl text-lg text-white/85">{t('home.heroSubtitle')}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button as={Link} to={path(paths.products())} variant="signal" size="lg" iconEnd="arrowRight">
            {t('home.heroCtaPrimary')}
          </Button>
          <Button as={Link} to={path(paths.maintenance())} variant="onDark" size="lg" icon="wrench">
            {t('nav.maintenance')}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Bikes() {
  const { t, path } = useLocale();
  const bikes = featuredProducts(8);
  return (
    <section className="container-page pb-12 sm:pb-16">
      <Head title={t('nav.products')} to={path(paths.products())} linkLabel={t('common.viewAll')} />
      <ProductGrid products={bikes} className="mt-5" cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
    </section>
  );
}

function Repairs() {
  const { t, path, lang } = useLocale();
  const items = lang === 'ar'
    ? ['فرامل', 'سرعات', 'كاوتش وشمبر', 'جنزير', 'ظبط جنط', 'تركيب']
    : ['Brakes', 'Gears', 'Tyres and tubes', 'Chains', 'Wheel truing', 'Assembly'];
  return (
    <section className="bg-carbon-950 text-paper">
      <div className="container-page grid gap-6 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{lang === 'ar' ? 'صيانة الدراجات' : 'Bike repairs'}</h2>
          <p className="mt-2 max-w-xl text-carbon-300">{t('why.support.d')}</p>
          <ul className="mt-4 flex flex-wrap gap-2" role="list">
            {items.map((x) => (
              <li key={x} className="border border-carbon-700 px-3 py-1.5 text-sm text-carbon-200">{x}</li>
            ))}
          </ul>
        </div>
        <Button as={Link} to={path(paths.maintenance())} variant="signal" size="lg" iconEnd="arrowRight">
          {lang === 'ar' ? 'تفاصيل الصيانة' : 'Repair details'}
        </Button>
      </div>
    </section>
  );
}

function Accessories() {
  const { t, path } = useLocale();
  return (
    <section className="container-page py-12 sm:py-16">
      <Head title={t('home.accessoriesTitle')} to={path(paths.accessories())} linkLabel={t('common.viewAll')} />
      <ProductRow products={featuredAccessories(8)} label={t('home.accessoriesTitle')} className="mt-5" />
    </section>
  );
}

function Fit() {
  const { t } = useLocale();
  return (
    <section className="border-y bg-paper-sunk rule dark:bg-carbon-900">
      <div className="container-page py-12 sm:py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{t('home.sizeTeaserTitle')}</h2>
          <p className="mt-2 muted">{t('home.sizeTeaserBody')}</p>
        </div>
        <div className="mt-6 max-w-3xl">
          <SizeCalculator compact />
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const { t, tr, path } = useLocale();
  return (
    <section className="container-page py-12 sm:py-16">
      <Head title={t('home.locationsTitle')} to={path(paths.locations())} linkLabel={t('locations.allAreas')} />
      <p className="mt-2 muted">{t('home.locationsSubtitle')}</p>
      <ul className="mt-5 flex flex-wrap gap-2" role="list">
        {LOCATIONS.map((loc) => (
          <li key={loc.slug}>
            <Link to={path(paths.location(loc.slug))} className="block border px-3 py-2 text-sm font-semibold transition-colors rule hover:border-carbon-950 dark:hover:border-carbon-300">
              {tr(loc.name)}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Journal() {
  const { t, tr, path } = useLocale();
  const posts = POSTS_SORTED.slice(0, 3);
  return (
    <section className="border-t rule">
      <div className="container-page py-12 sm:py-16">
        <Head title={t('home.blogTitle')} to={path(paths.blog())} linkLabel={t('blog.allPosts')} />
        <ul className="mt-5 grid gap-6 sm:grid-cols-3" role="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={path(paths.blogPost(post.slug))} className="group block">
                <Media image={journalImage(post.slug)} alt="" ratio="16/9" sizes="(max-width: 640px) 100vw, 33vw" />
                <h3 className="mt-3 text-lg font-bold leading-snug group-hover:underline">{tr(post.title)}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const { lang } = useLocale();
  return (
    <>
      <Seo
        lang={lang}
        title={`${SITE.name[lang]} — ${SITE.tagline[lang]}`}
        description={SITE.description[lang]}
        canonicalPath={lang === 'en' ? '/en' : '/'}
        keywords={
          lang === 'ar'
            ? 'دراجات, عجل, عجل أطفال, دراجات بالأسعار, دراجات أطفال, دراجات جبلية, صيانة دراجات, إكسسوارات دراجات, دراجات الشرقية, عجل الزقازيق, دراجات أبو كبير'
            : 'bicycles, kids bikes, bike prices Egypt, mountain bikes, bike repair, bike accessories, Sharqia, Zagazig'
        }
        jsonLd={[organizationSchema(lang), websiteSchema(lang)].filter(Boolean)}
      />
      <Hero />
      <ShopCollections />
      <Bikes />
      <Repairs />
      <Accessories />
      <Fit />
      <Areas />
      <Journal />
    </>
  );
}
