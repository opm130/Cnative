import React from 'react';
import { View,Text, TouchableOpacity } from 'react-native';
import estilos from './Style';
import { Task } from './Tareas';

interface ItemProps{
    item:Task
    markDone:()=>void
    deleteF:()=>void
}
export default function RenderItem({item,markDone,deleteF}:ItemProps){
  return (
  <View style={estilos.dataTasks}>
    <TouchableOpacity onPress={markDone}>
    <Text style={item.done ? estilos.textDone:estilos.letras}>{item.titulo}</Text>
    <Text style={estilos.letras}>{item.date.toDateString()}</Text>
    </TouchableOpacity>
    {
      item.done &&
      (
        <TouchableOpacity style={estilos.botonEliminar} onPress={deleteF}>
          <Text style={estilos.BotonE}>Eliminar</Text>
        </TouchableOpacity>
      )
    }
  </View>
  )}
