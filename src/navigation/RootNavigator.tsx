import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/context/AuthProvider';
import { useSetting } from '@/context/SettingProvider';
import GuestNavigator from './GuestNavigator';
import AuthedNavigator from './AuthedNavigator';

export default function RootNavigator() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { loading: areSettingsLoading } = useSetting();
  const isLoading = isAuthLoading || areSettingsLoading;

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
