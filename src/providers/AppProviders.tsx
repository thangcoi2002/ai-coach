import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/context/AuthProvider';
import { SettingProvider } from '@/context/SettingProvider';
import { NotificationProvider } from '@/context/NotificationProvider';
import { SkillsProvider } from '@/context/SkillsProvider';
import { HomeProvider } from '@/context/HomeProvider';
import { composeProviders } from './composeProviders';

/**
 * Add new global providers here, outermost first.
 * Adding one does not add another nesting level in App.tsx.
 */
export const AppProviders = composeProviders([
  SafeAreaProvider,
  SettingProvider,
  AuthProvider,
  SkillsProvider,
  HomeProvider,
  NotificationProvider,
]);
