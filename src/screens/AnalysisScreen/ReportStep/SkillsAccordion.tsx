import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import type { AnalysisSkill } from '@/types/analysis.type';
import { brand } from '@/theme/colors';

type Props = {
  skills: AnalysisSkill[];
  /** Jumps to the "Luyện lại" tab and opens that moment there. */
  onOpenMoment: (momentIndex: number) => void;
};

/** "Những mặt được thể hiện" — one accordion row per skill the conversation touched. */
export default function SkillsAccordion({ skills, onOpenMoment }: Props) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <View className="mt-3.5">
      <Text className="text-[19px] font-semibold tracking-[-0.02em] text-brand-ink">
        Những mặt được thể hiện
      </Text>
      <Text className="mt-1 text-[13px] text-brand-mute">
        Chạm để xem vì sao và nơi nó xuất hiện.
      </Text>
      <View className="mt-2 gap-2">
        {skills.map((skill, index) => {
          const open = openIndex === index;
          const scored = skill.score !== null;
          return (
            <View
              key={skill.key}
              className="overflow-hidden rounded-[18px] border border-black/[0.06] bg-brand-surface">
              <Pressable
                accessibilityRole="button"
                onPress={() => setOpenIndex(current => (current === index ? -1 : index))}
                className="p-[14px] px-[18px]">
                <View className="flex-row items-center gap-2">
                  <View className="min-w-0 flex-1 flex-row flex-wrap items-baseline gap-1.5">
                    <Text className="text-[15px] font-semibold text-brand-ink">{skill.name}</Text>
                    {skill.sub && <Text className="text-xs text-brand-mute">{skill.sub}</Text>}
                  </View>
                  <Text
                    className="text-[13px] font-semibold tabular-nums"
                    style={{ color: scored ? brand.ink : brand.placeholder }}>
                    {scored ? `${skill.score!.toFixed(1)} / 10` : 'Chưa có đủ tình huống để nhận xét'}
                  </Text>
                  {open ? (
                    <ChevronUp size={14} color={brand.placeholder} />
                  ) : (
                    <ChevronDown size={14} color={brand.placeholder} />
                  )}
                </View>
                {scored && (
                  <View className="mt-2.5 h-1 overflow-hidden rounded-full bg-black/[0.07]">
                    <View
                      className="h-full rounded-full bg-brand-accent"
                      style={{ width: `${skill.score! * 10}%` }}
                    />
                  </View>
                )}
                <Text className="mt-2.5 text-[14px] leading-[21px] text-brand-prose">
                  {skill.text}
                </Text>
              </Pressable>
              {open && (
                <View className="gap-3 px-[18px] pb-4">
                  {skill.why && (
                    <View className="rounded-[14px] bg-brand-page p-3.5">
                      <Text className="text-[11px] font-bold tracking-[0.1em] text-brand-mute">
                        VÌ SAO
                      </Text>
                      <Text className="mt-1 text-[14px] leading-[21px] text-brand-ink">
                        {skill.why}
                      </Text>
                    </View>
                  )}
                  {!scored && (
                    <Text className="text-[13px] leading-[19.5px] text-brand-mute">
                      Cuộc trò chuyện này không tạo ra tình huống để thể hiện mặt này, nên chưa có
                      nhận xét. Đây không phải điểm thấp và không tính vào điểm chung.
                    </Text>
                  )}
                  {scored && skill.relatedMoments && skill.relatedMoments.length > 0 && (
                    <View className="flex-row flex-wrap items-center gap-1.5">
                      <Text className="mr-0.5 text-xs text-brand-mute">Thể hiện ở</Text>
                      {skill.relatedMoments.map(momentIndex => (
                        <Pressable
                          key={momentIndex}
                          accessibilityRole="button"
                          onPress={() => onOpenMoment(momentIndex)}
                          className="min-h-[30px] justify-center rounded-full border border-black/[0.14] px-[11px]">
                          <Text className="text-xs font-semibold text-brand-ink">
                            Khoảnh khắc 0{momentIndex + 1}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
