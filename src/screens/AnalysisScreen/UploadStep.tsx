import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Mic, Square, SquareCheck, Upload } from 'lucide-react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import BackHeaderRow from '@/components/BackHeaderRow';
import PrimaryButton from '@/components/PrimaryButton';
import { CONVERSATION_UPLOAD } from '@/mock/conversation-upload.mock';
import { brand } from '@/theme/colors';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function UploadStep({ onBack, onNext }: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  const [agreed, setAgreed] = useState(false);

  return (
    <View className="flex-1">
      <BackHeaderRow onPress={onBack} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="grow px-5 pb-6"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
        showsVerticalScrollIndicator={false}>
        <Text className="mt-3 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink">
          Đưa một cuộc trò chuyện thật vào phân tích
        </Text>

        <View className="mt-5 flex-row gap-2.5">
          <View className="flex-1 items-center rounded-2xl border-[1.5px] border-dashed border-brand-ink/25 p-[22px]">
            <View className="h-[38px] w-[38px] items-center justify-center rounded-2xl bg-brand-accent-tint">
              <Upload size={20} color={brand.accent} />
            </View>
            <Text className="mt-[11px] text-[15px] font-bold text-brand-ink">Tải tệp lên</Text>
            <Text className="text-[13px] font-medium text-brand-body">MP3, M4A, WAV</Text>
          </View>
          <View className="flex-1 items-center rounded-2xl border-[1.5px] border-dashed border-brand-ink/25 p-[22px]">
            <View className="h-[38px] w-[38px] items-center justify-center rounded-2xl bg-brand-accent-tint">
              <Mic size={20} color={brand.accent} />
            </View>
            <Text className="mt-[11px] text-[15px] font-bold text-brand-ink">Ghi âm ngay</Text>
            <Text className="text-[13px] font-medium text-brand-body">Ghi trực tiếp trong app</Text>
          </View>
        </View>
        <Text className="mt-2.5 text-[13px] font-medium leading-[19.5px] text-brand-body">
          Tệp video vẫn nhận, nhưng bản này chỉ đọc phần tiếng. Tối đa 60 phút.
        </Text>

        <View className="mt-3 rounded-2xl bg-brand-card p-4">
          <View className="flex-row items-center justify-between gap-2.5">
            <Text className="text-[15px] font-bold text-brand-ink">
              {CONVERSATION_UPLOAD.fileName}
            </Text>
            <Text className="text-[13px] font-semibold text-brand-body">
              {CONVERSATION_UPLOAD.fileSize}
            </Text>
          </View>
          <View className="mt-2.5 h-1.5 rounded-[3px] bg-brand-ink/12">
            <View className="h-full w-full rounded-[3px] bg-brand-accent" />
          </View>
          <Text className="mt-[7px] text-[13px] font-medium text-brand-body">
            {CONVERSATION_UPLOAD.note}
          </Text>
        </View>

        <View className="mt-5 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-brand-ink/12" />
          <Text className="text-[13px] font-semibold text-brand-ink/50">hoặc</Text>
          <View className="h-px flex-1 bg-brand-ink/12" />
        </View>

        <View className="mt-4 flex-row items-center justify-between gap-3 rounded-2xl bg-brand-card p-4">
          <View className="min-w-0 flex-1">
            <Text className="text-[15px] font-bold text-brand-ink">
              Dán đoạn chat giữa hai người
            </Text>
            <Text className="mt-[3px] text-[13px] font-medium leading-[19.5px] text-brand-ink/60">
              Copy từ Zalo, Messenger, Slack, email rồi dán vào. Giữ nguyên ai nói câu nào.
            </Text>
          </View>
          <Text className="text-[17px] font-bold text-brand-ink/40">›</Text>
        </View>
        <View className="mt-2.5 flex-row items-center justify-between gap-3 rounded-2xl bg-brand-card p-4">
          <View className="min-w-0 flex-1">
            <Text className="text-[15px] font-bold text-brand-ink">Tôi không có bản ghi âm</Text>
            <Text className="mt-[3px] text-[13px] font-medium leading-[19.5px] text-brand-ink/60">
              Sử dụng lời kể, vui lòng kể chi tiết diễn biến cuộc hội thoại và những câu nói, sự
              phản hồi, cảm xúc của những người trong đoạn đối thoại.
            </Text>
          </View>
          <Text className="text-[17px] font-bold text-brand-ink/40">›</Text>
        </View>

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreed }}
          onPress={() => setAgreed(current => !current)}
          className="mt-5 flex-row items-center gap-2">
          {agreed ? (
            <SquareCheck size={16} color={brand.accent} strokeWidth={1.75} />
          ) : (
            <Square size={16} color={`${brand.ink}80`} strokeWidth={1.5} />
          )}
          <Text className="flex-1 text-[13px] font-semibold leading-[19.5px] text-brand-ink/60">
            Tôi đồng ý với điều khoản bảo mật cho những nội dung được chia sẻ trong đoạn hồi thoại
            trên
          </Text>
        </Pressable>

        <View className="flex-1" />
        <PrimaryButton label="Tiếp tục" onPress={onNext} disabled={!agreed} className="mt-5" />
      </ScrollView>
    </View>
  );
}
