import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon.jsx';
import { useLocale } from '../../i18n/index.jsx';

/**
 * Dialog / bottom sheet.
 *
 * Slides from the bottom on phones (where a thumb is) and from the inline edge
 * on desktop. Handles the three things hand-rolled modals usually get wrong:
 * focus trapping, Escape, and restoring focus to whatever opened it.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  labelledBy,
  size = 'md',
  variant = 'sheet',
}) {
  const panelRef = useRef(null);
  const restoreTo = useRef(null);
  const { t } = useLocale();

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return undefined;

    restoreTo.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // Focus the panel itself rather than the first control, so screen readers
    // announce the dialog title before its contents.
    const id = window.setTimeout(() => panelRef.current?.focus(), 20);

    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = overflow;
      if (restoreTo.current instanceof HTMLElement) restoreTo.current.focus();
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const widths = { sm: 'sm:max-w-md', md: 'sm:max-w-xl', lg: 'sm:max-w-3xl' };

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
      onKeyDown={handleKey}
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-carbon-950/70 animate-[fade_.25s_ease-out] backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy || (title ? 'modal-title' : undefined)}
        tabIndex={-1}
        className={`relative flex max-h-[92svh] w-full flex-col bg-paper shadow-sheet outline-none dark:bg-carbon-900 ${widths[size]} ${
          variant === 'sheet' ? 'animate-rise-in' : 'animate-rise-in'
        }`}
      >
        {title ? (
          <div className="flex items-start justify-between gap-4 border-b px-6 py-5 rule">
            <h2 id="modal-title" className="text-lg font-bold leading-snug sm:text-xl">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close')}
              className="-me-2 -mt-1 grid h-10 w-10 shrink-0 place-items-center transition-colors hover:bg-carbon-950 hover:text-paper dark:hover:bg-paper dark:hover:text-carbon-950"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">{children}</div>

        {footer ? <div className="border-t px-6 py-4 rule">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  );
}
