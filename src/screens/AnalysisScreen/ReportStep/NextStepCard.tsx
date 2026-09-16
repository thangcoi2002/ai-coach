import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cardClassName, cardShadow } from '@/theme/card';
import type { AnalysisReport } from '@/types/analysis.type';

type Props = {
  next: AnalysisReport['next'];
  onPractice: () => void;
};

/** "Việc tiếp theo của bạn" — the one thing to drill, with a CTA into Luyện tập. */
export default function NextStepCard({ next, onPractice }: Props) {
  return (
    <View className="mt-3.5">
      <Text className="text-[19px] font-semibold tracking-[-0.02em] text-brand-ink">
        Việc tiếp theo của bạn
      </Text>
      <View className={`mt-2 gap-3.5 p-5 ${cardClassName}`} style={cardShadow}>
        <Text className="text-[20px] font-semibold leading-[26px] tracking-[-0.02em] text-brand-ink">
          {next.head}
        </Text>
        <Text className="text-[14px] leading-[21.7px] text-[#475568]">{next.why}</Text>
        <View className="gap-2.5 pt-1">
          <View className="flex-row items-start gap-2.5">
            <Text className="w-16 flex-none pt-0.5 text-[11px] font-bold tracking-[0.1em] text-brand-placeholder">
              LẦN SAU
            </Text>
            <Text className="min-w-0 flex-1 text-[14px] leading-[21px] text-brand-ink">
              {next.time}
            </Text>
          </View>
          <View className="flex-row items-start gap-2.5">
            <Text className="w-16 flex-none pt-0.5 text-[11px] font-bold tracking-[0.1em] text-brand-placeholder">
              LUYỆN
            </Text>
            <Text className="min-w-0 flex-1 text-[14px] leading-[21px] text-brand-ink">
              {next.drill}
            </Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onPractice}
          className="mt-1 min-h-[52px] items-center justify-center rounded-full bg-brand-accent"
          style={{
            shadowColor: '#FA6545',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.25,
            shadowRadius: 16,
            elevation: 4,
          }}>
          <Text className="text-[15px] font-semibold text-white">Luyện việc này →</Text>
        </Pressable>
      </View>
    </View>
  );
}
