import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import Icon from '../ui/Icon.jsx';
import Media from '../ui/Media.jsx';
import { Button } from '../ui/primitives.jsx';
import { useLocale, stripLocale } from '../../i18n/index.jsx';
import { useTheme } from '../../lib/theme.jsx';
import { useCart } from '../../lib/cart.jsx';
import { useLockBodyScroll, useMediaQuery } from '../../lib/hooks.js';
import { paths } from '../../lib/routes.js';
import { CATEGORIES } from '../../data/categories.js';
import { AGE_GROUPS, PRODUCT_TYPES } from '../../data/collections.js';
import { categoryImage } from '../../data/media.js';
import SearchOverlay from '../search/SearchOverlay.jsx';
import { SITE, WHATSAPP_LINK } from '../../config/site.js';

const SHOP_LINKS = [
  ...AGE_GROUPS.map((group) => ({ ...group, name: group.label, href: paths.byAge(group.slug) })),
  ...PRODUCT_TYPES.map((type) => ({ ...type, name: type.label, href: paths.byType(type.slug) })),
];

/* ==========================================================================
   Header
   --------------------------------------------------------------------------
   Sits transparent over the hero photograph and turns solid on scroll, so the
   first thing a visitor sees is the picture, not a toolbar.
   ========================================================================== */

/** Thin retail signal strip: the three promises a bike buyer actually checks. */
function Ticker() {
  const { t } = useLocale();
  /* Deliberately no delivery pricing here — the fee is quoted per area when
     the order is confirmed, not advertised as a headline number. */
  const items = [t('why.warranty.t'), t('why.delivery.t'), t('why.fit.t')];

  return (
    <div className="hidden bg-carbon-950 text-paper dark:bg-carbon-900 sm:block">
      <div className="container-page flex h-9 items-center justify-between">
        <ul className="flex items-center gap-7">
          {items.map((it) => (
            <li key={it} className="label flex items-center gap-2 opacity-80">
              <Icon name="check" className="h-3 w-3 text-signal-400" />
              {it}
            </li>
          ))}
        </ul>
        <a
          href={`tel:${SITE.contact.phones[0].replace(/\s/g, '')}`}
          className="label flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
        >
          <Icon name="phone" className="h-3 w-3" />
          <span className="tnum" dir="ltr">
            {SITE.contact.phones[0]}
          </span>
        </a>
      </div>
    </div>
  );
}

/** Desktop mega-menu: every bike category as a photograph, not a text list. */
function BikesMenu({ open, onClose }) {
  const { t, tr, path } = useLocale();
  const bikeCats = SHOP_LINKS;

  if (!open) return null;

  return (
    /* The colour has to be set here, not inherited. This panel lives inside
       <header>, and over the home hero the header is `text-white` — which put
       white category names on a paper-white panel and made them vanish. */
    <div
      className="absolute inset-x-0 top-full hidden border-t bg-paper text-carbon-950 shadow-menu rule dark:bg-carbon-950 dark:text-carbon-50 lg:block"
      onMouseLeave={onClose}
    >
      <div className="container-page py-10">
        <ul className="grid grid-cols-5 gap-x-6 gap-y-8">
          {bikeCats.map((c) => (
            <li key={c.slug}>
              <Link
                to={path(c.href)}
                onClick={onClose}
                className="group block"
              >
                <span className="mt-3.5 block text-base font-bold leading-snug group-hover:text-signal-700 dark:group-hover:text-signal-400">
                  {tr(c.name)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t pt-6 rule">
          <Link
            to={path(paths.products())}
            onClick={onClose}
            className="label link-underline text-signal-600 dark:text-signal-400"
          >
            {t('product.allProducts')} →
          </Link>
          <Link to={path(paths.sizeGuide())} onClick={onClose} className="label link-underline">
            {t('nav.sizeGuide')}
          </Link>
          <Link to={path(paths.accessories())} onClick={onClose} className="label link-underline">
            {t('nav.accessories')}
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Full-screen mobile navigation. */
function MobileNav({ open, onClose }) {
  const { t, tr, path, lang } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const panelRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const links = [
    [t('nav.products'), paths.products()],
    [t('nav.accessories'), paths.accessories()],
    [t('nav.sizeGuide'), paths.sizeGuide()],
    [t('nav.blog'), paths.blog()],
    [t('nav.locations'), paths.locations()],
    [t('nav.about'), paths.about()],
    [t('nav.contact'), paths.contact()],
    [t('nav.faq'), paths.faq()],
  ];

  const otherLang = lang === 'ar' ? 'en' : 'ar';
  const bare = stripLocale(location.pathname);

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      className="fixed inset-0 z-[90] flex flex-col bg-paper outline-none dark:bg-carbon-950 lg:hidden"
    >
      <div className="flex h-[68px] shrink-0 items-center justify-between border-b px-5 rule">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label={t('common.close')}
          className="tap-target -me-2 grid place-items-center"
        >
          <Icon name="close" className="h-6 w-6" />
        </button>
      </div>

      <nav aria-label={t('nav.mainNav')} className="flex-1 overflow-y-auto overscroll-contain">
        <ul>
          {links.map(([label, to]) => (
            <li key={to}>
              <Link
                to={path(to)}
                onClick={onClose}
                className="flex items-center justify-between gap-4 border-b px-5 py-5 rule"
              >
                <span className="text-2xl font-bold tracking-tight">{label}</span>
                <Icon name="arrowRight" className="h-4 w-4 shrink-0 flip-rtl text-carbon-400" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="px-5 py-6">
          <p className="label mb-4 muted">{t('home.categoriesTitle')}</p>
          <ul className="grid grid-cols-2 gap-2">
            {SHOP_LINKS.map((c) => (
              <li key={c.slug}>
                <Link
                  to={path(c.href)}
                  onClick={onClose}
                  className="flex items-center gap-2.5 border px-3 py-3 text-sm font-semibold rule"
                >
                  <Icon name={c.icon || 'bike'} className="h-4 w-4 shrink-0 text-signal-500" />
                  <span className="truncate">{tr(c.name)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="shrink-0 border-t p-5 rule">
        <Button href={WHATSAPP_LINK} variant="whatsapp" size="lg" icon="whatsapp" className="w-full">
          {t('home.ctaButton')}
        </Button>
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate(otherLang === 'ar' ? bare : `/en${bare === '/' ? '' : bare}`);
          }}
          className="label mt-4 flex w-full items-center justify-center gap-2 py-2"
        >
          <Icon name="globe" className="h-3.5 w-3.5" />
          {t('nav.switchLang')}
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const { t, lang, path } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { count } = useCart();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* ⌘K / Ctrl-K, and "/" the way every catalogue site has trained people —
     but never while they are already typing into something. */
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target?.tagName) || e.target?.isContentEditable;
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const bare = stripLocale(location.pathname);
  /* Only the home hero is dark enough to carry a transparent header. The
     overlay itself must be decided by route, not by scroll position: pulling
     the header out of flow on scroll would shift the whole page by its height. */
  const overlaysHero = bare === '/' && !SITE.isPlaceholderContent;
  const overHero = overlaysHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t('nav.accessories'), to: paths.accessories() },
    { label: t('nav.sizeGuide'), to: paths.sizeGuide() },
    { label: t('nav.blog'), to: paths.blog() },
    { label: t('nav.locations'), to: paths.locations() },
    { label: t('nav.about'), to: paths.about() },
  ];

  const switchLang = () => {
    const other = lang === 'ar' ? 'en' : 'ar';
    navigate(other === 'ar' ? bare : `/en${bare === '/' ? '' : bare}`);
  };

  /* Light accent over the photograph, dark accent on the solid bar. */
  const currentAccent = overHero ? 'text-signal-300' : 'text-signal-700 dark:text-signal-400';

  const tone = overHero
    ? 'text-white'
    : 'text-carbon-950 dark:text-carbon-50 bg-paper/95 dark:bg-carbon-950/95 backdrop-blur-md border-b rule';

  return (
    <>
      <Ticker />

      <header
        className={`sticky top-0 z-[60] transition-colors duration-300 ease-editorial ${tone} ${
          overlaysHero ? '-mb-[68px]' : ''
        }`}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <div className="container-page">
          <div className="flex h-[68px] items-center justify-between gap-6">
            <Link to={path(paths.home())} aria-label={t('common.brand')} className="shrink-0">
              <Logo />
            </Link>

            {/* ---------------------------------------------------- desktop nav */}
            {/* The "current" accent has to flip with the header's ground: the
                dark orange that reads well on paper disappears into a bright
                sky when the bar is transparent over the hero. */}
            <nav aria-label={t('nav.mainNav')} className="hidden lg:block">
              <ul className="flex items-center gap-8">
                <li>
                  <button
                    type="button"
                    onMouseEnter={() => setMenuOpen(true)}
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-expanded={menuOpen}
                    className={`label flex items-center gap-1.5 py-2 transition-opacity hover:opacity-60 ${
                      menuOpen ? currentAccent : ''
                    }`}
                  >
                    {t('nav.products')}
                    <Icon
                      name="chevronDown"
                      className={`h-3 w-3 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </li>
                {navLinks.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={path(l.to)}
                      onMouseEnter={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `label py-2 transition-opacity hover:opacity-60 ${isActive ? currentAccent : ''}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ------------------------------------------------------- actions */}
            <div className="flex items-center gap-1">
              {/* A magnifier on its own is only obvious to people who already
                  know the convention. On anything wider than a phone this looks
                  like the search box it opens, and says what it searches. */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label={t('common.search')}
                className={`me-2 hidden h-10 items-center gap-2.5 border ps-3 pe-14 text-start text-sm transition-colors md:flex ${
                  overHero
                    ? 'border-white/40 text-white/75 hover:border-white hover:text-white'
                    : 'rule text-carbon-500 hover:border-carbon-950 hover:text-carbon-900 dark:text-carbon-400 dark:hover:border-carbon-300 dark:hover:text-carbon-100'
                }`}
              >
                <Icon name="search" className="h-4 w-4 shrink-0" />
                {t('common.search')}
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label={t('common.search')}
                className="tap-target grid place-items-center transition-opacity hover:opacity-60 md:hidden"
              >
                <Icon name="search" className="h-[18px] w-[18px]" />
              </button>

              <button
                type="button"
                onClick={switchLang}
                className="label tap-target hidden items-center gap-1.5 px-2.5 transition-opacity hover:opacity-60 sm:flex"
                aria-label={t('nav.language')}
              >
                {lang === 'ar' ? 'EN' : 'AR'}
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={t('nav.toggleTheme')}
                className="tap-target grid place-items-center transition-opacity hover:opacity-60"
              >
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-[18px] w-[18px]" />
              </button>

              <Link
                to={path(paths.cart())}
                className="tap-target relative grid place-items-center transition-opacity hover:opacity-60"
                aria-label={`${t('nav.cart')}${count ? ` (${count})` : ''}`}
              >
                <Icon name="cart" className="h-[18px] w-[18px]" />
                {count > 0 ? (
                  <span className="tnum absolute -end-0.5 -top-0.5 grid h-4 min-w-4 place-items-center bg-signal-500 px-1 text-[10px] font-bold text-white">
                    {count}
                  </span>
                ) : null}
              </Link>

              {/* WhatsApp is how this shop actually takes orders, so it is a
                  solid green button that says WhatsApp — not a ghost outline
                  labelled "Order", which said neither what it was nor where it
                  went. Hidden below lg, where the floating button takes over,
                  so there is only ever one of these on screen. */}
              <Button
                href={WHATSAPP_LINK}
                variant="whatsapp"
                size="md"
                icon="whatsapp"
                className="ms-2 hidden lg:inline-flex"
              >
                {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
              </Button>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label={t('common.menu')}
                className="tap-target grid place-items-center lg:hidden"
              >
                <Icon name="menu" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {isDesktop ? <BikesMenu open={menuOpen} onClose={() => setMenuOpen(false)} /> : null}
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
