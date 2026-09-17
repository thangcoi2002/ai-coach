import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/context/AuthProvider';
import { useSetting } from '@/context/SettingProvider';
import { useSkills } from '@/context/SkillsProvider';
import GuestNavigator from './GuestNavigator';
import AuthedNavigator from './AuthedNavigator';

export default function RootNavigator() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { loading: areSettingsLoading } = useSetting();
  const { isLoading: areSkillsLoading } = useSkills();
  // Skills only matter once signed in — AuthedNavigator needs them loaded to decide
  // whether to open on the diagnostic gate or straight into the app.
  const isLoading = isAuthLoading || areSettingsLoading || (isAuthenticated && areSkillsLoading);

  useEffect(() => {
    if (!isLoading) {
      BootSplash.hide({ fade: true });
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthedNavigator /> : <GuestNavigator />}
    </NavigationContainer>
  );
}
