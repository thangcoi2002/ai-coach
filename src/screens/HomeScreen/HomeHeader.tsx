import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { brand } from '@/theme/colors';

type Props = {
  name: string | null;
  onPressAvatar: () => void;
};

/** First name only — "Nguyễn Minh Anh" -> "Anh" mirrors how the design greets by given name. */
function firstName(name: string | null) {
  if (!name) {
    return null;
  }
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1];
}

export default function HomeHeader({ name, onPressAvatar }: Props) {
  const given = firstName(name);
  const initial = (given ?? 'B').charAt(0).toUpperCase();

  return (
    <View className="flex-row items-center gap-3">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Hồ sơ của bạn"
        onPress={onPressAvatar}
        hitSlop={8}
        className="h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: brand.accentTint }}>
        <Text className="text-lg font-bold text-brand-accent-pressed">{initial}</Text>
      </Pressable>
      <View className="flex-1">
        <Text className="text-xl font-semibold tracking-[-0.01em] text-brand-ink">
          Chào {given ?? 'bạn'} 👋
        </Text>
        <Text className="mt-0.5 text-[13px] text-brand-body">Bước nhỏ, tác động lớn.</Text>
      </View>
    </View>
  );
}
