import typography from '@tailwindcss/typography';

/**
 * ModyBike design tokens — "Sharqia Editorial".
 *
 * Deliberate constraints, because the defaults are what make a site look
 * machine-made:
 *   · Two families only. No Inter, no Cairo.
 *   · Radius tops out at 4px. Nothing is a pill, nothing is a blob.
 *   · No gradient tokens. Depth comes from photography and hairlines.
 *   · One accent (`signal`). If everything is highlighted, nothing is.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      /* The sans stack is a variable so each locale can carry its own typeface —
         see the `html[lang]` blocks in src/styles/index.css. */
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      colors: {
        /* The ground. Warm, not blue-grey — grey reads as "unstyled". */
        carbon: {
          50: '#F5F4F2',
          100: '#E8E6E2',
          200: '#D2CFC9',
          300: '#AFABA3',
          400: '#85817A',
          500: '#625E58',
          600: '#4A4742',
          700: '#363431',
          800: '#232220',
          900: '#161514',
          950: '#0B0B0A',
        },
        /* Warm paper. Pure #fff is the single most common "AI default". */
        paper: {
          DEFAULT: '#F4F1EC',
          raised: '#FBF9F6',
          sunk: '#E9E5DD',
        },
        /* The one accent. Burnt orange-red — Egyptian brick, not SaaS purple. */
        signal: {
          50: '#FDF0EA',
          100: '#FADBCE',
          200: '#F5B49B',
          300: '#EE8760',
          400: '#E85E2E',
          500: '#D8400F',
          600: '#B7330B',
          700: '#92290A',
          800: '#6E200B',
          900: '#4B170A',
        },
        /* Darker than WhatsApp's own #25D366, which only reaches 2:1 against
           the white label on it. This clears 5.2:1 and still reads as WhatsApp
           green next to the glyph. */
        whatsapp: { DEFAULT: '#0F7D3F', ink: '#0A5A2C' },

        /* Stock/state — muted, never traffic-light bright. The `-on-dark`
           pairs exist because the light versions are too dark to read on the
           near-black ground, which is most of this site. */
        state: {
          ok: '#2F6B45',
          low: '#8A6010',
          out: '#8A2B22',
          'ok-dark': '#6FBF8E',
          'low-dark': '#E0B341',
          'out-dark': '#E58A7C',
        },
      },

      /* Hard edges. The scale simply has no large values to reach for. */
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '3px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        '3xl': '4px',
        full: '9999px', // reserved for genuinely circular things only
      },

      /* Editorial display scale — fluid, with real jumps between steps.
         Leading and tracking come from per-locale variables: Arabic needs more
         room and less negative tracking than a Latin grotesque. */
      fontSize: {
        /* The small end of Tailwind's default scale is too small for this
           audience — 12px secondary text on a phone in daylight is unreadable.
           Raising the floor here fixes every `text-xs` / `text-sm` on the site
           at once, instead of hunting them one component at a time. */
        xs: ['0.8125rem', { lineHeight: '1.5' }], // 12 → 13
        sm: ['0.9375rem', { lineHeight: '1.55' }], // 14 → 15
        base: ['1.0625rem', { lineHeight: '1.6' }], // 16 → 17

        'display-xl': [
          'clamp(2.75rem, 8.5vw, 7.5rem)',
          { lineHeight: 'var(--lh-display)', letterSpacing: 'var(--track-display)' },
        ],
        'display-lg': [
          'clamp(2.25rem, 6vw, 5rem)',
          { lineHeight: 'var(--lh-display)', letterSpacing: 'var(--track-display)' },
        ],
        'display-md': [
          'clamp(1.875rem, 4vw, 3.25rem)',
          { lineHeight: 'calc(var(--lh-display) + 0.06)', letterSpacing: 'var(--track-display)' },
        ],
        'display-sm': [
          'clamp(1.5rem, 2.6vw, 2.25rem)',
          { lineHeight: 'calc(var(--lh-display) + 0.12)', letterSpacing: 'var(--track-display)' },
        ],
        /* Technical micro-type, for spec sheets and part numbers only. */
        spec: ['0.75rem', { lineHeight: '1.3', letterSpacing: '0.09em' }],
      },

      letterSpacing: { wide2: '0.18em' },

      /* Shadows are for lifted UI (menus, sheets) only — never decoration. */
      boxShadow: {
        sheet: '0 1px 2px rgba(11,11,10,.08), 0 24px 48px -24px rgba(11,11,10,.45)',
        menu: '0 12px 32px -12px rgba(11,11,10,.35)',
      },

      maxWidth: { prose: '66ch', measure: '54ch' },

      screens: { xs: '420px', '3xl': '1728px' },

      transitionTimingFunction: { editorial: 'cubic-bezier(.2,.7,.3,1)' },

      keyframes: {
        'rise-in': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        'wipe-in': { from: { clipPath: 'inset(0 100% 0 0)' }, to: { clipPath: 'inset(0 0 0 0)' } },
      },
      animation: {
        'rise-in': 'rise-in .55s cubic-bezier(.2,.7,.3,1) both',
        'wipe-in': 'wipe-in .7s cubic-bezier(.2,.7,.3,1) both',
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            lineHeight: '1.85',
            '--tw-prose-body': theme('colors.carbon.700'),
            '--tw-prose-headings': theme('colors.carbon.950'),
            '--tw-prose-links': theme('colors.signal.600'),
            '--tw-prose-bold': theme('colors.carbon.900'),
            '--tw-prose-quotes': theme('colors.carbon.800'),
            '--tw-prose-invert-body': theme('colors.carbon.200'),
            '--tw-prose-invert-headings': theme('colors.paper.DEFAULT'),
            '--tw-prose-invert-links': theme('colors.signal.300'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
