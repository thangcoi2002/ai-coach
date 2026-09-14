/**
 * AiCoach
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { AppProviders } from './src/providers/AppProviders';
import RootNavigator from './src/navigation/RootNavigator';
import './global.css';

function App() {
  return (
    <AppProviders>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </AppProviders>
  );
}

export default App;
