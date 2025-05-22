/*
Nombre
Correo
TD
Documento
Telefono
Usuario
Clave
*/ 
import React from "react";
import { Text, TextInput, View,StyleSheet,Dimensions,ScrollView } from "react-native";
import {Picker} from '@react-native-picker/picker';

const estilos=StyleSheet.create({
fondo:{
   flex:1
},
contenedor:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    gap:20
},
letras:{
    fontSize:25,
    color:'white'
  },
  input:{
    width:'80%',
    height:40,
    borderColor:'black',
    borderWidth:3,
    borderRadius:15
  },
  boton:{
      width:Dimensions.get("screen").width*0.30,
      backgroundColor:'green',
      borderColor:'black',
      borderWidth:1.5,
      borderRadius:10,
      justifyContent:'center',
      alignItems:'center'
    },
    Abotones:{
        flexDirection:'row',
        gap:30
    }
})
export default function Registro(){
    return(
    <View>
        <ScrollView>
        <Text style={estilos.letras}>Nombre</Text>
        <TextInput style={estilos.input}/>

        <Text>Email</Text>
        <TextInput keyboardType="email-address"/>

        <Text>Tipo de documento</Text>
        <Picker>
            <Picker.Item label="Cedula"/>
            <Picker.Item label="Tarjeta"/>
            <Picker.Item label="Pasaporte"/>
        </Picker>
        </ScrollView>
    </View>
    )
}