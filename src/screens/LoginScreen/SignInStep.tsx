import React from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Wordmark from '@/components/Wordmark';
import { brand } from '@/theme/colors';

type Props = {
  email: string;
  onEmailChange: (email: string) => void;
  onContinue: () => void;
  isSubmitting: boolean;
  error: string | null;
};

export default function SignInStep({
  email,
  onEmailChange,
  onContinue,
  isSubmitting,
  error,
}: Props) {
  return (
    <View className="flex-1 bg-brand-page px-6 pb-12 pt-16">
      <Wordmark />

      <View className="flex-1 justify-center gap-5">
        <Image
          source={require('../../../assets/illustrations/scenario-difficult-conversation.png')}
          style={{ aspectRatio: 4 / 3 }}
          className="w-full max-w-[300px] self-center rounded-3xl"
          resizeMode="cover"
        />
        <Text className="text-[28px] font-semibold leading-[35px] tracking-[-0.02em] text-brand-ink">
          Diễn tập trước.{'\n'}Rồi bước vào phòng họp.
        </Text>
        <Text className="text-[15px] leading-[23px] text-brand-body">
          Luyện những cuộc trò chuyện khó với AI Coach, nhận phản hồi ngay và tiến bộ mỗi ngày.
        </Text>
      </View>

      <View className="gap-3">
        <TextInput
          className="w-full rounded-2xl border border-brand-divider bg-brand-surface px-[18px] py-4 text-[15px] text-brand-ink"
          placeholder="Email công ty"
          placeholderTextColor={brand.placeholder}
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

        {error && <Text className="text-[13px] text-brand-accent-pressed">{error}</Text>}

        <PrimaryButton label="Nhận mã đăng nhập" onPress={onContinue} loading={isSubmitting} />

        <Text className="py-1.5 text-center text-xs text-brand-body">Điều khoản và Riêng tư</Text>
      </View>
    </View>
  );
}
