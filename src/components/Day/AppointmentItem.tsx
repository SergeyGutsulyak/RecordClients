// src/components/AppointmentItem.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {parseTimeToMinutes} from '../../utils/calendar'
import {Appointment} from '../../types/Appointment'
import { RootState } from '../../types/RootState';
import { startDragging } from '../../store/draggedAppointmentSlice';
import { runOnJS } from 'react-native-reanimated';

type Props = {
  appointment: Appointment;
  date: string;
};

const AppointmentItem = ({ appointment, date }: Props) => {
  const dispatch = useDispatch();
  const { isDragging } = useSelector((state: RootState) => state.dragged);
  const top = parseTimeToMinutes(appointment.start);
  const height = appointment.duration;

  const longPress = Gesture.LongPress()
    .minDuration(300)
    .onStart(() => {
      console.log('Долгое нажатие')
      try {
        runOnJS(()=>{
          dispatch(
          startDragging({
              id: appointment.id,
              title: appointment.title,
              duration: appointment.duration,
              date,
              left: 100,
              top: 500,
            })
          );
    })();
      } catch (e){
        console.log(e)
      }
      
    });

  return (
    <GestureDetector gesture={longPress}>
      <View 
        style={[styles.appointment, { top, height}]}>
        <Text style={styles.title}>{appointment.title}</Text>
        <Text style={styles.time}>{appointment.start}</Text>
      </View>
    </GestureDetector>
  );
};

export default AppointmentItem;

const styles = StyleSheet.create({
  appointment: {
    position: 'absolute',
    backgroundColor: '#FF3B30', // основной цвет записи
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    zIndex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    fontSize: 10,
  },
});