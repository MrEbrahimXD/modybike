import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/Layout.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Section, SectionHead } from '../components/ui/primitives.jsx';
import { Seo, breadcrumbSchema, organizationSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { editorialImage } from '../data/media.js';
import { SITE, WHATSAPP_LINK } from '../config/site.js';

export default function About() {
  const { t, tr, lang, path } = useLocale();
  const addr = SITE.address;

  return (
    <>
      <Seo
        lang={lang}
        title={t('seo.aboutTitle')}
        description={t('seo.about')}
        canonicalPath={paths.about()}
        jsonLd={[
          organizationSchema(lang),
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('about.title'), path: paths.about() },
          ]),
        ].filter(Boolean)}
      />

      <PageHeader title={t('about.title')} lede={t('footer.about')} breadcrumbs={[{ label: t('about.title') }]} />

      <Section className="!py-10 sm:!py-14">
        <div className="container-page">
          <ul className="grid gap-px border bg-[var(--rule)] rule sm:grid-cols-3" role="list">
            {[
              ['bike', t('nav.products'), lang === 'ar' ? 'أطفال وشباب وكبار، من ١٢ لـ ٢٦ بوصة.' : 'Kids, teens and adults, 12 to 26 inch.', paths.products()],
              ['wrench', t('nav.maintenance'), t('why.support.d'), paths.maintenance()],
              ['truck', t('why.delivery.t'), t('why.delivery.d'), paths.shipping()],
            ].map(([icon, title, body, to]) => (
              <li key={to} className="bg-paper dark:bg-carbon-950">
                <Link to={path(to)} className="block h-full p-5 hover:underline">
                  <Icon name={icon} className="h-5 w-5 text-signal-600 dark:text-signal-400" />
                  <span className="mt-3 block font-bold">{title}</span>
                  <span className="mt-1 block text-sm muted">{body}</span>
                </Link>
              </li>
            ))}
          </ul>
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
                  {addr.streetVerified ? <>{tr(addr.street)}<br /></> : null}
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
