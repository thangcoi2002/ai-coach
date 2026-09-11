import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthProvider';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl font-semibold">Profile</Text>
      {user && <Text className="text-gray-500">{user.email}</Text>}
      <Pressable className="rounded-lg bg-red-600 px-4 py-2.5" onPress={logout}>
        <Text className="font-semibold text-white">Đăng xuất</Text>
      </Pressable>
    </View>
  );
}
