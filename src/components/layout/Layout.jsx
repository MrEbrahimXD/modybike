import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { stripLocale } from '../../i18n/index.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Icon from '../ui/Icon.jsx';
import Media from '../ui/Media.jsx';
import { useLocale } from '../../i18n/index.jsx';
import { useCart } from '../../lib/cart.jsx';
import { useAnyOnScreen } from '../../lib/hooks.js';
import { SITE, WHATSAPP_LINK } from '../../config/site.js';

/** Scrolls to top on navigation, but leaves in-page anchors alone. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname, hash]);
  return null;
}

/** Announces cart changes to screen readers without stealing focus. */
function CartAnnouncer() {
  const { announcement, count } = useCart();
  const { t } = useLocale();
  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement ? t('cart.itemsCount', { count }) : ''}
    </div>
  );
}

/** Pages whose first screen already has its own WhatsApp button. */
const OWN_WHATSAPP = /^\/(maintenance|contact|checkout)\/?$|^\/locations\/[^/]+/;

/**
 * The floating WhatsApp action, for phones and tablets only (the header has
 * one from `lg`). One WhatsApp button on screen at a time: it steps aside
 * while the page's own WhatsApp button is visible.
 */
function WhatsAppFab() {
  const { t } = useLocale();
  const { pathname } = useLocation();
  const bare = stripLocale(pathname);
  const pageButtonVisible = useAnyOnScreen(
    () => document.querySelectorAll('main .bg-whatsapp'),
    pathname,
    OWN_WHATSAPP.test(bare),
  );
  // Product pages carry their own bottom buy bar.
  if (/^\/products\/[^/]+/.test(bare)) return null;
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t('a11y.chatWhatsapp')} ${t('a11y.externalLink')}`}
      aria-hidden={pageButtonVisible || undefined}
      tabIndex={pageButtonVisible ? -1 : undefined}
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] end-4 z-40 inline-flex h-14 items-center gap-2.5 bg-whatsapp px-5 text-[15px] font-semibold text-white shadow-sheet transition-[transform,opacity,background-color] duration-200 hover:bg-whatsapp-ink lg:hidden print:hidden ${
        pageButtonVisible ? 'pointer-events-none translate-y-24 opacity-0' : ''
      }`}
    >
      <Icon name="whatsapp" className="h-5 w-5 shrink-0" />
      {t('home.ctaButton')}
    </a>
  );
}

export default function Layout() {
  const { t, lang, dir } = useLocale();

  useEffect(() => {
    document.documentElement.lang = lang === 'ar' ? 'ar-EG' : 'en';
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <div id="top" className="flex min-h-svh flex-col">
      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>

      <ScrollManager />
      <CartAnnouncer />

      <Header />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {SITE.isPlaceholderContent && <p className="bg-paper-sunk px-5 py-3 text-center text-sm text-carbon-700 dark:bg-carbon-900 dark:text-carbon-200">{t('common.placeholderNotice')}</p>}
        <Outlet />
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
}

/* ==========================================================================
   Shared page furniture
   ========================================================================== */

/** Breadcrumb trail. */
export function Breadcrumbs({ items = [], className = '', onDark = false }) {
  const { t, path } = useLocale();
  if (!items.length) return null;

  const linkCls = onDark
    ? 'text-white/70 hover:text-white'
    : 'text-carbon-500 hover:text-signal-600 dark:text-carbon-400 dark:hover:text-signal-400';

  return (
    <nav aria-label={t('a11y.breadcrumb')} className={`min-w-0 ${className}`}>
      <ol className="label flex flex-wrap items-center gap-x-2 gap-y-1">
        <li className="flex items-center gap-2">
          <Link to={path('/')} className={`transition-colors ${linkCls}`}>
            {t('nav.home')}
          </Link>
          <span aria-hidden="true" className={onDark ? 'text-white/40' : 'text-carbon-300'}>
            /
          </span>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-2">
              {last || !item.to ? (
                <span
                  className={`truncate ${onDark ? 'text-white' : 'text-carbon-900 dark:text-carbon-100'}`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.to} className={`transition-colors ${linkCls}`}>
                    {item.label}
                  </Link>
                  <span aria-hidden="true" className={onDark ? 'text-white/40' : 'text-carbon-300'}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Page masthead.
 *
 * With a photograph it goes full-bleed and dark, the way an editorial section
 * opener should; without one it falls back to a typographic block on paper.
 * Either way the H1 is the biggest thing on the screen.
 */
export function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  lede,
  image,
  children,
  align = 'start',
  className = '',
}) {
  if (image) {
    return (
      <header className={`relative isolate ${className}`}>
        <Media image={image} alt="" sizes="100vw" priority fill />
        <div className="absolute inset-0 scrim-full" aria-hidden="true" />
        <div className="container-page relative flex min-h-[clamp(320px,42vw,520px)] flex-col justify-end py-12 sm:py-16">
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-6" onDark /> : null}
          {/* White, not the accent: an orange kicker on a mid-tone photograph
              never clears contrast, and the accent already has the CTA. */}
          {eyebrow ? <p className="label mb-4 text-white/80">{eyebrow}</p> : null}
          <h1 className="max-w-[18ch] text-display-lg text-white">{title}</h1>
          {lede ? (
            <p className="mt-5 max-w-measure text-base leading-relaxed text-white/80 sm:text-lg">
              {lede}
            </p>
          ) : null}
          {children}
        </div>
      </header>
    );
  }

  return (
    <header className={`border-b rule ${className}`}>
      <div className={`container-page py-12 sm:py-16 lg:py-20 ${align === 'center' ? 'text-center' : ''}`}>
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} className="mb-6" /> : null}
        {eyebrow ? <p className="label mb-4 text-signal-600 dark:text-signal-400">{eyebrow}</p> : null}
        <h1 className={`text-display-lg ${align === 'center' ? 'mx-auto' : ''} max-w-[18ch]`}>{title}</h1>
        {lede ? (
          <p
            className={`mt-6 max-w-measure text-base leading-relaxed muted sm:text-lg ${
              align === 'center' ? 'mx-auto' : ''
            }`}
          >
            {lede}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}
