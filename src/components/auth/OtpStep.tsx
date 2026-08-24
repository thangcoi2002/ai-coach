import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import OtpFields, { OTP_LENGTH } from './OtpFields';
import PrimaryButton from './PrimaryButton';
import { brand } from '../../theme/colors';
import { maskEmail } from '../../utils/email';

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

  return (
    <>
      <View className="flex-1">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          onPress={onBack}
          className="h-8 w-8 items-center justify-center rounded-full border border-brand-input-border bg-brand-surface active:bg-brand-input-border">
          <Svg viewBox="0 0 24 24" width={16} height={16}>
            <Path
              d="M15 18l-6-6 6-6"
              fill="none"
              stroke={brand.body}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>

        <Text className="mt-5 text-[30px] font-semibold leading-9 text-brand-ink">
          Nhập mã{'\n'}xác nhận.
        </Text>
        <Text className="mt-2.5 text-[14px] leading-[21px] text-brand-body">
          Chúng tôi đã gửi mã gồm {OTP_LENGTH} chữ số đến {maskEmail(email)}
        </Text>
      </View>

      <View className="gap-2.5">
        <OtpFields digits={digits} onChange={onDigitsChange} autoFocus />

        {error && <Text className="text-center text-[13px] text-brand-accent">{error}</Text>}

        <Text className="mt-1.5 text-center text-[13px] text-brand-muted">
          Chưa nhận được mã?{' '}
          <Text
            accessibilityRole="link"
            onPress={onResend}
            className="font-semibold text-brand-accent">
            Gửi lại
          </Text>
        </Text>

        <PrimaryButton
          label="Xác nhận"
          onPress={onConfirm}
          disabled={!isComplete}
          loading={isSubmitting}
          className="mt-3"
        />
      </View>
    </>
  );
}
