import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OtpStep from './OtpStep';
import { OTP_LENGTH } from './OtpFields';
import SignInStep from './SignInStep';
import { useAuth } from '@/context/AuthProvider';
import { isValidEmail } from '@/utils/email';

type Step = 'signin' | 'otp';

const emptyOtp = () => Array<string>(OTP_LENGTH).fill('');

export default function LoginScreen() {
  const { requestOtp, verifyOtp } = useAuth();
  const [step, setStep] = useState<Step>('signin');
  const [email, setEmail] = useState('');
  const [digits, setDigits] = useState<string[]>(emptyOtp);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!isValidEmail(email)) {
      setError('Vui lòng nhập email công ty hợp lệ.');
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await requestOtp(email.trim());
      setDigits(emptyOtp());
      setStep('otp');
    } catch {
      setError('Không gửi được mã xác nhận. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setError(null);
    setStep('signin');
  };

  const handleResend = async () => {
    setError(null);
    setDigits(emptyOtp());
    try {
      await requestOtp(email.trim());
    } catch {
      setError('Không gửi lại được mã. Vui lòng thử lại.');
    }
  };

  const handleConfirm = async (code: string) => {
    setError(null);
    setIsSubmitting(true);
    try {
      // On success AuthProvider flips isAuthenticated and RootNavigator swaps
      // this screen out, so there is nothing left to navigate to here.
      await verifyOtp(email.trim(), code);
    } catch {
      // Keep the digits so the user can just fix the wrong one(s) instead of retyping all six.
      setError('Mã xác nhận không đúng hoặc đã hết hạn.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDigitsChange = (next: string[]) => {
    setError(null);
    setDigits(next);
    if (!isSubmitting && next.every(digit => digit.length === 1)) {
      handleConfirm(next.join(''));
    }
  };

  return (
    <View className="flex-1 bg-brand-page">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            className="flex-1"
            contentContainerClassName="grow"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {step === 'signin' ? (
              <SignInStep
                email={email}
                onEmailChange={value => {
                  setError(null);
                  setEmail(value);
                }}
                onContinue={handleContinue}
                isSubmitting={isSubmitting}
                error={error}
              />
            ) : (
              <OtpStep
                email={email}
                digits={digits}
                onDigitsChange={handleDigitsChange}
                onBack={handleBack}
                onResend={handleResend}
                onConfirm={() => handleConfirm(digits.join(''))}
                isSubmitting={isSubmitting}
                error={error}
              />
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
