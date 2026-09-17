import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import { Button } from '../ui/primitives.jsx';
import { useLocale } from '../../i18n/index.jsx';
import { paths } from '../../lib/routes.js';
import { WHATSAPP_LINK } from '../../config/site.js';

/* ==========================================================================
   Article renderer
   --------------------------------------------------------------------------
   Blocks come from src/content/posts/*.js as structured data, not HTML, so the
   design owns the typography. Tables get a real spec-sheet treatment because
   half of these articles *are* reference tables.
   ========================================================================== */

function Lead({ text }) {
  return (
    <p className="mb-10 border-s-2 border-signal-500 ps-6 text-lg leading-relaxed text-carbon-800 dark:text-carbon-200 sm:text-xl">
      {text}
    </p>
  );
}

function Callout({ variant = 'tip', children }) {
  const isWarn = variant === 'warn';
  return (
    <aside
      className={`my-10 flex gap-4 border-s-2 p-5 sm:p-6 ${
        isWarn
          ? 'border-state-out dark:border-state-out-dark bg-state-out/[0.06]'
          : 'border-signal-500 bg-signal-500/[0.06]'
      }`}
    >
      <Icon
        name={isWarn ? 'alert' : 'sparkle'}
        className={`mt-0.5 h-5 w-5 shrink-0 ${isWarn ? 'text-state-out dark:text-state-out-dark' : 'text-signal-600 dark:text-signal-400'}`}
      />
      <p className="text-[15px] leading-relaxed">{children}</p>
    </aside>
  );
}

function Table({ caption, head, rows }) {
  return (
    <figure className="my-10">
      {caption ? <figcaption className="label mb-4 muted">{caption}</figcaption> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-start text-sm">
          <thead>
            <tr>
              {head.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className="spec border-b-2 border-carbon-950 py-3 pe-4 text-start align-bottom text-carbon-500 dark:border-carbon-100 dark:text-carbon-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri} className="border-b rule">
                {r.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`py-3 pe-4 align-top ${
                      ci === 0 ? 'font-semibold' : 'tnum muted'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function Faq({ items, tr }) {
  return (
    <div className="my-10">
      {items.map((it, i) => (
        <details key={i} className="group border-b py-5 rule">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold leading-snug marker:content-none">
            {tr(it.q)}
            <Icon
              name="plus"
              className="mt-1 h-4 w-4 shrink-0 text-signal-500 transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="mt-4 text-[15px] leading-relaxed muted">{tr(it.a)}</p>
        </details>
      ))}
    </div>
  );
}

function Cta({ text }) {
  const { t, path } = useLocale();
  return (
    <aside className="my-12 bg-carbon-950 p-7 text-paper dark:bg-carbon-900 sm:p-9">
      <p className="max-w-measure text-lg leading-relaxed">{text}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button href={WHATSAPP_LINK} variant="whatsapp" size="md" icon="whatsapp">
          {t('home.ctaButton')}
        </Button>
        <Button as={Link} to={path(paths.products())} variant="onDark" size="md" iconEnd="arrowRight">
          {t('nav.products')}
        </Button>
      </div>
    </aside>
  );
}

export default function PostBody({ blocks = [] }) {
  const { tr } = useLocale();

  return (
    <div className="post-body">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'lead':
            return <Lead key={i} text={tr(b)} />;

          case 'h2':
            return (
              <h2 key={i} id={b.id}>
                {tr(b)}
              </h2>
            );

          case 'h3':
            return (
              <h3 key={i} id={b.id}>
                {tr(b)}
              </h3>
            );

          case 'p':
            return (
              <p key={i} className="mt-5 text-[17px] leading-[1.85] text-carbon-700 dark:text-carbon-300">
                {tr(b)}
              </p>
            );

          case 'ul':
            return (
              <ul key={i} className="mt-6 space-y-3">
                {tr(b).map((item, k) => (
                  <li key={k} className="flex gap-3.5 text-[17px] leading-[1.8] text-carbon-700 dark:text-carbon-300">
                    <span className="mt-[0.7em] h-1 w-3 shrink-0 bg-signal-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={i} className="mt-6 space-y-4">
                {tr(b).map((item, k) => (
                  <li key={k} className="flex gap-4 text-[17px] leading-[1.8] text-carbon-700 dark:text-carbon-300">
                    <span className="tnum mt-[0.1em] w-5 shrink-0 font-bold text-signal-600 dark:text-signal-400">
                      {k + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );

          case 'table':
            return (
              <Table
                key={i}
                caption={b.caption ? tr(b.caption) : null}
                head={tr(b.head)}
                rows={tr(b.rows)}
              />
            );

          case 'callout':
            return (
              <Callout key={i} variant={b.variant}>
                {tr(b)}
              </Callout>
            );

          case 'faq':
            return <Faq key={i} items={b.items} tr={tr} />;

          case 'cta':
            return <Cta key={i} text={tr(b)} />;

          default:
            return null;
        }
      })}
    </div>
  );
}

/** Sticky in-article table of contents, built from the h2 blocks. */
export function TableOfContents({ blocks = [], className = '' }) {
  const { t, tr } = useLocale();
  const headings = blocks.filter((b) => b.type === 'h2' && b.id);
  if (headings.length < 3) return null;

  return (
    <nav aria-label={t('blog.tableOfContents')} className={className}>
      <p className="label border-b pb-3 muted rule">{t('blog.tableOfContents')}</p>
      <ol className="mt-4 space-y-2.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="link-underline text-sm leading-snug">
              {tr(h)}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
