import React,{useState} from 'react';
import { Alert, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import estilos from './Style';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type InicioScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inicio'>;

type Props = {
  navigation: InicioScreenNavigationProp;
};
export default function Inicio({ navigation }: Props){
  const [usuario,setUsuario] = useState('');
  const [clave,setClave] = useState('');
  if(!usuario && !clave){
    Alert.alert('Error en credenciales');
    return;
  }
     const handleIniciar = async () => {
    if(!usuario && !clave){
      Alert.alert('Error en credenciales');
      return;
    }
  try{
    const res = await fetch('/',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({usuario,clave}),
    });
    const data = await res.json();
    if(res.ok && data.success){
      await AsyncStorage.setItem('usuario',JSON.stringify(data));
      navigation.replace('Tareas');
    }
    else{
      Alert.alert('Acceso denegado');
    }
  }
  catch(e){
    Alert.alert('No se pudo conectar al servidor');
  }
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
            <TextInput
            style={estilos.input}
            value={usuario}
            onChangeText={setUsuario}
            />
            <Text style={estilos.letras}>Password</Text>
            <TextInput
            style={estilos.input}
            value={clave}
            secureTextEntry
            onChangeText={setClave}
            />
            <View style={estilos.Abotones}>
                <TouchableOpacity
                style={estilos.boton}
                onPress={handleIniciar}
                >
                    <Text style={estilos.letras}>Iniciar</Text>
                </TouchableOpacity>
                  <TouchableOpacity
                  style={estilos.boton}
                  onPress={handleRegistrar}>
                    <Text style={estilos.letras}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);
}
