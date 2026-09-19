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

/**
 * Steps inside DiagnosticGateScreen, and below them the ones inside AnalysisScreen.
 * Both are routes of a stack nested in their screen rather than component state: the
 * OS back affordances (Android back, the iOS swipe, Android's predictive back gesture)
 * pop a *route*, so with steps held in state they tear the whole screen off — the app
 * flashes back to what is underneath before JS can put it back.
 *
 * Both sets are prefixed because every route name in the tree shares one namespace
 * once deep links exist, and `Report` means a different screen in each flow.
 */
export const GATE_ROUTES = {
  PICKER: 'GatePicker',
  REPORT: 'GateReport',
  SURVEY: 'GateSurvey',
  MEDIA: 'GateMedia',
  ROLE: 'GateRole',
  RESULT: 'GateResult',
} as const;

export const ANALYSIS_ROUTES = {
  CONVERSATIONS: 'AnalysisConversations',
  UPLOAD: 'AnalysisUpload',
  CTX: 'AnalysisCtx',
  PROCESSING: 'AnalysisProcessing',
  TRANSCRIPT: 'AnalysisTranscript',
  REPORT: 'AnalysisReport',
  REDO: 'AnalysisRedo',
} as const;

export type MainTabParamList = {
  [MAIN_TAB_ROUTES.HOME]: undefined;
  [MAIN_TAB_ROUTES.PRACTICE]: undefined;
  [MAIN_TAB_ROUTES.ANALYSIS]: undefined;
  [MAIN_TAB_ROUTES.NOTIFICATIONS]: undefined;
};

export type GateStackParamList = {
  [GATE_ROUTES.PICKER]: undefined;
  [GATE_ROUTES.REPORT]: undefined;
  [GATE_ROUTES.SURVEY]: undefined;
  [GATE_ROUTES.MEDIA]: undefined;
  [GATE_ROUTES.ROLE]: undefined;
  [GATE_ROUTES.RESULT]: undefined;
};

export type AnalysisStackParamList = {
  [ANALYSIS_ROUTES.CONVERSATIONS]: undefined;
  [ANALYSIS_ROUTES.UPLOAD]: undefined;
  [ANALYSIS_ROUTES.CTX]: undefined;
  [ANALYSIS_ROUTES.PROCESSING]: undefined;
  [ANALYSIS_ROUTES.TRANSCRIPT]: undefined;
  [ANALYSIS_ROUTES.REPORT]: undefined;
  // Which moment "Thử nói lại" opened on. A param rather than state in AnalysisScreen:
  // the step changes it as the user moves through the moments, and it has to survive
  // the report screen re-rendering underneath.
  [ANALYSIS_ROUTES.REDO]: { momentIndex: number };
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
