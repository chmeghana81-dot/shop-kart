/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        brand: {
          DEFAULT: '#f97316',
          dark:    '#ea580c',
          light:   '#fdba74',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark:    '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        xs: '475px',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-in-out',
        'slide-up':   'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200%  0' },
        },
      },
      backgroundImage: {
        'shimmer-gradient':
          'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        'shimmer-gradient-dark':
          'linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)',
      },
    },
  },
  plugins: [],
};
