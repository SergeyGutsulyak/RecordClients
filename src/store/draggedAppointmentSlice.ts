// src/store/draggedAppointmentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DraggedAppointment = {
  id: string;
  title: string;
  duration: number;
  originalDate: string;
  newDate: string | null;
  newStart: string | null;
  left: number;
  top: number;
};

type State = {
  draggedAppt: DraggedAppointment | null;
  isDragging: boolean;
};

const initialState: State = {
  draggedAppt: null,
  isDragging: false,
};

const slice = createSlice({
  name: 'dragged',
  initialState,
  reducers: {
    startDragging(state, action: PayloadAction<{
      id: string;
      title: string;
      duration: number;
      date: string;
      left: number;
      top: number;
    }>) {
      const { id, title, duration, date, left, top } = action.payload;
      state.draggedAppt = {
        id,
        title,
        duration,
        originalDate: date,
        newDate: null,
        newStart: null,
        left,
        top,
      };
      state.isDragging = true;
      console.log('startDragging вызван', action.payload);
    },
    updatePosition(state, action: PayloadAction<{ dx: number; dy: number }>) {
      if (!state.draggedAppt) return;
      state.draggedAppt.left += action.payload.dx;
      state.draggedAppt.top += action.payload.dy;
    },
    endDragging(state, action: PayloadAction<{ newDate: string; newStart: string }>) {
      if (!state.draggedAppt) return;
      state.draggedAppt.newDate = action.payload.newDate;
      state.draggedAppt.newStart = action.payload.newStart;
      state.isDragging = false;
    },
    clearDragged(state) {
      state.draggedAppt = null;
      state.isDragging = false;
    },
  },
});

export const {
  startDragging,
  updatePosition,
  endDragging,
  clearDragged,
} = slice.actions;

export default slice.reducer;