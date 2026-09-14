/**
 * Akelo design tokens.
 *
 * Mirrors `theme.extend.colors.brand` in tailwind.config.js exactly — keep both in
 * sync. This typed copy exists for the callers that cannot go through a className:
 * SVG icon colors, `placeholderTextColor`, spinner colors.
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
