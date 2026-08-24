/**
 * Auth flow palette.
 *
 * Mirrors `theme.extend.colors.brand` in tailwind.config.js exactly — keep both
 * in sync. This typed copy exists for the callers that cannot go through a
 * className: the SVG gradient stops, `placeholderTextColor`, spinner colors.
 */
export const brand = {
  bg: '#FDF4F0',
  gradientFrom: '#FBD9CB',
  gradientTo: '#FDEEE7',
  surface: '#FFFFFF',
  ink: '#0D0D0C',
  body: '#4C4A46',
  muted: '#8B877F',
  accent: '#C64A2A',
  accentPressed: '#9B3A24',
  accentSoft: '#D9A18E',
  logoAccent: '#E15F3D',
  border: '#E3C7BB',
  inputBorder: '#F0DED6',
} as const;
