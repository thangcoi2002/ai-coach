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
          night: '#0F172A',
          prose: '#1E293B',
          mute: '#64748B',
          'accent-deep': '#B9553B',
          'accent-outline': 'rgba(250,101,69,0.5)',
        },
      },
      /**
       * Opacity steps the design uses that Tailwind's default scale lacks. Colour
       * modifiers such as `text-brand-ink/72` read from this scale, and a step that
       * isn't here generates no class at all — the element silently falls back to its
       * default colour instead of failing, so every value in use must be declared.
       */
      opacity: {
        12: '0.12',
        14: '0.14',
        16: '0.16',
        18: '0.18',
        45: '0.45',
        55: '0.55',
        72: '0.72',
      },
    },
  },
  plugins: [],
};
