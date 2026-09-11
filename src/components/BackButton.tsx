import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { brand } from '@/theme/colors';

type Props = {
  /** Custom action, e.g. stepping back within a multi-step screen. Defaults to navigation.goBack(). */
  onPress?: () => void;
};

/** The chevron every pushed or stepped screen uses to go back. */
export default function BackButton({ onPress }: Props) {
  const navigation = useNavigation();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Quay lại"
      onPress={onPress ?? (() => navigation.goBack())}
      hitSlop={8}>
      <ChevronLeft size={24} color={`${brand.ink}99`} strokeWidth={2.5} />
    </Pressable>
  );
}
