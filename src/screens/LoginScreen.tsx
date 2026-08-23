import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Pressable } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useAuth } from '../context/AuthProvider';
import { MOCK_EMAIL, MOCK_PASSWORD } from '../services/auth.service';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      await login(values.email, values.password);
    } catch {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email/mật khẩu.');
    }
  };

  return (
    <View className="flex-1 justify-center gap-4 px-6">
      <Text className="mb-4 text-2xl font-bold">Đăng nhập</Text>

      {__DEV__ && (
        <View className="mb-2 gap-1 rounded-lg bg-gray-100 p-3">
          <Pressable onPress={() => Clipboard.setString(MOCK_EMAIL)}>
            <Text className="text-xs text-gray-500">
              Test account: <Text className="font-semibold text-gray-700">{MOCK_EMAIL}</Text> (bấm để copy)
            </Text>
          </Pressable>
          <Pressable onPress={() => Clipboard.setString(MOCK_PASSWORD)}>
            <Text className="text-xs text-gray-500">
              Password: <Text className="font-semibold text-gray-700">{MOCK_PASSWORD}</Text> (bấm để copy)
            </Text>
          </Pressable>
        </View>
      )}

      <Controller
        control={control}
        name="email"
        rules={{ required: 'Vui lòng nhập email' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="rounded-lg border border-gray-300 px-4 py-3"
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text className="text-sm text-red-500">{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Vui lòng nhập mật khẩu' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="rounded-lg border border-gray-300 px-4 py-3"
            placeholder="Mật khẩu"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text className="text-sm text-red-500">{errors.password.message}</Text>
      )}

      {error && <Text className="text-sm text-red-500">{error}</Text>}

      <Pressable
        className="mt-2 items-center rounded-lg bg-blue-600 px-4 py-3"
        onPress={() => handleSubmit(onSubmit)()}
        disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="font-semibold text-white">Đăng nhập</Text>
        )}
      </Pressable>
    </View>
  );
}
