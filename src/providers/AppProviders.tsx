import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppProvider';
import { composeProviders } from './composeProviders';

/**
 * Add new global providers here, outermost first.
 * Adding one does not add another nesting level in App.tsx.
 */
export const AppProviders = composeProviders([SafeAreaProvider, AppProvider]);
