import React from 'react';
import { Image, Text, View } from 'react-native';
import { Clock } from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import { useThemeColors } from '@/context/ThemeProvider';
import { cardClassName, cardShadow } from '@/theme/card';

type Props = {
  onStart: () => void;
};

export default function TodaySessionCard({ onStart }: Props) {
  const colors = useThemeColors();

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <Text className="text-[17px] font-semibold text-brand-ink dark:text-brandDark-ink">
          Buổi luyện hôm nay
        </Text>
        <View
          className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
          style={{ backgroundColor: colors.accentTint }}>
          <Clock size={14} color={colors.accentPressed} />
          <Text className="text-xs font-semibold text-brand-accent-pressed dark:text-brandDark-accent-pressed">
            8 phút
          </Text>
        </View>
      </View>

      <View className={`mt-3 gap-3.5 p-[18px] ${cardClassName}`} style={cardShadow}>
        <View className="flex-row gap-3">
          <View className="flex-1 gap-1.5">
            <Text className="text-xs font-semibold tracking-[0.04em] text-[#8558C8]">
              BUỔI 2/5 · CÙNG ANH KIÊN
            </Text>
            <Text className="text-[18px] font-semibold leading-[23px] tracking-[-0.01em] text-brand-ink dark:text-brandDark-ink">
              Báo trễ deadline cho sếp đang ép tiến độ
            </Text>
            <Text className="text-sm leading-[21px] text-brand-body dark:text-brandDark-body">
              Giữ bình tĩnh và rõ ràng khi cuộc trò chuyện căng lên.
            </Text>
          </View>
          <Image
            source={require('../../../assets/illustrations/hero-conversation.png')}
            className="h-[76px] w-[118px] rounded-xl"
            resizeMode="cover"
          />
        </View>
        <PrimaryButton label="Bắt đầu luyện tập →" onPress={onStart} />
      </View>
    </View>
  );
}
