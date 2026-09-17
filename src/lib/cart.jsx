import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { getProductById, isAccessory } from '../data/products.js';
import { SITE } from '../config/site.js';

const STORAGE_KEY = 'modybike:cart:v1';
const MAX_QTY = 20;

const CartContext = createContext(null);

/** A cart line is keyed by product + colour, so the same bike in two colours stays separate. */
function lineKey(productId, color) {
  return color ? `${productId}::${color}` : productId;
}

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return { ...state, items: action.items, ready: true };

    case 'add': {
      const key = lineKey(action.productId, action.color);
      const existing = state.items.find((i) => i.key === key);
      const items = existing
        ? state.items.map((i) =>
            i.key === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + action.qty) } : i,
          )
        : [
            ...state.items,
            {
              key,
              productId: action.productId,
              color: action.color || null,
              qty: Math.min(MAX_QTY, action.qty),
              addedAt: Date.now(),
            },
          ];
      return { ...state, items };
    }

    case 'setQty': {
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.key !== action.key) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, qty: Math.min(MAX_QTY, action.qty) } : i,
        ),
      };
    }

    case 'remove':
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };

    case 'clear':
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], ready: false });

  /** Product that was just added — drives the accessory upsell sheet. */
  const [upsellFor, setUpsellFor] = useState(null);
  /** Short message pushed to an aria-live region so screen readers hear cart changes. */
  const [announcement, setAnnouncement] = useState('');

  // Load once on the client. The server always renders an empty cart, which is
  // correct: the cart is per-device and must never appear in prerendered HTML.
  useEffect(() => {
    let items = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          items = parsed
            .filter((i) => i && typeof i.productId === 'string' && getProductById(i.productId))
            .map((i) => ({
              key: i.key || lineKey(i.productId, i.color),
              productId: i.productId,
              color: i.color || null,
              qty: Math.max(1, Math.min(MAX_QTY, Number(i.qty) || 1)),
              addedAt: i.addedAt || Date.now(),
            }));
        }
      }
    } catch {
      /* corrupt or unavailable storage — start clean rather than crash */
    }
    dispatch({ type: 'hydrate', items });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* quota or private mode — the cart still works for this session */
    }
  }, [state.items, state.ready]);

  const add = useCallback((product, qty = 1, { color = null, showUpsell = true } = {}) => {
    if (!product) return;
    dispatch({ type: 'add', productId: product.id, qty, color });
    setAnnouncement(`${product.name.ar} — ${qty}`);
    // Only bikes trigger the accessory sheet; adding a light should not offer more lights.
    if (showUpsell && !isAccessory(product)) setUpsellFor(product);
  }, []);

  const setQty = useCallback((key, qty) => dispatch({ type: 'setQty', key, qty }), []);
  const remove = useCallback((key) => dispatch({ type: 'remove', key }), []);
  const clear = useCallback(() => {
    dispatch({ type: 'clear' });
    setAnnouncement('cleared');
  }, []);
  const closeUpsell = useCallback(() => setUpsellFor(null), []);

  /** Cart lines joined with live product data — never trust stale prices from storage. */
  const lines = useMemo(
    () =>
      state.items
        .map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          return { ...item, product, lineTotal: product.price * item.qty };
        })
        .filter(Boolean),
    [state.items],
  );

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.lineTotal, 0), [lines]);
  const qualifiesForFreeShipping = SITE.shipping.freeOver != null && subtotal >= SITE.shipping.freeOver;
  const amountToFreeShipping = SITE.shipping.freeOver == null ? 0 : Math.max(0, SITE.shipping.freeOver - subtotal);

  const hasBike = useMemo(() => lines.some((l) => !isAccessory(l.product)), [lines]);

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      ready: state.ready,
      hasBike,
      qualifiesForFreeShipping,
      amountToFreeShipping,
      add,
      setQty,
      remove,
      clear,
      upsellFor,
      closeUpsell,
      announcement,
    }),
    [
      lines,
      count,
      subtotal,
      state.ready,
      hasBike,
      qualifiesForFreeShipping,
      amountToFreeShipping,
      add,
      setQty,
      remove,
      clear,
      upsellFor,
      closeUpsell,
      announcement,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
