# ModyBike

Arabic/English bicycle and children’s toy showroom website.

Client preview: https://mrebrahimxd.github.io/modybike/

## Development

```sh
npm ci
npm run dev
```

## Build and verify

```sh
npm run build
npm run verify
```

`VITE_SITE_URL` controls the public URL, including any subdirectory. Both browser and server routing, responsive images, canonical URLs and the sitemap use the same setting. `.env.example` contains the GitHub Pages address.

## Publishing

Push to `main`. The `Deploy GitHub Pages` workflow builds and verifies the static site, then deploys `dist` through GitHub Pages. No custom domain is configured. Each page is prerendered, so direct links and refreshes work without a redirect workaround.

## Handy commands

- `npm run ship -- "message"` (or double-click `ship.cmd`): commit everything and push; GitHub Pages redeploys.
- `npm run catalogue`: rebuild the Arabic and English PDF catalogues in `public/catalogue/` from the product data (needs Chromium: `npx playwright install chromium`, or set `CHROME_PATH`).
- Logo source: `assets-src/brand/icon.jpeg`; traced files are `public/logo-light.svg`, `public/logo-dark.svg`, `public/favicon.svg`.

See [SEO-LAUNCH.md](SEO-LAUNCH.md) for remaining client content and SEO launch tasks.
