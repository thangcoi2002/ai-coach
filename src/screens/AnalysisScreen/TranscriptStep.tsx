import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PrimaryButton from '@/components/PrimaryButton';
import { CONVERSATION_TRANSCRIPT } from '@/mock/transcript.mock';
import { cardClassName, cardShadow } from '@/theme/card';

type Props = {
  onNext: () => void;
};

type Speaker = 'p1' | 'p2';

const TURN_COUNTS = CONVERSATION_TRANSCRIPT.reduce(
  (counts, line) => ({ ...counts, [line.speaker]: counts[line.speaker] + 1 }),
  { p1: 0, p2: 0 },
);

function RolePill({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`rounded-full border px-[13px] py-2 ${
        active ? 'border-brand-accent bg-brand-accent' : 'border-brand-ink/20 bg-transparent'
      }`}>
      <Text className={`text-[13px] font-bold ${active ? 'text-white' : 'text-brand-ink'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

function SpeakerRow({
  label,
  turnCount,
  isMe,
  onAssignMe,
}: {
  label: string;
  turnCount: number;
  isMe: boolean;
  onAssignMe: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between gap-2.5 rounded-2xl bg-brand-card p-3.5">
      <View>
        <Text className="text-[15px] font-bold text-brand-ink">{label}</Text>
        <Text className="text-[13px] font-medium text-brand-ink/55">Nói {turnCount} lượt</Text>
      </View>
      <View className="flex-row gap-1.5">
        <RolePill active={isMe} label="Tôi" onPress={onAssignMe} />
        <RolePill active={!isMe} label="Người kia" onPress={onAssignMe} />
      </View>
    </View>
  );
}

export default function TranscriptStep({ onNext }: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  // Which diarized speaker is "Tôi" — tapping either speaker's pills flips both rows,
  // since with two speakers assigning one always determines the other.
  const [me, setMe] = useState<Speaker>('p1');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [edits, setEdits] = useState<Record<number, string>>({});

  const roleLabel = (speaker: Speaker) => (speaker === me ? 'TÔI' : 'NGƯỜI KIA');

  return (
    <View className="flex-1">
      <View className="h-[34px] items-center justify-center">
        <Text className="text-[15px] font-bold text-brand-ink">Xác nhận bản ghi</Text>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-6"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
        showsVerticalScrollIndicator={false}>
        <Text className="mt-3 text-[20px] font-bold tracking-[-0.02em] text-brand-ink">
          Ai là ai trong đoạn này?
        </Text>
        <Text className="mt-2 text-[15px] font-medium leading-6 text-brand-ink/72">
          Máy nghe được hai người. Gán đúng vai rồi phân tích mới đọc đúng chiều của cuộc trò
          chuyện.
        </Text>

        <View className="mt-4 gap-[9px]">
          <SpeakerRow
            label="Người nói 1"
            turnCount={TURN_COUNTS.p1}
            isMe={me === 'p1'}
            onAssignMe={() => setMe('p1')}
          />
          <SpeakerRow
            label="Người nói 2"
            turnCount={TURN_COUNTS.p2}
            isMe={me === 'p2'}
            onAssignMe={() => setMe('p2')}
          />
        </View>

        <Text className="mt-6 text-[13px] font-bold text-brand-body">Bản ghi máy bóc ra</Text>
        <Text className="mt-[3px] text-[13px] font-medium text-brand-body">
          Chạm vào một dòng để sửa lại chữ máy nghe nhầm.
        </Text>

        <View className={`mt-3 gap-3.5 p-4 ${cardClassName}`} style={cardShadow}>
          {CONVERSATION_TRANSCRIPT.map((line, index) => {
            const isEditing = editingIndex === index;
            const text = edits[index] ?? line.text;
            return (
              <Pressable
                key={`${line.time}-${index}`}
                accessibilityRole="button"
                onPress={() => setEditingIndex(index)}
                className="gap-1 border-l-2 border-brand-ink/12 pl-3">
                <View className="flex-row items-baseline gap-2">
                  <Text className="text-[11px] font-bold tracking-[0.06em] text-brand-ink">
                    {roleLabel(line.speaker)}
                  </Text>
                  <Text className="text-[11px] font-semibold tabular-nums text-brand-ink/45">
                    {line.time}
                  </Text>
                </View>
                {isEditing ? (
                  <TextInput
                    autoFocus
                    value={text}
                    onChangeText={value => setEdits(current => ({ ...current, [index]: value }))}
                    onBlur={() => setEditingIndex(null)}
                    onSubmitEditing={() => setEditingIndex(null)}
                    multiline
                    className="text-[13px] font-medium leading-5 text-brand-ink/[0.85]"
                  />
                ) : (
                  <Text className="text-[13px] font-medium leading-5 text-brand-ink/[0.85]">{text}</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        <PrimaryButton label="Phân tích" onPress={onNext} className="mt-5" />
        <Text className="mt-2.5 text-center text-[13px] font-medium text-brand-body">
          Dùng 1 lượt phân tích, còn 11 lượt trong tháng
        </Text>
      </ScrollView>
    </View>
  );
}
