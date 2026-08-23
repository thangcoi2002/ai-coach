import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import type { MainTabParamList } from './types';

type TabIconProps = { color: string; size: number };

function HomeTabIcon({ color, size }: TabIconProps) {
  return <Icon name="home" color={color} size={size} />;
}

function ProfileTabIcon({ color, size }: TabIconProps) {
  return <Icon name="person" color={color} size={size} />;
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ProfileTabIcon }}
      />
    </Tab.Navigator>
  );
}
