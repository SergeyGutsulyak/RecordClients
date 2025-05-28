import { Appointment } from './Appointment';

export type AppointmentsByDay = {
  [date: string]: Appointment[];
};