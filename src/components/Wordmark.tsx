import React from 'react';
import { Text, View } from 'react-native';

/** "Akelo | AI Coach" lockup shown at the top of the auth and onboarding screens. */
export default function Wordmark() {
  return (
    <View className="flex-row items-center gap-2.5">
      <Text className="text-[17px] font-bold tracking-[-0.02em] text-brand-ink">Akelo</Text>
      <View className="h-6 w-px bg-brand-divider" />
      <Text className="text-sm font-medium text-brand-meta">AI Coach</Text>
    </View>
  );
}
