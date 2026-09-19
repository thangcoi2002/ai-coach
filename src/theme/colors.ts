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
  /** Dark full-bleed surface, and the high-contrast fill for selected chips/labels. */
  night: '#0F172A',
  /** Running text on the analysis cards — the slate ramp's reading weight. */
  prose: '#1E293B',
  /** Muted slate for secondary labels on the analysis screens. */
  mute: '#64748B',
  /** Deep accent for the small-caps labels and the user's own turns in a replay. */
  accentDeep: '#B9553B',
  /** Outline a card gets while it is the selected/open one. */
  accentOutline: 'rgba(250,101,69,0.5)',
} as const;
