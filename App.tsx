import { GluestackUIProvider } from '@gluestack-ui/themed';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { config } from './gluestack.config';
import NavigationContainer from './src/navigation';
import { store } from './src/store';

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
