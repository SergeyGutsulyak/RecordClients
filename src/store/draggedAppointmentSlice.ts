// src/store/draggedAppointmentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DraggedAppointment = {
  id: string;
  date: string;
  left: number;
  top: number;
  newDate: string | null;
  newStart: string | null;
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
    startDragging(state, action: PayloadAction<DraggedAppointment>) {
      state.draggedAppt = action.payload;
      state.isDragging = true;
    },
    updatePosition(state, action: PayloadAction<{ dx: number; dy: number }>) {
      if (!state.draggedAppt) return;

      const { dx, dy } = action.payload;
      state.draggedAppt.left += dx;
      state.draggedAppt.top += dy;
    },
    endDragging(state, action: PayloadAction<{ newDate: string; newStart: string }>) {
      if (!state.draggedAppt) return;

      const { id } = state.draggedAppt;
      const { newDate, newStart } = action.payload;

      // Сохраняем новую дату и время
      state.draggedAppt = {
        ...state.draggedAppt,
        newDate,
        newStart,
      };
      state.isDragging = false;
    },
    clearDraggedAppointment(state) {
      state.draggedAppt = null;
      state.isDragging = false;
    },
  },
});

export const {
  startDragging,
  updatePosition,
  endDragging,
  clearDraggedAppointment,
} = slice.actions;

export default slice.reducer;