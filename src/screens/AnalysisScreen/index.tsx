import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ChartNoAxesCombined } from 'lucide-react-native';
import { useThemeColors } from '@/context/ThemeProvider';

export default function AnalysisScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const colors = useThemeColors();

  return (
    <View className="flex-1 bg-brand-page dark:bg-brandDark-page">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="grow items-center justify-center gap-4 px-8"
          contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
          showsVerticalScrollIndicator={false}>
          <View className="h-14 w-14 items-center justify-center rounded-[20px] bg-brand-accent-tint dark:bg-brandDark-accent-tint">
            <ChartNoAxesCombined color={colors.accent} size={28} />
          </View>
          <Text className="text-[20px] font-bold text-brand-ink dark:text-brandDark-ink">
            Phân tích
          </Text>
          <Text className="text-center text-[15px] leading-6 text-brand-body dark:text-brandDark-body">
            Phân tích hội thoại thật sẽ sớm có mặt tại đây.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
