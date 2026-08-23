/**
 * AiCoach
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { AppProviders } from './src/providers/AppProviders';
import RootNavigator from './src/navigation/RootNavigator';
import './global.css';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProviders>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigator />
    </AppProviders>
  );
}

export default App;
