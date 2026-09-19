import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import BackButton from '@/components/BackButton';
import { ANALYSIS_REPORT } from '@/mock/analysis-report.mock';
import { brand } from '@/theme/colors';
import ScoreHero from './ScoreHero';
import HighlightCards from './HighlightCards';
import SkillsAccordion from './SkillsAccordion';
import ReplaySection from './ReplaySection';
import MomentsAccordion from './MomentsAccordion';
import NextStepCard from './NextStepCard';
import CommitCard from './CommitCard';

export type ReportPage = 0 | 1;

/** The open tab sits raised on white; the other one lets the track show through. */
const activeTabStyle = {
  backgroundColor: brand.surface,
  shadowColor: brand.night,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 1,
};
const TAB_LABEL_COLORS = { active: brand.night, inactive: brand.mute };

type Props = {
  onBack: () => void;
  onPractice: () => void;
  onRehearse: (momentIndex: number) => void;
};

/**
 * "Kết quả phân tích" — the two-tab report (Điểm và phân tích / Luyện lại).
 *
 * Which tab and moment are open is local state: the redo step is pushed on top of
 * this one rather than replacing it, so a round trip through "Thử nói lại" comes
 * back to the report exactly as it was left.
 */
export default function ReportStep({ onBack, onPractice, onRehearse }: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  const report = ANALYSIS_REPORT;
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [page, setPage] = useState<ReportPage>(0);
  const [openMomentIndex, setOpenMomentIndex] = useState(-1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [page]);

  const openMomentOnTab2 = (momentIndex: number) => {
    setOpenMomentIndex(momentIndex);
    setPage(1);
  };

  return (
    <View className="flex-1">
      <View className="h-[34px] flex-row items-center px-5">
        <View className="w-6">
          <BackButton onPress={onBack} />
        </View>
        <Text className="flex-1 text-center text-[15px] font-bold text-brand-ink">
          Kết quả phân tích
        </Text>
        <View className="w-6" />
      </View>

      <View className="mx-5 mt-3.5 flex-row rounded-full bg-black/[0.06] p-1">
        {(['Điểm và phân tích', 'Luyện lại'] as const).map((label, index) => {
          const active = page === index;
          return (
            <Pressable
              key={label}
              accessibilityRole="button"
              onPress={() => setPage(index as ReportPage)}
              className="min-h-10 flex-1 items-center justify-center rounded-full"
              style={active ? activeTabStyle : undefined}>
              <Text
                className="text-[13px] font-semibold"
                style={{ color: active ? TAB_LABEL_COLORS.active : TAB_LABEL_COLORS.inactive }}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="gap-3.5 px-5 pt-3.5"
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
        showsVerticalScrollIndicator={false}>
        {page === 0 ? (
          <>
            <ScoreHero report={report} />
            <HighlightCards report={report} />
            <SkillsAccordion skills={report.skills} onOpenMoment={openMomentOnTab2} />
            <ReplaySection report={report} onOpenMoment={openMomentOnTab2} />
            <Pressable
              accessibilityRole="button"
              onPress={() => setPage(1)}
              className="min-h-[54px] flex-row items-center justify-center gap-2 rounded-full bg-brand-ink">
              <Text className="text-[15px] font-semibold text-white">Sang phần luyện lại </Text>
              <Text className="text-[15px] font-semibold text-brand-accent">→</Text>
            </Pressable>
          </>
        ) : (
          <>
            <MomentsAccordion
              moments={report.moments}
              themName={report.themName}
              openIndex={openMomentIndex}
              onToggle={index => setOpenMomentIndex(openMomentIndex === index ? -1 : index)}
              onRehearse={onRehearse}
            />
            <NextStepCard next={report.next} onPractice={onPractice} />
            <CommitCard text={report.next.head} themName={report.themName} />
          </>
        )}
      </ScrollView>
    </View>
  );
}
