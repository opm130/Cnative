import React from "react";
import { View,Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";

const estilos=StyleSheet.create({
  contenedor:{
    width:'100%',
    height:500,
    padding:40,
  /*   backgroundColor:'blue' */
  },
  texto:{
    fontSize:50,
    color:'red'
  },
  input:{
    borderColor:'black',
    borderWidth:1.5,
    borderRadius:15,
    marginTop:20
  },
  emoji:{
    width:50,
    height:50
  },
  boton:{
    width:80,
    height:30,
    padding:3,
    backgroundColor:'green',
    borderColor:'black',
    borderWidth:1.5,
    borderRadius:10
  }
})
export default function App(){
  return(
    <View style={estilos.contenedor}>
      <Text style={estilos.texto}>Mis tareas</Text>
      <View >
        <TextInput placeholder="Escriba" style={estilos.input}/>
        <TouchableOpacity style={estilos.boton}>
          <Text>
            Agregar
          </Text>
        </TouchableOpacity>
      </View>
      <Image source={require('./img/emoji.jpg')} style={estilos.emoji}/>
    </View>
  )
}