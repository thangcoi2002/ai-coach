/**
 * Single source of truth for route names. `types.ts` derives the param list
 * keys from these, so renaming a route only means editing the value here —
 * every `navigate(ROUTES.X)` call site stays untouched.
 */
export const ROOT_ROUTES = {
  LOGIN: 'Login',
  ONBOARDING: 'Onboarding',
  MAIN_TABS: 'MainTabs',
  PROFILE: 'Profile',
} as const;

export const MAIN_TAB_ROUTES = {
  HOME: 'Home',
  PRACTICE: 'Practice',
  ANALYSIS: 'Analysis',
  NOTIFICATIONS: 'Notifications',
} as const;
