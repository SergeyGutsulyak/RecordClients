import { Appointment } from '../types/Appointment';

  export type DayData = {
    dateStr: string;
    weekdayShort: string;
    formatted: string;
  };
  
  export const getWeekDates = (inputDate: string | Date): DayData[] => {
    const date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate;
  
    // Начинаем неделю с понедельника
    const dayOfWeek = date.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const start = new Date(date);
    start.setDate(start.getDate() + diffToMonday); // Теперь это ПН
  
    const week: DayData[] = [];
  
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
  
      const dateStr = day.toISOString().split('T')[0]; // "2025-04-05"
  
      const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(day); // "Пн", "Вт"
      const formatted = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
      }).format(day); // "5 апр"
  
      week.push({
        dateStr,
        weekdayShort: weekday.charAt(0).toUpperCase() + weekday.slice(1), // "Пн"
        formatted,
      });
    }
  
    return week;
  };

  export const parseTimeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  export const formatMinutesToTime = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  export const groupAppointmentsByDay = (appointments: Appointment[]): Record<string, Appointment[]> => {
    const grouped: Record<string, Appointment[]> = {};
  
    for (const appt of appointments) {
      if (!appt.date) continue;
  
      if (!grouped[appt.date]) {
        grouped[appt.date] = [];
      }
  
      grouped[appt.date].push(appt);
    }
  
    return grouped;
  };