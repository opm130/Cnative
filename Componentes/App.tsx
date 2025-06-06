import React from "react";
import Inicio from './inicio';
import Registro from "./registro";
import Tareas from "./Tareas";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

export type RootList={
  Inicio:undefined
  Registro:undefined
  Tareas:undefined
}

const Ruta=createStackNavigator<RootList>();

export default function App(){
  return(
    <NavigationContainer>
      <Ruta.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle:{
          backgroundColor:'red',
        },
        headerTintColor:'black',
        headerTitleStyle:{
          fontWeight:'bold',
        },
      }}
      >
      <Ruta.Screen
      name="Inicio"
      component={Inicio}
      options={{title:'Frame de inicio'}}
      />
      <Ruta.Screen
      name="Registro"
      component={Registro}
      options={{title:'Frame de registro'}}
      />
      <Ruta.Screen
      name="Tareas"
      component={Tareas}
      options={{title:'Frame de tareas'}}
      />
      </Ruta.Navigator>
    </NavigationContainer>
  );
}
