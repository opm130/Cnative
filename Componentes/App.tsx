import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './inicio';
import Registro from './registro';
import Tareas from './Tareas';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type RootStackParamList = {
  Inicio: undefined;
  Registro: undefined;
  Tareas: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute,setInitialRoute] = useState<'Inicio' | 'Tareas'>('Inicio');
  const [checkSesion,setCheckSesion] = useState(true);
  useEffect(()=>{
    const vS = async()=>{
      try{
        const usuario = await AsyncStorage.getItem('usuario');
        if(usuario){
          setInitialRoute('Tareas');
        }
      }
      catch(e){
        Alert.alert('No se pudo conectar al servidor');
      }
      finally{
        setCheckSesion(false);
      }
    };
    vS();
  },[]);
  if(checkSesion) {return null;}
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
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
