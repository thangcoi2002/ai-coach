import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ClipboardList, FileText, Upload, Users, type LucideIcon } from 'lucide-react-native';
import type { GateMethod } from '@/types/diagnostic.type';
import { GATE_SKILLS, LAST_MEASURED_LABEL } from '@/mock/gate-skills.mock';
import StepLayout from './StepLayout';
import { brand } from '@/theme/colors';

type Option = {
  method: GateMethod;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  minutes: string;
};

const OPTIONS: Option[] = [
  {
    method: 'report',
    Icon: FileText,
    title: 'Nộp báo cáo SELI hoặc 360',
    subtitle: 'Đã có kết quả đánh giá? Đây là cách nhanh nhất.',
    minutes: '2 phút',
  },
  {
    method: 'survey',
    Icon: ClipboardList,
    title: 'Trả lời khảo sát nhanh',
    subtitle: '15 câu hỏi tình huống. Tìm điểm đang nóng nhất ở bạn.',
    minutes: '5 phút',
  },
  {
    method: 'media',
    Icon: Upload,
    title: 'Gửi bản ghi một cuộc trò chuyện thật',
    subtitle: 'Ghi âm hoặc video dưới 10 phút.',
    minutes: '8 phút',
  },
  {
    method: 'role',
    Icon: Users,
    title: 'Diễn tập một tình huống',
    subtitle: 'Vào thẳng phòng diễn tập với nhân vật ảo.',
    minutes: '10 phút',
  },
];

type Props = {
  isRevisit: boolean;
  onPickMethod: (method: GateMethod) => void;
  /** Leaves the gate without measuring: the skip link first time, the back chevron on a revisit. */
  onExit: () => void;
};

export default function GateStep({ isRevisit, onPickMethod, onExit }: Props) {
  return (
    <StepLayout badge={isRevisit ? 'Đo lại' : 'Bước 1 / 2'} onBack={isRevisit ? onExit : undefined}>
      <Text className="mt-6 text-[11px] font-bold tracking-[0.08em] text-brand-accent">
        {isRevisit ? 'ĐO LẠI' : 'CHẨN ĐOÁN ĐẦU VÀO'}
      </Text>
      <Text className="mt-2 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink">
        {isRevisit ? 'Đo lại mức hiện tại' : 'Xác định mức hiện tại'}
      </Text>

      {isRevisit && (
        <View className="mt-3.5 gap-1.5 rounded-[20px] border border-brand-border bg-brand-surface p-3.5">
          <View className="flex-row items-baseline justify-between">
            <Text className="text-[13px] font-bold text-brand-body">Lần đo gần nhất</Text>
            <Text className="text-[11px] font-semibold text-brand-body">{LAST_MEASURED_LABEL}</Text>
          </View>
          <Text className="text-[13px] font-medium leading-[19px] text-brand-ink/70">
            Kết quả mới sẽ đặt cạnh kết quả cũ. Mức và lộ trình chỉ đổi khi bạn xác nhận.
          </Text>
        </View>
      )}

      <View className="mt-5 flex-row items-center gap-2">
        <Text className="text-[13px] font-bold text-brand-ink">Kỹ năng trong chương trình</Text>
        <Text className="text-xs font-semibold text-brand-body">{GATE_SKILLS.length} đã mở</Text>
      </View>
      <View className="mt-2 flex-row flex-wrap gap-1.5">
        {GATE_SKILLS.map(skill => (
          <View key={skill} className="rounded-full border border-brand-ink/16 px-2.5 py-[5px]">
            <Text className="text-[11px] font-bold text-brand-ink">{skill}</Text>
          </View>
        ))}
      </View>

      <Text className="mt-4 text-[13px] font-bold text-brand-body">Chọn một cách để đo</Text>
      <View className="mt-2.5 gap-2">
        {OPTIONS.map(option => (
          <Pressable
            key={option.method}
            accessibilityRole="button"
            onPress={() => onPickMethod(option.method)}
            className="flex-row items-center gap-3 rounded-[20px] border border-brand-border bg-brand-surface p-3.5">
            <View className="h-[42px] w-[42px] items-center justify-center rounded-2xl bg-brand-accent-tint">
              <option.Icon size={22} color={brand.accent} />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-[15px] font-bold text-brand-ink">{option.title}</Text>
              <Text className="mt-0.5 text-[13px] font-medium leading-[19px] text-brand-body">
                {option.subtitle}
              </Text>
            </View>
            <Text className="text-[11px] font-bold text-brand-ink/45">{option.minutes}</Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-1" />
      {!isRevisit && (
        <Pressable accessibilityRole="button" onPress={onExit} className="mt-5 items-center">
          <Text className="text-[13px] font-bold text-brand-body">Để sau, vào app trước</Text>
        </Pressable>
      )}
    </StepLayout>
  );
}
