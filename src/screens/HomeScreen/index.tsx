import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl font-semibold">Home</Text>
      <Pressable
        className="rounded-lg bg-blue-600 px-4 py-2.5"
        onPress={() => navigation.navigate('Notifications')}
      >
        <Text className="font-semibold text-white">Open Notifications</Text>
      </Pressable>
    </View>
  );
}
