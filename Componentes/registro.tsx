import React, { useState } from 'react';
import { Text, TextInput, View, ScrollView, ImageBackground, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import estilos from './Style';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App';

type InicioScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Inicio'>;

type Props = {
  navigation: InicioScreenNavigationProp;
};

export default function Registro({ navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('Cedula');
  const [nd, setNd] = useState('');
  const [telefono, setTelefono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  // Función para validar email
  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Función para limpiar el formulario
  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setTipoDocumento('Cedula');
    setNd('');
    setTelefono('');
    setUsuario('');
    setClave('');
  };

  const handleSubmit = async () => {
    // Validaciones
    if (!nombre || !email || !tipoDocumento || !nd || !telefono || !usuario || !clave) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return; // IMPORTANTE: agregar return
    }

    if (!validarEmail(email)) {
      Alert.alert('Error', 'Por favor ingrese un email válido');
      return;
    }

    if (nd.length < 6) {
      Alert.alert('Error', 'El número de documento debe tener al menos 6 dígitos');
      return;
    }

    if (telefono.length < 10) {
      Alert.alert('Error', 'El teléfono debe tener al menos 10 dígitos');
      return;
    }

    if (clave.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const res = await fetch('https://api-production-2965.up.railway.app/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          email,
          tipoDocumento,
          nd,
          telefono,
          usuario,
          clave,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Éxito', 'Usuario registrado correctamente', [
          {
            text: 'OK',
            onPress: () => {
              limpiarFormulario();
              navigation.navigate('Inicio');
            }
          }
        ]);
      } else {
        Alert.alert('Error al registrar', data.message || 'Error desconocido');
      }
    } catch (e) {
      console.error('Error de conexión:', e);
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <ImageBackground
      source={require('../img/fondo.webp')} // Usar la misma imagen del login
      style={estilos.fondo}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={estilos.contenedor}>
          <Text style={estilos.letras}>Nombre</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            style={estilos.input}
            placeholder="Ingrese su nombre completo"
          />

          <Text style={estilos.letras}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={estilos.input}
            keyboardType="email-address"
            placeholder="ejemplo@correo.com"
            autoCapitalize="none"
          />

          <Text style={estilos.letras}>Tipo de Documento</Text>
          <Picker
            selectedValue={tipoDocumento}
            style={estilos.input}
            onValueChange={(itemValue) => setTipoDocumento(itemValue)}
          >
            <Picker.Item label="Cédula" value="Cedula" />
            <Picker.Item label="Tarjeta de identidad" value="Tarjeta de identidad" />
            <Picker.Item label="Pasaporte" value="Pasaporte" />
          </Picker>

          <Text style={estilos.letras}>Número de documento</Text>
          <TextInput
            value={nd}
            onChangeText={setNd}
            style={estilos.input}
            keyboardType="numeric"
            placeholder="1234567890"
          />

          <Text style={estilos.letras}>Teléfono</Text>
          <TextInput
            value={telefono}
            onChangeText={setTelefono}
            style={estilos.input}
            keyboardType="phone-pad"
            placeholder="3001234567"
          />

          <Text style={estilos.letras}>Usuario</Text>
          <TextInput
            value={usuario}
            onChangeText={setUsuario}
            style={estilos.input}
            placeholder="Nombre de usuario"
            autoCapitalize="none"
          />

          <Text style={estilos.letras}>Password</Text>
          <TextInput
            value={clave}
            onChangeText={setClave}
            style={estilos.input}
            secureTextEntry
            placeholder="Mínimo 6 caracteres"
          />

          <View style={{ marginTop: 20 }}>
            <Button title="Registrar" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}