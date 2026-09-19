import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Check, Square } from 'lucide-react-native';
import { CONVERSATION_UPLOAD } from '@/mock/conversation-upload.mock';
import { brand } from '@/theme/colors';

type Props = {
  /** "Để tôi làm việc khác" — sends the user back to Home while this keeps running. */
  onWorkElsewhere: () => void;
  onDone: () => void;
};

const STEPS = ['Tách tiếng khỏi nền', 'Bóc băng thành chữ', 'Tách các người nói'];
const STEP_DELAY_MS = 1100;

export default function ProcessingStep({ onWorkElsewhere, onDone }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (stepIndex >= STEPS.length) {
      const timer = setTimeout(() => onDoneRef.current(), STEP_DELAY_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setStepIndex(current => current + 1), STEP_DELAY_MS);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  return (
    <View className="flex-1 bg-brand-night px-[22px] pt-6">
      <Text className="text-[20px] font-bold tracking-[-0.02em] text-white">
        Đang xử lý nội dung
      </Text>
      <Text className="mt-1.5 text-[13px] font-medium text-white/60">
        {CONVERSATION_UPLOAD.fileName}, 6:12
      </Text>

      <View className="mt-[30px] gap-4">
        {STEPS.map((label, index) => {
          const isDone = index < stepIndex;
          const isActive = index === stepIndex;
          return (
            <View key={label} className="flex-row items-center gap-3">
              {isDone ? (
                <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-brand-accent-tint">
                  <Check size={12} color={brand.accent} strokeWidth={3} />
                </View>
              ) : isActive ? (
                <View className="h-5 w-5 items-center justify-center">
                  <ActivityIndicator size="small" color={brand.accent} />
                </View>
              ) : (
                <View className="h-5 w-5 rounded-full border-2 border-white/25" />
              )}
              <Text
                className={`text-[15px] ${
                  isActive ? 'font-bold text-white' : isDone ? 'font-semibold text-white' : 'font-medium text-white/50'
                }`}>
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <View className="mt-[26px] rounded-2xl bg-white/[0.08] p-4">
        <Text className="text-[13px] font-medium leading-[19.5px] text-white/75">
          Cuộc trò chuyện này dài hơn bình thường. Bạn cứ làm việc khác, chúng tôi báo khi xong.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onWorkElsewhere}
          className="mt-[11px] items-center rounded-2xl border-[1.5px] border-white/30 p-[11px]">
          <Text className="text-[13px] font-bold text-white">Để tôi làm việc khác</Text>
        </Pressable>
      </View>

      <View className="flex-1" />
      <Pressable
        accessibilityRole="button"
        onPress={onDone}
        className="mb-2 flex-row items-center gap-2">
        <Square size={11} color="#FFFFFF99" strokeWidth={1.5} />
        <Text className="flex-1 text-[13px] font-semibold text-white/70">
          Xử lý trên hạ tầng riêng. Tệp gốc được xoá sau khi bóc băng xong.
        </Text>
      </Pressable>
    </View>
  );
}
