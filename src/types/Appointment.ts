// src/types/Appointment.ts
export type Appointment = {
    id: string;
    start: string; // "09:00"
    duration: number; // in minutes
  };
  
  export type AppointmentsByDay = {
    [date: string]: Appointment[];
  };