import { StyleSheet, Dimensions } from 'react-native';

const estilos = StyleSheet.create({

  fondo:{
   flex:1,
},
 contenedor:{
   flex:1,
    alignItems:'center',
    justifyContent:'center',
    gap:20,
  },
  letras:{
    fontSize:25,
    color:'white',
  },
  texto:{
    fontSize:50,
    color:'red',
  },
  input:{
    width:'80%',
    height:40,
    borderColor:'#1ea541 ',
    borderWidth:1.5,
    borderRadius:15,
    flex:1,
  },
  emoji:{
    width:50,
    height:50,
  },
  boton:{
    width:Dimensions.get('screen').width * 0.25,
    backgroundColor:'green',
    borderColor:'black',
    borderWidth:1.5,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },
  Ctareas:{
    flexDirection:'row',
    justifyContent:'space-between',
    gap:10,
    marginTop:10,
  },
  dataTasks:{
    paddingVertical:20,
    borderBottomColor:'#6f6f6f',
    borderBottomWidth:5,
  },
    Abotones:{
        flexDirection:'row',
        gap:30,
    },
    picker:{
          width:'80%',
          height:40,
          borderColor:'black',
          borderWidth:3,
          borderRadius:15,
          backgroundColor:'white',
        },
});
export default estilos;
