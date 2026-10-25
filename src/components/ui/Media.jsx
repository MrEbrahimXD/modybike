import { SITE } from '../../config/site.js';

const assetUrl = (src) => src?.startsWith('/') && !src.startsWith('//') ? `${SITE.basePath}${src}` : src;
const assetSrcSet = (srcset) => srcset?.split(',').map((candidate) => {
  const [src, descriptor] = candidate.trim().split(/\s+/);
  return [assetUrl(src), descriptor].filter(Boolean).join(' ');
}).join(', ');

/**
 * The one image component.
 *
 * Every photograph on the site goes through here so that three things are
 * always true, on every page, without anyone having to remember them:
 *
 *   1. The box is reserved before the pixels arrive — no layout shift, ever.
 *   2. A 20px blur-up placeholder paints immediately, so a slow connection
 *      sees the *shape* of the photo rather than a grey hole.
 *   3. The browser is given a real `srcset` + `sizes` and picks the smallest
 *      file that will do.
 *
 * `image` is an entry from src/data/media.js: { src, srcset, w, h, ratio, lqip }.
 */

/** Aspect-ratio frame. Children are absolutely positioned inside it. */
export function Frame({ ratio = '4/3', className = '', children, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }} {...rest}>
      {children}
    </Tag>
  );
}

export default function Media({
  image,
  alt = '',
  ratio,
  sizes = '100vw',
  priority = false,
  className = '',
  imgClassName = '',
  fallbackLabel = '',
  position = 'center',
  /** 'cover' crops to the frame; 'contain' shows the whole product on white. */
  fit = 'cover',
  /** Fill the nearest positioned ancestor instead of reserving a ratio (hero backgrounds). */
  fill = false,
}) {
  const box = ratio || (image ? `${image.w} / ${image.h}` : '4/3');
  const contain = fit === 'contain';

  // A plain function, not an inner component: an inner component gets a new
  // identity every render and React would remount the <img> each time.
  const wrap = (children) =>
    fill ? (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>{children}</div>
    ) : (
      <Frame ratio={box} className={`${contain ? 'bg-white' : 'bg-carbon-100 dark:bg-carbon-800'} ${className}`}>
        {children}
      </Frame>
    );

  if (!image) {
    return wrap(
      <span className="label absolute bottom-3 start-3 text-carbon-400 dark:text-carbon-500">
        {fallbackLabel || 'ModyBike'}
      </span>,
    );
  }

  // The blurred preview sits underneath and the real image simply paints over
  // it. No opacity fade: a fade waits for JavaScript, which delays the largest
  // paint on slow phones.
  return wrap(
    <>
      {!contain && image.lqip ? (
        <img src={image.lqip} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-105 object-cover blur-xl" />
      ) : null}
      <img
        src={assetUrl(image.src)}
        srcSet={assetSrcSet(image.srcset)}
        sizes={sizes}
        alt={alt}
        width={image.w}
        height={image.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : 'auto'}
        style={{ objectPosition: position }}
        className={`absolute inset-0 h-full w-full ${contain ? 'object-contain p-2' : 'object-cover'} ${imgClassName}`}
      />
    </>,
  );
}
