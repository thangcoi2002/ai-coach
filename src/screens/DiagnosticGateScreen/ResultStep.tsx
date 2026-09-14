import React from 'react';
import { Pressable, Text, View } from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { RESULT_SKILLS, STARTING_SKILL } from '@/mock/result-skills.mock';
import StepLayout from './StepLayout';

type Props = {
  isRevisit: boolean;
  /** e.g. "Từ khảo sát nhanh, 15 câu" — describes which method produced this result. */
  sourceLabel: string;
  /** Saves the measured level onto the user: "Vào ứng dụng" first time, "Cập nhật mức" on a revisit. */
  onSaveLevel: () => void;
  /** Revisit only: leave the stored level as it was. */
  onKeepLevel: () => void;
  /** True while onSaveLevel is writing, so the CTAs can't fire twice. */
  isSaving: boolean;
  /** Shown above the CTAs when saving failed, so the user can retry in place. */
  error: string | null;
};

/** Empty for a skill this run couldn't measure — there is no movement to report. */
function deltaLabel(level: number, prev?: number): string {
  if (!level) {
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
  onSaveLevel,
  onKeepLevel,
  isSaving,
  error,
}: Props) {
  return (
    <StepLayout badge={isRevisit ? 'Đo lại' : 'Bước 2 / 2'}>
      <Text className="mt-6 text-[11px] font-bold tracking-[0.08em] text-brand-accent">
        KẾT QUẢ CHẨN ĐOÁN
      </Text>
      <Text className="mt-2 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink">
        Điểm xuất phát: {STARTING_SKILL.name}, mức {STARTING_SKILL.level}
      </Text>
      <Text className="mt-1 text-[13px] font-medium text-brand-body">{sourceLabel}</Text>

      <Text className="mt-6 text-[11px] font-bold tracking-[0.08em] text-brand-body">
        MỨC HIỆN TẠI
      </Text>
      <View className="mt-2 overflow-hidden rounded-[20px] border border-brand-border">
        {RESULT_SKILLS.map((skill, index) => (
          <View
            key={skill.name}
            className={`gap-2.5 px-4 py-3.5 ${
              index < RESULT_SKILLS.length - 1 ? 'border-b border-brand-border' : ''
            }`}>
            <View className="flex-row items-center gap-2">
              <Text className="min-w-0 flex-1 text-[15px] font-bold text-brand-ink">
                {skill.name}
              </Text>
              {skill.start && (
                <View className="rounded-full bg-brand-accent px-2 py-[3px]">
                  <Text className="text-[11px] font-bold text-white">Bắt đầu từ đây</Text>
                </View>
              )}
              <Text className="text-[13px] font-bold text-brand-ink">
                {skill.level ? `Mức ${skill.level}` : 'Chưa đo'}
              </Text>
            </View>
            <View className="flex-row gap-1">
              {[1, 2, 3, 4].map(band => (
                <View
                  key={band}
                  className={`h-1.5 flex-1 rounded-[3px] ${
                    band <= skill.level
                      ? skill.start
                        ? 'bg-brand-accent'
                        : 'bg-brand-ink'
                      : 'bg-brand-ink/12'
                  }`}
                />
              ))}
            </View>
            <Text className="text-[13px] font-medium leading-[19px] text-brand-body">
              {skill.note}
            </Text>
            {isRevisit && (
              <View className="flex-row items-baseline gap-2">
                <Text className="text-[11px] font-semibold text-brand-body">
                  Lần trước: {skill.prev == null ? 'Chưa đo' : `Mức ${skill.prev}`}
                </Text>
                <Text className="text-[11px] font-bold text-brand-body">
                  {deltaLabel(skill.level, skill.prev)}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View className="flex-1" />
      {error && <Text className="mt-5 text-[13px] text-brand-accent-pressed">{error}</Text>}
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
              accessibilityState={{ disabled: isSaving }}
              onPress={onKeepLevel}
              disabled={isSaving}
              className="flex-1 items-center rounded-2xl border-[1.5px] border-brand-ink/25 p-[11px]">
              <Text className="text-[13px] font-bold text-brand-ink">Giữ mức cũ</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: isSaving }}
              onPress={onSaveLevel}
              disabled={isSaving}
              className={`flex-1 items-center rounded-full bg-brand-accent p-[11px] ${
                isSaving ? 'opacity-50' : ''
              }`}>
              <Text className="text-[13px] font-bold text-white">Cập nhật mức</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className="mt-5">
          <PrimaryButton label="Vào ứng dụng" onPress={onSaveLevel} loading={isSaving} />
        </View>
      )}
    </StepLayout>
  );
}
