import React from 'react';
import { Provider } from 'react-redux';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './gluestack.config';
import { store } from './src/store';
import NavigationContainer from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <NavigationContainer />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </Provider>
  );
}
