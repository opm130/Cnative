import React from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import estilos from './Style';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

type InicioScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inicio'>;

type Props = {
  navigation: InicioScreenNavigationProp;
};
export default function Inicio({ navigation }: Props){
     const handleIniciar = () => {
    // Aquí puedes agregar lógica de validación antes de navegar
    navigation.navigate('Tareas');
  };

  const handleRegistrar = () => {
    navigation.navigate('Registro');
  };
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
                  <TouchableOpacity style={estilos.boton} onPress={handleIniciar}>
                    <Text style={estilos.letras}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);
}
