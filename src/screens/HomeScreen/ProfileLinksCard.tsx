import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ChevronRight, ClipboardList, FileText, type LucideIcon } from 'lucide-react-native';
import { useThemeColors } from '@/context/ThemeProvider';
import { cardShadow } from '@/theme/card';

type Row = {
  key: string;
  Icon: LucideIcon;
  label: string;
  trailing: string;
};

const ROWS: Row[] = [
  { key: 'reports', Icon: FileText, label: 'Báo cáo đã có', trailing: '6' },
  { key: 'reassess', Icon: ClipboardList, label: 'Đánh giá lại các kỹ năng', trailing: '2 tháng 7' },
];

type Props = {
  onPressRow: () => void;
};

export default function ProfileLinksCard({ onPressRow }: Props) {
  const colors = useThemeColors();

  return (
    <View>
      <Text className="text-[17px] font-semibold text-brand-ink dark:text-brandDark-ink">
        Hồ sơ của bạn
      </Text>
      <View
        className="mt-3 rounded-[20px] border border-brand-border bg-brand-surface px-4 dark:border-brandDark-border dark:bg-brandDark-surface"
        style={cardShadow}>
        {ROWS.map((row, index) => (
          <Pressable
            key={row.key}
            onPress={onPressRow}
            className={`flex-row items-center gap-3 py-[14px] ${
              index < ROWS.length - 1 ? 'border-b border-brand-border dark:border-brandDark-border' : ''
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
