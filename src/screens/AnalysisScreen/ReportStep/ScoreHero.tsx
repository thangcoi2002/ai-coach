import React from 'react';
import { Text, View } from 'react-native';
import type { AnalysisReport } from '@/types/analysis.type';
import AvatarBadge from './AvatarBadge';

type Props = { report: AnalysisReport };

/**
 * The design's hero card is a decorative diffuse gradient with two blurred colour
 * blobs behind this content; there's no gradient primitive already in use elsewhere
 * in the app, so this keeps the card's content and gets a flat warm tint instead of
 * porting a one-off SVG gradient for a purely decorative background.
 */
export default function ScoreHero({ report }: Props) {
  const segments = Array.from({ length: 10 }, (_, i) => {
    const filled = report.score - i;
    const width = filled >= 1 ? '100%' : filled > 0 ? `${Math.round(filled * 100)}%` : '0%';
    return width;
  });

  return (
    <View className="overflow-hidden rounded-[28px] border border-black/5 bg-[#FBF3EE] px-6 pb-[26px] pt-7">
      <Text className="text-[11px] font-bold tracking-[0.12em] text-brand-accent-deep">
        CUỘC TRÒ CHUYỆN NÀY
      </Text>
      <View className="mt-3.5 flex-row items-baseline gap-2">
        <Text className="text-[40px] font-bold tracking-[-0.03em] text-brand-ink">
          {report.score.toFixed(1)}
        </Text>
        <Text className="text-[18px] font-semibold text-brand-placeholder">/ 10</Text>
      </View>
      <View className="mt-5 flex-row gap-1">
        {segments.map((width, index) => (
          <View key={index} className="h-2 flex-1 overflow-hidden rounded-full bg-black/[0.08]">
            <View className="h-full rounded-full bg-brand-accent" style={{ width }} />
          </View>
        ))}
      </View>
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="text-[11px] font-semibold text-brand-placeholder">
          Mức luyện tập hiện tại
        </Text>
        <Text className="text-[11px] font-semibold text-brand-placeholder">
          {report.score.toFixed(1).replace('.', ',')} trên 10
        </Text>
      </View>
      <Text className="mt-5 text-[17px] font-medium leading-[24.65px] tracking-[-0.01em] text-brand-prose">
        {report.overview}
      </Text>
      <View className="mt-5 flex-row items-center gap-2.5 border-t border-black/[0.08] pt-4">
        <AvatarBadge initial={report.themInitial} size={32} tone="them" />
        <View className="min-w-0 flex-1">
          <Text className="text-[13px] font-semibold leading-[17.5px] text-brand-ink">
            {report.title}
          </Text>
          <Text className="mt-0.5 text-xs text-brand-mute">{report.meta}</Text>
        </View>
      </View>
    </View>
  );
}
