import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import ProfileScreen from '@/screens/ProfileScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Screens shown once the user is signed in: the tabbed app, plus screens reached by pushing.
 * Every screen here draws its own flat "‹" header (see BackHeaderRow) instead of the native
 * one — the design has no OS chrome, and native headerLeft picks up platform styling
 * (e.g. iOS wraps bar buttons in a circular "glass" background) we don't want.
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
