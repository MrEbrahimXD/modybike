import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/Layout.jsx';
import Media from '../components/ui/Media.jsx';
import { Section } from '../components/ui/primitives.jsx';
import { Seo, breadcrumbSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { POSTS_SORTED, POST_CATEGORIES, postsByCategory } from '../content/posts/index.js';
import { journalImage } from '../data/media.js';

/* ==========================================================================
   Journal index
   --------------------------------------------------------------------------
   A masthead article, then a numbered editorial list. Not a grid of identical
   cards — the first piece is the one worth reading first, and it looks it.
   ========================================================================== */

function FeaturedPost({ post }) {
  const { t, tr, path, date } = useLocale();
  return (
    <article className="group">
      <Link to={path(paths.blogPost(post.slug))} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className="zoom-frame">
          <Media image={journalImage(post.slug)} alt="" ratio="4/3" sizes="(max-width: 1024px) 100vw, 50vw" priority />
        </div>
        <div>
          <p className="label flex items-center gap-3 text-signal-600 dark:text-signal-400">
            {t('common.new') === 'New' ? 'Latest' : 'الأحدث'}
            <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
            <span className="muted">{date(post.date)}</span>
          </p>
          <h2 className="mt-5 max-w-[20ch] text-display-md group-hover:text-signal-600 dark:group-hover:text-signal-400">
            {tr(post.title)}
          </h2>
          <p className="mt-5 max-w-measure text-base leading-relaxed muted">{tr(post.excerpt)}</p>
          <p className="label mt-6 muted">{t('blog.readingTime', { min: post.readingMin })}</p>
        </div>
      </Link>
    </article>
  );
}

function PostRow({ post }) {
  const { t, tr, path, date } = useLocale();
  return (
    <li className="group border-t rule">
      <Link
        to={path(paths.blogPost(post.slug))}
        className="grid items-start gap-5 py-8 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8"
      >
        <div className="zoom-frame w-40 sm:w-full">
          <Media image={journalImage(post.slug)} alt="" ratio="4/3" sizes="200px" />
        </div>

        <div className="min-w-0">
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 muted">
            <span>{date(post.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{t('blog.readingTime', { min: post.readingMin })}</span>
          </p>
          <h3 className="mt-2.5 max-w-[34ch] text-xl font-bold leading-snug group-hover:text-signal-600 dark:group-hover:text-signal-400 sm:text-2xl">
            {tr(post.title)}
          </h3>
          <p className="mt-3 line-clamp-2 max-w-prose text-sm leading-relaxed muted">{tr(post.excerpt)}</p>
        </div>
      </Link>
    </li>
  );
}

export default function Blog({ variant }) {
  const { t, tr, lang, path } = useLocale();
  const { category } = useParams();
  const isCategory = variant === 'category';

  const activeCat = isCategory ? POST_CATEGORIES.find((c) => c.slug === category) : null;
  const posts = isCategory ? postsByCategory(category) : POSTS_SORTED;

  const title = activeCat ? tr(activeCat.name) : t('blog.title');
  const canonical = isCategory ? paths.blogCategory(category) : paths.blog();

  const [lead, ...rest] = posts;

  return (
    <>
      <Seo
        lang={lang}
        title={activeCat ? `${title} — ${t('blog.title')}` : t('seo.blogTitle')}
        description={
          activeCat
            ? t('seo.blogTopic', { topic: title, titles: posts.slice(0, 3).map((p) => tr(p.title)).join('، ') }).slice(0, 300)
            : t('seo.blog')
        }
        canonicalPath={canonical}
        jsonLd={[
          breadcrumbSchema(
            [
              { name: t('nav.home'), path: '/' },
              { name: t('blog.title'), path: paths.blog() },
              ...(activeCat ? [{ name: title, path: canonical }] : []),
            ],
          ),
        ]}
      />

      <PageHeader
        eyebrow={t('blog.postsCount', { count: posts.length })}
        title={title}
        lede={t('blog.subtitle')}
        breadcrumbs={isCategory ? [{ label: t('blog.title'), to: path(paths.blog()) }, { label: title }] : [{ label: t('blog.title') }]}
      />

      {/* topic rail */}
      <nav aria-label={t('blog.categories')} className="border-b rule">
        <ul className="no-scrollbar container-page flex gap-6 overflow-x-auto py-4" role="list">
          <li>
            <Link
              to={path(paths.blog())}
              className={`label whitespace-nowrap transition-colors ${
                !isCategory ? 'text-signal-600 dark:text-signal-400' : 'muted hover:opacity-60'
              }`}
            >
              {t('common.all')}
            </Link>
          </li>
          {POST_CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                to={path(paths.blogCategory(c.slug))}
                className={`label whitespace-nowrap transition-colors ${
                  category === c.slug ? 'text-signal-600 dark:text-signal-400' : 'muted hover:opacity-60'
                }`}
              >
                {tr(c.name)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {lead ? (
        <Section>
          <div className="container-page">
            <FeaturedPost post={lead} />
          </div>
        </Section>
      ) : null}

      {rest.length ? (
        <div className="container-page pb-20">
          <ul role="list">
            {rest.map((post, i) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
