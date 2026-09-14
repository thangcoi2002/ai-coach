/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      /** Keep in sync with `brand` in src/theme/colors.ts. */
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
      },
    },
  },
  plugins: [],
};
