import React, { useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import { Upload } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { useThemeColors } from '@/context/ThemeProvider';
import { GATE_SKILLS } from '@/mock/gate-skills.mock';
import { REPORT_UPLOADS } from '@/mock/report-upload.mock';
import type { MethodStepProps, ReportKind } from '@/types/diagnostic.type';
import StepLayout from './StepLayout';

export default function ReportStep({ onBack, onNext }: MethodStepProps) {
  const colors = useThemeColors();
  const [kind, setKind] = useState<ReportKind>('seli');
  const report = REPORT_UPLOADS[kind];

  return (
    <StepLayout badge="Cách 1 · Báo cáo" onBack={onBack}>
      <Text className="mt-3 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink dark:text-brandDark-ink">
        Nộp báo cáo đánh giá
      </Text>

      <View className="mt-4 flex-row gap-2">
        {(['seli', '360'] as const).map(option => {
          const active = kind === option;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              onPress={() => setKind(option)}
              className={`flex-1 rounded-2xl border p-3.5 ${
                active
                  ? 'border-brand-ink bg-brand-ink dark:border-brandDark-ink dark:bg-brandDark-ink'
                  : 'border-brand-ink/14 bg-brand-surface dark:border-brandDark-ink/14 dark:bg-brandDark-surface'
              }`}>
              <Text
                className={`text-center text-[13px] font-bold ${
                  active
                    ? 'text-white dark:text-brandDark-page'
                    : 'text-brand-ink dark:text-brandDark-ink'
                }`}>
                {option === 'seli' ? 'Báo cáo SELI' : 'Báo cáo 360'}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-3 items-center rounded-2xl border-[1.5px] border-dashed border-brand-ink/25 p-5 dark:border-brandDark-ink/25">
        <View className="h-[38px] w-[38px] items-center justify-center rounded-2xl bg-brand-accent-tint dark:bg-brandDark-accent-tint">
          <Upload size={20} color={colors.accent} />
        </View>
        <Text className="mt-2.5 text-[15px] font-bold text-brand-ink dark:text-brandDark-ink">
          Tải tệp lên
        </Text>
        <Text className="text-[13px] font-medium text-brand-body dark:text-brandDark-body">
          PDF hoặc ảnh chụp từng trang
        </Text>
      </View>

      <View className="mt-3 rounded-2xl bg-brand-card p-4 dark:bg-brandDark-card">
        <View className="flex-row items-center justify-between gap-2.5">
          <Text className="text-[15px] font-bold text-brand-ink dark:text-brandDark-ink">
            {report.fileName}
          </Text>
          <Text className="text-[13px] font-semibold text-brand-body dark:text-brandDark-body">
            {report.fileSize}
          </Text>
        </View>
        <View className="mt-2.5 h-1.5 rounded-[3px] bg-brand-ink/12 dark:bg-brandDark-ink/12">
          <View className="h-full w-full rounded-[3px] bg-brand-accent dark:bg-brandDark-accent" />
        </View>
        <Text className="mt-1.5 text-[13px] font-medium text-brand-body dark:text-brandDark-body">
          Đã đọc xong.
        </Text>
      </View>

      <Text className="mt-5 text-[11px] font-bold tracking-[0.08em] text-brand-body dark:text-brandDark-body">
        ĐỌC ĐƯỢC TỪ BÁO CÁO
      </Text>
      <View className="mt-2 overflow-hidden rounded-[20px] border border-brand-border dark:border-brandDark-border">
        {GATE_SKILLS.map((skill, index) => (
          <View
            key={skill}
            className={`flex-row items-center gap-3 px-4 py-3.5 ${
              index < GATE_SKILLS.length - 1
                ? 'border-b border-brand-border dark:border-brandDark-border'
                : ''
            }`}>
            <View className="min-w-0 flex-1">
              <Text className="text-[15px] font-bold text-brand-ink dark:text-brandDark-ink">
                {skill}
              </Text>
              <Text className="mt-0.5 text-[11px] font-medium text-brand-body/80 dark:text-brandDark-body/80">
                {report.sourceLabel}
              </Text>
            </View>
            <Text className="text-[15px] font-bold text-brand-ink dark:text-brandDark-ink">
              {report.scores[index]}
            </Text>
          </View>
        ))}
      </View>

      <View className="flex-1" />
      <View className="mt-5">
        <PrimaryButton label="Dùng kết quả này" onPress={() => onNext(report.sourceLabel)} />
      </View>
    </StepLayout>
  );
}
