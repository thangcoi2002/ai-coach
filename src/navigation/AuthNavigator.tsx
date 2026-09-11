import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/LoginScreen';
import { ROOT_ROUTES } from './routes';
import type { RootStackParamList } from './types';
import { useSetting } from '@/context/SettingProvider';
import OnboardingScreen from '@/screens/OnboardingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Screens shown while the user is not signed in. */
export default function AuthNavigator() {
  const { showOnboarding } = useSetting();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding && (
        <Stack.Screen name={ROOT_ROUTES.ONBOARDING} component={OnboardingScreen} />
      )}
      <Stack.Screen name={ROOT_ROUTES.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}
