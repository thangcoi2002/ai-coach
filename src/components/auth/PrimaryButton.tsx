import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

/** Filled accent CTA — 54pt tall, 16pt radius, dimmed while disabled. */
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
      className={`h-[54px] w-full flex-row items-center justify-center gap-2 rounded-2xl ${
        isInactive ? 'bg-brand-accent-soft opacity-60' : 'bg-brand-accent active:bg-brand-accent-pressed'
      } ${className}`}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-[15px] font-semibold text-white">{label}</Text>
      )}
    </Pressable>
  );
}
