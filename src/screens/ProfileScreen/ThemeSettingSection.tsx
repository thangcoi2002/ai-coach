import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Moon, MonitorSmartphone, Sun, type LucideIcon } from 'lucide-react-native';
import { useSetting } from '@/context/SettingProvider';
import { useThemeColors } from '@/context/ThemeProvider';
import { cardShadow } from '@/theme/card';
import type { ThemeMode } from '@/types/setting.type';

const OPTIONS: { mode: ThemeMode; label: string; Icon: LucideIcon }[] = [
  { mode: 'system', label: 'Hệ thống', Icon: MonitorSmartphone },
  { mode: 'light', label: 'Sáng', Icon: Sun },
  { mode: 'dark', label: 'Tối', Icon: Moon },
];

/** "Giao diện" section — lets the user pin the app to light/dark or follow the device setting. */
export default function ThemeSettingSection() {
  const { themeMode, editSetting } = useSetting();
  const colors = useThemeColors();

  return (
    <View className="mt-8">
      <Text className="text-[13px] font-semibold uppercase tracking-[0.04em] text-brand-body dark:text-brandDark-body">
        Giao diện
      </Text>
      <View
        className="mt-3 flex-row gap-2 rounded-[20px] border border-brand-border bg-brand-surface p-2 dark:border-brandDark-border dark:bg-brandDark-surface"
        style={cardShadow}>
        {OPTIONS.map(({ mode, label, Icon }) => {
          const selected = themeMode === mode;
          return (
            <Pressable
              key={mode}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => editSetting({ themeMode: mode })}
              className={`flex-1 items-center gap-1.5 rounded-2xl py-3 ${
                selected ? 'bg-brand-accent-tint dark:bg-brandDark-accent-tint' : ''
              }`}>
              <Icon size={20} color={selected ? colors.accentPressed : colors.body} />
              <Text
                className={`text-xs font-semibold ${
                  selected
                    ? 'text-brand-accent-pressed dark:text-brandDark-accent-pressed'
                    : 'text-brand-body dark:text-brandDark-body'
                }`}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
