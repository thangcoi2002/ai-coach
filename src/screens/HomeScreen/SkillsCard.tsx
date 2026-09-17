import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSkills } from '@/context/SkillsProvider';
import { cardShadow } from '@/theme/card';
import { brand } from '@/theme/colors';
import type { Skill } from '@/types/skill.type';
import { getSkillPresentation } from './skillPresentation';

/** "Đang mở" is the section's whole point — a locked skill has nothing to show yet. */
function useOpenSkills() {
  const { skills, isLoading } = useSkills();
  return { openSkills: skills?.filter(skill => !skill.locked) ?? null, isLoading };
}

/** Null for an open-but-unmeasured skill — an open skill isn't guaranteed to have run through diagnosis yet. */
function measuredView(skill: Skill): { score: string; progress: number } | null {
  if (skill.currentScore == null || skill.currentLevel == null) {
    return null;
  }
  const maxScore =
    skill.levels.length > 0
      ? Math.max(...skill.levels.map(band => parseFloat(band.scoreMax)))
      : 10;
  const progress = Math.min(Math.max(parseFloat(skill.currentScore) / maxScore, 0), 1);
  return { score: skill.currentScore, progress };
}

export default function SkillsCard() {
  const { openSkills, isLoading } = useOpenSkills();

  return (
    <View>
      <View className="flex-row items-baseline justify-between">
        <Text className="text-[17px] font-semibold text-brand-ink">Kỹ năng đang mở</Text>
        <Text className="text-xs text-brand-body">{openSkills?.length ?? 0} kỹ năng</Text>
      </View>
      <View
        className="mt-3 rounded-[20px] border border-brand-border bg-brand-surface px-4"
        style={cardShadow}>
        {isLoading && !openSkills && (
          <View className="items-center py-6">
            <ActivityIndicator size="small" color={brand.accent} />
          </View>
        )}
        {!isLoading && !openSkills && (
          <Text className="py-6 text-center text-[13px] text-brand-body">
            Không tải được danh sách kỹ năng.
          </Text>
        )}
        {openSkills?.map((skill, index) => {
          const presentation = getSkillPresentation(skill.code);
          const view = measuredView(skill);
          const iconColor = view ? presentation.iconColor : brand.body;

          return (
            <View
              key={skill.id}
              className={`flex-row items-center gap-3 py-[13px] ${
                index < openSkills.length - 1 ? 'border-b border-brand-border' : ''
              }`}>
              <View
                className="h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: presentation.iconBg }}>
                <presentation.Icon size={18} color={iconColor} />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="text-[15px] font-semibold text-brand-ink">{skill.name}</Text>
                {view ? (
                  <View className="mt-1.5 h-[5px] rounded-[3px] bg-[#EAEAEA]">
                    <View
                      className="h-full rounded-[3px]"
                      style={{
                        width: `${view.progress * 100}%`,
                        backgroundColor: presentation.iconColor,
                      }}
                    />
                  </View>
                ) : (
                  <Text className="mt-0.5 text-xs text-brand-body">
                    Chưa đo · gửi bản ghi hoặc diễn tập
                  </Text>
                )}
              </View>
              <Text
                className="text-[15px] font-semibold"
                style={{ color: view ? brand.ink : brand.divider }}>
                {view ? view.score : '—'}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
