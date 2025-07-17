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
  dragged: {
    draggedAppt: {
      id: string;
      date: string;
      left: number;
      top: number;
      newDate: string | null;
      newStart: string | null;
    } | null;
    isDragging: boolean;
  };
};