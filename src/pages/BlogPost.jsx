import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import { Breadcrumbs } from '../components/layout/Layout.jsx';
import PostBody, { TableOfContents } from '../components/blog/PostBody.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Section, SectionHead } from '../components/ui/primitives.jsx';
import { Seo, articleSchema, breadcrumbSchema, faqSchema, absoluteUrl } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { useCopyToClipboard } from '../lib/hooks.js';
import { paths } from '../lib/routes.js';
import { getCachedPost, loadPost } from '../lib/content.js';
import { getPostMeta, relatedPostMeta, POST_CATEGORIES, AUTHOR } from '../content/posts/index.js';
import { journalImage } from '../data/media.js';

/* ==========================================================================
   Article
   --------------------------------------------------------------------------
   Full-bleed masthead, a narrow measure for the body, and a sticky contents
   rail on wide screens. The body is structured data, so the typography here
   is the design rather than whatever HTML an editor pasted in.
   ========================================================================== */

export default function BlogPost() {
  const { slug } = useParams();
  const { t, tr, lang, path, date } = useLocale();
  const [copied, copy] = useCopyToClipboard();

  const meta = getPostMeta(slug);
  /* Prerendered pages seed the cache before hydration, so this is already
     populated on first paint and the markup matches exactly. */
  const [body, setBody] = useState(() => getCachedPost(slug));

  useEffect(() => {
    let alive = true;
    if (!getCachedPost(slug)) {
      loadPost(slug).then((b) => {
        if (alive) setBody(b);
      });
    } else {
      setBody(getCachedPost(slug));
    }
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!meta) return <NotFound />;

  const cat = POST_CATEGORIES.find((c) => c.slug === meta.category);
  const related = relatedPostMeta(slug, 3);
  const blocks = body?.blocks || [];
  const faqBlock = blocks.find((b) => b.type === 'faq');
  const url = absoluteUrl(path(paths.blogPost(slug)));

  return (
    <>
      <Seo
        lang={lang}
        title={`${tr(meta.title)} — ${t('common.brand')}`}
        description={tr(meta.excerpt)}
        canonicalPath={paths.blogPost(slug)}
        image={journalImage(slug)?.src}
        keywords={(meta.keywords?.[lang] || []).join(', ')}
        jsonLd={[
          articleSchema(meta, { lang, path: paths.blogPost(slug) }),
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('blog.title'), path: paths.blog() },
            { name: tr(meta.title), path: paths.blogPost(slug) },
          ]),
          faqBlock ? faqSchema(faqBlock.items, lang) : null,
        ].filter(Boolean)}
      />

      {/* ------------------------------------------------------- masthead */}
      <header className="relative isolate">
        <Media image={journalImage(slug)} alt="" sizes="100vw" priority fill />
        <div className="absolute inset-0 scrim-full" aria-hidden="true" />

        <div className="container-page relative flex min-h-[clamp(340px,44vw,560px)] flex-col justify-end py-14">
          <Breadcrumbs
            items={[
              { label: t('blog.title'), to: path(paths.blog()) },
              ...(cat ? [{ label: tr(cat.name), to: path(paths.blogCategory(cat.slug)) }] : []),
              { label: tr(meta.title) },
            ]}
            className="mb-6"
            onDark
          />

          {cat ? <p className="label mb-4 text-signal-400">{tr(cat.name)}</p> : null}

          <h1 className="max-w-[22ch] text-display-lg text-white">{tr(meta.title)}</h1>

          <div className="label mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-white/70">
            <span>
              {t('blog.author')} {tr(AUTHOR.name)}
            </span>
            <span aria-hidden="true">·</span>
            <span>{date(meta.date)}</span>
            {meta.updated ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {t('blog.updatedOn')} {date(meta.updated)}
                </span>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <span>{t('blog.readingTime', { min: meta.readingMin })}</span>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------- body */}
      <div className="container-page py-14 lg:py-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article className="min-w-0 max-w-prose">
            {blocks.length ? (
              <PostBody blocks={blocks} />
            ) : (
              <p className="py-16 text-center muted">{t('common.loading')}</p>
            )}

            {/* share */}
            <div className="mt-14 flex flex-wrap items-center gap-3 border-t pt-8 rule">
              <span className="label me-2 muted">{t('blog.share')}</span>
              <Button variant="outline" size="sm" icon={copied ? 'check' : 'copy'} onClick={() => copy(url)}>
                {copied ? t('common.copied') : t('common.copy')}
              </Button>
              <Button
                href={`https://wa.me/?text=${encodeURIComponent(`${tr(meta.title)} — ${url}`)}`}
                variant="outline"
                size="sm"
                icon="whatsapp"
              >
                WhatsApp
              </Button>
              <Button
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                variant="outline"
                size="sm"
                icon="facebook"
              >
                Facebook
              </Button>
            </div>
          </article>

          <aside className="mt-14 lg:mt-0">
            <div className="lg:sticky lg:top-[100px]">
              <TableOfContents blocks={blocks} />

              <div className="mt-10 border-t pt-6 rule">
                <p className="label muted">{t('blog.ctaTitle')}</p>
                <p className="mt-3 text-sm leading-relaxed">{t('blog.ctaBody')}</p>
                <Button
                  as={Link}
                  to={path(paths.sizeGuide())}
                  variant="solid"
                  size="sm"
                  icon="ruler"
                  className="mt-5 w-full"
                >
                  {t('nav.sizeGuide')}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* -------------------------------------------------------- related */}
      {related.length ? (
        <Section className="border-t bg-paper-sunk rule dark:bg-carbon-900/50">
          <div className="container-page">
            <SectionHead
              eyebrow={t('blog.relatedPosts')}
              title={t('blog.title')}
              action={
                <Button as={Link} to={path(paths.blog())} variant="ghost" iconEnd="arrowRight">
                  {t('blog.allPosts')}
                </Button>
              }
            />
            <ul className="mt-12 grid gap-8 md:grid-cols-3" role="list">
              {related.map((p) => (
                <li key={p.slug} className="group">
                  <Link to={path(paths.blogPost(p.slug))}>
                    <div className="zoom-frame">
                      <Media image={journalImage(p.slug)} alt="" ratio="16/9" sizes="(max-width: 768px) 100vw, 30vw" />
                    </div>
                    <p className="label mt-4 muted">{t('blog.readingTime', { min: p.readingMin })}</p>
                    <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-signal-600 dark:group-hover:text-signal-400">
                      {tr(p.title)}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      <div className="container-page pb-16">
        <Link to={path(paths.blog())} className="label link-underline inline-flex items-center gap-2">
          <Icon name="arrowLeft" className="h-3.5 w-3.5 flip-rtl" />
          {t('blog.backToBlog')}
        </Link>
      </div>
    </>
  );
}
