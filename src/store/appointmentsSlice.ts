// src/store/appointmentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Appointment } from '../types/Appointment';

type State = {
  byId: Record<string, Appointment>;
  byDate: Record<string, string[]>;
};

const initialState: State = {
  byId: {},
  byDate: {},
};

const slice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments(state, action: PayloadAction<Appointment[]>) {
      const appointments = action.payload;

      state.byId = appointments.reduce((acc, appt) => {
        acc[appt.id] = appt;
        return acc;
      }, {} as Record<string, Appointment>);

      state.byDate = appointments.reduce((acc, appt) => {
        if (!acc[appt.date]) acc[appt.date] = [];
        acc[appt.date].push(appt.id);
        return acc;
      }, {} as Record<string, string[]>);
    },
    addAppointment(state, action: PayloadAction<Appointment>) {
      const appt = action.payload;
      state.byId[appt.id] = appt;

      if (!state.byDate[appt.date]) {
        state.byDate[appt.date] = [];
      }

      state.byDate[appt.date].push(appt.id);
    },
    updateAppointmentStart(state, action: PayloadAction<{ id: string; newStart: string }>) {
      const { id, newStart } = action.payload;
      state.byId[id] = {
        ...state.byId[id],
        start: newStart,
      };
    },
  },
});

export const { setAppointments, addAppointment, updateAppointmentStart } = slice.actions;
export default slice.reducer;