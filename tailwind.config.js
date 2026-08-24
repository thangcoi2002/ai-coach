/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      /** Keep in sync with `brand` in src/theme/colors.ts. */
      colors: {
        brand: {
          bg: '#FDF4F0',
          'gradient-from': '#FBD9CB',
          'gradient-to': '#FDEEE7',
          surface: '#FFFFFF',
          ink: '#0D0D0C',
          body: '#4C4A46',
          muted: '#8B877F',
          accent: '#C64A2A',
          'accent-pressed': '#9B3A24',
          'accent-soft': '#D9A18E',
          'logo-accent': '#E15F3D',
          border: '#E3C7BB',
          'input-border': '#F0DED6',
        },
      },
    },
  },
  plugins: [],
};
