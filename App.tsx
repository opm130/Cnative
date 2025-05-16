import React from "react";
import { View,Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, FlatList } from "react-native";

const estilos=StyleSheet.create({
  contenedor:{
    width:'100%',

    padding:40,
    
  },
  texto:{
    fontSize:50,
    color:'red'
  },
  input:{
    borderColor:'black',
    borderWidth:1.5,
    borderRadius:15,
    flex:1
  },
  emoji:{
    width:50,
    height:50
  },
  boton:{
    width:Dimensions.get("screen").width*0.25,
    backgroundColor:'green',
    borderColor:'black',
    borderWidth:1.5,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center'
  },
  Ctareas:{
    flexDirection:'row',
    justifyContent:'space-between',
    gap:10,
    marginTop:10
  },
  dataTasks:{
    paddingVertical:20,
    borderBottomColor:'#6f6f6f',
    borderBottomWidth:5
  },
  letras:{
    fontSize:20,
    color:'black'
  }
})
const tasks=[{
  titulo:"Estudiar",
  done:false,
  date:new Date()
},
{
  titulo:"Jugar",
  done:false,
  date:new Date()
},
{
  titulo:"Caminar",
  done:false,
  date:new Date()
}
]
interface Task{
  titulo:string,
  done:boolean,
  date:Date
}
function renderItem({item}:{item:Task}){
  return ( <View style={estilos.dataTasks}>
    <Text style={estilos.letras}>{item.titulo}</Text>
  </View>
  )}
export default function App(){
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
      <Image source={require('./img/emoji.jpg')} style={estilos.emoji}/>
    </View>
  )
}
  