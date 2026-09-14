import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, type CompositeNavigationProp } from '@react-navigation/native';
import { useBottomTabBarHeight, type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dumbbell } from 'lucide-react-native';
import { useThemeColors } from '@/context/ThemeProvider';
import { MAIN_TAB_ROUTES, ROOT_ROUTES } from '@/navigation/routes';
import type { MainTabParamList, RootStackParamList } from '@/navigation/types';

type PracticeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, typeof MAIN_TAB_ROUTES.PRACTICE>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function PracticeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const colors = useThemeColors();
  const navigation = useNavigation<PracticeNavigationProp>();

  return (
    <View className="flex-1 bg-brand-page dark:bg-brandDark-page">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="grow items-center justify-center gap-4 px-8"
          contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
          showsVerticalScrollIndicator={false}>
          <View className="h-14 w-14 items-center justify-center rounded-[20px] bg-brand-accent-tint dark:bg-brandDark-accent-tint">
            <Dumbbell color={colors.accent} size={28} />
          </View>
          <Text className="text-[20px] font-bold text-brand-ink dark:text-brandDark-ink">
            Luyện tập
          </Text>
          <Text className="text-center text-[15px] leading-6 text-brand-body dark:text-brandDark-body">
            Diễn tập tình huống với AI sẽ sớm có mặt tại đây.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate(ROOT_ROUTES.ROLEPLAY_VIDEO)}
            className="mt-2 rounded-full bg-brand-accent px-6 py-3 active:opacity-80 dark:bg-brandDark-accent">
            <Text className="text-[15px] font-semibold text-white">
              Bắt đầu diễn tập avatar (demo)
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
