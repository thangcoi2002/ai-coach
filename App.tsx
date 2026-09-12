/**
 * AiCoach
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { AppProviders } from './src/providers/AppProviders';
import { useIsDarkMode } from './src/context/ThemeProvider';
import RootNavigator from './src/navigation/RootNavigator';
import './global.css';

function AppContent() {
  const isDarkMode = useIsDarkMode();

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </>
  );
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;
