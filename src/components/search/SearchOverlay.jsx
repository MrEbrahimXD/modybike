import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import Media from '../ui/Media.jsx';
import { useLocale } from '../../i18n/index.jsx';
import { useLockBodyScroll } from '../../lib/hooks.js';
import { paths } from '../../lib/routes.js';
import { searchAll, SUGGESTED_QUERIES } from '../../lib/search.js';
import { productImage } from '../../data/media.js';
import { isAccessory } from '../../data/products.js';

/* ==========================================================================
   Search
   --------------------------------------------------------------------------
   Opens over the page, results update as you type, and the whole thing is
   driveable from the keyboard: ↑ ↓ to move, Enter to open, Esc to close.
   The catalogue is already in memory, so there is no request and no spinner.
   ========================================================================== */

/** Wraps every occurrence of the typed text in <mark>. */
function Highlight({ text, query }) {
  const q = query.trim();
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-signal-200 text-carbon-950 dark:bg-signal-500/30 dark:text-signal-100">
        {text.slice(i, i + q.length)}
      </mark>
      {text.slice(i + q.length)}
    </>
  );
}

export default function SearchOverlay({ open, onClose }) {
  const { t, tr, lang, path, price } = useLocale();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  useLockBodyScroll(open);

  const results = useMemo(() => searchAll(query), [query]);

  /** One flat list of destinations, so arrow keys cross section boundaries. */
  const flat = useMemo(() => {
    const rows = [];
    results.products.forEach((p) =>
      rows.push({ type: 'product', key: `p-${p.id}`, item: p, to: path(paths.product(p.slug)) }),
    );
    results.categories.forEach((c) =>
      rows.push({
        type: 'category',
        key: `c-${c.slug}`,
        item: c,
        to: path(
          c.kind === 'age' ? paths.byAge(c.slug) : c.kind === 'type' ? paths.byType(c.slug) : c.kind === 'bike'
            ? paths.byCategory(c.slug)
            : c.kind === 'group'
              ? `${paths.accessories()}?sub=${c.slug}`
              : paths.accessories(),
        ),
      }),
    );
    results.posts.forEach((b) =>
      rows.push({ type: 'post', key: `b-${b.slug}`, item: b, to: path(paths.blogPost(b.slug)) }),
    );
    return rows;
  }, [results, path]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      // a tick, so the element exists and the mobile keyboard opens
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [open]);

  const go = useCallback(
    (to) => {
      onClose();
      navigate(to);
    },
    [navigate, onClose],
  );

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!flat.length) return;
      setActive((i) => {
        const next = e.key === 'ArrowDown' ? i + 1 : i - 1;
        return (next + flat.length) % flat.length;
      });
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (flat[active]) go(flat[active].to);
      else if (query.trim()) go(path(paths.products(`q=${encodeURIComponent(query.trim())}`)));
    }
  };

  // Keep the highlighted row in view while arrowing through a long list.
  useEffect(() => {
    const el = listRef.current?.querySelector('[data-active="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open || typeof document === 'undefined') return null;

  const suggestions = SUGGESTED_QUERIES[lang] || SUGGESTED_QUERIES.ar;
  let rowIndex = -1;

  const Row = ({ row, children }) => {
    rowIndex += 1;
    const i = rowIndex;
    const isActive = i === active;
    return (
      <li>
        <button
          type="button"
          data-active={isActive}
          onMouseEnter={() => setActive(i)}
          onClick={() => go(row.to)}
          className={`flex w-full items-center gap-4 px-5 py-3 text-start transition-colors sm:px-6 ${
            isActive ? 'bg-carbon-950 text-paper dark:bg-paper dark:text-carbon-950' : ''
          }`}
        >
          {children(isActive)}
        </button>
      </li>
    );
  };

  const SectionTitle = ({ children }) => (
    <li className="label sticky top-0 bg-paper px-5 pb-2 pt-5 text-carbon-500 dark:bg-carbon-950 dark:text-carbon-400 sm:px-6">
      {children}
    </li>
  );

  return createPortal(
    <div className="fixed inset-0 z-[95] flex justify-center" role="presentation">
      <div
        className="absolute inset-0 bg-carbon-950/70 backdrop-blur-[3px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('common.search')}
        onKeyDown={onKeyDown}
        className="relative mx-4 mt-[8svh] flex max-h-[80svh] w-full max-w-2xl flex-col bg-paper shadow-sheet dark:bg-carbon-950"
      >
        {/* ------------------------------------------------------------ input */}
        <div className="flex items-center gap-4 border-b px-5 rule sm:px-6">
          <Icon name="search" className="h-5 w-5 shrink-0 text-carbon-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.searchPlaceholder')}
            aria-label={t('common.search')}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className="w-full border-0 bg-transparent py-5 text-lg outline-none placeholder:text-carbon-400 focus:ring-0 dark:placeholder:text-carbon-500 [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="label shrink-0 border px-2.5 py-1.5 text-carbon-500 transition-colors rule hover:border-carbon-950 hover:text-carbon-950 dark:hover:border-carbon-300 dark:hover:text-carbon-100"
          >
            Esc
          </button>
        </div>

        {/* ---------------------------------------------------------- results */}
        <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {results.empty ? (
            <div className="px-5 py-6 sm:px-6">
              <p className="label mb-4 muted">{t('common.more')}</p>
              <ul className="flex flex-wrap gap-2" role="list">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setQuery(s)}
                      className="label border px-3 py-2 transition-colors rule hover:border-carbon-950 hover:bg-carbon-950 hover:text-paper dark:hover:border-paper dark:hover:bg-paper dark:hover:text-carbon-950"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : !flat.length ? (
            <div className="px-6 py-14 text-center">
              <p className="text-lg font-bold">{t('common.noResults')}</p>
              <p className="mx-auto mt-2 max-w-measure text-sm muted">{t('common.noResultsHint')}</p>
            </div>
          ) : (
            <ul role="list" className="pb-3">
              {results.products.length ? (
                <>
                  <SectionTitle>{t('product.products')}</SectionTitle>
                  {results.products.map((p) => (
                    <Row key={`p-${p.id}`} row={flat.find((r) => r.key === `p-${p.id}`)}>
                      {(isActive) => (
                        <>
                          <span className="w-14 shrink-0">
                            <Media
                              image={productImage(p.slug, 0)}
                              alt=""
                              ratio="4/3"
                              sizes="60px"
                              fallbackLabel={p.sku}
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold">
                              <Highlight text={tr(p.name)} query={query} />
                            </span>
                            <span
                              className={`spec mt-1 block truncate ${
                                isActive ? 'opacity-70' : 'muted'
                              }`}
                            >
                              {isAccessory(p)
                                ? t('product.accessories')
                                : `${p.specs?.wheelSize ?? ''}" · ${t(`brakes.${p.specs?.brakes}`)}`}
                            </span>
                          </span>
                          <span className="tnum shrink-0 text-sm font-bold">{price(p.price)}</span>
                        </>
                      )}
                    </Row>
                  ))}
                </>
              ) : null}

              {results.categories.length ? (
                <>
                  <SectionTitle>{t('home.categoriesTitle')}</SectionTitle>
                  {results.categories.map((c) => (
                    <Row key={`c-${c.slug}`} row={flat.find((r) => r.key === `c-${c.slug}`)}>
                      {() => (
                        <>
                          <Icon
                            name={c.icon || 'bike'}
                            className="h-5 w-5 shrink-0 text-signal-500"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1 truncate text-sm font-bold">
                            <Highlight text={tr(c.name)} query={query} />
                          </span>
                          <Icon name="arrowRight" className="h-4 w-4 shrink-0 flip-rtl opacity-40" />
                        </>
                      )}
                    </Row>
                  ))}
                </>
              ) : null}

              {results.posts.length ? (
                <>
                  <SectionTitle>{t('blog.title')}</SectionTitle>
                  {results.posts.map((b) => (
                    <Row key={`b-${b.slug}`} row={flat.find((r) => r.key === `b-${b.slug}`)}>
                      {(isActive) => (
                        <>
                          <Icon
                            name="info"
                            className="h-5 w-5 shrink-0 text-signal-500"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-bold">
                              <Highlight text={tr(b.title)} query={query} />
                            </span>
                            <span className={`label mt-0.5 block ${isActive ? 'opacity-70' : 'muted'}`}>
                              {t('blog.readingTime', { min: b.readingMin })}
                            </span>
                          </span>
                        </>
                      )}
                    </Row>
                  ))}
                </>
              ) : null}
            </ul>
          )}
        </div>

        {/* ----------------------------------------------------------- footer */}
        {!results.empty && flat.length ? (
          <button
            type="button"
            onClick={() => go(path(paths.products(`q=${encodeURIComponent(query.trim())}`)))}
            className="label flex items-center justify-between border-t px-5 py-4 text-start transition-colors rule hover:bg-paper-sunk dark:hover:bg-carbon-900 sm:px-6"
          >
            <span>
              {t('common.viewAll')} — “{query.trim()}”
            </span>
            <Icon name="arrowRight" className="h-4 w-4 flip-rtl text-signal-500" />
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
