import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import estilos from './Style';

// Actualizada la interfase Task
export interface Task {
  id: string;
  titulo: string;
  done: boolean;
  date: Date;
  notificationId?: number;
}

interface ItemProps {
  item: Task;
  markDone: (task: Task) => void;
  deleteF: (task: Task) => void;
}

export default function RenderItem({ item, markDone, deleteF }: ItemProps) {
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = () => {
    return new Date() > item.date && !item.done;
  };

  const getStatusText = () => {
    if (item.done) return '✅ Completada';
    if (isOverdue()) return '⏰ Vencida';
    return '⏳ Pendiente';
  };

  const getStatusStyle = () => {
    if (item.done) return estilos.statusCompleted;
    if (isOverdue()) return estilos.statusOverdue;
    return estilos.statusPending;
  };

  return (
    <View style={[estilos.dataTasks, isOverdue() && estilos.overdueTask]}>
      <TouchableOpacity 
        style={estilos.taskContent}
        onPress={() => markDone(item)}
      >
        <Text style={item.done ? estilos.textDone : estilos.letras}>
          {item.titulo}
        </Text>
        
        <Text style={estilos.dateText}>
          📅 {formatDateTime(item.date)}
        </Text>
        
        <Text style={[estilos.statusText, getStatusStyle()]}>
          {getStatusText()}
        </Text>

        {/* Indicador de notificación programada */}
        {!item.done && item.date > new Date() && (
          <Text style={estilos.notificationIndicator}>
            🔔 Notificación programada
          </Text>
        )}
      </TouchableOpacity>
      
      {item.done && (
        <TouchableOpacity 
          style={estilos.botonEliminar} 
          onPress={() => deleteF(item)}
        >
          <Text style={estilos.BotonE}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}