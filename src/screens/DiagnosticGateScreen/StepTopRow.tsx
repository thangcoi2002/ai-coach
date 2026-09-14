import React from 'react';
import { Text, View } from 'react-native';
import BackButton from '@/components/BackButton';
import Wordmark from '@/components/Wordmark';

type Props = {
  /** Right-aligned pill, e.g. "Bước 1 / 2" or "Cách 2 · Khảo sát nhanh". */
  badge: string;
  /** Omit on the entry and result screens, which show the wordmark instead of a back chevron. */
  onBack?: () => void;
};

/** Top row every diagnostic-gate step shares: wordmark or back chevron, plus a step badge. */
export default function StepTopRow({ badge, onBack }: Props) {
  return (
    <View className="h-9 flex-row items-center justify-between">
      {onBack ? <BackButton onPress={onBack} /> : <Wordmark />}
      <View className="rounded-full bg-brand-card px-2.5 py-[5px] dark:bg-brandDark-card">
        <Text className="text-[11px] font-bold text-brand-ink dark:text-brandDark-ink">
          {badge}
        </Text>
      </View>
    </View>
  );
}
