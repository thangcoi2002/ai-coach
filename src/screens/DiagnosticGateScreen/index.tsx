import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useNavigation,
  usePreventRemove,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthProvider';
import { STARTING_SKILL } from '@/mock/result-skills.mock';
import { ROOT_ROUTES, type RootStackParamList } from '@/navigation/routes';
import type { DiagnosticStep, GateMethod, MethodStepProps } from '@/types/diagnostic.type';
import GateStep from './GateStep';
import ReportStep from './ReportStep';
import SurveyStep from './SurveyStep';
import MediaStep from './MediaStep';
import RoleStep from './RoleStep';
import ResultStep from './ResultStep';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROOT_ROUTES.DIAGNOSTIC_GATE
>;
type RouteProps = RouteProp<RootStackParamList, typeof ROOT_ROUTES.DIAGNOSTIC_GATE>;

/** All four share MethodStepProps, so the gate renders whichever one the user picked. */
const METHOD_STEPS: Record<GateMethod, React.ComponentType<MethodStepProps>> = {
  report: ReportStep,
  survey: SurveyStep,
  media: MediaStep,
  role: RoleStep,
};

/**
 * Diagnostic gate: pick a way to measure the user's level, then either land a
 * first-time signer-in in the app (`level` was null, no MAIN_TABS beneath this
 * screen to go back to) or return a "Đánh giá lại các kỹ năng" revisit to Home
 * (pushed on top of MAIN_TABS, so finishing just pops back). Steps are kept as
 * internal state (like LoginScreen's signin/otp split) rather than separate
 * routes, since nothing here needs to be deep-linked or to survive an unmount.
 */
export default function DiagnosticGateScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RouteProps>();
  const { user, updateUser } = useAuth();
  // Asking to re-measure only counts as a revisit if there is an earlier measurement
  // to compare against — someone who skipped the gate gets the first-time copy.
  const isRevisit = params?.mode === 'revisit' && user?.level != null;
  const [step, setStep] = useState<DiagnosticStep>('gate');
  const [sourceLabel, setSourceLabel] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Android back and the iOS swipe would pop the whole screen mid-measurement; send
  // the user to the method picker instead, matching each step's own chevron. Survey
  // is absent on purpose: its chevron steps back one question, so it prevents removal
  // itself rather than being dropped here and losing every answer given so far.
  const isMidFlow = step === 'report' || step === 'media' || step === 'role';
  usePreventRemove(isMidFlow, () => setStep('gate'));

  const goToApp = () => {
    // Reached from Home there is a screen underneath to pop back to, keeping its tab
    // state; on first login this screen is the stack root, so the app has to be swapped in.
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: ROOT_ROUTES.MAIN_TABS }] });
    }
  };

  const finishWithResult = (label: string) => {
    setSourceLabel(label);
    setStep('result');
  };

  const saveLevel = async () => {
    if (isSaving) {
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      await updateUser({ level: STARTING_SKILL.level });
      goToApp();
    } catch {
      // Staying put with a retry beats stranding the user: on first login this screen
      // is the stack root, so there is nowhere to go back to.
      setError('Không lưu được kết quả. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  const MethodStep = step === 'gate' || step === 'result' ? null : METHOD_STEPS[step];

  return (
    <View className="flex-1 bg-brand-page">
      <SafeAreaView className="flex-1" edges={['top', 'bottom']}>
        {step === 'gate' && (
          <GateStep isRevisit={isRevisit} onPickMethod={setStep} onExit={goToApp} />
        )}
        {MethodStep && <MethodStep onBack={() => setStep('gate')} onNext={finishWithResult} />}
        {step === 'result' && (
          <ResultStep
            isRevisit={isRevisit}
            sourceLabel={sourceLabel}
            onSaveLevel={saveLevel}
            onKeepLevel={goToApp}
            isSaving={isSaving}
            error={error}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
