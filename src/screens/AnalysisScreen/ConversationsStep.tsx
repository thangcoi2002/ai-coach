import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PrimaryButton from '@/components/PrimaryButton';
import { CONVERSATIONS } from '@/mock/conversations.mock';
import { cardClassName, cardShadow } from '@/theme/card';
import type { ConversationListItem } from '@/types/analysis.type';

type Props = {
  onUpload: () => void;
  /** Only the 'done' card opens a report — it's the one conversation with a result. */
  onOpenAnalysis: () => void;
};

function ConversationCard({ item, onOpenAnalysis }: { item: ConversationListItem; onOpenAnalysis: () => void }) {
  if (item.status === 'done') {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onOpenAnalysis}
        className={`mt-2.5 gap-1 p-[18px] ${cardClassName}`}
        style={cardShadow}>
        <View className="flex-row items-start justify-between gap-2.5">
          <Text className="min-w-0 flex-1 text-[15px] font-bold leading-[22.5px] text-brand-ink">
            {item.title}
          </Text>
          <View className="flex-none rounded-full bg-brand-card px-2.5 py-[5px]">
            <Text className="text-[11px] font-bold text-brand-ink">Đã xong</Text>
          </View>
        </View>
        <Text className="text-[13px] font-medium text-brand-ink/55">{item.meta}</Text>
        <Text className="mt-[3px] text-[15px] font-semibold leading-[22.5px] text-brand-ink">
          {item.takeaway}
        </Text>
      </Pressable>
    );
  }

  if (item.status === 'processing') {
    return (
      <View className="mt-2.5 gap-1 rounded-[20px] bg-brand-card p-[18px]">
        <View className="flex-row items-start justify-between gap-2.5">
          <Text className="min-w-0 flex-1 text-[15px] font-semibold text-brand-ink">
            {item.title}
          </Text>
          <View className="flex-none rounded-full border border-brand-ink/20 px-2.5 py-[5px]">
            <Text className="text-[11px] font-bold text-brand-ink">Đang xử lý</Text>
          </View>
        </View>
        <Text className="text-[13px] font-medium text-brand-ink/55">{item.meta}</Text>
        <View className="mt-2.5 h-1.5 rounded-[3px] bg-brand-ink/12">
          <View
            className="h-full rounded-[3px] bg-brand-accent"
            style={{ width: `${(item.progress ?? 0) * 100}%` }}
          />
        </View>
      </View>
    );
  }

  return (
    <View className="mt-2.5 gap-1 rounded-[20px] bg-brand-card p-[18px]">
      <View className="flex-row items-start justify-between gap-2.5">
        <Text className="min-w-0 flex-1 text-[15px] font-semibold text-brand-ink">
          {item.title}
        </Text>
        <View className="flex-none rounded-full bg-brand-accent px-2.5 py-[5px]">
          <Text className="text-[11px] font-bold text-white">Âm thanh kém</Text>
        </View>
      </View>
      <Text className="text-[13px] font-medium text-brand-ink/55">{item.meta}</Text>
      <View className="mt-2.5 items-center rounded-2xl border-[1.5px] border-brand-ink/25 p-[11px]">
        <Text className="text-[13px] font-bold text-brand-ink">Xem cách xử lý</Text>
      </View>
    </View>
  );
}

export default function ConversationsStep({ onUpload, onOpenAnalysis }: Props) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View className="flex-1">
      <View className="h-[34px] items-center justify-center">
        <Text className="text-[15px] font-bold text-brand-ink">Hội thoại</Text>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
        showsVerticalScrollIndicator={false}>
        <Text className="mt-3 text-[20px] font-bold tracking-[-0.02em] text-brand-ink">
          Chuyện gì đã thật sự xảy ra?
        </Text>
        <Text className="mt-[7px] text-[15px] font-medium leading-6 text-brand-ink/72">
          Đưa vào một cuộc trò chuyện thật ở nơi làm việc. Akelō chỉ ra thói quen đang lặp lại và
          chỗ cuộc nói chuyện đổi chiều.
        </Text>
        <PrimaryButton label="Đưa hội thoại vào phân tích" onPress={onUpload} className="mt-4" />

        <Text className="mt-[26px] text-[11px] font-bold tracking-[0.08em] text-brand-ink/50">
          ĐÃ PHÂN TÍCH
        </Text>
        {CONVERSATIONS.map(item => (
          <ConversationCard key={item.id} item={item} onOpenAnalysis={onOpenAnalysis} />
        ))}
      </ScrollView>
    </View>
  );
}
