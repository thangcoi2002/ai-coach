import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/LoginScreen';
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
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
