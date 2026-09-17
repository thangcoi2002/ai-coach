import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import ProfileScreen from '@/screens/ProfileScreen';
import DiagnosticGateScreen from '@/screens/DiagnosticGateScreen';
import { useSkills } from '@/context/SkillsProvider';
import { ROOT_ROUTES, type RootStackParamList } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Screens shown once the user is signed in: the tabbed app, plus screens reached by pushing.
 * Every screen here draws its own flat "‹" header (see BackHeaderRow) instead of the native
 * one — the design has no OS chrome, and native headerLeft picks up platform styling
 * (e.g. iOS wraps bar buttons in a circular "glass" background) we don't want.
 */
export default function AuthedNavigator() {
  const { skills } = useSkills();
  // RootNavigator holds the splash screen until skills have loaded, so this reflects
  // the real catalog by the time it's read — not a race with the fetch starting.
  const hasMeasuredSkill = skills?.some(skill => (skill.currentLevel ?? 0) > 0) ?? false;

  const initialRouteName = hasMeasuredSkill ? ROOT_ROUTES.MAIN_TABS : ROOT_ROUTES.DIAGNOSTIC_GATE;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name={ROOT_ROUTES.DIAGNOSTIC_GATE} component={DiagnosticGateScreen} />
      <Stack.Screen name={ROOT_ROUTES.MAIN_TABS} component={MainTabNavigator} />
      <Stack.Screen name={ROOT_ROUTES.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}
