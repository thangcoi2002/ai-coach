import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MAIN_TAB_ROUTES, type MainTabParamList } from '@/navigation/routes';
import ConversationsStep from './ConversationsStep';
import UploadStep from './UploadStep';
import CtxStep from './CtxStep';
import ProcessingStep from './ProcessingStep';
import TranscriptStep from './TranscriptStep';
import ReportStep, { type ReportPage } from './ReportStep';
import RedoStep from './RedoStep';

/**
 * The seven "Phân tích cuộc trò chuyện thật" screens (handoff section 04), kept as
 * internal state rather than routes — same reasoning as DiagnosticGateScreen: nothing
 * here needs to be deep-linked, and the tab bar should stay put under most of it.
 * Only `processing` and `redo` go full-bleed and hide the tab bar; every other step
 * shows it, matching the design.
 */
type Step = 'conversations' | 'upload' | 'ctx' | 'processing' | 'transcript' | 'analysis' | 'redo';

type NavigationProp = BottomTabNavigationProp<MainTabParamList, typeof MAIN_TAB_ROUTES.ANALYSIS>;

export default function AnalysisScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState<Step>('conversations');
  const [redoMomentIndex, setRedoMomentIndex] = useState(0);
  // Owned here, not inside ReportStep: leaving it for the redo step (reached from a
  // page-1 moment) unmounts ReportStep, so this would otherwise reset to page 0 and
  // lose which moment was open every time the user comes back from "Thử nói lại".
  const [reportPage, setReportPage] = useState<ReportPage>(0);
  const [reportOpenMomentIndex, setReportOpenMomentIndex] = useState(-1);

  const isFullBleed = step === 'processing' || step === 'redo';

  // `tabBarStyle` is the same screen option the *built-in* tab bar hides itself
  // with; CustomTabBar reads it back off this screen's own descriptor since ours
  // is custom. No cleanup needed on blur: CustomTabBar only ever looks at the
  // currently *focused* route's option, so switching tabs away is enough on its own.
  useEffect(() => {
    navigation.setOptions({ tabBarStyle: isFullBleed ? { display: 'none' } : undefined });
  }, [isFullBleed, navigation]);

  // Fully leaving the report (not just detouring through redo) should hand back a
  // clean report next time — otherwise re-opening it later would resume wherever
  // the user last left it, which reads as if it forgot to load fresh.
  const goToConversations = () => {
    setStep('conversations');
    setReportPage(0);
    setReportOpenMomentIndex(-1);
  };

  // CustomTabBar's navigate() is a no-op when this tab is already focused (see its
  // own `!isFocused` guard), but it still always emits `tabPress` — listen for that
  // to send a mid-flow user back to the list on re-tap. `isFocused()` at emit time
  // tells that apart from a genuine switch-in, which is still `false` mid-switch.
  useEffect(() => {
    return navigation.addListener('tabPress', () => {
      if (navigation.isFocused()) {
        // Inlined rather than calling goToConversations(): that function is
        // recreated every render, so depending on it here would mean
        // resubscribing on every render instead of just when `navigation` changes.
        setStep('conversations');
        setReportPage(0);
        setReportOpenMomentIndex(-1);
      }
    });
  }, [navigation]);

  const goRedo = (momentIndex: number) => {
    setRedoMomentIndex(momentIndex);
    setStep('redo');
  };

  const goPractice = () => navigation.navigate(MAIN_TAB_ROUTES.PRACTICE);
  const goHome = () => navigation.navigate(MAIN_TAB_ROUTES.HOME);

  return (
    <View className={`flex-1 ${isFullBleed ? 'bg-[#0F172A]' : 'bg-brand-page'}`}>
      {/* Overrides App.tsx's global dark-content bar for these dark steps; reverts
          to it automatically once this unmounts (RN's StatusBar merges by mount
          order, same trick LoginScreen uses for its own screen). */}
      <StatusBar barStyle={isFullBleed ? 'light-content' : 'dark-content'} />
      <SafeAreaView className="flex-1" edges={isFullBleed ? ['top', 'bottom'] : ['top']}>
        {step === 'conversations' && (
          <ConversationsStep onUpload={() => setStep('upload')} onOpenAnalysis={() => setStep('analysis')} />
        )}
        {step === 'upload' && (
          <UploadStep onBack={() => setStep('conversations')} onNext={() => setStep('ctx')} />
        )}
        {step === 'ctx' && (
          <CtxStep onBack={() => setStep('upload')} onNext={() => setStep('processing')} />
        )}
        {step === 'processing' && (
          <ProcessingStep onWorkElsewhere={goHome} onDone={() => setStep('transcript')} />
        )}
        {step === 'transcript' && <TranscriptStep onNext={() => setStep('analysis')} />}
        {step === 'analysis' && (
          <ReportStep
            page={reportPage}
            onChangePage={setReportPage}
            openMomentIndex={reportOpenMomentIndex}
            onChangeOpenMomentIndex={setReportOpenMomentIndex}
            onBack={goToConversations}
            onPractice={goPractice}
            onRehearse={goRedo}
          />
        )}
        {step === 'redo' && (
          <RedoStep
            momentIndex={redoMomentIndex}
            onChangeMoment={setRedoMomentIndex}
            onBack={() => setStep('analysis')}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
