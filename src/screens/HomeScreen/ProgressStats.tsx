import React from 'react';
import { Clock, Dumbbell } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { cardClassName } from '@/theme/card';
import type { ProgressStat } from '@/types/home.type';

type Props = {
  streakDays: number;
  sessionsThisWeek: number;
};

export default function ProgressStats({ streakDays, sessionsThisWeek }: Props) {
  const stats: ProgressStat[] = [
    {
      key: 'sessions',
      Icon: Dumbbell,
      iconBg: '#F2EBFA',
      iconColor: '#8558C8',
      value: String(sessionsThisWeek),
      label: 'Buổi luyện',
    },
    {
      key: 'streak',
      Icon: Clock,
      iconBg: '#FFF5DC',
      iconColor: '#E4A329',
      value: String(streakDays),
      label: 'Ngày liên tiếp',
    },
  ];

  return (
    <View>
      <View className="flex-row items-baseline justify-between">
        <Text className="text-[17px] font-semibold text-brand-ink">Tiến bộ của bạn</Text>
        <Text className="text-xs text-brand-body">Tuần này</Text>
      </View>
      <View className="mt-3 flex-row gap-2.5">
        {stats.map(stat => (
          <View key={stat.key} className={`flex-1 gap-2.5 p-3.5 ${cardClassName}`}>
            <View
              className="h-8 w-8 items-center justify-center rounded-[10px]"
              style={{ backgroundColor: stat.iconBg }}>
              <stat.Icon size={18} color={stat.iconColor} />
            </View>
            <View>
              <Text className="text-2xl font-semibold tracking-[-0.02em] text-brand-ink">
                {stat.value}
              </Text>
              <Text className="text-xs text-brand-body">{stat.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
