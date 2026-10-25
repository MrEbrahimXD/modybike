# ModyBike — search, domain and launch steps

## What the site does for search (built in)

- Every page is prerendered HTML with its own title, description, canonical URL and Arabic/English `hreflang`. Page URLs end in `/` because GitHub Pages redirects the slash-less form; links, canonicals and the sitemap never point at a redirect (`npm run verify` checks this).
- Egyptian search words: titles use "عجل / عجلة" next to "دراجة", Western digits ("عجلة 20") and the price ("بسعر 1,900 ج.م").
- Landing pages Google can index:
  - by age: `/shop/age/ages-3-5/` … `/shop/age/ages-12-plus/`
  - by type: `/shop/category/kids/`, `/mountain/`, `/bmx/` (برامج), `/city/`
  - by wheel size: `/shop/size/12-inch/` … `/shop/size/26-inch/`
  - one page per Sharqia city: `/locations/zagazig/` and 18 more
- Structured data: `BikeStore` (address, hours, phone, price range, other spellings of the name), `Product` + `Offer` with the real photos and price, `BreadcrumbList`, `FAQPage`, `BlogPosting`.
- `sitemap.xml` lists product photos and only gives `lastmod` where a real date exists.
- Link previews: each product and article gets a 1200×630 JPEG at build time (`scripts/share-images.mjs`), so a link sent on WhatsApp or Facebook shows the bike.
- Product feed: `/feeds/products.xml` (Google product-feed format, read by Facebook/Instagram/WhatsApp catalogues) with square JPEG photos.
- Accessories are still placeholder items (names, prices, stock photos not from the shop). They show on the site but are `noindex`, carry no Product markup and stay out of the sitemap and feed. Send the real list and prices, then delete `placeholder: true` in `src/data/products.accessories.js`.

## 1. Connect modybike.com (owner, once)

At the company where modybike.com is registered, DNS settings:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | mrebrahimxd.github.io |

Delete any other A, AAAA or CNAME records for `@` and `www` (parking pages).

Then on GitHub: repository → Settings → Pages → Custom domain → `modybike.com` → Save. When the DNS check turns green, tick **Enforce HTTPS** (the certificate can take up to a day).

The deploy workflow reads the address from that setting. Actions → Deploy GitHub Pages → **Run workflow** rebuilds for modybike.com right away; otherwise the scheduled check does it within six hours. The old `mrebrahimxd.github.io/modybike/` link redirects to modybike.com by itself.

Recommended: GitHub → your profile → Settings → Pages → Add a verified domain (one TXT record) so nobody else can claim modybike.com on GitHub.

## 2. Google (owner)

1. **Google Business Profile** — the biggest source of local customers ("محل عجل قريب مني", Google Maps). business.google.com → add "مودي بايك ModyBike", category *Bicycle Shop*, extra categories *Bicycle repair shop* and *Toy store*, the shop's map pin in Abu Kabir, phone 01015120515, hours 11:00–23:00 daily, website `https://modybike.com`. Add real photos (shop front, inside, bikes) and the bikes with prices under Products. Finish the verification Google asks for.
2. Send the Google Maps link and pin coordinates back; they go into `SITE.address.mapsUrl` and `SITE.address.geo` in `src/config/site.js` (structured data and contact page use them).
3. After each sale, send the customer the Google review link on WhatsApp. Reviews move the shop up in Maps.
4. **Search Console** — search.google.com/search-console → Add property → Domain → `modybike.com` → add the TXT record it shows at the registrar → Verify → Sitemaps → submit `https://modybike.com/sitemap.xml`. Then URL inspection → Request indexing for the home page and `/shop/age/ages-3-5/`.
5. Bing Webmaster Tools → import from Search Console (two clicks).

## 3. Facebook, Instagram, WhatsApp (owner)

- Facebook page → edit → Website: `https://modybike.com`.
- Commerce Manager → Catalogue → Add items → Data feed → Scheduled feed → URL `https://modybike.com/feeds/products.xml`, daily. Connect the catalogue to the Facebook page and the WhatsApp Business account so customers can browse the bikes in WhatsApp. (Google free product listings do not run in Egypt yet; the same feed works there if that changes.)

## 4. Measuring visits (optional, owner)

`src/config/site.js` → `analytics`:

- `gaMeasurementId` — Google Analytics 4 → Admin → Data streams → Web → `G-…`
- `metaPixelId` — Meta Events Manager → Pixel ID (needed for Facebook ads)
- `facebookDomainVerification` — Meta Business Settings → Domains

Nothing loads while they are empty. Once set, every tap on a WhatsApp button or the phone number is recorded as a lead, and the privacy page names the tool automatically.

## Maintaining it

- Age bands and type copy: `src/data/collections.js`. Categories and their search titles: `src/data/categories.js`.
- Contact data, hours, socials: `src/config/site.js`. Keep the name, address and phone identical on the site, Google Business Profile and Facebook.
- Product photos must show real stock. Prices in `src/data/products.bikes.js`; add `updatedAt: 'YYYY-MM-DD'` to a product when its price changes so the sitemap date is right.
- Run `npm run build && npm run verify` before pushing.

Rankings and traffic are not guaranteed and indexing takes days to weeks. Track impressions, clicks and queries in Search Console.

References: [Google ecommerce site structure](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure), [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [Google Business Profile](https://support.google.com/business/answer/10514137).
