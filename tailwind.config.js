/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h1, h2, h3, h4': {
              fontWeight: '700',
              marginTop: '2em',
              marginBottom: '1em',
            },
            'h1:first-child, h2:first-child': {
              marginTop: '0',
            },
            'ul > li': {
              paddingLeft: '1.5em',
              position: 'relative',
              '&::before': {
                content: '""',
                width: '0.5em',
                height: '0.5em',
                borderRadius: '50%',
                backgroundColor: theme('colors.primary.500'),
                position: 'absolute',
                left: '0',
                top: '0.6em',
              },
            },
            'ol > li': {
              paddingLeft: '0.5em',
            },
            'a': {
              textDecoration: 'none',
              borderBottom: `2px solid ${theme('colors.primary.200')}`,
              transition: 'all 300ms',
              '&:hover': {
                borderColor: theme('colors.primary.500'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}