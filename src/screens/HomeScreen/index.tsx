import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import { useBottomTabBarHeight, type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthProvider';
import { MAIN_TAB_ROUTES, ROOT_ROUTES } from '@/navigation/routes';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';
import HomeHeader from './HomeHeader';
import TodaySessionCard from './TodaySessionCard';
import ProgressStats from './ProgressStats';
import CommitmentsCard from './CommitmentsCard';
import SkillsCard from './SkillsCard';
import ProfileLinksCard from './ProfileLinksCard';

type HomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof MAIN_TAB_ROUTES.HOME>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
  const { user } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View className="flex-1 bg-brand-page">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-7 px-5 pt-4"
          contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
          showsVerticalScrollIndicator={false}>
          <HomeHeader
            name={user?.name ?? null}
            onPressAvatar={() => navigation.navigate(ROOT_ROUTES.PROFILE)}
          />
          <TodaySessionCard onStart={() => navigation.navigate(MAIN_TAB_ROUTES.PRACTICE)} />
          <ProgressStats />
          <CommitmentsCard />
          <SkillsCard />
          <ProfileLinksCard onPressRow={() => navigation.navigate(MAIN_TAB_ROUTES.ANALYSIS)} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
