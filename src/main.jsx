import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { seedContentCache } from './lib/content.js';
import { SITE } from './config/site.js';
import './styles/index.css';

/**
 * Client entry.
 *
 * Prerendered pages inline the data their route needs (currently article bodies)
 * as JSON. Seeding the cache *before* hydration means the first client render
 * produces exactly the markup already in the document — no mismatch, no flash,
 * and no second network request for content the user is already reading.
 */
function readInlinedData() {
  const el = document.getElementById('__MB_DATA__');
  if (!el?.textContent) return null;
  try {
    return JSON.parse(el.textContent);
  } catch {
    return null;
  }
}

const data = readInlinedData();
if (data?.content) seedContentCache(data.content);

const container = document.getElementById('root');

const tree = (
  <StrictMode>
    <BrowserRouter basename={SITE.basePath || '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// A prerendered page has server markup to hydrate; `npm run dev` has an empty shell.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
