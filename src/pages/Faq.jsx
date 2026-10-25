import { PageHeader } from '../components/layout/Layout.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Eyebrow, Section } from '../components/ui/primitives.jsx';
import { Seo, breadcrumbSchema, faqSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { FAQ_GROUPS, ALL_FAQS } from '../data/faqs.js';
import { WHATSAPP_LINK } from '../config/site.js';

export default function Faq() {
  const { t, tr, lang } = useLocale();

  return (
    <>
      <Seo
        lang={lang}
        title={`${t('faq.title')} — ${t('common.brand')}`}
        description={t('faq.subtitle')}
        canonicalPath={paths.faq()}
        jsonLd={[
          faqSchema(ALL_FAQS, lang),
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('faq.title'), path: paths.faq() },
          ]),
        ].filter(Boolean)}
      />

      <PageHeader
        title={t('faq.title')}
        lede={t('faq.subtitle')}
        breadcrumbs={[{ label: t('faq.title') }]}
      />

      <Section>
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
            {/* jump list */}
            <nav aria-label={t('blog.tableOfContents')} className="lg:sticky lg:top-[100px] lg:h-max">
              <p className="label border-b pb-3 muted rule">{t('blog.tableOfContents')}</p>
              <ol className="mt-4 space-y-2.5">
                {FAQ_GROUPS.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="link-underline text-sm leading-snug">
                      {tr(g.title)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0">
              {FAQ_GROUPS.map((group, gi) => (
                <section key={group.id} id={group.id} className="scroll-mt-28 pb-14 last:pb-0">
                  <Eyebrow>{tr(group.title)}</Eyebrow>

                  <div className="mt-6">
                    {group.items.map((item, i) => (
                      <details key={i} className="group border-b py-5 rule">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-base font-bold leading-snug marker:content-none sm:text-lg">
                          {tr(item.q)}
                          <Icon
                            name="plus"
                            className="mt-1 h-4 w-4 shrink-0 text-signal-500 transition-transform duration-200 group-open:rotate-45"
                          />
                        </summary>
                        <p className="mt-4 max-w-prose text-[15px] leading-relaxed muted">{tr(item.a)}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t bg-carbon-950 text-paper rule">
        <div className="container-page flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[16ch] text-display-md text-white">{t('faq.stillQuestions')}</h2>
          <Button href={WHATSAPP_LINK} variant="whatsapp" size="lg" icon="whatsapp">
            {t('faq.askUs')}
          </Button>
        </div>
      </Section>
    </>
  );
}
