import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { GATE_SKILLS, LOCKED_SKILLS } from '@/mock/gate-skills.mock';
import { ROLE_SCENARIOS, ROLEPLAY_DURATION } from '@/mock/role-scenarios.mock';
import type { MethodStepProps } from '@/types/diagnostic.type';
import StepLayout from './StepLayout';

export default function RoleStep({ onBack, onNext }: MethodStepProps) {
  const [skillIndex, setSkillIndex] = useState(0);
  const scenario = ROLE_SCENARIOS[skillIndex];
  const finish = () => onNext('Từ diễn tập tình huống');

  return (
    <StepLayout badge="Cách 4 · Diễn tập" onBack={onBack}>
      <Text className="mt-3 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink">
        Diễn tập một tình huống để đo mức hiện tại
      </Text>

      <Text className="mt-5 text-[13px] font-bold text-brand-body">
        Kỹ năng trong chương trình của bạn
      </Text>
      <View className="mt-2 gap-2">
        {GATE_SKILLS.map((skill, index) => {
          const active = skillIndex === index;
          return (
            <Pressable
              key={skill}
              accessibilityRole="button"
              onPress={() => setSkillIndex(index)}
              className={`flex-row items-center gap-2.5 rounded-2xl border-[1.5px] p-3.5 ${
                active
                  ? 'border-brand-accent bg-brand-card'
                  : 'border-brand-ink/12 bg-brand-surface'
              }`}>
              <View
                className={`h-4 w-4 rounded-full border-[1.5px] ${
                  active ? 'border-brand-accent bg-brand-accent' : 'border-brand-ink/30'
                }`}
              />
              <Text className="min-w-0 flex-1 text-[15px] font-bold text-brand-ink">{skill}</Text>
              <Text className="text-[11px] font-bold text-brand-ink/45">{ROLEPLAY_DURATION}</Text>
            </Pressable>
          );
        })}
        {LOCKED_SKILLS.map(locked => (
          <View
            key={locked}
            className="flex-row items-center gap-2.5 rounded-2xl border-[1.5px] border-dashed border-brand-ink/18 p-3.5">
            <Text className="min-w-0 flex-1 text-[15px] font-bold text-brand-ink/45">{locked}</Text>
            <Text className="text-[11px] font-bold text-brand-ink/45">Chưa mở</Text>
          </View>
        ))}
      </View>

      <View className="mt-5 gap-3 rounded-[20px] border border-brand-border bg-brand-surface p-[18px]">
        <Text className="text-[11px] font-bold tracking-[0.08em] text-brand-body">
          TÌNH HUỐNG ĐO
        </Text>
        <View className="flex-row items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-brand-accent-tint">
            <Text className="text-[15px] font-bold text-brand-accent">{scenario.initial}</Text>
          </View>
          <View className="min-w-0 flex-1 gap-1.5">
            <Text className="text-[15px] font-bold leading-[19px] text-brand-ink">
              {scenario.scenario}
            </Text>
            <View className="flex-row flex-wrap gap-1.5">
              <View className="rounded-full bg-brand-card px-2.5 py-1">
                <Text className="text-[11px] font-bold text-brand-ink">Giọng nói</Text>
              </View>
              <View className="rounded-full border border-brand-ink/16 px-2.5 py-1">
                <Text className="text-[11px] font-bold text-brand-ink">{scenario.person}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-1" />
      <View className="mt-5 gap-2.5">
        {/* Voice roleplay rooms aren't built yet — both actions score the diagnostic from this scenario directly. */}
        <PrimaryButton label={`Bắt đầu diễn tập · ${ROLEPLAY_DURATION}`} onPress={finish} />
        <Pressable accessibilityRole="button" onPress={finish} className="items-center py-1">
          <Text className="text-[13px] font-semibold text-brand-body">
            Bản demo: xem thẳng kết quả chẩn đoán
          </Text>
        </Pressable>
      </View>
    </StepLayout>
  );
}
