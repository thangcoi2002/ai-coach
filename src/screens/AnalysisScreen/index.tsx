import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  ANALYSIS_ROUTES,
  MAIN_TAB_ROUTES,
  type AnalysisStackParamList,
  type MainTabParamList,
} from '@/navigation/routes';
import { brand } from '@/theme/colors';
import ConversationsStep from './ConversationsStep';
import UploadStep from './UploadStep';
import CtxStep from './CtxStep';
import ProcessingStep from './ProcessingStep';
import TranscriptStep from './TranscriptStep';
import ReportStep from './ReportStep';
import RedoStep from './RedoStep';

type TabNavigationProp = BottomTabNavigationProp<MainTabParamList, typeof MAIN_TAB_ROUTES.ANALYSIS>;
type StepNavigationProp = NativeStackNavigationProp<AnalysisStackParamList>;

const Stack = createNativeStackNavigator<AnalysisStackParamList>();

/** The two dark steps: slate full-bleed, light status bar, no tab bar. */
const FULL_BLEED_STEPS: readonly string[] = [ANALYSIS_ROUTES.PROCESSING, ANALYSIS_ROUTES.REDO];

type StepScreenProps = {
  route: { name: string };
  // Narrowed to what the frame actually uses: `screenLayout` hands over a union of
  // every step's navigation prop, and those differ in `setParams` by route params.
  navigation: Pick<StepNavigationProp, 'getParent' | 'getState' | 'popToTop'>;
  children: React.ReactNode;
};

/**
 * Frame every step is rendered in, since each one is now its own route. Applied once
 * as the navigator's `screenLayout` rather than wrapped around each screen by hand,
 * so which steps go full-bleed is stated once here instead of at seven call sites.
 */
function StepScreen({ route, navigation, children }: StepScreenProps) {
  const tabNavigation = navigation.getParent<TabNavigationProp>();
  const fullBleed = FULL_BLEED_STEPS.includes(route.name);
  const isFlowRoot = route.name === ANALYSIS_ROUTES.CONVERSATIONS;

  // `tabBarStyle` is the same screen option the *built-in* tab bar hides itself with;
  // CustomTabBar reads it back off the Analysis tab's own descriptor since ours is
  // custom. Restoring it on unmount is what brings the bar back when the step is popped.
  useEffect(() => {
    if (!fullBleed || !tabNavigation) {
      return;
    }
    tabNavigation.setOptions({ tabBarStyle: { display: 'none' } });
    return () => tabNavigation.setOptions({ tabBarStyle: undefined });
  }, [fullBleed, tabNavigation]);

  // CustomTabBar's navigate() is a no-op when this tab is already focused (see its
  // own `!isFocused` guard), but it still always emits `tabPress` — listen for that
  // to send a mid-flow user back to the list on re-tap. `isFocused()` at emit time
  // tells that apart from a genuine switch-in, which is still `false` mid-switch.
  useEffect(() => {
    if (!isFlowRoot || !tabNavigation) {
      return;
    }
    return tabNavigation.addListener('tabPress', () => {
      // Only when there is actually a step to pop: at the list itself the stack has
      // nothing to do with the action, and it would fall through to the navigators
      // above as an unhandled POP_TO_TOP.
      if (tabNavigation.isFocused() && navigation.getState().index > 0) {
        navigation.popToTop();
      }
    });
  }, [isFlowRoot, navigation, tabNavigation]);

  return (
    <View className={`flex-1 ${fullBleed ? 'bg-brand-night' : 'bg-brand-page'}`}>
      {/* Overrides App.tsx's global dark-content bar while a dark step is on top; RN
          merges by mount order, so popping the step reverts to it on its own. */}
      {fullBleed && <StatusBar barStyle="light-content" />}
      <SafeAreaView className="flex-1" edges={fullBleed ? ['top', 'bottom'] : ['top']}>
        {children}
      </SafeAreaView>
    </View>
  );
}

/**
 * The seven "Phân tích cuộc trò chuyện thật" screens (handoff section 04), as routes
 * of a stack nested in this tab — same as DiagnosticGateScreen, and for the same
 * reason: the OS back affordances pop a route, so steps held in component state got
 * torn off the tab entirely before any of them could step back.
 */
export default function AnalysisScreen() {
  const tabNavigation = useNavigation<TabNavigationProp>();

  const goHome = () => tabNavigation.navigate(MAIN_TAB_ROUTES.HOME);
  const goPractice = () => tabNavigation.navigate(MAIN_TAB_ROUTES.PRACTICE);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: brand.page } }}
      // Not a component defined during render, which is what the rule is guarding
      // against: it only forwards props to the module-level StepScreen, so React sees
      // the same element type every time and no subtree is torn down.
      // eslint-disable-next-line react/no-unstable-nested-components
      screenLayout={({ route, navigation, children }) => (
        <StepScreen route={route} navigation={navigation}>
          {children}
        </StepScreen>
      )}>
      <Stack.Screen name={ANALYSIS_ROUTES.CONVERSATIONS}>
        {({ navigation }) => (
          <ConversationsStep
            onUpload={() => navigation.navigate(ANALYSIS_ROUTES.UPLOAD)}
            onOpenAnalysis={() => navigation.navigate(ANALYSIS_ROUTES.REPORT)}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name={ANALYSIS_ROUTES.UPLOAD}>
        {({ navigation }) => (
          <UploadStep
            onBack={() => navigation.goBack()}
            onNext={() => navigation.navigate(ANALYSIS_ROUTES.CTX)}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name={ANALYSIS_ROUTES.CTX}>
        {({ navigation }) => (
          <CtxStep
            onBack={() => navigation.goBack()}
            // Submitting spends the upload and context steps, so processing replaces
            // the flow so far instead of stacking on it — backing out of processing
            // lands on the conversation list, not on a form that would resubmit.
            onNext={() =>
              navigation.reset({
                index: 1,
                routes: [
                  { name: ANALYSIS_ROUTES.CONVERSATIONS },
                  { name: ANALYSIS_ROUTES.PROCESSING },
                ],
              })
            }
          />
        )}
      </Stack.Screen>

      <Stack.Screen name={ANALYSIS_ROUTES.PROCESSING}>
        {({ navigation }) => (
          <ProcessingStep
            onWorkElsewhere={goHome}
            onDone={() => navigation.replace(ANALYSIS_ROUTES.TRANSCRIPT)}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name={ANALYSIS_ROUTES.TRANSCRIPT}>
        {({ navigation }) => (
          // Replaced, not pushed: the transcript is confirmed once, so leaving the
          // report belongs at the conversation list rather than back in it.
          <TranscriptStep onNext={() => navigation.replace(ANALYSIS_ROUTES.REPORT)} />
        )}
      </Stack.Screen>

      <Stack.Screen name={ANALYSIS_ROUTES.REPORT}>
        {({ navigation }) => (
          <ReportStep
            onBack={() => navigation.goBack()}
            onPractice={goPractice}
            onRehearse={momentIndex => navigation.navigate(ANALYSIS_ROUTES.REDO, { momentIndex })}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name={ANALYSIS_ROUTES.REDO}>
        {({ navigation, route }) => (
          <RedoStep
            momentIndex={route.params.momentIndex}
            onChangeMoment={momentIndex => navigation.setParams({ momentIndex })}
            onBack={() => navigation.goBack()}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
