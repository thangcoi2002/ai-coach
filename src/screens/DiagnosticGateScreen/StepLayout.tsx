import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StepTopRow from './StepTopRow';

type Props = {
  /** Right-aligned pill, e.g. "Bước 1 / 2" or "Cách 2 · Khảo sát nhanh". */
  badge: string;
  /** Omit on the entry and result steps, which show the wordmark instead of a back chevron. */
  onBack?: () => void;
  /** Change it to send the content back to the top, e.g. between survey questions. */
  scrollKey?: string | number;
  children: React.ReactNode;
};

/**
 * Frame shared by every step: the background and safe area (each step is its own
 * route, so there is no screen-level wrapper above them), the top row stays pinned
 * while only the content scrolls, and the page padding lives here rather than in
 * each step.
 */
export default function StepLayout({ badge, onBack, scrollKey, children }: Props) {
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [scrollKey]);

  return (
    <SafeAreaView className="flex-1 bg-brand-page" edges={['top', 'bottom']}>
      <View className="px-5">
        <StepTopRow badge={badge} onBack={onBack} />
      </View>
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="grow px-5 pb-6"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
