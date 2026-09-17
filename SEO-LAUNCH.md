# ModyBike content and search launch

## Implemented

- Five overlapping age collections: 3–5, 5–8, 7–10, 8–12, 12+.
- Separate bicycle, scooter, ride-on car and baby walker collections. Scooter/car/walker pages accept enquiries; no invented product inventory was added.
- Arabic and English collection pages rendered into static HTML, linked from the homepage, navigation, footer and search.
- Unique titles/descriptions, locale-specific canonical URLs, reciprocal language alternates, sitemap, robots, Open Graph PNG and business/contact structured data.
- Phone: 01015120515. WhatsApp: 01102637511. Facebook: https://www.facebook.com/share/14roaEaozXa/ (link supplied by client; page content could not be independently accessed).
- Location: Abu Kabir, Al Sharqia. Hours from the note: 11 am–11 pm. Delivery from the note: free within Abu Kabir district, EGP 150 to other Sharqia districts.
- Demo product pages are noindex and excluded from sitemap/product structured data. Filter combinations use noindex and the collection’s canonical URL. Delivery pages describe services, not fictional branches.

## Required before public launch

1. The client preview uses `https://mrebrahimxd.github.io/modybike/`, with no custom domain. GitHub Actions reads the site URL from Pages configuration and rebuilds automatically on pushes to `main`. For a local build using the same subdirectory, copy `.env.example` to `.env.local`. Without that file or an environment override, local development uses `http://localhost:5173` at the root. A future domain change requires a new `VITE_SITE_URL` and rebuild; router, assets and SEO URLs derive from it.
2. Confirm the full street address, map pin, email and opening days/holiday exceptions. Update `src/config/site.js`; `streetVerified` must only become true after the address is confirmed. Exact street, coordinates, email and unverified social accounts are currently omitted from structured data. Map links ask the shop for directions.
3. Replace demonstration models, prices, stock and stock photography in `src/data/products.bikes.js`, `src/data/products.accessories.js` and the media manifest. Add actual scooter/car/walker products to the catalogue with `productType: 'scooters' | 'ride-on-cars' | 'walkers'`, verified fit ranges and real images. The default type for existing non-accessory products is `bikes`.
4. Check the remaining draft terms, privacy text, editorial articles and product claims. Set `SITE.isPlaceholderContent` to false only after the catalogue is verified. That enables product indexing and Product/Offer markup. Verify the Product schema uses the actual brand and images for each real product before doing so.
5. Run `npm run build` then `npm run verify`. Publish `dist` using a host that serves each generated directory index and returns a real HTTP 404 for unknown routes. The root should resolve to one canonical HTTPS hostname.
6. Verify ownership in Google Search Console, add its verification token to `SITE.analytics.googleSiteVerification`, rebuild and submit `/sitemap.xml`. Inspect the homepage, one Arabic collection, its English counterpart and a real product URL. Search Console ownership/submission has not been performed in this task.
7. Create or update the client’s Google Business Profile with the same name, address, phone, hours and website. Upload genuine shop/product photos. Link to the website from the Facebook page. These account changes require the client’s access and have not been performed.

## How to maintain it

Age bands and type copy: `src/data/collections.js`. Age matching includes a product when its verified age range overlaps the selected band; products with unknown ages are excluded. Groups are browsing guides, not guarantees that every item fits every child in the band.

Contact/business data: `src/config/site.js`. Keep all channels and the Google Business Profile consistent. Product photos must show actual stock; the existing stock images are explicitly marked as illustrative.

Track Search Console impressions, clicks, queries and indexed pages after launch. Search rankings and traffic are not guaranteed, and indexing can take time. `llms.txt` is descriptive metadata, not a guarantee of indexing or AI recommendations.

References: [Google ecommerce site structure](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure), [URL and canonical guidance](https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites), [launch guidance](https://developers.google.com/search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website).
