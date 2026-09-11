import React, { useRef } from 'react';
import { TextInput, View, type TextInputKeyPressEvent } from 'react-native';
import { brand } from '../../theme/colors';

export const OTP_LENGTH = 6;

type TextInputInstance = React.ComponentRef<typeof TextInput>;

type Props = {
  /** Always `OTP_LENGTH` entries, each an empty string or a single digit. */
  digits: string[];
  onChange: (digits: string[]) => void;
  autoFocus?: boolean;
};

/** Six single-digit boxes that auto-advance forward and backspace backwards. */
export default function OtpFields({ digits, onChange, autoFocus = false }: Props) {
  const inputs = useRef<Array<TextInputInstance | null>>([]);

  const focus = (index: number) => {
    if (index >= 0 && index < OTP_LENGTH) {
      inputs.current[index]?.focus();
    }
  };

  const handleChangeText = (index: number) => (text: string) => {
    const typed = text.replace(/[^0-9]/g, '');
    const next = digits.slice();

    if (typed.length > 1) {
      // Pasted (or autofilled) code — spread it across the remaining boxes.
      typed.split('').forEach((digit, offset) => {
        if (index + offset < OTP_LENGTH) {
          next[index + offset] = digit;
        }
      });
      onChange(next);
      focus(Math.min(index + typed.length, OTP_LENGTH - 1));
      return;
    }

    next[index] = typed.slice(-1);
    onChange(next);
    if (next[index]) {
      focus(index + 1);
    }
  };

  const handleKeyPress = (index: number) => (event: TextInputKeyPressEvent) => {
    if (event.nativeEvent.key === 'Backspace' && !digits[index]) {
      focus(index - 1);
    }
  };

  return (
    <View className="flex-row justify-between gap-2.5">
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={element => {
            inputs.current[index] = element;
          }}
          className="h-14 min-w-0 flex-1 rounded-xl border border-brand-border bg-brand-surface p-0 text-center text-[22px] font-bold text-brand-ink"
          value={digit}
          onChangeText={handleChangeText(index)}
          onKeyPress={handleKeyPress(index)}
          keyboardType="number-pad"
          inputMode="numeric"
          maxLength={index === 0 ? OTP_LENGTH : 1}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          selectionColor={brand.accent}
          autoFocus={autoFocus && index === 0}
          accessibilityLabel={`Chữ số thứ ${index + 1}`}
        />
      ))}
    </View>
  );
}
