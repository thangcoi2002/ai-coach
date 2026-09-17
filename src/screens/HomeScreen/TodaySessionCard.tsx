import React from 'react';
import { Image, Text, View } from 'react-native';
import { Clock } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { cardClassName, cardShadow } from '@/theme/card';
import { brand } from '@/theme/colors';
import type { NextSession } from '@/types/home.type';

/** Each skill's program runs a fixed 5 sessions (GET /api/skills' sessionsTotal is always 5). */
const SESSIONS_PER_SKILL = 5;

type Props = {
  session: NextSession | null;
  onStart: () => void;
};

export default function TodaySessionCard({ session, onStart }: Props) {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="text-[17px] font-semibold text-brand-ink">Buổi luyện hôm nay</Text>
        {session && (
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: brand.accentTint }}>
            <Clock size={14} color={brand.accentPressed} />
            <Text className="text-xs font-semibold text-brand-accent-pressed">
              {session.estimatedMinutes} phút
            </Text>
          </View>
        )}
      </View>

      <View className={`mt-3 gap-3.5 p-[18px] ${cardClassName}`} style={cardShadow}>
        {session ? (
          <View className="flex-row gap-3">
            <View className="flex-1 gap-1.5">
              <Text className="text-xs font-semibold tracking-[0.04em] text-[#8558C8]">
                {`BUỔI ${session.sessionIndex}/${SESSIONS_PER_SKILL} · CÙNG ${session.personaName}`.toUpperCase()}
              </Text>
              <Text className="text-[18px] font-semibold leading-[23px] tracking-[-0.01em] text-brand-ink">
                {session.title}
              </Text>
              <Text className="text-sm leading-[21px] text-brand-body">{session.skillName}</Text>
            </View>
            <Image
              source={require('../../../assets/illustrations/hero-conversation.png')}
              className="h-[76px] w-[118px] rounded-xl"
              resizeMode="cover"
            />
          </View>
        ) : (
          <Text className="text-sm leading-[21px] text-brand-body">
            Chưa có buổi nào được lên lịch. Vào luyện tập để bắt đầu buổi tiếp theo.
          </Text>
        )}
        <PrimaryButton label="Bắt đầu luyện tập →" onPress={onStart} />
      </View>
    </View>
  );
}
