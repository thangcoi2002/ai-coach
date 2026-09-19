import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronDown, ChevronUp, Mic } from 'lucide-react-native';
import type { AnalysisMoment } from '@/types/analysis.type';
import { brand } from '@/theme/colors';
import AvatarBadge from './AvatarBadge';

type Props = {
  moments: AnalysisMoment[];
  themName: string;
  openIndex: number;
  onToggle: (index: number) => void;
  onRehearse: (momentIndex: number) => void;
};

/** The open card is outlined in accent; the closed ones keep a plain hairline. */
const BORDER_COLORS = { open: brand.accentOutline, closed: 'rgba(15,23,42,0.06)' };

/** "Khoảnh khắc đáng xem lại" — page1's list of turning points, each opening into a
 * "rehearse it differently" prompt that hands off to the redo step. */
export default function MomentsAccordion({
  moments,
  themName,
  openIndex,
  onToggle,
  onRehearse,
}: Props) {
  return (
    <View>
      <Text className="text-[19px] font-semibold tracking-[-0.02em] text-brand-ink">
        Khoảnh khắc đáng xem lại
      </Text>
      <Text className="mt-1 text-[13px] text-brand-mute">
        Những chỗ cuộc trò chuyện đổi hướng. Chạm để mở.
      </Text>
      <View className="mt-2 gap-2.5">
        {moments.map((moment, index) => {
          const open = openIndex === index;
          return (
            <View
              key={index}
              className="overflow-hidden rounded-[20px] border bg-brand-surface"
              style={{ borderColor: open ? BORDER_COLORS.open : BORDER_COLORS.closed }}>
              <Pressable
                accessibilityRole="button"
                onPress={() => onToggle(index)}
                className="p-[18px]">
                <View className="flex-row items-center gap-2">
                  <Text className="text-[11px] font-bold tracking-[0.12em] tabular-nums text-brand-placeholder">
                    0{index + 1}
                  </Text>
                  {moment.kick && (
                    <View className="rounded-full bg-brand-accent-tint px-2">
                      <Text className="text-[11px] font-bold text-brand-accent-deep">
                        {moment.kick}
                      </Text>
                    </View>
                  )}
                  <View className="flex-1" />
                  {open ? (
                    <ChevronUp size={14} color={brand.placeholder} />
                  ) : (
                    <ChevronDown size={14} color={brand.placeholder} />
                  )}
                </View>
                <Text className="mt-2 text-[16px] font-semibold leading-[21.6px] tracking-[-0.01em] text-brand-ink">
                  {moment.head}
                </Text>
                <View className="mt-2.5 flex-row items-start gap-2">
                  <AvatarBadge initial="B" tone="me" size={22} />
                  <Text className="min-w-0 flex-1 text-[14px] leading-[21px] text-brand-prose">
                    “{moment.you}”
                  </Text>
                </View>
              </Pressable>
              {open && (
                <View className="gap-3.5 px-[18px] pb-[18px]">
                  <View className="flex-row items-start gap-2 rounded-[14px] bg-brand-page p-3.5">
                    <AvatarBadge initial={themName.charAt(0)} tone="them" size={22} />
                    <View className="min-w-0 flex-1">
                      <Text className="text-[11px] font-bold text-brand-mute">
                        {themName} phản ứng
                      </Text>
                      <Text className="mt-0.5 text-[14px] leading-[21px] text-brand-prose">
                        “{moment.react}”
                      </Text>
                    </View>
                  </View>
                  <View className="gap-1.5">
                    <View className="flex-row items-center gap-2">
                      <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-brand-ink">
                        <View className="h-[7px] w-[7px] rounded-full bg-brand-accent" />
                      </View>
                      <Text className="text-[11px] font-bold tracking-[0.1em] text-brand-ink">
                        ĐIỀU THỰC SỰ XẢY RA
                      </Text>
                    </View>
                    <Text className="text-[15px] font-medium leading-[23.25px] text-brand-ink">
                      {moment.note}
                    </Text>
                  </View>
                  <View className="flex-row flex-wrap items-center gap-1.5">
                    <Text className="mr-0.5 text-xs text-brand-mute">Liên quan đến</Text>
                    {moment.skills.map(name => (
                      <View key={name} className="min-h-7 justify-center rounded-full bg-brand-page px-2.5">
                        <Text className="text-xs font-semibold text-[#475568]">{name}</Text>
                      </View>
                    ))}
                  </View>
                  <View className="rounded-[18px] bg-brand-ink p-[18px]">
                    <Text className="text-[11px] font-bold tracking-[0.12em] text-white/55">
                      NÓI KHÁC ĐI
                    </Text>
                    <Text className="mt-2 text-[16px] font-semibold leading-[21.6px] tracking-[-0.01em] text-white">
                      Nếu quay lại khoảnh khắc này, bây giờ bạn sẽ nói gì?
                    </Text>
                    <Text className="mt-1.5 text-[13px] leading-[19.5px] text-white/[0.65]">
                      Bạn thử trước, bằng giọng nói hoặc gõ. Gợi ý mở sau khi bạn đã nói.
                    </Text>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => onRehearse(index)}
                      className="mt-3.5 min-h-12 flex-row items-center justify-center gap-2 rounded-full bg-brand-accent">
                      <Mic size={14} color={brand.surface} />
                      <Text className="text-[14px] font-semibold text-white">Thử nói lại</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
