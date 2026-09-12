import React from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { useThemeColors } from '@/context/ThemeProvider';

type Props = {
  /** Custom action, e.g. stepping back within a multi-step screen. Defaults to navigation.goBack(). */
  onPress?: () => void;
};

/** The chevron every pushed or stepped screen uses to go back. */
export default function BackButton({ onPress }: Props) {
  const navigation = useNavigation();
  const colors = useThemeColors();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Quay lại"
      onPress={onPress ?? (() => navigation.goBack())}
      hitSlop={8}>
      <ChevronLeft size={24} color={`${colors.ink}99`} strokeWidth={2.5} />
    </Pressable>
  );
}
