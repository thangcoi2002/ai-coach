import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Single source of truth for route names. The param list types below derive
 * their keys from these, so renaming a route only means editing the value
 * here — every `navigate(ROUTES.X)` call site stays untouched.
 */
export const ROOT_ROUTES = {
  LOGIN: 'Login',
  ONBOARDING: 'Onboarding',
  DIAGNOSTIC_GATE: 'DiagnosticGate',
  MAIN_TABS: 'MainTabs',
  PROFILE: 'Profile',
} as const;

export const MAIN_TAB_ROUTES = {
  HOME: 'Home',
  PRACTICE: 'Practice',
  ANALYSIS: 'Analysis',
  NOTIFICATIONS: 'Notifications',
} as const;

export type MainTabParamList = {
  [MAIN_TAB_ROUTES.HOME]: undefined;
  [MAIN_TAB_ROUTES.PRACTICE]: undefined;
  [MAIN_TAB_ROUTES.ANALYSIS]: undefined;
  [MAIN_TAB_ROUTES.NOTIFICATIONS]: undefined;
};

export type RootStackParamList = {
  [ROOT_ROUTES.LOGIN]: undefined;
  [ROOT_ROUTES.ONBOARDING]: undefined;
  // Omitted (first login, level === null) vs 'revisit' (re-run from the Home profile
  // links card) change the copy, the back affordance, and what finishing the flow does.
  [ROOT_ROUTES.DIAGNOSTIC_GATE]: { mode?: 'revisit' } | undefined;
  [ROOT_ROUTES.MAIN_TABS]: NavigatorScreenParams<MainTabParamList>;
  [ROOT_ROUTES.PROFILE]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
