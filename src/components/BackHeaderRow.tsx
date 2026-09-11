import React from 'react';
import { View } from 'react-native';
import BackButton from './BackButton';

type Props = {
  /** Custom action, e.g. stepping back within a multi-step screen. Defaults to navigation.goBack(). */
  onPress?: () => void;
};

/** Flat "‹" header row every pushed or stepped screen starts with — no native header chrome. */
export default function BackHeaderRow({ onPress }: Props) {
  return (
    <View className="h-9 flex-row items-center px-5">
      <BackButton onPress={onPress} />
    </View>
  );
}
