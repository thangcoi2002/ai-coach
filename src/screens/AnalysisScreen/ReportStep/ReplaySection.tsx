import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { AnalysisReport } from '@/types/analysis.type';
import { cardClassName, cardShadow } from '@/theme/card';
import AvatarBadge from './AvatarBadge';

type Props = {
  report: AnalysisReport;
  onOpenMoment: (momentIndex: number) => void;
};

/** "Diễn biến" — the brief summary, expandable into the full turn-by-turn replay. */
export default function ReplaySection({ report, onOpenMoment }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="mt-3.5">
      <Text className="text-[19px] font-semibold tracking-[-0.02em] text-brand-ink">Diễn biến</Text>
      <Text className="mt-1 text-[13px] text-[#64748B]">Chuyện gì đã xảy ra, thuần sự kiện.</Text>
      <View className={`mt-2 p-[18px] ${cardClassName}`} style={cardShadow}>
        <View className="flex-row items-start gap-2.5">
          <View className="flex-row">
            <AvatarBadge initial="B" tone="me" size={26} className="border-2 border-brand-surface" />
            <AvatarBadge
              initial={report.themInitial}
              tone="them"
              size={26}
              className="-ml-2 border-2 border-brand-surface"
            />
          </View>
          <Text className="min-w-0 flex-1 text-[15px] leading-6 text-[#1E293B]">{report.brief}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => setExpanded(current => !current)}
          className="mt-3.5 min-h-11 items-center justify-center border-t border-black/[0.08]">
          <Text className="text-[13px] font-semibold text-[#D24C2E]">
            {expanded ? 'Thu gọn lời thoại' : 'Xem toàn bộ lời thoại →'}
          </Text>
        </Pressable>
        {expanded && (
          <View className="pt-2">
            {report.replay.map((entry, index) => {
              if (entry.kind === 'stage') {
                return (
                  <View
                    key={index}
                    className={`flex-row items-center gap-2.5 ${index ? 'pt-1.5' : ''} pb-2.5`}>
                    <View className="mx-1.5 h-2 w-2 rounded-full bg-brand-ink" />
                    <Text className="text-[11px] font-bold tracking-[0.12em] text-brand-ink">
                      {entry.label}
                    </Text>
                    <View className="h-px flex-1 bg-black/[0.08]" />
                  </View>
                );
              }
              if (entry.kind === 'turn') {
                return (
                  <View key={index} className="flex-row items-start gap-2.5 pb-3">
                    <AvatarBadge
                      initial={entry.isMe ? 'B' : report.themInitial}
                      tone={entry.isMe ? 'me' : 'them'}
                      size={20}
                    />
                    <View className="min-w-0 flex-1 pb-0.5">
                      <Text
                        className="text-[11px] font-bold"
                        style={{ color: entry.isMe ? '#B9553B' : '#64748B' }}>
                        {entry.who}
                      </Text>
                      <Text
                        className={`mt-0.5 text-[14px] leading-[21px] text-[#1E293B] ${
                          entry.isMe ? 'font-medium' : 'font-normal'
                        }`}>
                        {entry.text}
                      </Text>
                    </View>
                  </View>
                );
              }
              if (entry.kind === 'shift') {
                return (
                  <Pressable
                    key={index}
                    accessibilityRole="button"
                    onPress={() => onOpenMoment(entry.momentIndex)}
                    className="mb-3.5 flex-row items-center gap-2.5 rounded-2xl bg-brand-accent-tint p-3">
                    <Text className="min-w-0 flex-1 text-xs font-semibold text-[#B9553B]">
                      {entry.label}
                    </Text>
                    <Text className="text-xs font-semibold text-[#D24C2E]">Xem ›</Text>
                  </Pressable>
                );
              }
              return (
                <View key={index} className="mb-3 flex-row items-start gap-2.5">
                  <View className="h-5 w-5 items-center justify-center rounded-full bg-brand-ink">
                    <Text className="text-[10px] font-bold text-white">✓</Text>
                  </View>
                  <Text className="flex-1 text-[14px] font-semibold leading-[20.3px] text-brand-ink">
                    {entry.text}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}
