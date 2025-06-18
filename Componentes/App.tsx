import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './inicio';
import Registro from './registro';
import Tareas from './Tareas';

export type RootStackParamList = {
  Inicio: undefined;
  Registro: undefined;
  Tareas: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200EE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen 
          name="Registro" 
          component={Registro} 
          options={{ title: 'Registrarse' }}
        />
        <Stack.Screen 
          name="Tareas" 
          component={Tareas} 
          options={{ title: 'Mis Tareas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
