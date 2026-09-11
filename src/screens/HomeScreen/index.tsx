import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { CircleUserRound } from 'lucide-react-native';
import { useAuth } from '@/context/AuthProvider';
import { brand } from '@/theme/colors';
import type { RootStackParamList } from '@/navigation/types';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View className="flex-1 bg-brand-page">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="h-9 flex-row items-center justify-between px-5">
          <Text className="text-[17px] font-bold text-brand-ink">
            Trang chủ
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Profile')}
            hitSlop={8}
          >
            <CircleUserRound color={brand.ink} size={26} />
          </Pressable>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="grow items-center justify-center gap-2 px-8"
          contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-[20px] font-bold text-brand-ink">
            {user?.name ? `Chào, ${user.name}` : 'Chào mừng trở lại'}
          </Text>
          <Text className="text-center text-[15px] leading-6 text-brand-body">
            Checklist và gợi ý luyện tập tiếp theo sẽ sớm có mặt tại đây.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
