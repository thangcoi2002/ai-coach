import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/screens/HomeScreen';
import PracticeScreen from '@/screens/PracticeScreen';
import AnalysisScreen from '@/screens/AnalysisScreen';
import NotificationsScreen from '@/screens/NotificationsScreen';
import CustomTabBar from './CustomTabBar';
import { useThemeColors } from '@/context/ThemeProvider';
import { MAIN_TAB_ROUTES } from './routes';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const colors = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.page },
      }}
      tabBar={renderTabBar}>
      <Tab.Screen name={MAIN_TAB_ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={MAIN_TAB_ROUTES.PRACTICE} component={PracticeScreen} />
      <Tab.Screen name={MAIN_TAB_ROUTES.ANALYSIS} component={AnalysisScreen} />
      <Tab.Screen name={MAIN_TAB_ROUTES.NOTIFICATIONS} component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

function renderTabBar(props: React.ComponentProps<typeof CustomTabBar>) {
  return <CustomTabBar {...props} />;
}
