import React from 'react';
import { View,Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import estilos from './Style';

const tasks = [{
  titulo:'Estudiar',
  done:false,
  date:new Date(),
},
{
  titulo:'Jugar',
  done:false,
  date:new Date(),
},
{
  titulo:'Caminar',
  done:false,
  date:new Date(),
},
];
interface Task{
  titulo:string,
  done:boolean,
  date:Date
}
function renderItem({item}:{item:Task}){
  return ( <View style={estilos.dataTasks}>
    <Text style={estilos.letras}>{item.titulo}</Text>
  </View>
  );}
export default function Tareas(){
  return(
    <View style={estilos.contenedor}>
      <Text style={estilos.texto}>Mis tareas</Text>
      <View style={estilos.Ctareas}>
        <TextInput placeholder="Escriba" style={estilos.input}/>
        <TouchableOpacity style={estilos.boton}>
          <Text style={estilos.letras}>
            Agregar
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
        renderItem={renderItem}
        data={tasks}
        />
      </View>
      <Image source={require('../img/emoji.jpg')} style={estilos.emoji}/>
    </View>
  );
}
