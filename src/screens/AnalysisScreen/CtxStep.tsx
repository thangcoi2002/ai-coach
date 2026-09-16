import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import BackHeaderRow from '@/components/BackHeaderRow';
import PrimaryButton from '@/components/PrimaryButton';
import { brand } from '@/theme/colors';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

const RELATIONSHIPS = ['Sếp trực tiếp', 'Đồng nghiệp', 'Nhân viên của tôi', 'Khách hàng', 'Khác'];
const TOPICS = ['Deadline / ưu tiên', 'Phản hồi', 'Xung đột', 'Phối hợp', 'Hiệu suất', 'Khác'];

function ChipGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (option: string) => void;
}) {
  return (
    <View className="mt-2.5 flex-row flex-wrap gap-2">
      {options.map(option => {
        const active = value === option;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            onPress={() => onChange(option)}
            className={`grow basis-[47%] rounded-2xl border p-[13px] ${
              active ? 'border-brand-accent bg-brand-accent' : 'border-brand-ink/14 bg-brand-surface'
            }`}>
            <Text className={`text-[13px] font-bold ${active ? 'text-white' : 'text-brand-ink'}`}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function CtxStep({ onBack, onNext }: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  const [name, setName] = useState('1:1 với sếp về deadline báo cáo quý');
  const [relationship, setRelationship] = useState(RELATIONSHIPS[0]);
  const [relationshipOther, setRelationshipOther] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [topicOther, setTopicOther] = useState('');
  const [goal, setGoal] = useState('');

  return (
    <View className="flex-1">
      <BackHeaderRow onPress={onBack} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="grow px-5 pb-6"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
        showsVerticalScrollIndicator={false}>
        <Text className="mt-3 text-[20px] font-bold tracking-[-0.02em] text-brand-ink">
          Vài câu để AI đọc đúng bối cảnh
        </Text>

        <Text className="mt-[22px] text-[13px] font-bold text-brand-body">
          Đặt tên cho cuộc trò chuyện này
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className="mt-2.5 rounded-2xl border border-brand-ink/14 bg-brand-surface p-3.5 text-[15px] font-semibold text-brand-ink"
        />
        <Text className="mt-[7px] text-[13px] font-medium text-brand-body">
          Bạn tự đặt, AI không đặt hộ.
        </Text>

        <Text className="mt-[22px] text-[13px] font-bold text-brand-body">
          Bạn đang nói chuyện với ai?
        </Text>
        <ChipGrid options={RELATIONSHIPS} value={relationship} onChange={setRelationship} />
        <TextInput
          value={relationshipOther}
          onChangeText={setRelationshipOther}
          placeholder="Hoặc tự điền: vai của người đó"
          placeholderTextColor={brand.placeholder}
          className="mt-2 rounded-2xl border border-dashed border-brand-ink/30 bg-brand-surface p-3.5 text-[13px] font-semibold text-brand-ink"
        />

        <Text className="mt-[22px] text-[13px] font-bold text-brand-body">
          Cuộc trò chuyện về chuyện gì?
        </Text>
        <ChipGrid options={TOPICS} value={topic} onChange={setTopic} />
        <TextInput
          value={topicOther}
          onChangeText={setTopicOther}
          placeholder="Hoặc tự điền: chủ đề cuộc trò chuyện"
          placeholderTextColor={brand.placeholder}
          className="mt-2 rounded-2xl border border-dashed border-brand-ink/30 bg-brand-surface p-3.5 text-[13px] font-semibold text-brand-ink"
        />

        <Text className="mt-[22px] text-[11px] font-bold tracking-[0.08em] text-brand-body">
          BẠN MUỐN ĐẠT ĐƯỢC GÌ? <Text className="text-[11px] font-medium">(không bắt buộc)</Text>
        </Text>
        <TextInput
          value={goal}
          onChangeText={setGoal}
          placeholder="VD: xin lùi deadline mà không mất niềm tin"
          placeholderTextColor={brand.placeholder}
          multiline
          className="mt-2.5 min-h-[52px] rounded-2xl border border-brand-ink/14 bg-brand-surface p-3.5 text-[15px] font-medium text-brand-ink"
        />
        <Text className="mt-2 text-[13px] font-medium text-brand-body">
          Bỏ trống vẫn phân tích được.
        </Text>

        <View className="flex-1" />
        <PrimaryButton label="Phân tích" onPress={onNext} className="mt-5" />
        <Text className="mt-2.5 text-center text-[13px] font-medium text-brand-body">
          Dùng 1 lượt phân tích, còn 12 lượt trong tháng
        </Text>
      </ScrollView>
    </View>
  );
}
