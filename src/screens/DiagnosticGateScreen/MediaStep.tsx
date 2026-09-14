import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Mic, Square, Upload } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { useThemeColors } from '@/context/ThemeProvider';
import { GATE_SKILLS } from '@/mock/gate-skills.mock';
import { MEDIA_UPLOAD } from '@/mock/media-upload.mock';
import type { MethodStepProps } from '@/types/diagnostic.type';
import StepLayout from './StepLayout';

const RELATIONSHIPS = ['Sếp trực tiếp', 'Đồng nghiệp', 'Nhân viên của tôi', 'Khách hàng'];

export default function MediaStep({ onBack, onNext }: MethodStepProps) {
  const colors = useThemeColors();
  const [relationship, setRelationship] = useState(RELATIONSHIPS[2]);
  const [skills, setSkills] = useState<Set<string>>(new Set());

  const toggleSkill = (skill: string) => {
    setSkills(current => {
      const next = new Set(current);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  return (
    <StepLayout badge="Cách 3 · Ghi âm hoặc video" onBack={onBack}>
      <Text className="mt-3 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink dark:text-brandDark-ink">
        Gửi một cuộc trò chuyện thật
      </Text>

      <View className="mt-4 flex-row gap-2.5">
        <View className="flex-1 items-center rounded-2xl border-[1.5px] border-dashed border-brand-ink/25 p-5 dark:border-brandDark-ink/25">
          <View className="h-[38px] w-[38px] items-center justify-center rounded-2xl bg-brand-accent-tint dark:bg-brandDark-accent-tint">
            <Upload size={20} color={colors.accent} />
          </View>
          <Text className="mt-2.5 text-[15px] font-bold text-brand-ink dark:text-brandDark-ink">
            Tải tệp lên
          </Text>
          <Text className="text-[13px] font-medium text-brand-body dark:text-brandDark-body">
            Video hoặc âm thanh
          </Text>
        </View>
        <View className="flex-1 items-center rounded-2xl border-[1.5px] border-dashed border-brand-ink/25 p-5 dark:border-brandDark-ink/25">
          <View className="h-[38px] w-[38px] items-center justify-center rounded-2xl bg-brand-accent-tint dark:bg-brandDark-accent-tint">
            <Mic size={20} color={colors.accent} />
          </View>
          <Text className="mt-2.5 text-[15px] font-bold text-brand-ink dark:text-brandDark-ink">
            Ghi ngay
          </Text>
          <Text className="text-[13px] font-medium text-brand-body dark:text-brandDark-body">
            Tối đa 10 phút
          </Text>
        </View>
      </View>

      <View className="mt-3 rounded-2xl bg-brand-card p-4 dark:bg-brandDark-card">
        <View className="flex-row items-center justify-between gap-2.5">
          <Text className="text-[15px] font-bold text-brand-ink dark:text-brandDark-ink">
            {MEDIA_UPLOAD.fileName}
          </Text>
          <Text className="text-[13px] font-semibold text-brand-body dark:text-brandDark-body">
            {MEDIA_UPLOAD.duration}
          </Text>
        </View>
        <View className="mt-2.5 h-1.5 rounded-[3px] bg-brand-ink/12 dark:bg-brandDark-ink/12">
          <View className="h-full w-full rounded-[3px] bg-brand-accent dark:bg-brandDark-accent" />
        </View>
        <Text className="mt-1.5 text-[13px] font-medium text-brand-body dark:text-brandDark-body">
          {MEDIA_UPLOAD.note}
        </Text>
      </View>

      <Text className="mt-5 text-[13px] font-bold text-brand-body dark:text-brandDark-body">
        Bạn đang nói chuyện với ai?
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {RELATIONSHIPS.map(option => {
          const active = relationship === option;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              onPress={() => setRelationship(option)}
              className={`grow basis-[47%] rounded-2xl border p-3.5 ${
                active
                  ? 'border-brand-accent bg-brand-accent dark:border-brandDark-accent dark:bg-brandDark-accent'
                  : 'border-brand-ink/14 bg-brand-surface dark:border-brandDark-ink/14 dark:bg-brandDark-surface'
              }`}>
              <Text
                className={`text-[13px] font-semibold ${
                  active ? 'text-white' : 'text-brand-ink dark:text-brandDark-ink'
                }`}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text className="mt-5 text-[13px] font-bold text-brand-body dark:text-brandDark-body">
        Đọc theo kỹ năng nào trong chương trình?
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-1.5">
        {GATE_SKILLS.map(skill => {
          const active = skills.has(skill);
          return (
            <Pressable
              key={skill}
              accessibilityRole="button"
              onPress={() => toggleSkill(skill)}
              className={`rounded-full border px-3 py-2 ${
                active
                  ? 'border-brand-ink bg-brand-ink dark:border-brandDark-ink dark:bg-brandDark-ink'
                  : 'border-brand-ink/14 bg-brand-surface dark:border-brandDark-ink/14 dark:bg-brandDark-surface'
              }`}>
              <Text
                className={`text-[13px] font-bold ${
                  active
                    ? 'text-white dark:text-brandDark-page'
                    : 'text-brand-ink dark:text-brandDark-ink'
                }`}>
                {skill}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-4 flex-row items-center gap-2">
        <Square size={13} color={`${colors.ink}80`} strokeWidth={1.5} />
        <Text className="text-[13px] font-semibold text-brand-body dark:text-brandDark-body">
          Chỉ bạn xem được bản ghi này.
        </Text>
      </View>

      <View className="flex-1" />
      <View className="mt-5">
        <PrimaryButton
          label="Phân tích"
          onPress={() => onNext('Từ bản ghi một cuộc trò chuyện thật')}
        />
      </View>
    </StepLayout>
  );
}
