import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'modybike:theme';
const ThemeContext = createContext(null);

/** Light is the default — the inline script in index.html already applied it before paint. */
function readStoredTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readStoredTheme);

  const applyTheme = useCallback((next) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    root.style.colorScheme = next;
    const meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#0d141c' : '#f85016');
  }, []);

  const setTheme = useCallback(
    (next) => {
      setThemeState(next);
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode — the theme still works for this session */
      }
    },
    [applyTheme],
  );

  const toggleTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme],
  );

  // Sync the React state with whatever the pre-paint script decided.
  useEffect(() => {
    const actual = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    if (actual !== theme) setThemeState(actual);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Follow the OS only while the user has made no explicit choice.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return undefined;
    const onChange = (e) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* ignore */
      }
      setThemeState(e.matches ? 'dark' : 'light');
      applyTheme(e.matches ? 'dark' : 'light');
    };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  // During SSR there is no provider above some leaf components; fall back safely.
  return ctx || { theme: 'light', isDark: false, setTheme: () => {}, toggleTheme: () => {} };
}
