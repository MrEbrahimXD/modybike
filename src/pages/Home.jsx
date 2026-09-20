import { Link } from 'react-router-dom';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button } from '../components/ui/primitives.jsx';
import { ProductRow } from '../components/product/ProductCard.jsx';
import SizeCalculator from '../components/product/SizeCalculator.jsx';
import { Seo, organizationSchema, websiteSchema, faqSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { CATEGORIES } from '../data/categories.js';
import { featuredProducts, featuredAccessories, getProduct, PRODUCTS } from '../data/products.js';
import { LOCATIONS } from '../data/locations.js';
import { TOP_FAQS } from '../data/faqs.js';
import { POSTS_SORTED } from '../content/posts/index.js';
import { editorialImage, categoryImage, journalImage, productImage } from '../data/media.js';
import { SITE } from '../config/site.js';
import ShopCollections from '../components/product/ShopCollections.jsx';

/* ==========================================================================
   Home
   --------------------------------------------------------------------------
   Built as a stack of full-bleed "stages" rather than a scrolling document:
   every stage owns the whole viewport width, sets its own background, centres
   its type, and puts the photograph underneath the words. Sections alternate
   light and dark so each one reads as a separate statement.

   The rules that keep it from drifting back into a template:
     · one idea per stage, never a row of equal cards
     · headline → one line of subhead → two plain text links. Nothing else.
     · links are text with a chevron, not buttons, except the single hero CTA
     · vertical space is the main design material
   ========================================================================== */

/**
 * The actions a stage ends with.
 *
 * Apple sets both as quiet text links, which reads beautifully and assumes the
 * visitor already knows what they want. Most people arriving here do not, so
 * the first action is a real button with a solid fill and the rest stay as
 * links. Affordance first, restraint second.
 */
function StageLinks({ links = [], tone = 'light', className = '' }) {
  if (!links.length) return null;

  const [primary, ...rest] = links;
  const linkColor =
    tone === 'dark'
      ? 'text-signal-300 hover:text-signal-200'
      : 'text-signal-700 hover:text-signal-600 dark:text-signal-400';

  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      <Button
        as={Link}
        to={primary.to}
        variant={tone === 'dark' ? 'signal' : 'solid'}
        size="lg"
        iconEnd="arrowRight"
      >
        {primary.label}
      </Button>

      {rest.length ? (
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {rest.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`group inline-flex items-center gap-1.5 text-[17px] font-medium transition-colors ${linkColor}`}
            >
              {l.label}
              <Icon
                name="chevronRight"
                className="h-4 w-4 flip-rtl transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * One stage. `tone` picks the ground; the copy block is always centred and
 * capped to a readable measure regardless of how wide the screen gets.
 */
function Stage({
  tone = 'paper',
  eyebrow,
  title,
  subtitle,
  links,
  children,
  className = '',
  tight = false,
}) {
  const grounds = {
    paper: 'bg-paper text-carbon-950 dark:bg-carbon-950 dark:text-carbon-50',
    sunk: 'bg-paper-sunk text-carbon-950 dark:bg-carbon-900 dark:text-carbon-50',
    dark: 'bg-carbon-950 text-paper',
  };

  return (
    <section className={`${grounds[tone]} ${tight ? 'py-16 sm:py-20' : 'py-20 sm:py-28 lg:py-36'} ${className}`}>
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <p
              className={`label mb-4 ${
                tone === 'dark' ? 'text-signal-300' : 'text-signal-600 dark:text-signal-400'
              }`}
            >
              {eyebrow}
            </p>
          ) : null}

          <h2 className="text-display-lg text-balance">{title}</h2>

          {subtitle ? (
            <p
              className={`mx-auto mt-5 max-w-xl text-lg leading-relaxed sm:text-xl ${
                tone === 'dark' ? 'text-carbon-300' : 'muted'
              }`}
            >
              {subtitle}
            </p>
          ) : null}

          {links?.length ? <StageLinks links={links} tone={tone} className="mt-7" /> : null}
        </div>

        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function Hero() {
  const { t, path } = useLocale();

  return (
    <section className="relative isolate">
      <Media
        image={editorialImage('hero-primary')}
        alt=""
        sizes="100vw"
        priority
        fill
        position="center 45%"
      />
      <div className="absolute inset-0 scrim-b" aria-hidden="true" />

      {/* Deliberately short of a full screen. At 92svh the hero ate the whole
          first view, so nothing below it hinted that the page continued and
          the headline sank to the bottom under a tall empty sky. At ~66svh the
          block rides higher in frame and the age collections break the fold,
          which is what actually invites the first scroll. Still bottom-
          weighted, because that is where the scrim is dark enough for white
          type; the pad is in svh so the lift scales with the viewport. */}
      <div className="container-page relative flex min-h-[66svh] flex-col justify-end pb-[7svh] pt-32 text-center">
        <h1 className="mx-auto max-w-[14ch] text-display-xl text-white text-balance">
          {t('home.heroTitle')}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
          {t('home.heroSubtitle')}
        </p>

        <StageLinks
          className="mt-9"
          tone="dark"
          links={[
            { label: t('home.heroCtaPrimary'), to: `${path(paths.home())}#shop-by-age` },
            { label: t('home.heroCtaSecondary'), to: path(paths.sizeGuide()) },
            { label: t('nav.locations'), to: path(paths.locations()) },
          ]}
        />
      </div>
    </section>
  );
}

/**
 * The hero bike. One product, shot large on its own stage — the closest thing
 * a bike shop has to Apple opening with a single phone.
 */
function Spotlight() {
  const { t, tr, path, price } = useLocale();
  const hero = getProduct('alamin-26-400-fat') || featuredProducts(1)[0];
  if (!hero) return null;

  return (
    <section className="bg-carbon-950 pt-20 text-paper sm:pt-28 lg:pt-36">
      <div className="container-page text-center">
        <p className="label mb-4 text-signal-300">{t('home.featuredTitle')}</p>
        <h2 className="mx-auto max-w-[16ch] text-display-lg text-white text-balance">
          {tr(hero.name)}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-carbon-300 sm:text-xl">
          {tr(hero.tagline)}
        </p>

        <StageLinks
          tone="dark"
          className="mt-7"
          links={[
            { label: t('product.details'), to: path(paths.product(hero.slug)) },
            { label: t('common.viewAll'), to: path(paths.products()) },
          ]}
        />

        <p className="tnum mt-8 text-sm text-carbon-400">
          {t('common.from')} {price(hero.price)}
        </p>
      </div>

      {/* Large and centred, but held to the width its source can actually fill:
          the product files top out at 1200px, and a full-bleed 21:9 crop of a
          4:3 original would be both upscaled and mostly cropped away. */}
      <div className="container-page mt-14 sm:mt-20">
        <Media
          image={productImage(hero.slug, 0)}
          alt={tr(hero.name)}
          ratio="16/9"
          sizes="(max-width: 1280px) 100vw, 1200px"
          className="mx-auto max-w-6xl"
        />
      </div>
    </section>
  );
}

/**
 * The range, as a tile grid.
 *
 * Two large tiles then a six-up strip — the shape says kids and mountain are
 * the volume sellers, which is true, instead of presenting eight equal boxes.
 */
function Range() {
  const { t, tr, path } = useLocale();
  const bikes = CATEGORIES.filter((c) => c.kind === 'bike');
  const [lead, second, ...rest] = bikes;

  const Tile = ({ cat, large }) => (
    <Link
      to={path(paths.productsByCategory(cat.slug))}
      className="group relative isolate block overflow-hidden"
    >
      <div className="zoom-frame">
        <Media
          image={categoryImage(cat.slug)}
          alt=""
          ratio={large ? '4/5' : '3/4'}
          sizes={large ? '(max-width: 1024px) 100vw, 45vw' : '(max-width: 640px) 50vw, 22vw'}
        />
        <div className="absolute inset-0 scrim-b" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-center sm:p-8">
        <h3
          className={`font-bold tracking-tight text-white ${
            large ? 'text-display-sm' : 'text-lg sm:text-xl'
          }`}
        >
          {tr(cat.name)}
        </h3>
        <p className="mt-2 text-sm text-white/75">{tr(cat.short)}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-signal-300">
          {t('common.viewAll')}
          <Icon
            name="chevronRight"
            className="h-3.5 w-3.5 flip-rtl transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
          />
        </span>
      </div>
    </Link>
  );

  return (
    <Stage
      tone="paper"
      title={t('home.categoriesTitle')}
      subtitle={t('home.categoriesSubtitle')}
      links={[
        { label: t('product.allProducts'), to: path(paths.products()) },
        { label: t('nav.sizeGuide'), to: path(paths.sizeGuide()) },
      ]}
    >
      <div className="mt-16 grid gap-4 lg:grid-cols-2">
        <Tile cat={lead} large />
        <Tile cat={second} large />
      </div>

      {/* The strip holds whatever categories are left after the two lead tiles.
          Tailwind needs the column count as a literal, so it is looked up
          rather than interpolated — otherwise two categories would sit in a
          six-column row with four empty cells. */}
      <ul
        className={`mt-4 grid grid-cols-2 gap-4 ${
          { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[
            rest.length
          ] || 'sm:grid-cols-3 lg:grid-cols-6'
        }`}
        role="list"
      >
        {rest.map((c) => (
          <li key={c.slug}>
            <Tile cat={c} />
          </li>
        ))}
      </ul>
    </Stage>
  );
}

/** Size and fit, over a photograph, with the calculator itself on the stage. */
function Fit() {
  const { t } = useLocale();
  return (
    <section className="relative isolate">
      <Media image={editorialImage('hero-fit')} alt="" sizes="100vw" fill />
      <div className="absolute inset-0 bg-carbon-950/[0.88]" aria-hidden="true" />

      <div className="container-page relative py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-lg text-white text-balance">{t('home.sizeTeaserTitle')}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-carbon-300 sm:text-xl">
            {t('home.sizeTeaserBody')}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <SizeCalculator compact onDark />
        </div>
      </div>
    </section>
  );
}

/**
 * Why here. Three claims, not six — and set as large type on its own stage
 * rather than a grid of boxes with icons.
 */
function Promise() {
  const { t } = useLocale();
  const points = ['fit', 'warranty', 'support'];

  return (
    <Stage tone="sunk" title={t('home.whyTitle')} subtitle={t('home.whySubtitle')}>
      <div className="mx-auto mt-16 grid max-w-5xl gap-12 sm:grid-cols-3 sm:gap-10">
        {points.map((k) => (
          <div key={k} className="text-center">
            <h3 className="text-xl font-bold leading-snug sm:text-2xl">{t(`why.${k}.t`)}</h3>
            <p className="mx-auto mt-3 max-w-[32ch] text-[15px] leading-relaxed muted">
              {t(`why.${k}.d`)}
            </p>
          </div>
        ))}
      </div>

      {/* The numbers, as one quiet rule rather than three stat cards. */}
      <dl className="mx-auto mt-16 flex max-w-3xl flex-wrap items-baseline justify-center gap-x-12 gap-y-6 border-t pt-10 rule">
        {[
          [`${PRODUCTS.length}+`, t('home.heroStat1')],
          [LOCATIONS.length, t('home.heroStat2')],
          [5, t('home.heroStat3')],
        ].map(([value, label]) => (
          <div key={label} className="text-center">
            <dt className="label muted">{label}</dt>
            <dd className="tnum mt-1 text-3xl font-bold tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
    </Stage>
  );
}

/** Accessories — a shelf you scroll, which is how people browse them. */
function Accessories() {
  const { t, path } = useLocale();
  const accessories = featuredAccessories(8);

  return (
    <Stage
      tone="paper"
      title={t('home.accessoriesTitle')}
      subtitle={t('home.accessoriesSubtitle')}
      links={[
        { label: t('nav.accessories'), to: path(paths.accessories()) },
        { label: t('nav.faq'), to: path(paths.faq()) },
      ]}
    >
      <ProductRow products={accessories} label={t('home.accessoriesTitle')} className="mt-16" />
    </Stage>
  );
}

/** Delivery areas, set as one big paragraph of place names. */
function Areas() {
  const { t, tr, path } = useLocale();

  return (
    <Stage
      tone="dark"
      title={t('home.locationsTitle')}
      links={[
        { label: t('locations.allAreas'), to: path(paths.locations()) },
        { label: t('nav.contact'), to: path(paths.contact()) },
      ]}
    >
      <p className="mx-auto mt-14 max-w-4xl text-center text-xl leading-[1.9] text-carbon-400 sm:text-2xl">
        {LOCATIONS.map((loc, i) => (
          <span key={loc.slug}>
            {i > 0 ? <span className="text-carbon-400"> · </span> : null}
            <Link
              to={path(paths.location(loc.slug))}
              className="font-bold text-white/90 transition-colors hover:text-signal-300"
            >
              {tr(loc.name)}
            </Link>
          </span>
        ))}
      </p>
    </Stage>
  );
}

/** Journal — three guides, photo above, centred type below. */
function Journal() {
  const { t, tr, path, date } = useLocale();
  const posts = POSTS_SORTED.slice(0, 3);

  return (
    <Stage
      tone="sunk"
      title={t('home.blogTitle')}
      subtitle={t('home.blogSubtitle')}
      links={[
        { label: t('blog.allPosts'), to: path(paths.blog()) },
        { label: t('nav.sizeGuide'), to: path(paths.sizeGuide()) },
      ]}
    >
      <ul className="mt-16 grid gap-10 md:grid-cols-3" role="list">
        {posts.map((post) => (
          <li key={post.slug} className="group">
            <Link to={path(paths.blogPost(post.slug))} className="block text-center">
              <div className="zoom-frame">
                <Media
                  image={journalImage(post.slug)}
                  alt=""
                  ratio="4/3"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
              <p className="label mt-5 muted">
                {date(post.date)} · {t('blog.readingTime', { min: post.readingMin })}
              </p>
              <h3 className="mt-2.5 text-xl font-bold leading-snug transition-colors group-hover:text-signal-600 dark:group-hover:text-signal-400">
                {tr(post.title)}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */

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
            ? 'دراجات, عجل, دراجات هوائية, عجل اطفال, دراجات الشرقية, عجل الزقازيق, دراجات جبلية, إكسسوارات دراجات, أفضل أنواع الدراجات في مصر'
            : 'bicycles, bikes, kids bikes, mountain bikes, Al Sharqia, Zagazig, Egypt bike shop'
        }
        jsonLd={[organizationSchema(lang), websiteSchema(lang)].filter(Boolean)}
      />

      <Hero />
      <ShopCollections />
      {!SITE.isPlaceholderContent && <Spotlight />}
      <Fit />
      <Promise />
      {!SITE.isPlaceholderContent && <Accessories />}
      <Areas />
      <Journal />
    </>
  );
}
