// src/components/DraggableAppointmentItem.tsx
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../types/RootState';
import { updatePosition, endDragging } from '../store/draggedAppointmentSlice';
import { formatMinutesToTime, detectDayFromPosition } from '../utils/calendar';
import {CALENDAR_SETTINGS} from '../сonstants/calendar'
import { runOnJS } from 'react-native-reanimated';
const DraggableAppointmentItem = () => {
  const dispatch = useDispatch();
  const { draggedAppt, isDragging } = useSelector((state: RootState) => state.dragged);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  // const gestureRef = useRef<any>(null);
  // const panGesture = React.useRef(Gesture.Pan().manualActivation(true)).current;

  useEffect(() => {
    if (draggedAppt) {
      translateX.value = draggedAppt.left;
      translateY.value = draggedAppt.top;
      startX.value = draggedAppt.left;
      startY.value = draggedAppt.top;
    }
  }, [draggedAppt]);

  // const handleEndDragging = (
  //   dispatch: any,
  //   payload: { newDate: string; newStart: string }
  // ) => {
  //   dispatch(endDragging(payload));
  // };
  // React.useEffect(() => {
  //   panGesture
  //     .onUpdate((event) => {
  //       translateX.value = startX.value + event.translationX;
  //       translateY.value = startY.value + event.translationY;
  //     })
  //     .onEnd(() => {
  //       // const newStartMinute = Math.round(translateY.value / CALENDAR_SETTINGS.PIXELS_PER_MINUTE);
  //       // const newStart = formatMinutesToTime(newStartMinute);
  //       // const newDate = detectDayFromPosition(translateX.value);

  //       // runOnJS(() => {
  //       //   dispatch(endDragging({ newDate, newStart }));
  //       // })();
  //     });
  // }, []);

  const pan = Gesture.Pan()
  .manualActivation(true)
  .onUpdate((event) => {
    translateX.value = startX.value + event.translationX;
    translateY.value = startY.value + event.translationY;
  })
  .onEnd(() => {
    // const newStartMinute = Math.round(translateY.value / CALENDAR_SETTINGS.PIXELS_PER_MINUTE);
    // const newStart = formatMinutesToTime(newStartMinute);
    // const newDate = detectDayFromPosition(translateX.value);
    console.log('onEnd')
    // runOnJS(handleEndDragging)(dispatch, { newDate, newStart });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    position: 'absolute',
    zIndex: 1000,
  }));

  // useEffect(() => {
  //   if (isDragging) {
  //     const timer = setTimeout(() => {
  //       panGesture.activate();
  //       console.log('Pan активирован автоматически');
  //     }, 50);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isDragging]);

  if (!isDragging || !draggedAppt) return null;
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.draggedItem, animatedStyle]}>
        <Text style={styles.text}>{draggedAppt.title}</Text>
      </Animated.View>
    </GestureDetector>
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