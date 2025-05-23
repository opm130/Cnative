import React from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import estilos from './Style';


export default function Inicio(){
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
                <TouchableOpacity style={estilos.boton}>
                    <Text style={estilos.letras}>Iniciar</Text>
                </TouchableOpacity>
                  <TouchableOpacity style={estilos.boton}>
                    <Text style={estilos.letras}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);
}
