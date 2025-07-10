import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert, AppState } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import estilos from './Style';
import RenderItem from './Funcional';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  titulo: string;
  done: boolean;
  date: Date;
  id: string; // Agregamos ID único para cada tarea
  notificationId?: number; // ID de la notificación programada
}

export default function Tareas() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Configurar notificaciones para Android
  useEffect(() => {
    // Configuración inicial de notificaciones
    PushNotification.configure({
      onNotification: function(notification:any) {
        console.log('NOTIFICATION:', notification);
        // Cuando se recibe una notificación, actualizar el estado de las tareas
        if (notification.data && notification.data.taskId) {
          checkAndUpdateOverdueTasks();
        }
      },
      requestPermissions: false, // Solo Android
    });

    // Crear canal de notificación para Android
    PushNotification.createChannel(
      {
        channelId: 'task-reminders',
        channelName: 'Recordatorios de Tareas',
        channelDescription: 'Notificaciones para tareas programadas',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created:boolean) => console.log(`Canal ${created ? 'creado' : 'ya existía o falló al crearse'}`)
    );

    getData();

    // Listener para cuando la app vuelve al primer plano
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        checkAndUpdateOverdueTasks();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription?.remove();
    };
  }, []);

  // Verificar y actualizar tareas vencidas
  const checkAndUpdateOverdueTasks = async () => {
    try {
      const value = await AsyncStorage.getItem('my-Todo');
      if (value !== null) {
        const storedTasks = JSON.parse(value);
        const tasksWithDates = storedTasks.map((task: any) => ({
          ...task,
          date: new Date(task.date),
        }));

        // Forzar re-render para actualizar estados
        setTasks([...tasksWithDates]);
      }
    } catch (e) {
      console.log('Error checking overdue tasks:', e);
    }
  };

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
        const tasksWithDates = Tlocals.map((task: any) => ({
          ...task,
          date: new Date(task.date),
        }));
        setTasks(tasksWithDates);
      }
    } catch (e) {
      console.log('Error getting data:', e);
    }
  };

  // Programar notificación para una tarea
  const scheduleNotification = (task: Task) => {
    const now = new Date();
    const taskDate = task.date;

    // Solo programar si la fecha es futura
    if (taskDate > now) {
      const notificationId = Math.floor(Math.random() * 1000000); // ID único

      PushNotification.localNotificationSchedule({
        id: notificationId,
        channelId: 'task-reminders',
        title: '⏰ Recordatorio de Tarea',
        message: `Es hora de: ${task.titulo}`,
        date: taskDate,
        data: {
          taskId: task.id,
          taskTitle: task.titulo,
        },
        allowWhileIdle: true,
        repeatType: undefined,
      });

      return notificationId;
    }
    return undefined;
  };

  // Cancelar notificación
  const cancelNotification = (notificationId: number) => {
    PushNotification.cancelLocalNotification({ id: notificationId.toString() });
  };

  // Generar ID único para tareas
  const generateTaskId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addTask = () => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa una tarea');
      return;
    }

    const tmp = [...tasks];
    const taskId = generateTaskId();
    const newTask: Task = {
      id: taskId,
      titulo: text.trim(),
      done: false,
      date: selectedDate,
    };

    // Programar notificación
    const notificationId = scheduleNotification(newTask);
    if (notificationId) {
      newTask.notificationId = notificationId;
    }

    tmp.push(newTask);
    setTasks(tmp);
    storeData(tmp);
    setText('');
    setSelectedDate(new Date());

    // Mostrar confirmación
    if (notificationId) {
      Alert.alert(
        'Tarea Agregada',
        `La tarea "${newTask.titulo}" ha sido programada para ${formatDateTime(selectedDate)}`
      );
    }
  };

  const markDone = (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex(tu => tu.id === task.id);
    if (index !== -1) {
      tmp[index].done = !tmp[index].done;

      // Si se marca como completada, cancelar la notificación
      if (tmp[index].done && tmp[index].notificationId) {
        cancelNotification(tmp[index].notificationId);
      }
      // Si se desmarca, reprogramar la notificación si la fecha es futura
      else if (!tmp[index].done) {
        const notificationId = scheduleNotification(tmp[index]);
        if (notificationId) {
          tmp[index].notificationId = notificationId;
        }
      }

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
            const index = tmp.findIndex(tu => tu.id === task.id);
            if (index !== -1) {
              // Cancelar notificación antes de eliminar
              if (task.notificationId) {
                cancelNotification(task.notificationId);
              }
              tmp.splice(index, 1);
              setTasks(tmp);
              storeData(tmp);
            }
          },
        },
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
      minute: '2-digit',
    });
  };

  // Función para testear notificaciones (opcional)
  const testNotification = () => {
    PushNotification.localNotification({
      channelId: 'task-reminders',
      title: '🧪 Prueba de Notificación',
      message: 'Las notificaciones están funcionando correctamente',
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

      {/* Botón de prueba (opcional, puedes eliminarlo después) */}
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={[estilos.boton, { backgroundColor: '#2196F3', marginVertical: 10 }]}
        onPress={testNotification}
      >
        <Text style={estilos.letras}>🧪 Probar Notificación</Text>
      </TouchableOpacity>

      {/* Lista de tareas */}
      <View style={estilos.taskListContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
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
