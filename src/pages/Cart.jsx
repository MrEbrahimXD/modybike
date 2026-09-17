import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/Layout.jsx';
import Media from '../components/ui/Media.jsx';
import Icon from '../components/ui/Icon.jsx';
import { Button, Price } from '../components/ui/primitives.jsx';
import { QtyStepper } from '../components/ui/form.jsx';
import { Seo } from '../lib/seo.jsx';
import { useLocale } from '../i18n/index.jsx';
import { useCart } from '../lib/cart.jsx';
import { paths } from '../lib/routes.js';
import { productImage } from '../data/media.js';
import { COLORS } from '../data/colors.js';

/* ==========================================================================
   Cart
   --------------------------------------------------------------------------
   A line-item ledger, not a stack of boxes. Delivery is never priced here —
   it is quoted per area when the order is confirmed on WhatsApp.
   ========================================================================== */

/**
 * Delivery note.
 *
 * This used to be a progress bar counting down to free shipping, which meant
 * quoting a threshold in pounds. Delivery is priced per area and agreed when
 * the order is confirmed, so the cart states that instead of inventing a figure.
 */
function DeliveryNote() {
  const { t } = useLocale();
  return (
    <div className="flex items-center gap-2.5 border-b py-5 rule">
      <Icon name="truck" className="h-4 w-4 shrink-0 text-signal-500" />
      <p className="label">
        {t('cart.shipping')} — <span className="muted">{t('cart.shippingCalc')}</span>
      </p>
    </div>
  );
}

export default function Cart() {
  const { t, tr, lang, path, price } = useLocale();
  const { lines, count, subtotal, setQty, remove, clear, ready } = useCart();

  const colorName = (key) => (COLORS[key] ? tr(COLORS[key]) : key);

  return (
    <>
      <Seo
        lang={lang}
        title={`${t('cart.title')} — ${t('common.brand')}`}
        description={t('cart.emptyHint')}
        canonicalPath={paths.cart()}
        noindex
      />

      <PageHeader
        eyebrow={ready && count ? t('cart.itemsCount', { count }) : null}
        title={t('cart.title')}
        breadcrumbs={[{ label: t('cart.title') }]}
      />

      <div className="container-page py-12 lg:py-16">
        {!ready ? (
          <p className="py-20 text-center muted">{t('common.loading')}</p>
        ) : !lines.length ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <Icon name="cart" className="mx-auto h-10 w-10 text-carbon-300 dark:text-carbon-600" />
            <h2 className="mt-6 text-2xl font-bold">{t('cart.empty')}</h2>
            <p className="mt-3 text-sm leading-relaxed muted">{t('cart.emptyHint')}</p>
            <Button as={Link} to={path(paths.products())} variant="solid" size="lg" className="mt-8" iconEnd="arrowRight">
              {t('cart.emptyCta')}
            </Button>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
            {/* ---------------------------------------------------- lines */}
            <div>
              <DeliveryNote />

              <ul role="list">
                {lines.map((line) => (
                  <li key={line.key} className="flex gap-5 border-b py-6 rule">
                    <Link to={path(paths.product(line.product.slug))} className="w-28 shrink-0 sm:w-36">
                      <Media
                        image={productImage(line.product.slug, 0)}
                        alt=""
                        ratio="4/3"
                        sizes="150px"
                        fallbackLabel={line.product.sku}
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-base font-bold leading-snug">
                            <Link to={path(paths.product(line.product.slug))} className="link-underline">
                              {tr(line.product.name)}
                            </Link>
                          </h3>
                          <p className="label mt-2 muted">
                            {line.product.sku}
                            {line.color ? ` · ${colorName(line.color)}` : ''}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(line.key)}
                          aria-label={t('cart.removeItem', { name: tr(line.product.name) })}
                          className="tap-target -me-2 -mt-2 grid shrink-0 place-items-center text-carbon-400 transition-colors hover:text-state-out dark:hover:text-state-out-dark"
                        >
                          <Icon name="trash" className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-4">
                        <QtyStepper
                          value={line.qty}
                          onChange={(q) => setQty(line.key, q)}
                          label={t('cart.updateQty', { name: tr(line.product.name) })}
                        />
                        <p className="tnum text-lg font-bold">{price(line.lineTotal)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <Link to={path(paths.products())} className="label link-underline inline-flex items-center gap-2">
                  <Icon name="arrowLeft" className="h-3.5 w-3.5 flip-rtl" />
                  {t('cart.continueShopping')}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t('cart.confirmClear'))) clear();
                  }}
                  className="label text-carbon-400 transition-colors hover:text-state-out dark:hover:text-state-out-dark"
                >
                  {t('cart.clearCart')}
                </button>
              </div>
            </div>

            {/* -------------------------------------------------- summary */}
            <aside className="lg:sticky lg:top-[100px] lg:h-max">
              <div className="border p-6 rule bg-paper-raised dark:bg-carbon-900">
                <h2 className="label muted">{t('checkout.sectionSummary')}</h2>

                <dl className="mt-6">
                  <div className="flex items-baseline justify-between gap-4 border-b py-3 rule">
                    <dt className="text-sm">{t('cart.subtotal')}</dt>
                    <dd className="tnum text-sm font-bold">{price(subtotal)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b py-3 rule">
                    <dt className="text-sm">{t('cart.shipping')}</dt>
                    <dd className="label muted">{t('cart.shippingCalc')}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-5">
                    <dt className="font-bold">{t('cart.total')}</dt>
                    <dd>
                      <Price value={subtotal} price={price} size="md" />
                    </dd>
                  </div>
                </dl>

                <Button
                  as={Link}
                  to={path(paths.checkout())}
                  variant="signal"
                  size="lg"
                  iconEnd="arrowRight"
                  className="mt-7 w-full"
                >
                  {t('cart.checkout')}
                </Button>

                <p className="mt-4 text-xs leading-relaxed muted">{t('checkout.subtitle')}</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
