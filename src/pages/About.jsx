import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/Layout.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Eyebrow, PointItem, Section, SectionHead } from '../components/ui/primitives.jsx';
import { Seo, breadcrumbSchema, organizationSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { editorialImage } from '../data/media.js';
import { LOCATIONS } from '../data/locations.js';
import { PRODUCTS } from '../data/products.js';
import { SITE, WHATSAPP_LINK } from '../config/site.js';

export default function About() {
  const { t, tr, lang, path, num } = useLocale();
  const addr = SITE.address;
  const values = ['quality', 'fit', 'warranty', 'support'];

  return (
    <>
      <Seo
        lang={lang}
        title={`${t('about.title')} — ${t('common.brand')}`}
        description={t('footer.about')}
        canonicalPath={paths.about()}
        jsonLd={[
          organizationSchema(lang),
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('about.title'), path: paths.about() },
          ]),
        ].filter(Boolean)}
      />

      <PageHeader
        eyebrow={tr(addr.region)}
        title={t('about.storyTitle')}
        lede={t('footer.about')}
        image={editorialImage('hero-shop')}
        breadcrumbs={[{ label: t('about.title') }]}
      />

      {/* ------------------------------------------------------------ story */}
      <Section>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{t('about.storyTitle')}</Eyebrow>
            <p className="mt-7 max-w-prose text-[17px] leading-[1.85] text-carbon-700 dark:text-carbon-300">
              {SITE.description[lang]}
            </p>
            <p className="mt-5 max-w-prose text-[17px] leading-[1.85] text-carbon-700 dark:text-carbon-300">
              {t('footer.about')}
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6">
              {[
                [`${PRODUCTS.length}+`, t('home.heroStat1')],
                [num(LOCATIONS.length), t('home.heroStat2')],
                [num(5), t('home.heroStat3')],
              ].map(([v, l]) => (
                <div key={l} className="border-t pt-4 rule">
                  <dt className="label muted">{l}</dt>
                  <dd className="tnum mt-2 text-3xl font-bold tracking-tight text-signal-600 dark:text-signal-400">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <Media
              image={editorialImage('hero-shop-in')}
              alt=""
              ratio="4/5"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------------- values */}
      <Section className="bg-carbon-950 text-paper">
        <div className="container-page">
          <Eyebrow className="!text-signal-300">
            {t('about.valuesTitle')}
          </Eyebrow>
          <h2 className="mt-6 max-w-[18ch] text-display-md text-white">{t('home.whySubtitle')}</h2>

          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((k, i) => (
              <PointItem
                key={k}
                title={t(`why.${k}.t`)}
                className="border-carbon-800 [&_h3]:text-white [&_p]:text-carbon-400"
              >
                {t(`why.${k}.d`)}
              </PointItem>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- visit us */}
      <Section className="border-t rule">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead eyebrow={t('about.visitTitle')} title={tr(addr.city)} />

            <address className="mt-10 space-y-5 not-italic">
              <p className="flex items-start gap-4">
                <Icon name="mapPin" className="mt-1 h-5 w-5 shrink-0 text-signal-500" />
                <span className="text-base leading-relaxed">
                  {tr(addr.street)} — {tr(addr.district)}
                  <br />
                  {tr(addr.city)}، {tr(addr.region)}، {tr(addr.country)}
                </span>
              </p>
              {SITE.contact.phones.map((p) => (
                <p key={p} className="flex items-center gap-4">
                  <Icon name="phone" className="h-5 w-5 shrink-0 text-signal-500" />
                  <a href={`tel:${p.replace(/\s/g, '')}`} className="tnum link-underline text-base" dir="ltr">
                    {p}
                  </a>
                </p>
              ))}
              {SITE.contact.email && <p className="flex items-center gap-4">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-signal-500" />
                <a href={`mailto:${SITE.contact.email}`} className="link-underline text-base">
                  {SITE.contact.email}
                </a>
              </p>}
            </address>

            <h3 className="label mt-12 muted">{t('about.hoursTitle')}</h3>
            <dl className="mt-4 max-w-sm">
              {SITE.openingHours.map((h) => (
                <div key={h.days.join()} className="flex items-baseline justify-between gap-4 border-b py-3 rule">
                  <dt className="text-sm font-semibold">
                    {h.days.length > 1
                      ? `${t(`about.days.${h.days[0]}`)} – ${t(`about.days.${h.days[h.days.length - 1]}`)}`
                      : t(`about.days.${h.days[0]}`)}
                  </dt>
                  <dd className="tnum text-sm muted" dir="ltr">
                    {h.opens} – {h.closes}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={WHATSAPP_LINK} variant="whatsapp" size="lg" icon="whatsapp">
                {t('home.ctaButton')}
              </Button>
              <Button as={Link} to={path(paths.contact())} variant="outline" size="lg">
                {t('nav.contact')}
              </Button>
            </div>
          </div>

          <div>
            {addr.mapsEmbedUrl ? (
              <iframe
                src={addr.mapsEmbedUrl}
                title={t('contact.mapTitle')}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[24rem] w-full border rule"
              />
            ) : (
              <a
                href={addr.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label={t('contact.mapTitle')}
              >
                <div className="zoom-frame">
                  <Media
                    image={editorialImage('hero-locations')}
                    alt=""
                    ratio="4/3"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-carbon-950/45" aria-hidden="true" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                    <Icon name="mapPin" className="h-8 w-8" />
                    <span className="label">{t('contact.mapTitle')}</span>
                  </span>
                </div>
              </a>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
