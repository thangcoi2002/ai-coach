import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import { useBottomTabBarHeight, type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthProvider';
import { useHome } from '@/context/HomeProvider';
import PrimaryButton from '@/components/PrimaryButton';
import { brand } from '@/theme/colors';
import {
  MAIN_TAB_ROUTES,
  ROOT_ROUTES,
  type MainTabParamList,
  type RootStackParamList,
} from '@/navigation/routes';
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
  const { home, isLoading, refresh } = useHome();

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
            onPress={() => navigation.navigate(ROOT_ROUTES.PROFILE)}
          />
          {!isLoading && !home && (
            <View className="items-center gap-3 py-6">
              <Text className="text-center text-[13px] text-brand-body">
                Không tải được dữ liệu trang chủ.
              </Text>
              <PrimaryButton label="Thử lại" onPress={refresh} />
            </View>
          )}
          {isLoading && !home && (
            <View className="items-center py-10">
              <ActivityIndicator size="small" color={brand.accent} />
            </View>
          )}
          {home && (
            <>
              <TodaySessionCard
                session={home.nextSession}
                onStart={() => navigation.navigate(MAIN_TAB_ROUTES.PRACTICE)}
              />
              <ProgressStats
                streakDays={home.streakDays}
                sessionsThisWeek={home.sessionsThisWeek}
              />
              <CommitmentsCard />
              <SkillsCard />
              <ProfileLinksCard
                onPressReports={() => navigation.navigate(MAIN_TAB_ROUTES.ANALYSIS)}
                onPressReassess={() =>
                  navigation.navigate(ROOT_ROUTES.DIAGNOSTIC_GATE, { mode: 'revisit' })
                }
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
