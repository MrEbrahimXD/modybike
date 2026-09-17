import { useEffect, useRef, useState } from 'react';
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
  /**
   * Fill the nearest positioned ancestor instead of reserving its own ratio.
   * Used for full-bleed hero backgrounds, where the section's own padding —
   * not the photograph — decides the height.
   */
  fill = false,
}) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // A cached or prerendered image can finish before React attaches onLoad.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  const box = ratio || (image ? `${image.w} / ${image.h}` : '4/3');

  /* `Frame` owns `relative`; a fill needs `absolute`, and Tailwind emits
     `relative` after `absolute`, so the two can't simply be concatenated. */
  const Wrapper = ({ children }) =>
    fill ? (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>{children}</div>
    ) : (
      <Frame ratio={box} className={`bg-carbon-100 dark:bg-carbon-800 ${className}`}>
        {children}
      </Frame>
    );

  if (!image) {
    // Deliberate, flat, and obviously a placeholder — not a pastel blob
    // pretending to be a photograph.
    return (
      <Wrapper>
        <span className="label absolute bottom-3 start-3 text-carbon-400 dark:text-carbon-500">
          {fallbackLabel || 'ModyBike'}
        </span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* blur-up: painted instantly from an inlined data URI */}
      <img
        src={image.lqip}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full scale-105 object-cover blur-xl transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img
        ref={imgRef}
        src={assetUrl(image.src)}
        srcSet={assetSrcSet(image.srcset)}
        sizes={sizes}
        alt={alt}
        width={image.w}
        height={image.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchpriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        style={{ objectPosition: position }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </Wrapper>
  );
}
