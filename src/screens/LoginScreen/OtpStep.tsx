import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import OtpFields from './OtpFields';
import PrimaryButton from '@/components/PrimaryButton';
import { maskEmail } from '@/utils/email';

const RESEND_SECONDS = 30;

type Props = {
  email: string;
  digits: string[];
  onDigitsChange: (digits: string[]) => void;
  onBack: () => void;
  onResend: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  error: string | null;
};

export default function OtpStep({
  email,
  digits,
  onDigitsChange,
  onBack,
  onResend,
  onConfirm,
  isSubmitting,
  error,
}: Props) {
  const isComplete = digits.every(digit => digit.length === 1);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const timer = setTimeout(() => setSecondsLeft(seconds => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    onResend();
    setSecondsLeft(RESEND_SECONDS);
  };

  return (
    <View className="flex-1 bg-brand-page px-5 pb-24 pt-[58px]">
      <View className="h-[38px] justify-center">
        <Pressable accessibilityRole="button" accessibilityLabel="Quay lại" onPress={onBack} hitSlop={8}>
          <Text className="text-xl font-bold text-brand-ink/60">‹</Text>
        </Pressable>
      </View>

      <Text className="mt-3.5 text-xl font-bold tracking-[-0.02em] text-brand-ink">Nhập mã</Text>
      <Text className="mt-1.5 text-[13px] font-medium text-brand-ink/55">
        Đã gửi tới {maskEmail(email)}
      </Text>

      <View className="mt-6">
        <OtpFields digits={digits} onChange={onDigitsChange} autoFocus />
      </View>

      <View className="mt-5 flex-row items-baseline justify-center gap-1.5">
        <Text className="text-[13px] font-medium text-brand-ink/55">Chưa nhận được mã?</Text>
        {secondsLeft > 0 ? (
          <Text className="text-[13px] font-bold text-brand-accent-pressed">
            Gửi lại sau {secondsLeft} giây
          </Text>
        ) : (
          <Pressable accessibilityRole="button" onPress={handleResend} hitSlop={8}>
            <Text className="text-[13px] font-bold text-brand-accent-pressed">Gửi lại</Text>
          </Pressable>
        )}
      </View>

      {__DEV__ && (
        <View className="mt-5 flex-row items-start gap-2.5 rounded-2xl bg-brand-card p-3.5">
          <View className="mt-1.5 h-[5px] w-[5px] rounded-full bg-brand-accent" />
          <Text className="flex-1 text-[13px] font-semibold leading-[19.5px] text-brand-ink/70">
            Bản demo: gõ sáu số bất kỳ.
          </Text>
        </View>
      )}

      {error && <Text className="mt-3 text-center text-[13px] text-brand-accent-pressed">{error}</Text>}

      <View className="flex-1" />

      <PrimaryButton label="Xác nhận mã" onPress={onConfirm} disabled={!isComplete} loading={isSubmitting} />
      <Pressable accessibilityRole="button" onPress={onBack} hitSlop={8} className="mt-2.5">
        <Text className="text-center text-[13px] font-semibold text-brand-ink/55">Dùng email khác</Text>
      </Pressable>
    </View>
  );
}
