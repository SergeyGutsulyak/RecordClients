// src/store/dateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  currentDate: string; // теперь строка!
};

const initialState: State = {
  currentDate: new Date().toISOString(), // например: "2025-07-05T11:45:33.268Z"
};

const slice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setCurrentDate(state, action: PayloadAction<string>) {
      state.currentDate = action.payload;
    },
    goToPreviousWeek(state) {
      const date = new Date(state.currentDate);
      date.setDate(date.getDate() - 7);
      state.currentDate = date.toISOString();
    },
    goToNextWeek(state) {
      const date = new Date(state.currentDate);
      date.setDate(date.getDate() + 7);
      state.currentDate = date.toISOString();
    },
    goToPreviousMonth(state) {
      const date = new Date(state.currentDate);
      date.setMonth(date.getMonth() - 1);
      state.currentDate = date.toISOString();
    },
    goToNextMonth(state) {
      const date = new Date(state.currentDate);
      date.setMonth(date.getMonth() + 1);
      state.currentDate = date.toISOString();
    },
    goToToday(state) {
      state.currentDate = new Date().toISOString();
    },
  },
});

export const {
  setCurrentDate,
  goToPreviousWeek,
  goToNextWeek,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
} = slice.actions;

export default slice.reducer;