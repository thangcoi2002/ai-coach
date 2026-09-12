/**
 * Akelo design tokens (auth + onboarding).
 *
 * Mirrors `theme.extend.colors.brand` / `brandDark` in tailwind.config.js exactly —
 * keep all three in sync. These typed copies exist for the callers that cannot go
 * through a className: SVG icon colors, `placeholderTextColor`, spinner colors.
 * Use `useThemeColors()` (src/context/ThemeProvider.tsx) instead of importing
 * `brand` directly wherever the color must react to the current theme.
 */
export const brand = {
  page: '#FCFCFC',
  surface: '#FFFFFF',
  card: '#F5F5F5',
  ink: '#111111',
  divider: '#D8D8D8',
  meta: '#454545',
  body: '#777777',
  placeholder: '#94A3B8',
  accent: '#FA6545',
  accentPressed: '#D24C2E',
  accentTint: '#FFF1EC',
  border: '#F0F0F0',
} as const;

export const brandDark = {
  page: '#0B0B0C',
  surface: '#18191B',
  card: '#202225',
  ink: '#F5F5F5',
  divider: '#2E3033',
  meta: '#C7C7C7',
  body: '#9A9A9A',
  placeholder: '#7A8594',
  accent: '#FA6545',
  accentPressed: '#FF8C6E',
  accentTint: '#2B1A14',
  border: '#2D2E31',
} as const;
