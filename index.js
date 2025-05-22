/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Inicio from './inicio'
import Registro from './registro'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Registro);
