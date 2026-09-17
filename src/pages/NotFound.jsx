import { Link } from 'react-router-dom';
import { Button } from '../components/ui/primitives.jsx';
import { Seo } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { CATEGORIES } from '../data/categories.js';

export default function NotFound() {
  const { t, tr, lang, path } = useLocale();

  return (
    <>
      <Seo lang={lang} title={t('notFound.title')} description={t('notFound.body')} noindex />

      <div className="container-page flex min-h-[70svh] flex-col justify-center py-20">
        <p className="label text-signal-500">404</p>

        <h1 className="mt-6 max-w-[16ch] text-display-lg">{t('notFound.title')}</h1>
        <p className="mt-6 max-w-measure text-base leading-relaxed muted sm:text-lg">
          {t('notFound.body')}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to={path(paths.home())} variant="solid" size="lg">
            {t('notFound.home')}
          </Button>
          <Button as={Link} to={path(paths.products())} variant="outline" size="lg" iconEnd="arrowRight">
            {t('notFound.products')}
          </Button>
        </div>

        <div className="mt-16 border-t pt-8 rule">
          <p className="label muted">{t('home.categoriesTitle')}</p>
          <ul className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-3" role="list">
            {CATEGORIES.filter((c) => c.kind === 'bike').map((c, i) => (
              <li key={c.slug} className="flex items-baseline gap-3">
                {i > 0 ? (
                  <span className="text-carbon-300 dark:text-carbon-700" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <Link
                  to={path(paths.productsByCategory(c.slug))}
                  className="link-underline text-lg font-bold tracking-tight hover:text-signal-600 dark:hover:text-signal-400"
                >
                  {tr(c.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
