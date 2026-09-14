import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import ProfileScreen from '@/screens/ProfileScreen';
import DiagnosticGateScreen from '@/screens/DiagnosticGateScreen';
import { useAuth } from '@/context/AuthProvider';
import { ROOT_ROUTES, type RootStackParamList } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Screens shown once the user is signed in: the tabbed app, plus screens reached by pushing.
 * Every screen here draws its own flat "‹" header (see BackHeaderRow) instead of the native
 * one — the design has no OS chrome, and native headerLeft picks up platform styling
 * (e.g. iOS wraps bar buttons in a circular "glass" background) we don't want.
 */
export default function AuthedNavigator() {
  const { user } = useAuth();

  const initialRouteName =
    user?.level == null ? ROOT_ROUTES.DIAGNOSTIC_GATE : ROOT_ROUTES.MAIN_TABS;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name={ROOT_ROUTES.DIAGNOSTIC_GATE} component={DiagnosticGateScreen} />
      <Stack.Screen name={ROOT_ROUTES.MAIN_TABS} component={MainTabNavigator} />
      <Stack.Screen name={ROOT_ROUTES.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}
