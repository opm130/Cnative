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

  const handleIniciar = async () => {
    // Validación solo cuando se presiona el botón
    if(!usuario || !clave){
      Alert.alert('Error', 'Por favor ingrese usuario y contraseña');
      return;
    }
    
    try{
      const res = await fetch('https://api-production-2965.up.railway.app/login',{
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
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    }
    catch(e){
      console.error('Error de conexión:', e);
      Alert.alert('Error', 'No se pudo conectar al servidor');
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
          placeholder="Ingrese su usuario"
        />
        <Text style={estilos.letras}>Password</Text>
        <TextInput
          style={estilos.input}
          value={clave}
          secureTextEntry
          onChangeText={setClave}
          placeholder="Ingrese su contraseña"
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
            onPress={handleRegistrar}
          >
            <Text style={estilos.letras}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}