import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import PrimaryButton from './PrimaryButton';
import Wordmark from './Wordmark';
import { brand } from '../../theme/colors';

type Props = {
  email: string;
  onEmailChange: (email: string) => void;
  onContinue: () => void;
  onGoogle: () => void;
  onDemo: () => void;
  isSubmitting: boolean;
  error: string | null;
};

export default function SignInStep({
  email,
  onEmailChange,
  onContinue,
  onGoogle,
  onDemo,
  isSubmitting,
  error,
}: Props) {
  return (
    <>
      <View className="flex-1">
        <Wordmark />
        <Text className="mt-[26px] text-[30px] font-semibold leading-9 text-brand-ink">
          Diễn tập trước.{'\n'}Rồi bước vào phòng họp.
        </Text>
      </View>

      <View className="gap-2.5">
        <TextInput
          className="h-[59px] w-full rounded-2xl border border-brand-input-border bg-brand-surface px-[18px] text-[15px] text-brand-ink"
          placeholder="Email công ty"
          placeholderTextColor={brand.muted}
          value={email}
          onChangeText={onEmailChange}
          onSubmitEditing={onContinue}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          selectionColor={brand.accent}
        />

        {error && <Text className="text-[13px] text-brand-accent">{error}</Text>}

        <PrimaryButton label="Tiếp tục" onPress={onContinue} loading={isSubmitting} />

        <Pressable
          accessibilityRole="button"
          onPress={onGoogle}
          className="h-[54px] w-full flex-row items-center justify-center rounded-2xl border border-brand-border active:bg-brand-input-border">
          <Text className="text-[15px] font-semibold text-brand-body">Tiếp tục với Google</Text>
        </Pressable>

        <Text className="mt-2.5 text-center text-[12.5px] leading-[18.75px] text-brand-muted">
          Điều khoản và Riêng tư
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={onDemo}
          className="h-11 w-full items-center justify-center">
          <Text className="text-[14px] font-medium text-brand-muted">Xem thử bản demo</Text>
        </Pressable>
      </View>
    </>
  );
}
