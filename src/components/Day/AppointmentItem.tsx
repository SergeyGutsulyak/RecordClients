// src/components/AppointmentItem.tsx
import React, {useRef, useEffect} from 'react';
import { Dimensions } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {parseTimeToMinutes} from '../../utils/calendar'
import {Appointment} from '../../types/Appointment'
import { RootState } from '../../types/RootState'
import {CALENDAR_SETTINGS} from '../../сonstants/calendar'
import {formatMinutesToTime, detectDayFromPosition} from '../../utils/calendar'

type Props = {
  appointment: Appointment;
  date: string;
  dayIndex:number;
};

const AppointmentItem = ({ appointment, date, dayIndex }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { isDragging } = useSelector((state: RootState) => state.dragged);

  const top = parseTimeToMinutes(appointment.start);
  const height = appointment.duration;
  // Анимированные координаты
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Начальная позиция
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    opacity: isDragging ? 0.7 : 1,
  }));

  const pan = Gesture.Pan()
    .onStart(()=> {
      // console.log('Start')
      // ref.current?.measure((x, y, w, h, pageX, pageY) => {
      //   // Устанавливаем начальную позицию
      //   startX.value = pageX;
      //   startY.value = pageY;
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
  .onEnd(() => {
    const newY = startY.value + translateY.value;
    const newStartMinute = Math.round(newY / CALENDAR_SETTINGS.PIXELS_PER_MINUTE);
    console.log((top + newStartMinute)/60)
  });
  
  return (
    <GestureDetector gesture={pan}>
      <Animated.View 
        ref={ref}
        style={[styles.appointment, animatedStyle, { top, height}]}>
        <Text style={styles.title}>{appointment.title}</Text>
        <Text style={styles.time}>{appointment.start}</Text>
      </Animated.View>
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