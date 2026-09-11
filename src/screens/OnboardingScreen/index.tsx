import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FileText,
  MessagesSquare,
  Target,
  type LucideIcon,
} from 'lucide-react-native';
import PrimaryButton from '@/components/PrimaryButton';
import Wordmark from '@/components/Wordmark';
import { useEditSetting } from '@/context/SettingProvider';

type Page = {
  key: 'scenario' | 'document' | 'goal';
  Icon: LucideIcon;
  title: string;
  body: string;
};

const PAGES: Page[] = [
  {
    key: 'scenario',
    Icon: MessagesSquare,
    title: 'Điều bạn học ở lớp không tự đi theo bạn vào phòng họp.',
    body: 'Trong những thời điểm căng thẳng hoặc không kiểm soát, những thói quen bản năng luôn bộc phát. Hãy biến những kỹ năng được học thành bản năng một cách tự nhiên nhất.',
  },
  {
    key: 'document',
    Icon: FileText,
    title: 'Hai việc bạn làm ở đây.',
    body: 'Đưa vào một cuộc trò chuyện đã xảy ra để thấy nó đổi chiều ở đâu. Hoặc diễn tập một cuộc sắp tới với nhân vật phản ứng như người thật.',
  },
  {
    key: 'goal',
    Icon: Target,
    title: 'Mỗi phân tích sẽ kết thúc bằng một cam kết thay đổi nhỏ.',
    body: 'Thay đổi thói quen từng chút một để tạo ra hiệu quả lớn. Chúng ta không học từ việc trải nghiệm mà từ việc đúc kết từ những trải nghiệm đó.',
  },
];

function FeatureCards() {
  return (
    <View className="mt-1.5 flex-row gap-2.5">
      <View className="flex-1 gap-2 rounded-2xl border border-brand-ink/10 bg-brand-surface p-4">
        <View className="h-8 w-8 items-center justify-center rounded-[11px] bg-brand-card">
          <FileText size={20} color="#111111" />
        </View>
        <Text className="text-[15px] font-bold text-brand-ink">Phân tích</Text>
        <Text className="text-[13px] font-medium text-brand-ink/55">
          Cuộc đã xảy ra
        </Text>
      </View>
      <View className="flex-1 gap-2 rounded-2xl border border-brand-ink/10 bg-brand-surface p-4">
        <View className="h-8 w-8 items-center justify-center rounded-[11px] bg-brand-card">
          <View className="h-[15px] w-[9px] rounded-[5px] bg-brand-accent" />
        </View>
        <Text className="text-[15px] font-bold text-brand-ink">Luyện tập</Text>
        <Text className="text-[13px] font-medium text-brand-ink/55">
          Cuộc sắp tới
        </Text>
      </View>
    </View>
  );
}

export default function OnboardingScreen() {
  const editSetting = useEditSetting();
  const [index, setIndex] = useState(0);
  const [pageWidth, setPageWidth] = useState(Dimensions.get('window').width);
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);

  const isLast = index === PAGES.length - 1;
  const dismissOnboarding = () => editSetting({ showOnboarding: false });

  const goToIndex = (next: number) => {
    scrollRef.current?.scrollTo({ x: next * pageWidth, animated: true });
    setIndex(next);
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / pageWidth));
  };

  const handleNext = () => {
    if (isLast) {
      dismissOnboarding();
    } else {
      goToIndex(index + 1);
    }
  };

  return (
    <View
      className="flex-1 bg-brand-page"
      onLayout={e => setPageWidth(e.nativeEvent.layout.width)}
    >
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        <View className="h-9 flex-row items-center justify-between px-5">
          <Wordmark />
          {!isLast && (
            <Pressable
              accessibilityRole="button"
              onPress={dismissOnboarding}
              hitSlop={8}
            >
              <Text className="text-[13px] font-bold text-brand-ink/50">
                Bỏ qua
              </Text>
            </Pressable>
          )}
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumEnd}
        >
          {PAGES.map(page => (
            <View
              key={page.key}
              style={{ width: pageWidth }}
              className="justify-center gap-4 px-5 py-6"
            >
              <View className="h-14 w-14 items-center justify-center rounded-[20px] bg-brand-accent-tint">
                <page.Icon color="#FA6545" size={28} />
              </View>
              <Text className="mt-2 text-[28px] font-bold leading-[35px] tracking-[-0.02em] text-brand-ink">
                {page.title}
              </Text>
              <Text className="text-[15px] font-medium leading-6 text-brand-ink/72">
                {page.body}
              </Text>
              {page.key === 'document' && <FeatureCards />}
            </View>
          ))}
        </ScrollView>

        <View className="gap-4 px-5 pb-2">
          <View className="flex-row justify-center gap-[7px]">
            {PAGES.map((page, i) => (
              <View
                key={page.key}
                className={`h-1.5 rounded-full ${
                  i === index ? 'w-5 bg-brand-accent' : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </View>
          <PrimaryButton
            label={isLast ? 'Vào ứng dụng' : 'Tiếp'}
            onPress={handleNext}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
