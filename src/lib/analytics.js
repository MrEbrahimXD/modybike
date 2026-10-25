import { SITE } from '../config/site.js';

/**
 * Visit and lead tracking — off until an ID is set in src/config/site.js.
 *
 * Loads after the page has finished loading so it never slows the first paint.
 * Both tools record page changes on their own (they watch the browser
 * history), so only the actions that matter to the shop are sent by hand:
 * a tap on a WhatsApp link or a phone number counts as a lead.
 */
let started = false;

function loadScript(src) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function lead(method) {
  window.gtag?.('event', 'generate_lead', { method });
  window.fbq?.('track', 'Contact', { method });
}

function onClick(event) {
  const link = event.target.closest?.('a[href]');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.includes('wa.me/')) lead('whatsapp');
  else if (href.startsWith('tel:')) lead('phone');
}

export function startAnalytics() {
  if (started || typeof window === 'undefined') return;
  const { gaMeasurementId, metaPixelId } = SITE.analytics;
  if (!gaMeasurementId && !metaPixelId) return;
  started = true;

  if (gaMeasurementId) {
    window.dataLayer = window.dataLayer || [];
    // gtag.js reads the `arguments` object itself, so this cannot be an arrow function.
    window.gtag = function gtag() {
      window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
    };
    window.gtag('js', new Date());
    window.gtag('config', gaMeasurementId);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`);
  }

  if (metaPixelId) {
    const fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); // eslint-disable-line prefer-rest-params
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', metaPixelId);
    fbq('track', 'PageView');
  }

  document.addEventListener('click', onClick, true);
}
