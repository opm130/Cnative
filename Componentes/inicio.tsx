import React from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import estilos from './Style';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootList } from './App';

type InicioScreen=StackNavigationProp<RootList,'Inicio'>

type Props={
    navigation: InicioScreen
 }

export default function Inicio({navigation}:Props){
    const handleIniciar=()=>{
        navigation.navigate('Tareas');
    }
     const handleRegistro=()=>{
        navigation.navigate('Registro');
    }
return(
    <ImageBackground
    source={require('../img/fondo.webp')}
    style={estilos.fondo}
    resizeMode="cover"
    >
        <View style={estilos.contenedor}>
            <Text style={estilos.letras}>Usuario</Text>
            <TextInput style={estilos.input}/>
            <Text style={estilos.letras}>Password</Text>
            <TextInput style={estilos.input}/>
            <View style={estilos.Abotones}>
                <TouchableOpacity style={estilos.boton} onPress={handleIniciar}>
                    <Text style={estilos.letras}>Iniciar</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={estilos.boton} onPress={handleRegistro}>
                    <Text style={estilos.letras}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);
}
