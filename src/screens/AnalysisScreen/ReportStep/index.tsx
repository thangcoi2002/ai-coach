import React, { useEffect, useRef } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import BackButton from '@/components/BackButton';
import { ANALYSIS_REPORT } from '@/mock/analysis-report.mock';
import ScoreHero from './ScoreHero';
import HighlightCards from './HighlightCards';
import SkillsAccordion from './SkillsAccordion';
import ReplaySection from './ReplaySection';
import MomentsAccordion from './MomentsAccordion';
import NextStepCard from './NextStepCard';
import CommitCard from './CommitCard';

export type ReportPage = 0 | 1;

type Props = {
  /** Owned by AnalysisScreen, not local state: the redo step (reached from a page-1
   * moment) fully unmounts this screen, so which tab and moment were open would
   * otherwise reset every round trip through "Thử nói lại". */
  page: ReportPage;
  onChangePage: (page: ReportPage) => void;
  openMomentIndex: number;
  onChangeOpenMomentIndex: (momentIndex: number) => void;
  onBack: () => void;
  onPractice: () => void;
  onRehearse: (momentIndex: number) => void;
};

/** "Kết quả phân tích" — the two-tab report (Điểm và phân tích / Luyện lại). */
export default function ReportStep({
  page,
  onChangePage,
  openMomentIndex,
  onChangeOpenMomentIndex,
  onBack,
  onPractice,
  onRehearse,
}: Props) {
  const tabBarHeight = useBottomTabBarHeight();
  const report = ANALYSIS_REPORT;
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [page]);

  const openMomentOnTab2 = (momentIndex: number) => {
    onChangeOpenMomentIndex(momentIndex);
    onChangePage(1);
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
              onPress={() => onChangePage(index as ReportPage)}
              className="min-h-10 flex-1 items-center justify-center rounded-full"
              style={
                active
                  ? {
                      backgroundColor: '#FFFFFF',
                      shadowColor: '#0F172A',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.08,
                      shadowRadius: 8,
                      elevation: 1,
                    }
                  : undefined
              }>
              <Text
                className="text-[13px] font-semibold"
                style={{ color: active ? '#0F172A' : '#64748B' }}>
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
              onPress={() => onChangePage(1)}
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
              onToggle={index => onChangeOpenMomentIndex(openMomentIndex === index ? -1 : index)}
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
