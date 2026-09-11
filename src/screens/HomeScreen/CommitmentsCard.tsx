import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import { cardShadow } from '@/theme/card';

type Commitment = {
  id: string;
  text: string;
  done: boolean;
};

const INITIAL_COMMITMENTS: Commitment[] = [
  { id: '1', text: 'Nói rõ khó khăn trước khi đề xuất giải pháp.', done: false },
  { id: '2', text: 'Chốt lại thời hạn mới bằng một câu cụ thể.', done: false },
  { id: '3', text: 'Không xin lỗi quá nhiều khi báo tin xấu.', done: true },
];

export default function CommitmentsCard() {
  const [commitments, setCommitments] = useState(INITIAL_COMMITMENTS);
  const open = commitments.filter(c => !c.done);
  const done = commitments.filter(c => c.done);

  const toggle = (id: string) => {
    setCommitments(current => current.map(c => (c.id === id ? { ...c, done: !c.done } : c)));
  };

  return (
    <View>
      <View className="flex-row items-center justify-between gap-2.5">
        <Text className="text-[17px] font-semibold text-brand-ink">Tôi sẽ chú ý để thay đổi</Text>
        <Text className="text-[13px] font-semibold text-brand-accent">Tất cả ›</Text>
      </View>
      <View className="mt-3 rounded-[20px] border border-[#F0F0F0] bg-brand-surface px-4" style={cardShadow}>
        {open.map(item => (
          <Pressable
            key={item.id}
            onPress={() => toggle(item.id)}
            className="flex-row items-start gap-3 border-b border-[#F0F0F0] py-3">
            <View className="mt-0.5 h-[22px] w-[22px] rounded-full border-[1.5px] border-brand-divider" />
            <Text className="min-w-0 flex-1 text-sm leading-[21px] text-brand-ink">{item.text}</Text>
          </Pressable>
        ))}
        {done.map(item => (
          <Pressable
            key={item.id}
            onPress={() => toggle(item.id)}
            className="my-2 flex-row items-start gap-3 rounded-[14px] bg-[#EAF7EF] px-3 py-3">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-[#2DA968]">
              <Check size={16} color="#FFFFFF" />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-[11px] font-semibold tracking-[0.06em] text-[#2DA968]">
                ĐÃ LÀM ĐƯỢC
              </Text>
              <Text className="mt-0.5 text-sm font-medium leading-[21px] text-brand-ink">{item.text}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
