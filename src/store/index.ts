// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice';
import dateReducer from './dateSlice';
import draggedReducer from './draggedAppointmentSlice';
export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    date: dateReducer,
    dragged: draggedReducer,
  },
});