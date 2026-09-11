import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthProvider';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-brand-page">
      <ScrollView
        className="flex-1"
        contentContainerClassName="grow items-center justify-center gap-4 px-8"
        showsVerticalScrollIndicator={false}>
        {user && (
          <View className="items-center gap-1">
            <Text className="text-[17px] font-bold text-brand-ink">
              {user.name}
            </Text>
            <Text className="text-[13px] text-brand-body">{user.email}</Text>
          </View>
        )}
        <Pressable
          accessibilityRole="button"
          onPress={logout}
          className="rounded-full bg-brand-accent px-6 py-3 active:bg-brand-accent-pressed">
          <Text className="text-[15px] font-bold text-white">Đăng xuất</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
