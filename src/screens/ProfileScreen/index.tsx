import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogOut, Mail } from 'lucide-react-native';
import BackHeaderRow from '@/components/BackHeaderRow';
import { useAuth } from '@/context/AuthProvider';
import { brand } from '@/theme/colors';
import { cardShadow } from '@/theme/card';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const initial = (user?.name ?? user?.email ?? '?').trim().charAt(0).toUpperCase();

  return (
    <View className="flex-1 bg-brand-page">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <BackHeaderRow />
        <ScrollView
          className="flex-1"
          contentContainerClassName="grow px-5 pt-2 pb-6"
          showsVerticalScrollIndicator={false}>
          <View className="items-center gap-3">
            <View
              className="h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: brand.accentTint }}>
              <Text className="text-3xl font-bold text-brand-accent-pressed">{initial}</Text>
            </View>
            {user && (
              <View className="items-center gap-0.5">
                <Text className="text-xl font-semibold text-brand-ink">{user.name}</Text>
                <Text className="text-sm text-brand-body">{user.email}</Text>
              </View>
            )}
          </View>

          {user && (
            <View
              className="mt-8 rounded-[20px] border border-[#F0F0F0] bg-brand-surface px-4"
              style={cardShadow}>
              <View className="flex-row items-center gap-3 py-[14px]">
                <Mail size={20} color={brand.meta} />
                <Text className="min-w-0 flex-1 text-[15px] font-medium text-brand-ink">
                  Email công ty
                </Text>
                <Text className="text-[13px] text-brand-body">{user.email}</Text>
              </View>
            </View>
          )}

          <View className="flex-1" />

          <Pressable
            accessibilityRole="button"
            onPress={logout}
            className="flex-row items-center justify-center gap-2 rounded-full border border-brand-accent-pressed/30 py-[15px] active:bg-brand-accent-tint">
            <LogOut size={18} color={brand.accentPressed} />
            <Text className="text-[15px] font-semibold text-brand-accent-pressed">Đăng xuất</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
