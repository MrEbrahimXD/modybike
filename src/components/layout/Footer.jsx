import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { LogoMark } from './Logo.jsx';
import { useLocale } from '../../i18n/index.jsx';
import { paths } from '../../lib/routes.js';
import { CATEGORIES } from '../../data/categories.js';
import { AGE_GROUPS } from '../../data/collections.js';
import { LIVE_PRODUCT_TYPES, WHEEL_SIZES } from '../../data/products.js';
import { LOCATIONS } from '../../data/locations.js';
import { SITE } from '../../config/site.js';

/* Footer: contact details, hours, sections and city pages. */

function Column({ title, children }) {
  return (
    <div>
      <h3 className="label text-carbon-400">{title}</h3>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ to, href, children }) {
  const cls =
    'link-underline text-sm text-carbon-300 transition-colors hover:text-white';
  if (href) {
    const external = /^https?:/.test(href);
    return (
      <li>
        <a
          href={href}
          className={cls}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link to={to} className={cls}>
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const { t, tr, path, lang } = useLocale();
  const year = new Date().getFullYear();

  const socials = [
    ['facebook', SITE.social.facebook],
    ['instagram', SITE.social.instagram],
    ['tiktok', SITE.social.tiktok],
    ['youtube', SITE.social.youtube],
  ].filter(([, url]) => url);

  const addr = SITE.address;

  return (
    <footer className="mt-auto bg-carbon-950 text-carbon-200">
      {/* ----------------------------------------------------------- columns */}
      <nav aria-label={t('nav.footerNav')} className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* brand + address */}
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-2.5 text-white">
              <LogoMark onDark className="h-12 w-12" />
              <span className="text-lg font-bold tracking-tight">{SITE.name[lang]}</span>
            </span>

            <p className="mt-5 max-w-measure text-sm leading-relaxed text-carbon-400">
              {t('footer.about')}
            </p>

            <address className="mt-7 space-y-3 not-italic">
              <p className="flex items-start gap-3 text-sm text-carbon-300">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-signal-500" />
                <span>
                  {addr.streetVerified ? <>{tr(addr.street)}<br /></> : null}
                  {tr(addr.city)}، {tr(addr.region)}
                </span>
              </p>
              {SITE.contact.phones.map((p) => (
                <p key={p} className="flex items-center gap-3 text-sm">
                  <Icon name="phone" className="h-4 w-4 shrink-0 text-signal-500" />
                  <a href={`tel:${p.replace(/\s/g, '')}`} className="tnum link-underline text-carbon-300 hover:text-white" dir="ltr">
                    {p}
                  </a>
                </p>
              ))}
              {SITE.contact.email && <p className="flex items-center gap-3 text-sm">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-signal-500" />
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="link-underline text-carbon-300 hover:text-white"
                >
                  {SITE.contact.email}
                </a>
              </p>}
            </address>

            {/* opening hours — a local shop must state them */}
            <dl className="mt-7 space-y-2">
              {SITE.openingHours.map((h) => (
                <div key={h.days.join()} className="flex items-baseline justify-between gap-4 text-sm">
                  <dt className="text-carbon-400">
                    {lang === 'ar'
                      ? (h.days.length === 7 ? 'يوميًا' : h.days.join('، '))
                      : h.days.length > 1
                        ? `${h.days[0]} – ${h.days[h.days.length - 1]}`
                        : h.days[0]}
                  </dt>
                  <dd className="tnum text-carbon-200" dir="ltr">
                    {h.opens} – {h.closes}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-2">
            <Column title={t('footer.categories')}>
              {AGE_GROUPS.map((c) => (
                <FooterLink key={c.slug} to={path(paths.byAge(c.slug))}>{tr(c.label)}</FooterLink>
              ))}
              {CATEGORIES.filter((c) => c.kind === 'bike').map((c) => (
                <FooterLink key={c.slug} to={path(paths.byCategory(c.slug))}>{tr(c.name)}</FooterLink>
              ))}
              {LIVE_PRODUCT_TYPES.filter((c) => c.slug !== 'bikes').map((c) => (
                <FooterLink key={c.slug} to={path(paths.byType(c.slug))}>{tr(c.label)}</FooterLink>
              ))}
              <li className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1 text-sm text-carbon-300">
                <span>{lang === 'ar' ? 'مقاس' : 'Size'}</span>
                {WHEEL_SIZES.map((inches) => (
                  <Link key={inches} to={path(paths.bySize(inches))} className="link-underline tnum transition-colors hover:text-white" dir="ltr">
                    {`${inches}"`}
                  </Link>
                ))}
              </li>
            </Column>
          </div>

          <div className="lg:col-span-2">
            <Column title={t('footer.quickLinks')}>
              <FooterLink to={path(paths.products())}>{t('nav.products')}</FooterLink>
              <FooterLink to={path(paths.maintenance())}>{t('nav.maintenance')}</FooterLink>
              <FooterLink href={`${import.meta.env.BASE_URL}catalogue/modybike-catalogue-${lang}.pdf`}>{t('nav.catalogue')}</FooterLink>
              <FooterLink to={path(paths.sizeGuide())}>{t('nav.sizeGuide')}</FooterLink>
              <FooterLink to={path(paths.contact())}>{t('nav.contact')}</FooterLink>
              <FooterLink to={path(paths.blog())}>{t('nav.blog')}</FooterLink>
              <FooterLink to={path(paths.about())}>{t('nav.about')}</FooterLink>
              <FooterLink to={path(paths.faq())}>{t('nav.faq')}</FooterLink>
              <FooterLink to={path(paths.shipping())}>{t('legal.shipping')}</FooterLink>
            </Column>
          </div>

          <div className="lg:col-span-4">
            <Column title={t('nav.locations')}>
              <li className="flex flex-wrap gap-x-4 gap-y-2.5">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.slug}
                    to={path(paths.location(loc.slug))}
                    className="link-underline text-sm text-carbon-300 transition-colors hover:text-white"
                  >
                    {tr(loc.name)}
                  </Link>
                ))}
              </li>
            </Column>

            {socials.length ? (
              <>
                <h3 className="label mt-10 text-carbon-400">{t('footer.followUs')}</h3>
                <ul className="mt-5 flex gap-2">
                  {socials.map(([name, url]) => (
                    <li key={name}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="grid h-11 w-11 place-items-center border border-carbon-800 text-carbon-300 transition-colors hover:border-white hover:bg-white hover:text-carbon-950"
                      >
                        <Icon name={name} className="h-[18px] w-[18px]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------------- fine print */}
      <div className="border-t border-carbon-800">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="label text-carbon-400">
            © <span className="tnum">{year}</span> {SITE.legalName[lang]} — {t('footer.rights')}
          </p>
          <ul className="flex items-center gap-6">
            <FooterLink to={path(paths.privacy())}>{t('legal.privacy')}</FooterLink>
            <FooterLink to={path(paths.terms())}>{t('legal.terms')}</FooterLink>
            <li>
              <a href="#top" className="label text-carbon-400 transition-colors hover:text-white">
                {t('footer.backToTop')} ↑
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
