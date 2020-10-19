/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {AppearanceProvider} from 'react-native-appearance';
import App from './App';
import {name as appName} from './app.json';

const RegistryApp = () => (
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);

AppRegistry.registerComponent(appName, () => RegistryApp);
