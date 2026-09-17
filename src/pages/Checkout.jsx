import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/Layout.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Eyebrow, Price } from '../components/ui/primitives.jsx';
import { Field, Input, RadioCards, Textarea, Select } from '../components/ui/form.jsx';
import { Seo } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { useCart } from '../lib/cart.jsx';
import { useCopyToClipboard } from '../lib/hooks.js';
import { paths } from '../lib/routes.js';
import {
  buildOrderMessage,
  generateOrderNumber,
  isValidEgyptianMobile,
  orderMailtoUrl,
  whatsappUrl,
} from '../lib/whatsapp.js';
import { cityOptions } from '../data/locations.js';
import { productImage } from '../data/media.js';
import { SITE } from '../config/site.js';

/* ==========================================================================
   Checkout
   --------------------------------------------------------------------------
   There is no payment gateway: the order is composed here and handed to
   WhatsApp, which is how these shops actually trade. The job of this page is
   therefore to collect clean data and make the handover obvious.
   ========================================================================== */

const EMPTY_FORM = {
  name: '',
  phone: '',
  altPhone: '',
  city: '',
  address: '',
  notes: '',
  deliveryMethod: 'delivery',
};

export default function Checkout() {
  const { t, tr, lang, path, price } = useLocale();
  const { lines, subtotal, count, ready } = useCart();
  const [copied, copy] = useCopyToClipboard();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);

  const cities = useMemo(() => cityOptions(lang), [lang]);
  const isPickup = form.deliveryMethod === 'pickup';
  /* No delivery figure is computed or displayed: it is agreed per area when
     the order is confirmed, so the summary totals the goods only. */

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!lines.length) next.empty = t('checkout.errors.empty');
    if (form.name.trim().length < 2) next.name = t('checkout.errors.name');
    if (!isValidEgyptianMobile(form.phone)) next.phone = t('checkout.errors.phone');
    if (!isPickup) {
      if (!form.city) next.city = t('checkout.errors.city');
      if (form.address.trim().length < 10) next.address = t('checkout.errors.address');
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const message = useMemo(() => {
    if (!orderNumber) return '';
    return buildOrderMessage({ lines, subtotal, form, orderNumber, lang });
  }, [orderNumber, lines, subtotal, form, lang]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      // Move focus to the first problem so a keyboard or screen-reader user lands on it.
      const first = document.querySelector('[aria-invalid="true"]');
      if (first instanceof HTMLElement) first.focus();
      return;
    }
    const num = orderNumber || generateOrderNumber();
    setOrderNumber(num);
    const msg = buildOrderMessage({ lines, subtotal, form, orderNumber: num, lang });
    window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Seo
        lang={lang}
        title={`${t('checkout.title')} — ${t('common.brand')}`}
        description={t('checkout.subtitle')}
        canonicalPath={paths.checkout()}
        noindex
      />

      <PageHeader
        eyebrow={ready && count ? t('cart.itemsCount', { count }) : null}
        title={t('checkout.title')}
        lede={t('checkout.subtitle')}
        breadcrumbs={[{ label: t('cart.title'), to: path(paths.cart()) }, { label: t('checkout.title') }]}
      />

      <div className="container-page py-12 lg:py-16">
        {ready && !lines.length ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <Icon name="cart" className="mx-auto h-10 w-10 text-carbon-300 dark:text-carbon-600" />
            <h2 className="mt-6 text-2xl font-bold">{t('cart.empty')}</h2>
            <Button as={Link} to={path(paths.products())} variant="solid" size="lg" className="mt-8">
              {t('cart.emptyCta')}
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-16">
            <div>
              {/* ------------------------------------------------- contact */}
              <section>
                <Eyebrow>{t('checkout.sectionContact')}</Eyebrow>
                <div className="mt-7 grid gap-7 sm:grid-cols-2">
                  <Field label={t('checkout.name')} required error={errors.name}>
                    {(p) => (
                      <Input
                        {...p}
                        value={form.name}
                        onChange={(e) => set('name', e.target.value)}
                        placeholder={t('checkout.namePlaceholder')}
                        autoComplete="name"
                      />
                    )}
                  </Field>

                  <Field
                    label={t('checkout.phone')}
                    required
                    error={errors.phone}
                    hint={t('checkout.phoneHint')}
                  >
                    {(p) => (
                      <Input
                        {...p}
                        type="tel"
                        inputMode="tel"
                        dir="ltr"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        placeholder={t('checkout.phonePlaceholder')}
                        autoComplete="tel"
                      />
                    )}
                  </Field>

                  <Field label={`${t('checkout.altPhone')} — ${t('common.optional')}`}>
                    {(p) => (
                      <Input
                        {...p}
                        type="tel"
                        inputMode="tel"
                        dir="ltr"
                        value={form.altPhone}
                        onChange={(e) => set('altPhone', e.target.value)}
                        placeholder={t('checkout.phonePlaceholder')}
                      />
                    )}
                  </Field>
                </div>
              </section>

              {/* ------------------------------------------------ delivery */}
              <section className="mt-14">
                <Eyebrow>{t('checkout.sectionDelivery')}</Eyebrow>
                <RadioCards
                  name="deliveryMethod"
                  value={form.deliveryMethod}
                  onChange={(v) => set('deliveryMethod', v)}
                  className="mt-7 sm:grid-cols-2"
                  options={[
                    { value: 'delivery', label: t('checkout.deliveryOption'), hint: tr(SITE.shipping.etaDays) },
                    { value: 'pickup', label: t('checkout.pickupOption'), hint: t('checkout.pickupNote') },
                  ]}
                />

                {!isPickup ? (
                  <div className="mt-7 grid gap-7">
                    <Field label={t('checkout.city')} required error={errors.city}>
                      {(p) => (
                        <Select {...p} value={form.city} onChange={(e) => set('city', e.target.value)}>
                          <option value="">{t('checkout.cityPlaceholder')}</option>
                          {cities.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                          <option value="outside">{t('checkout.cityOutside')}</option>
                        </Select>
                      )}
                    </Field>

                    <Field label={t('checkout.address')} required error={errors.address}>
                      {(p) => (
                        <Textarea
                          {...p}
                          rows={3}
                          value={form.address}
                          onChange={(e) => set('address', e.target.value)}
                          placeholder={t('checkout.addressPlaceholder')}
                          autoComplete="street-address"
                        />
                      )}
                    </Field>
                  </div>
                ) : (
                  <p className="mt-7 flex gap-3 border-s-2 border-signal-500 ps-5 text-sm leading-relaxed muted">
                    <span>
                      {tr(SITE.address.street)} — {tr(SITE.address.district)}, {tr(SITE.address.city)}
                    </span>
                  </p>
                )}
              </section>

              {/* --------------------------------------------------- notes */}
              <section className="mt-14">
                <Eyebrow>{t('checkout.sectionNotes')}</Eyebrow>
                <Field label={`${t('checkout.notes')} — ${t('common.optional')}`} className="mt-7">
                  {(p) => (
                    <Textarea
                      {...p}
                      rows={3}
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                      placeholder={t('checkout.notesPlaceholder')}
                    />
                  )}
                </Field>
              </section>

              {errors.empty ? (
                <p className="mt-8 flex items-center gap-2 text-sm font-semibold text-state-out dark:text-state-out-dark">
                  <Icon name="alert" className="h-4 w-4" />
                  {errors.empty}
                </p>
              ) : null}
            </div>

            {/* --------------------------------------------------- summary */}
            <aside className="lg:sticky lg:top-[100px] lg:h-max">
              <div className="border p-6 rule bg-paper-raised dark:bg-carbon-900">
                <h2 className="label muted">{t('checkout.sectionSummary')}</h2>

                <ul className="mt-6 space-y-4" role="list">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-3">
                      <div className="w-16 shrink-0">
                        <Media
                          image={productImage(line.product.slug, 0)}
                          alt=""
                          ratio="4/3"
                          sizes="80px"
                          fallbackLabel={line.product.sku}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-[13px] font-semibold leading-snug">
                          {tr(line.product.name)}
                        </p>
                        <p className="label tnum mt-1 muted">× {line.qty}</p>
                      </div>
                      <p className="tnum shrink-0 text-[13px] font-bold">{price(line.lineTotal)}</p>
                    </li>
                  ))}
                </ul>

                <dl className="mt-6 border-t pt-4 rule">
                  <div className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="text-sm">{t('cart.subtotal')}</dt>
                    <dd className="tnum text-sm font-bold">{price(subtotal)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b py-2 rule">
                    <dt className="text-sm">{t('cart.shipping')}</dt>
                    <dd className="label muted">
                      {isPickup ? t('checkout.pickupOption') : t('cart.shippingCalc')}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-5">
                    <dt className="font-bold">{t('cart.total')}</dt>
                    <dd>
                      <Price value={subtotal} price={price} size="md" />
                    </dd>
                  </div>
                </dl>

                <Button type="submit" variant="whatsapp" size="lg" icon="whatsapp" className="mt-7 w-full">
                  {t('checkout.submit')}
                </Button>

                <p className="mt-4 text-xs leading-relaxed muted">{t('checkout.whatsappHint')}</p>

                {orderNumber ? (
                  <div className="mt-6 border-t pt-5 rule" aria-live="polite">
                    <p className="label text-state-ok dark:text-state-ok-dark">{t('checkout.successTitle')}</p>
                    <p className="label tnum mt-3 muted">
                      {t('checkout.orderNumber')}: <span className="text-carbon-900 dark:text-carbon-100">{orderNumber}</span>
                    </p>
                    <p className="mt-3 text-xs leading-relaxed muted">
                      {t('checkout.successBody', { phone: SITE.contact.phones[0] })}
                    </p>

                    <div className="mt-4 flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={copied ? 'check' : 'copy'}
                        onClick={() => copy(message)}
                        className="w-full"
                      >
                        {copied ? t('common.copied') : t('checkout.copyOrder')}
                      </Button>
                      {SITE.contact.email && <Button
                        href={orderMailtoUrl(message, orderNumber)}
                        variant="outline"
                        size="sm"
                        icon="mail"
                        className="w-full"
                      >
                        {t('contact.sendEmail')}
                      </Button>}
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          </form>
        )}
      </div>
    </>
  );
}
