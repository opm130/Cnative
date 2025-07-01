import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import estilos from './Style';
import RenderItem from './Funcional';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  titulo: string;
  done: boolean;
  date: Date;
}

export default function Tareas() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const storeData = async (value: Task[]) => {
    try {
      await AsyncStorage.setItem('my-Todo', JSON.stringify(value));
    } catch (e) {
      console.log('Error storing data:', e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-Todo');
      if (value !== null) {
        const Tlocals = JSON.parse(value);
        // Convertir las fechas de string a Date object
        const tasksWithDates = Tlocals.map((task: any) => ({
          ...task,
          date: new Date(task.date)
        }));
        setTasks(tasksWithDates);
      }
    } catch (e) {
      console.log('Error getting data:', e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addTask = () => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa una tarea');
      return;
    }

    const tmp = [...tasks];
    const newTask: Task = {
      titulo: text.trim(),
      done: false,
      date: selectedDate
    };
    tmp.push(newTask);
    setTasks(tmp);
    storeData(tmp);
    setText('');
    setSelectedDate(new Date()); // Reset a fecha actual
  };

  const markDone = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(tu => tu.titulo === task.titulo);
    if (index !== -1) {
      tmp[index].done = !tmp[index].done;
      setTasks(tmp);
      storeData(tmp);
    }
  };

  const deleteF = (task: Task) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const tmp = [...tasks];
            const index = tmp.findIndex(tu => tu.titulo === task.titulo);
            if (index !== -1) {
              tmp.splice(index, 1);
              setTasks(tmp);
              storeData(tmp);
            }
          }
        }
      ]
    );
  };

  const onDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const onTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      // Combinar fecha actual con la nueva hora
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(time.getHours());
      newDateTime.setMinutes(time.getMinutes());
      setSelectedDate(newDateTime);
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.texto}>Mis Tareas</Text>
      
      <View style={estilos.Ctareas}>
        <TextInput 
          placeholder="Escriba su tarea" 
          style={estilos.input} 
          value={text} 
          onChangeText={(t: string) => setText(t)}
        />
        
        <TouchableOpacity 
          style={estilos.boton}
          onPress={addTask}
        >
          <Text style={estilos.letras}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Selectores de fecha y hora */}
      <View style={estilos.dateTimeContainer}>
        <TouchableOpacity 
          style={estilos.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={estilos.dateButtonText}>📅 Fecha</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={estilos.dateButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={estilos.dateButtonText}>🕐 Hora</Text>
        </TouchableOpacity>
      </View>

      <Text style={estilos.selectedDateTime}>
        Programado para: {formatDateTime(selectedDate)}
      </Text>

      {/* Lista de tareas */}
      <View style={estilos.taskListContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => `${item.titulo}-${index}`}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              markDone={markDone}
              deleteF={deleteF}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Selectores de fecha y hora */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="default"
          onChange={onTimeChange}
          is24Hour={true}
        />
      )}

      <Image source={require('../img/emoji.jpg')} style={estilos.emoji} />
    </View>
  );
}