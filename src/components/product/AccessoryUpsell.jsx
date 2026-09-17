import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal.jsx';
import Media from '../ui/Media.jsx';
import Icon from '../ui/Icon.jsx';
import { Button } from '../ui/primitives.jsx';
import { useLocale } from '../../i18n/index.jsx';
import { useCart } from '../../lib/cart.jsx';
import { paths } from '../../lib/routes.js';
import { productImage } from '../../data/media.js';
import { getSuggestedAccessories } from '../../data/products.js';

/**
 * Accessory sheet, shown once after a bike is added to the order.
 *
 * A helmet and a set of lights are the two things a first-time buyer forgets,
 * so this is genuinely useful rather than a nag — it appears for bikes only,
 * once per add, and dismisses to the cart.
 */
export default function AccessoryUpsell() {
  const { t, tr, path, price } = useLocale();
  const { upsellFor, closeUpsell, add } = useCart();
  const [justAdded, setJustAdded] = useState([]);

  if (!upsellFor) return null;

  const suggestions = getSuggestedAccessories(upsellFor, 6);

  const addAccessory = (product) => {
    add(product, 1, { showUpsell: false });
    setJustAdded((prev) => [...prev, product.id]);
  };

  const close = () => {
    setJustAdded([]);
    closeUpsell();
  };

  return (
    <Modal
      open
      onClose={close}
      size="lg"
      title={t('upsell.title')}
      footer={
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" size="md" onClick={close} className="flex-1">
            {t('upsell.skip')}
          </Button>
          <Button as={Link} to={path(paths.cart())} onClick={close} variant="solid" size="md" className="flex-1">
            {t('upsell.goToCart')}
          </Button>
        </div>
      }
    >
      <p className="max-w-measure text-sm leading-relaxed muted">
        {t('upsell.subtitle', { name: tr(upsellFor.name) })}
      </p>

      <ul className="mt-7 grid gap-x-5 gap-y-8 sm:grid-cols-3" role="list">
        {suggestions.map((a) => {
          const added = justAdded.includes(a.id);
          return (
            <li key={a.id} className="flex flex-col">
              <Media
                image={productImage(a.slug, 0)}
                alt={tr(a.name)}
                ratio="4/3"
                sizes="200px"
                fallbackLabel={a.sku}
              />
              <h3 className="mt-3 text-sm font-bold leading-snug">{tr(a.name)}</h3>
              <p className="tnum mt-1.5 text-sm font-bold">{price(a.price)}</p>

              <button
                type="button"
                onClick={() => addAccessory(a)}
                disabled={added}
                className={`mt-auto flex items-center justify-center gap-2 py-2.5 text-[13px] font-semibold transition-colors ${
                  added
                    ? 'bg-state-ok/[0.12] text-state-ok dark:bg-state-ok-dark/[0.14] dark:text-state-ok-dark'
                    : 'border rule hover:border-carbon-950 hover:bg-carbon-950 hover:text-paper dark:hover:border-paper dark:hover:bg-paper dark:hover:text-carbon-950'
                }`}
              >
                <Icon name={added ? 'check' : 'plus'} className="h-3.5 w-3.5" />
                {added ? t('product.added') : t('product.addToCart')}
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
