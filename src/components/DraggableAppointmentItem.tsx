// src/components/DraggableAppointmentItem.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { CALENDAR_SETTINGS } from '../сonstants/calendar';
import { useSelector } from 'react-redux';
import { RootState } from '../types/RootState';

const DraggableAppointmentItem = () => {
  const { draggedAppt, isDragging } = useSelector((state: RootState) => state.dragged);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Синхронизация с Redux
  useEffect(() => {
    if (draggedAppt) {
      translateX.value = draggedAppt.left;
      translateY.value = draggedAppt.top;
    }
  }, [draggedAppt]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    position: 'absolute',
    zIndex: 1000,
  }));

  if (!isDragging || !draggedAppt) return null;

  return (
    <Animated.View style={[styles.draggedItem, animatedStyle]}>
      <Text style={styles.text}>{draggedAppt.title}</Text>
    </Animated.View>
  );
};

export default DraggableAppointmentItem;

const styles = StyleSheet.create({
  draggedItem: {
    width: 60,
    height: 60,
    backgroundColor: '#FF9999',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});