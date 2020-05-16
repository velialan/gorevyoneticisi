/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
require('react-native').unstable_enableLogBox();
AppRegistry.registerComponent(appName, () => Router);
