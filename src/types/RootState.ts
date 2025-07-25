// src/types/RootState.ts
import { Appointment } from './Appointment';

export type RootState = {
  appointments: {
    byId: Record<string, Appointment>;
    byDate: Record<string, string[]>;
  };
  date: {
    currentDate: string;
  };
  dragged: {
    draggedAppt: {
      id: string;
      title: string;
      duration: number;
      originalDate: string;
      newDate: string | null;
      newStart: string | null;
      left: number;
      top: number;
    } | null;
    isDragging: boolean;
  };
};