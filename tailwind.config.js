/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      /** Keep in sync with `brand` / `brandDark` in src/theme/colors.ts. */
      colors: {
        brand: {
          page: '#FCFCFC',
          surface: '#FFFFFF',
          card: '#F5F5F5',
          ink: '#111111',
          divider: '#D8D8D8',
          meta: '#454545',
          body: '#777777',
          placeholder: '#94A3B8',
          accent: '#FA6545',
          'accent-pressed': '#D24C2E',
          'accent-tint': '#FFF1EC',
          border: '#F0F0F0',
        },
        brandDark: {
          page: '#0B0B0C',
          surface: '#18191B',
          card: '#202225',
          ink: '#F5F5F5',
          divider: '#2E3033',
          meta: '#C7C7C7',
          body: '#9A9A9A',
          placeholder: '#7A8594',
          accent: '#FA6545',
          'accent-pressed': '#FF8C6E',
          'accent-tint': '#2B1A14',
          border: '#2D2E31',
        },
      },
    },
  },
  plugins: [],
};
