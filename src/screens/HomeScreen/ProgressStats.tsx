import React from 'react';
import { Text, View } from 'react-native';
import { PROGRESS_STATS } from '@/mock/home-progress.mock';
import { cardClassName } from '@/theme/card';

export default function ProgressStats() {
  return (
    <View>
      <View className="flex-row items-baseline justify-between">
        <Text className="text-[17px] font-semibold text-brand-ink">Tiến bộ của bạn</Text>
        <Text className="text-xs text-brand-body">Tuần này</Text>
      </View>
      <View className="mt-3 flex-row gap-2.5">
        {PROGRESS_STATS.map(stat => (
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
