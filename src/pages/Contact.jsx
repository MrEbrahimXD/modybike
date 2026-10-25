import { useState } from 'react';
import { PageHeader } from '../components/layout/Layout.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Eyebrow, Section } from '../components/ui/primitives.jsx';
import { Field, Input, Textarea } from '../components/ui/form.jsx';
import { Seo, breadcrumbSchema, organizationSchema } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { paths } from '../lib/routes.js';
import { contactEnquiryUrl } from '../lib/whatsapp.js';
import { SITE, WHATSAPP_LINK } from '../config/site.js';

/** One contact route, presented as an editorial row rather than a card. */
function Channel({ icon, title, body, action, href, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : null)}
      className="group flex items-start gap-5 border-t py-7 transition-colors rule hover:bg-paper-sunk dark:hover:bg-carbon-900"
    >
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2.5 text-lg font-bold leading-snug">
          <Icon name={icon} className="h-5 w-5 shrink-0 text-signal-500" />
          {title}
        </span>
        <span className="mt-2 block text-sm leading-relaxed muted">{body}</span>
        <span className="mt-3 block text-sm font-semibold" dir="ltr">
          {action}
        </span>
      </span>
      <Icon
        name="arrowRight"
        className="mt-1.5 h-4 w-4 shrink-0 flip-rtl text-carbon-400 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
      />
    </a>
  );
}

export default function Contact() {
  const { t, tr, lang } = useLocale();
  const [form, setForm] = useState({ name: '', message: '' });
  const addr = SITE.address;

  const canSend = form.message.trim().length > 2;

  return (
    <>
      <Seo
        lang={lang}
        title={t('seo.contactTitle')}
        description={t('seo.contact', {
          whatsapp: SITE.contact.whatsappDisplay,
          phone: SITE.contact.phones[0],
          city: tr(SITE.address.city),
          region: tr(SITE.address.region),
          opens: SITE.openingHours[0].opens,
          closes: SITE.openingHours[0].closes,
        })}
        canonicalPath={paths.contact()}
        jsonLd={[
          organizationSchema(lang),
          breadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('contact.title'), path: paths.contact() },
          ]),
        ].filter(Boolean)}
      />

      <PageHeader
        title={t('contact.title')}
        lede={t('contact.subtitle')}
        breadcrumbs={[{ label: t('contact.title') }]}
      />

      <Section>
        <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* --------------------------------------------------- channels */}
          <div>
            <Eyebrow>{t('footer.contactUs')}</Eyebrow>

            <div className="mt-8">
              <Channel
                icon="whatsapp"
                title={t('contact.whatsappTitle')}
                body={t('contact.whatsappBody')}
                action={SITE.contact.whatsappDisplay}
                href={WHATSAPP_LINK}
                external
              />
              <Channel
                icon="phone"
                title={t('contact.phoneTitle')}
                body={SITE.openingHours
                  .map((h) =>
                    h.days.length > 1
                      ? `${t(`about.days.${h.days[0]}`)}–${t(`about.days.${h.days[h.days.length - 1]}`)} ${h.opens}–${h.closes}`
                      : `${t(`about.days.${h.days[0]}`)} ${h.opens}–${h.closes}`,
                  )
                  .join(' · ')}
                action={SITE.contact.phones.join('  ·  ')}
                href={`tel:${SITE.contact.phones[0].replace(/\s/g, '')}`}
              />
              {SITE.contact.email && <Channel
                icon="mail"
                title={t('contact.emailTitle')}
                body={t('contact.emailBody')}
                action={SITE.contact.email}
                href={`mailto:${SITE.contact.email}`}
              />}
              <Channel
                icon="mapPin"
                title={t('contact.addressTitle')}
                body={`${tr(addr.street)} — ${tr(addr.district)}, ${tr(addr.city)}, ${tr(addr.region)}`}
                action={t('contact.mapTitle')}
                href={addr.mapsUrl}
                external
              />
            </div>
          </div>

          {/* ------------------------------------------------------- form */}
          <div>
            <Eyebrow>{t('contact.formTitle')}</Eyebrow>
            <p className="mt-6 max-w-measure text-sm leading-relaxed muted">{t('contact.formNote')}</p>

            <form
              className="mt-8"
              onSubmit={(e) => {
                e.preventDefault();
                if (canSend) window.open(contactEnquiryUrl(form, lang), '_blank', 'noopener,noreferrer');
              }}
            >
              <div className="grid gap-7">
                <Field label={`${t('checkout.name')} — ${t('common.optional')}`}>
                  {(p) => (
                    <Input
                      {...p}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder={t('checkout.namePlaceholder')}
                      autoComplete="name"
                    />
                  )}
                </Field>

                <Field label={t('contact.message')} required>
                  {(p) => (
                    <Textarea
                      {...p}
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder={t('contact.messagePlaceholder')}
                    />
                  )}
                </Field>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button type="submit" variant="whatsapp" size="lg" icon="whatsapp" disabled={!canSend} className="flex-1">
                  {t('contact.sendWhatsapp')}
                </Button>
                {SITE.contact.email && <Button
                  href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent(
                    `${t('contact.title')} — ${form.name || ''}`.trim(),
                  )}&body=${encodeURIComponent(form.message)}`}
                  variant="outline"
                  size="lg"
                  icon="mail"
                  className="flex-1"
                >
                  {t('contact.sendEmail')}
                </Button>}
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
