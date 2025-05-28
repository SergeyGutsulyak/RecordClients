// src/types/Appointment.ts
export type Appointment = {
  id: string;
  start: string; // "10:00"
  duration: number; // in minutes
  clientId: string | null;
  title: string;
  type: string;
  status: string;
  notes?: string;
};
  
  export type AppointmentsByDay = {
    [date: string]: Appointment[];
  };