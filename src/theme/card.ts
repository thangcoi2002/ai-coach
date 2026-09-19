import { brand } from './colors';

/** Soft elevation shared by every white section card across the app. */
export const cardShadow = {
  shadowColor: brand.night,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.05,
  shadowRadius: 16,
  elevation: 2,
};

export const cardClassName = 'rounded-[20px] border border-brand-border bg-brand-surface';
