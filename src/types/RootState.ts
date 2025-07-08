// src/types/RootState.ts
import { Appointment } from './Appointment';

export type RootState = {
  appointments: {
    byId: Record<string, Appointment>;
    byDate: Record<string, string[]>;
  };
  date: {
    currentDate: Date;
  };
};