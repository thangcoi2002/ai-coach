import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { brand } from '@/theme/colors';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const shadowStyle = {
  shadowColor: brand.accent,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.25,
  shadowRadius: 16,
  elevation: 4,
};

/** Filled coral pill CTA — 17pt padding, fully rounded, dimmed while disabled. */
export default function PrimaryButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  className = '',
}: Props) {
  const isInactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive }}
      onPress={onPress}
      disabled={isInactive}
      style={isInactive ? undefined : shadowStyle}
      className={`w-full flex-row items-center justify-center gap-2 rounded-full bg-brand-accent p-[17px] dark:bg-brandDark-accent ${
        isInactive ? 'opacity-50' : 'active:bg-brand-accent-pressed dark:active:bg-brandDark-accent-pressed'
      } ${className}`}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-[15px] font-bold text-white">{label}</Text>
      )}
    </Pressable>
  );
}
