/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './Componentes/App'
import Inicio from './Componentes/inicio';
import Registro from './Componentes/registro';
import Tareas from './Componentes/Tareas';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Tareas);
