import React,{useState}  from 'react';
import { View,Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import estilos from './Style';
import RenderItem from './Funcional';

const tasks = [
];
export interface Task{
  titulo:string,
  done:boolean,
  date:Date
}

export default function Tareas(){
  const [text,setText] = useState('');
  const [tasks,setTasks] = useState<Task[]>([])
  const addTask=()=>{
    const tmp=[...tasks]
    const newTask={
      titulo:text,
      done:false,
      date:new Date()
    }
    tmp.push(newTask)
    setTasks(tmp)
    setText('')
  }
  const markDone = ()=>{console.log('Marcado');};
  const deleteF = ()=>{console.log('Borrado');};
  return(
    <View style={estilos.contenedor}>
      <Text style={estilos.texto}>Mis tareas</Text>
      <View style={estilos.Ctareas}>
        <TextInput placeholder="Escriba" style={estilos.input} 
        value={text} onChangeText={(t:string)=>setText(t)}/>
        <TouchableOpacity style={estilos.boton}
        onPress={addTask}
        >
          <Text style={estilos.letras}>
            Agregar
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
        renderItem={({item})=>(
          <RenderItem
          item={item}
          markDone={markDone}
          deleteF={deleteF}
          />
        )}
      data={tasks}
        />
      </View>
      <Image source={require('../img/emoji.jpg')} style={estilos.emoji}/>
    </View>
  );
}
