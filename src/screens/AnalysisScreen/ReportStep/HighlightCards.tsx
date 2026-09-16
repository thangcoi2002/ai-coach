import React from 'react';
import { Text, View } from 'react-native';
import { Check, TrendingUp } from 'lucide-react-native';
import { cardClassName, cardShadow } from '@/theme/card';
import type { AnalysisReport } from '@/types/analysis.type';

type Props = { report: AnalysisReport };

/** "Điều gì nổi bật" — the one strength and one growth area pulled out of the report. */
export default function HighlightCards({ report }: Props) {
  return (
    <View className="mt-3.5 flex-row gap-2.5">
      <View className={`flex-1 gap-2.5 p-4 pb-[18px] ${cardClassName}`} style={cardShadow}>
        <View className="h-7 w-7 items-center justify-center rounded-[9px] bg-[#E4F2EC]">
          <Check size={14} color="#2F9E6B" strokeWidth={2.5} />
        </View>
        <Text className="text-[11px] font-bold tracking-[0.1em] text-[#64748B]">
          ĐIỀU BẠN LÀM TỐT
        </Text>
        <Text className="text-[13px] font-semibold text-[#2F9E6B]">{report.strengthSkill}</Text>
        <Text className="text-[14px] font-medium leading-[21px] text-brand-ink">
          {report.strength}
        </Text>
      </View>
      <View className={`flex-1 gap-2.5 p-4 pb-[18px] ${cardClassName}`} style={cardShadow}>
        <View className="h-7 w-7 items-center justify-center rounded-[9px] bg-[#FFE5DD]">
          <TrendingUp size={14} color="#D24C2E" strokeWidth={2.5} />
        </View>
        <Text className="text-[11px] font-bold tracking-[0.1em] text-[#64748B]">
          CƠ HỘI LỚN NHẤT
        </Text>
        <Text className="text-[13px] font-semibold text-[#D24C2E]">{report.growthSkill}</Text>
        <Text className="text-[14px] font-medium leading-[21px] text-brand-ink">
          {report.growth}
        </Text>
      </View>
    </View>
  );
}
