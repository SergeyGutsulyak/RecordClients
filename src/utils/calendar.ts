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