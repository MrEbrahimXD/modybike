import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import { LocaleProvider } from './i18n/index.jsx';
import { ThemeProvider } from './lib/theme.jsx';
import { CartProvider } from './lib/cart.jsx';

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import SizeGuide from './pages/SizeGuide.jsx';
import Maintenance from './pages/Maintenance.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Locations, { LocationDetail } from './pages/Locations.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Faq from './pages/Faq.jsx';
import Legal from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Builds the route tree for one locale.
 *
 * It is mounted twice — at `/` for Arabic and `/en` for English — so both
 * languages are real, indexable URLs with their own prerendered HTML, rather
 * than a client-side toggle that crawlers cannot see.
 *
 * React Router ranks static segments above the splat, so `/en/products` always
 * wins over the Arabic tree's `/*` fallback.
 */
function localeRoutes(lang, basePath) {
  return (
    <Route
      key={lang}
      path={basePath}
      element={
        <LocaleProvider lang={lang}>
          <Layout />
        </LocaleProvider>
      }
    >
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="shop/age/:ageSlug" element={<Products />} />
      <Route path="shop/type/:typeSlug" element={<Products />} />
      <Route path="shop/category/:categorySlug" element={<Products />} />
      <Route path="shop/size/:sizeSlug" element={<Products />} />
      <Route path="products/:slug" element={<ProductDetail />} />
      <Route path="accessories" element={<Products variant="accessories" />} />
      <Route path="size-guide" element={<SizeGuide />} />
      <Route path="maintenance" element={<Maintenance />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/topic/:category" element={<Blog variant="category" />} />
      <Route path="blog/:slug" element={<BlogPost />} />
      <Route path="locations" element={<Locations />} />
      <Route path="locations/:slug" element={<LocationDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="faq" element={<Faq />} />
      <Route path="privacy" element={<Legal doc="privacy" />} />
      <Route path="terms" element={<Legal doc="terms" />} />
      <Route path="shipping" element={<Legal doc="shipping" />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        {/* Motion is CSS-only — transitions and a couple of keyframes — so there
            is no animation runtime in the bundle at all. */}
        <Routes>
          {localeRoutes('en', '/en')}
          {localeRoutes('ar', '/')}
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}
