import React, { useState } from 'react';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useSkills } from '@/context/SkillsProvider';
import {
  GATE_ROUTES,
  ROOT_ROUTES,
  type GateStackParamList,
  type RootStackParamList,
} from '@/navigation/routes';
import { brand } from '@/theme/colors';
import type { DiagnosisResult, GateMethod, MethodStepProps } from '@/types/diagnostic.type';
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

const Stack = createNativeStackNavigator<GateStackParamList>();

/** All four share MethodStepProps, so the gate renders whichever one the user picked. */
const METHOD_STEPS: Record<GateMethod, React.ComponentType<MethodStepProps>> = {
  report: ReportStep,
  survey: SurveyStep,
  media: MediaStep,
  role: RoleStep,
};

const METHOD_ROUTES: Record<GateMethod, keyof GateStackParamList> = {
  report: GATE_ROUTES.REPORT,
  survey: GATE_ROUTES.SURVEY,
  media: GATE_ROUTES.MEDIA,
  role: GATE_ROUTES.ROLE,
};

const GATE_METHODS = Object.keys(METHOD_STEPS) as GateMethod[];

/**
 * Diagnostic gate: pick a way to measure the user's level, then either land a
 * first-time signer-in in the app (no skill measured yet, no MAIN_TABS beneath this
 * screen to go back to) or return a "Đánh giá lại các kỹ năng" revisit to Home
 * (pushed on top of MAIN_TABS, so finishing just pops back).
 *
 * The steps are routes of a stack nested here rather than component state, so that
 * every back affordance — the chevron, Android back, the iOS swipe — pops one step
 * the same way. Held as state they could only be undone *after* the OS had already
 * torn the whole screen off, which showed as a flash out to Home and back.
 * Measurement results live here, above the nested stack, since the step that
 * produced them is gone by the time the result step reads them.
 */
export default function DiagnosticGateScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RouteProps>();
  const { skills, applyDiagnosisResult } = useSkills();
  // Asking to re-measure only counts as a revisit if there is an earlier measurement
  // to compare against — someone who skipped the gate gets the first-time copy.
  const hasMeasuredSkill = skills?.some(skill => (skill.currentLevel ?? 0) > 0) ?? false;
  const isRevisit = params?.mode === 'revisit' && hasMeasuredSkill;
  const [sourceLabel, setSourceLabel] = useState('');
  // Null until a step reports a real diagnosis result — report/media/role steps
  // aren't wired to the backend yet, so ResultStep falls back to mock skills then.
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const goToApp = () => {
    // Reached from Home there is a screen underneath to pop back to, keeping its tab
    // state; on first login this screen is the stack root, so the app has to be swapped in.
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({ index: 0, routes: [{ name: ROOT_ROUTES.MAIN_TABS }] });
    }
  };

  const saveLevel = () => {
    // Seeds the skills cache with what was just measured so Home renders it
    // immediately instead of waiting on its own GET /api/skills round-trip. The
    // backend already persisted the real result when the method step submitted it.
    if (diagnosisResult) {
      applyDiagnosisResult(diagnosisResult);
    }
    goToApp();
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: brand.page } }}>
      <Stack.Screen name={GATE_ROUTES.PICKER}>
        {({ navigation: stepNavigation }) => (
          <GateStep
            isRevisit={isRevisit}
            onPickMethod={method => stepNavigation.navigate(METHOD_ROUTES[method])}
            // The picker is this stack's root, so the OS back affordances fall through
            // to the root stack: on a revisit that pops to Home, exactly like this
            // exit. On first login this screen is the *root* stack's root too, so
            // there is nothing to fall through to and Android back leaves the app —
            // which is why GateStep only offers a chevron on a revisit.
            onExit={goToApp}
          />
        )}
      </Stack.Screen>

      {GATE_METHODS.map(method => {
        const MethodStep = METHOD_STEPS[method];
        return (
          <Stack.Screen key={method} name={METHOD_ROUTES[method]}>
            {({ navigation: stepNavigation }) => (
              <MethodStep
                onBack={() => stepNavigation.goBack()}
                onNext={(label, result) => {
                  setSourceLabel(label);
                  setDiagnosisResult(result ?? null);
                  // Reset rather than replace: the result is terminal — it shows the
                  // wordmark instead of a back chevron, and both its buttons lead into
                  // the app. Making it this stack's only route is what keeps the OS
                  // back affordances agreeing with that, by letting them fall through
                  // to the root stack the same way "Giữ mức cũ" does.
                  stepNavigation.reset({ index: 0, routes: [{ name: GATE_ROUTES.RESULT }] });
                }}
              />
            )}
          </Stack.Screen>
        );
      })}

      <Stack.Screen name={GATE_ROUTES.RESULT}>
        {() => (
          <ResultStep
            isRevisit={isRevisit}
            sourceLabel={sourceLabel}
            result={diagnosisResult}
            onSaveLevel={saveLevel}
            onKeepLevel={goToApp}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
