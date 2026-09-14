import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { PROFILE_LINKS } from '@/mock/home-profile-links.mock';
import type { ProfileLink } from '@/types/home.type';
import { useThemeColors } from '@/context/ThemeProvider';
import { cardShadow } from '@/theme/card';

type Props = {
  onPressReports: () => void;
  onPressReassess: () => void;
};

export default function ProfileLinksCard({ onPressReports, onPressReassess }: Props) {
  const colors = useThemeColors();
  // Keyed by ProfileLink['key'], so adding a row without a handler fails to compile
  // instead of shipping a row that silently does nothing when tapped.
  const onPressRow: Record<ProfileLink['key'], () => void> = {
    reports: onPressReports,
    reassess: onPressReassess,
  };

  return (
    <View>
      <Text className="text-[17px] font-semibold text-brand-ink dark:text-brandDark-ink">
        Hồ sơ của bạn
      </Text>
      <View
        className="mt-3 rounded-[20px] border border-brand-border bg-brand-surface px-4 dark:border-brandDark-border dark:bg-brandDark-surface"
        style={cardShadow}>
        {PROFILE_LINKS.map((row, index) => (
          <Pressable
            key={row.key}
            onPress={onPressRow[row.key]}
            className={`flex-row items-center gap-3 py-[14px] ${
              index < PROFILE_LINKS.length - 1 ? 'border-b border-brand-border dark:border-brandDark-border' : ''
            }`}>
            <row.Icon size={20} color={colors.meta} />
            <Text className="min-w-0 flex-1 text-[15px] font-medium text-brand-ink dark:text-brandDark-ink">
              {row.label}
            </Text>
            <Text className="text-[13px] text-brand-body dark:text-brandDark-body">
              {row.trailing}
            </Text>
            <ChevronRight size={18} color={colors.placeholder} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
