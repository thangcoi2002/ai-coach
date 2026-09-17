import React, { useEffect, useRef } from 'react';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/context/AuthProvider';
import { useSetting } from '@/context/SettingProvider';
import { useSkills } from '@/context/SkillsProvider';
import AppLoadingView from './AppLoadingView';
import GuestNavigator from './GuestNavigator';
import AuthedNavigator from './AuthedNavigator';

export default function RootNavigator() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { loading: areSettingsLoading } = useSetting();
  const { isLoading: areSkillsLoading } = useSkills();
  // Skills only matter once signed in — AuthedNavigator needs them loaded to decide
  // whether to open on the diagnostic gate or straight into the app.
  const isLoading = isAuthLoading || areSettingsLoading || (isAuthenticated && areSkillsLoading);

  // The native splash can only be hidden once. A later loading spell (e.g. skills
  // refetching right after login) must not fall back to a bare `null` — with the
  // splash already gone that renders as a plain white blank instead.
  const hasHiddenSplash = useRef(false);

  useEffect(() => {
    if (!isLoading && !hasHiddenSplash.current) {
      BootSplash.hide({ fade: true });
      hasHiddenSplash.current = true;
    }
  }, [isLoading]);

  if (isLoading) {
    return hasHiddenSplash.current ? <AppLoadingView /> : null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthedNavigator /> : <GuestNavigator />}
    </NavigationContainer>
  );
}
