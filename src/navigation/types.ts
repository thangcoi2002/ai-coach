import type { NavigatorScreenParams } from '@react-navigation/native';
import { MAIN_TAB_ROUTES, ROOT_ROUTES } from './routes';

export type MainTabParamList = {
  [MAIN_TAB_ROUTES.HOME]: undefined;
  [MAIN_TAB_ROUTES.PRACTICE]: undefined;
  [MAIN_TAB_ROUTES.ANALYSIS]: undefined;
  [MAIN_TAB_ROUTES.NOTIFICATIONS]: undefined;
};

export type RootStackParamList = {
  [ROOT_ROUTES.LOGIN]: undefined;
  [ROOT_ROUTES.ONBOARDING]: undefined;
  [ROOT_ROUTES.MAIN_TABS]: NavigatorScreenParams<MainTabParamList>;
  [ROOT_ROUTES.PROFILE]: undefined;
  [ROOT_ROUTES.ROLEPLAY_VIDEO]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
