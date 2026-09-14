import React from 'react';
import { Text, View } from 'react-native';
import { HOME_SKILLS } from '@/mock/home-skills.mock';
import { cardShadow } from '@/theme/card';
import { brand } from '@/theme/colors';

export default function SkillsCard() {
  return (
    <View>
      <View className="flex-row items-baseline justify-between">
        <Text className="text-[17px] font-semibold text-brand-ink">Kỹ năng đang mở</Text>
        <Text className="text-xs text-brand-body">{HOME_SKILLS.length} kỹ năng</Text>
      </View>
      <View
        className="mt-3 rounded-[20px] border border-brand-border bg-brand-surface px-4"
        style={cardShadow}>
        {HOME_SKILLS.map((skill, index) => {
          const iconColor = skill.measured ? skill.iconColor : brand.body;
          return (
            <View
              key={skill.key}
              className={`flex-row items-center gap-3 py-[13px] ${
                index < HOME_SKILLS.length - 1 ? 'border-b border-brand-border' : ''
              }`}>
              <View
                className="h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: skill.iconBg }}>
                <skill.Icon size={18} color={iconColor} />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="text-[15px] font-semibold text-brand-ink">{skill.name}</Text>
                {skill.measured ? (
                  <View className="mt-1.5 h-[5px] rounded-[3px] bg-[#EAEAEA]">
                    <View
                      className="h-full rounded-[3px]"
                      style={{
                        width: `${skill.progress * 100}%`,
                        backgroundColor: skill.iconColor,
                      }}
                    />
                  </View>
                ) : (
                  <Text className="mt-0.5 text-xs text-brand-body">{skill.hint}</Text>
                )}
              </View>
              <Text
                className="text-[15px] font-semibold"
                style={{ color: skill.measured ? brand.ink : brand.divider }}>
                {skill.measured ? skill.score : '—'}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
