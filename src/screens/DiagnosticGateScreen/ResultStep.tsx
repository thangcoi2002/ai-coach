import React from 'react';
import { Pressable, Text, View } from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { RESULT_SKILLS, STARTING_SKILL } from '@/mock/result-skills.mock';
import type { DiagnosisResult } from '@/types/diagnostic.type';
import StepLayout from './StepLayout';

type Props = {
  isRevisit: boolean;
  /** e.g. "Từ khảo sát nhanh, 15 câu" — describes which method produced this result. */
  sourceLabel: string;
  /** Real result from the step just finished, or null for a method not wired to the backend yet (falls back to mock skills). */
  result: DiagnosisResult | null;
  /** Commits the measured level: "Vào ứng dụng" first time, "Cập nhật mức" on a revisit. */
  onSaveLevel: () => void;
  /** Revisit only: leave the stored level as it was. */
  onKeepLevel: () => void;
};

type SkillRow = {
  key: string;
  name: string;
  level: number;
  measured: boolean;
  note: string | null;
  isStart: boolean;
  /** Level from the previous diagnostic run, if any — drives the "Đo lại" delta line. */
  prev?: number;
};

/** Empty for a skill this run couldn't measure — there is no movement to report. */
function deltaLabel(measured: boolean, level: number, prev?: number): string {
  if (!measured) {
    return '';
  }
  if (prev == null) {
    return 'Mới có mức';
  }
  if (level > prev) {
    return 'Lên 1 mức';
  }
  if (level < prev) {
    return 'Xuống 1 mức';
  }
  return 'Giữ nguyên';
}

export default function ResultStep({
  isRevisit,
  sourceLabel,
  result,
  onSaveLevel,
  onKeepLevel,
}: Props) {
  const startingPoint = result?.startingPoint ?? STARTING_SKILL;

  const skillRows: SkillRow[] = result
    ? result.skills.map(skill => ({
        key: skill.id,
        name: skill.name,
        level: skill.level,
        measured: skill.measured,
        note: skill.note,
        isStart: skill.id === result.startingPoint.skillId,
      }))
    : RESULT_SKILLS.map(skill => ({
        key: skill.name,
        name: skill.name,
        level: skill.level,
        measured: skill.level > 0,
        note: skill.note,
        isStart: Boolean(skill.start),
        prev: skill.prev,
      }));

  return (
    <StepLayout badge={isRevisit ? 'Đo lại' : 'Bước 2 / 2'}>
      <Text className="mt-6 text-[11px] font-bold tracking-[0.08em] text-brand-accent">
        KẾT QUẢ CHẨN ĐOÁN
      </Text>
      <Text className="mt-2 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink">
        Điểm xuất phát: {startingPoint.name}, mức {startingPoint.level}
      </Text>
      <Text className="mt-1 text-[13px] font-medium text-brand-body">{sourceLabel}</Text>

      <Text className="mt-6 text-[11px] font-bold tracking-[0.08em] text-brand-body">
        MỨC HIỆN TẠI
      </Text>
      <View className="mt-2 overflow-hidden rounded-[20px] border border-brand-border">
        {skillRows.map((skill, index) => (
          <View
            key={skill.key}
            className={`gap-2.5 px-4 py-3.5 ${
              index < skillRows.length - 1 ? 'border-b border-brand-border' : ''
            }`}>
            <View className="flex-row items-center gap-2">
              <Text className="min-w-0 flex-1 text-[15px] font-bold text-brand-ink">
                {skill.name}
              </Text>
              {skill.isStart && (
                <View className="rounded-full bg-brand-accent px-2 py-[3px]">
                  <Text className="text-[11px] font-bold text-white">Bắt đầu từ đây</Text>
                </View>
              )}
              <Text className="text-[13px] font-bold text-brand-ink">
                {skill.measured ? `Mức ${skill.level}` : 'Chưa đo'}
              </Text>
            </View>
            <View className="flex-row gap-1">
              {[1, 2, 3, 4].map(band => (
                <View
                  key={band}
                  className={`h-1.5 flex-1 rounded-[3px] ${
                    band <= skill.level
                      ? skill.isStart
                        ? 'bg-brand-accent'
                        : 'bg-brand-ink'
                      : 'bg-brand-ink/12'
                  }`}
                />
              ))}
            </View>
            {skill.note && (
              <Text className="text-[13px] font-medium leading-[19px] text-brand-body">
                {skill.note}
              </Text>
            )}
            {isRevisit && (
              <View className="flex-row items-baseline gap-2">
                <Text className="text-[11px] font-semibold text-brand-body">
                  Lần trước: {skill.prev == null ? 'Chưa đo' : `Mức ${skill.prev}`}
                </Text>
                <Text className="text-[11px] font-bold text-brand-body">
                  {deltaLabel(skill.measured, skill.level, skill.prev)}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View className="flex-1" />
      {isRevisit ? (
        <View className="mt-5 gap-2.5 rounded-[20px] border border-brand-border bg-brand-surface p-4">
          <Text className="text-[15px] font-bold text-brand-ink">
            Dùng kết quả này làm mức hiện tại?
          </Text>
          <Text className="text-[13px] font-medium leading-[19px] text-brand-body">
            Lộ trình và buổi tiếp theo sẽ tính từ mức mới. Kết quả cũ vẫn nằm trong Báo cáo đã có.
          </Text>
          <View className="flex-row gap-2">
            <Pressable
              accessibilityRole="button"
              onPress={onKeepLevel}
              className="flex-1 items-center rounded-2xl border-[1.5px] border-brand-ink/25 p-[11px]">
              <Text className="text-[13px] font-bold text-brand-ink">Giữ mức cũ</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onSaveLevel}
              className="flex-1 items-center rounded-full bg-brand-accent p-[11px]">
              <Text className="text-[13px] font-bold text-white">Cập nhật mức</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="mt-5">
          <PrimaryButton label="Vào ứng dụng" onPress={onSaveLevel} />
        </View>
      )}
    </StepLayout>
  );
}
