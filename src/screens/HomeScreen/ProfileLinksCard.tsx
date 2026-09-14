import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { PROFILE_LINKS } from '@/mock/home-profile-links.mock';
import type { ProfileLink } from '@/types/home.type';
import { cardShadow } from '@/theme/card';
import { brand } from '@/theme/colors';

type Props = {
  onPressReports: () => void;
  onPressReassess: () => void;
};

export default function ProfileLinksCard({ onPressReports, onPressReassess }: Props) {
  // Keyed by ProfileLink['key'], so adding a row without a handler fails to compile
  // instead of shipping a row that silently does nothing when tapped.
  const onPressRow: Record<ProfileLink['key'], () => void> = {
    reports: onPressReports,
    reassess: onPressReassess,
  };

  return (
    <View>
      <Text className="text-[17px] font-semibold text-brand-ink">Hồ sơ của bạn</Text>
      <View
        className="mt-3 rounded-[20px] border border-brand-border bg-brand-surface px-4"
        style={cardShadow}>
        {PROFILE_LINKS.map((row, index) => (
          <Pressable
            key={row.key}
            onPress={onPressRow[row.key]}
            className={`flex-row items-center gap-3 py-[14px] ${
              index < PROFILE_LINKS.length - 1 ? 'border-b border-brand-border' : ''
            }`}>
            <row.Icon size={20} color={brand.meta} />
            <Text className="min-w-0 flex-1 text-[15px] font-medium text-brand-ink">
              {row.label}
            </Text>
            <Text className="text-[13px] text-brand-body">{row.trailing}</Text>
            <ChevronRight size={18} color={brand.placeholder} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
