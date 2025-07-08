// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './appointmentsSlice';
import dateReducer from './dateSlice';
export const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    date: dateReducer,
  },
});