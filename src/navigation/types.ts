import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Practice: undefined;
  Analysis: undefined;
  Notifications: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
