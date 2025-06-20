// src/components/AppointmentItem.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import {parseTimeToMinutes} from '../../utils/calendar'

import {Appointment} from '../../types/Appointment'
import {CALENDAR_SETTINGS} from '../сonstants/calendar'

type Props = {
  appointment: Appointment;
  left: number;
  width: number;
  getClientName?: (id: string) => string;
    // Callback для обновления записи
    // onMove?: (appointmentId: string, newDate: string, newStartMinute: number) => void;
    onMove?: (appointmentId: string, newStartMinute: number) => void;
};

const AppointmentItem = ({ appointment, left, width, getClientName, onMove}: Props) => {
  const translateX = useSharedValue(left);
  const translateY = useSharedValue(0);
  const stepPx = CALENDAR_SETTINGS.STEP_MINUTES * CALENDAR_SETTINGS.PIXELS_PER_MINUTE;
  // const minLeft = CALENDAR_SETTINGS.START_HOUR_VIEW * 60; // например, 8 * 60 = 480
  // const maxLeft = CALENDAR_SETTINGS.END_HOUR_VIEW * 60 - width; // например, 21 * 60 - width = 1260 - width

  const clampToStep = (value: number): number => {
    'worklet'; 
    if (stepPx <= 0 || isNaN(value)) {
      return value;
    }
    return Math.round(value / stepPx) * stepPx;
  };
  const dragGesture = Gesture.Pan()
    .onStart(() => {
      // Можно добавить эффект поднятия
      translateY.value = withSpring(-5);
    })
    // .onUpdate((event) => {
    //   translateX.value = event.translationX + left;
    //   translateY.value = event.translationY;
    // })
    .onUpdate((event) => {
      // const newX = translateX.value + event.translationX;
      const newX = event.translationX + left ;
      translateX.value = clampToStep(newX);
    })
    .onEnd(() => {
      // Возвращаем на место или сохраняем новую позицию
      translateY.value = withSpring(0);
      const newLeft = Math.round(translateX.value);
      const newStartMinute = Math.round(newLeft / CALENDAR_SETTINGS.PIXELS_PER_MINUTE);
      if (onMove && newStartMinute !== parseTimeToMinutes(appointment.start)) {
        onMove(appointment.id, newStartMinute);
      }
      console.log(`Запись ${appointment.id} перемещена на ${newLeft}px`);
      // Здесь можно вызвать onMove(appointment.id, newLeft)
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View
        style={[
          styles.appointment,
          {
            width: width,
            backgroundColor: appointment.status === 'confirmed' ? '#FF3B30' : '#50C878',
          },
          animatedStyle,
        ]}
      >
        <Text style={styles.title}>{appointment.title}</Text>
        {appointment.clientId && (
          <Text style={styles.client}>
            {getClientName?.(appointment.clientId)}
          </Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default AppointmentItem;

const styles = StyleSheet.create({
  appointment: {
    position: 'absolute',
    top: 0,
    height: CALENDAR_SETTINGS.SEGMENT_HEIGHT,
    borderRadius: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  client: {
    color: '#eee',
    fontSize: 10,
    marginTop: 4,
  },
});