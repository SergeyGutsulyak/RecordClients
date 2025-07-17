// src/components/DraggableAppointmentItem.tsx
import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {Text, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { CALENDAR_SETTINGS } from '../сonstants/calendar';
import { Appointment } from '../types/Appointment';
import { RootState } from '../types/RootState';
import {
  startDragging,
  updatePosition,
  endDragging,
  clearDraggedAppointment,
} from '../store/draggedAppointmentSlice';
import {
    parseTimeToMinutes,
    formatMinutesToTime,
    detectDayFromPosition
} from '../utils/calendar'

type Props = {
  appointment: Appointment;
  date: string;
};

const DraggableAppointmentItem = ({ appointment, date }: Props) => {
  const dispatch = useDispatch();
  const { isDragging, draggedAppt } = useSelector((state: RootState) => state.dragged);

  const translateX = useSharedValue(parseTimeToMinutes(appointment.start));
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (draggedAppt && draggedAppt.id === appointment.id) {
      translateX.value = draggedAppt.left;
      translateY.value = draggedAppt.top;
    }
  }, [draggedAppt]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    opacity: isDragging && draggedAppt?.id !== appointment.id ? 0.5 : 1,
  }));

    // Создаем жест через новый API
    const pan = Gesture.Pan()
    .minDistance(1)
    .onBegin(() => {
    dispatch(
        startDragging({
        id: appointment.id,
        date,
        left: parseTimeToMinutes(appointment.start),
        top: 0,
        newDate: null,
        newStart: null,
        })
    );
    })
    .onUpdate(event => {
    if (!isDragging) return;

    translateX.value = event.translationX;
    translateY.value = event.translationY;

    dispatch(updatePosition({ dx: event.translationX, dy: event.translationY }));
    })
    .onEnd(() => {
    const newStartMinute = Math.round(translateX.value / CALENDAR_SETTINGS.PIXELS_PER_MINUTE);
    const newStart = formatMinutesToTime(newStartMinute);
    const newDate = detectDayFromPosition(translateX.value);

    dispatch(endDragging({ newDate, newStart }));
    });
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.appointment, animatedStyle]}>
        <Text>{appointment.title}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
    appointment: {
      position: 'absolute',
      height: CALENDAR_SETTINGS.SEGMENT_HEIGHT,
      width: 60, // можно сделать динамическим через duration
      backgroundColor: '#FF3B30', // красная запись
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      zIndex: 2,
    },
    text: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default DraggableAppointmentItem;

