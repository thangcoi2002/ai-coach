import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import PracticeScreen from '@/screens/PracticeScreen';
import AnalysisScreen from '@/screens/AnalysisScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import CustomTabBar from './CustomTabBar';
import { brand } from '@/theme/colors';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: brand.page },
      }}
      tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Practice" component={PracticeScreen} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

function renderTabBar(props: React.ComponentProps<typeof CustomTabBar>) {
  return <CustomTabBar {...props} />;
}
