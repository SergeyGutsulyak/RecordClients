// src/components/WeekNavigator.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CALENDAR_SETTINGS } from '../сonstants/calendar';
import WeekNavigation from './WeekNavigation'; 

import Day from '../Day/Day';

import { getWeekDates, groupAppointmentsByDay } from '../../utils/calendar';
import { Appointment } from '../../types/Appointment';
import { AppointmentsByDay } from '../../types/AppointmentsByDay';
import {DateWithFormatted} from '../../types/DateWithFormatted'
import TimeGrid from './TimeGrid'
import {
  getAppointmentsForWeek,
  addNewAppointment,
  updateAppointmentStart,
} from '../../database/db';
type Props = {
  appointmentsByDay: AppointmentsByDay;
  getClientName?: (id: string) => string;
};

const WeekNavigator = ({getClientName }: Props) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [scrollPosition, setScrollPosition] = useState<number>(
    CALENDAR_SETTINGS.START_HOUR_VIEW * 60
  );
  const [appointmentsByDay, setAppointmentsByDay] = useState<Record<string, Appointment[]>>({});
  const scrollViewRef = useRef<ScrollView>(null);

  const goToPreviousWeek = () => {
    const prevWeek = new Date(currentDate);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentDate(prevWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1); // переходим на предыдущий месяц
    prevMonth.setDate(1); // устанавливаем первый день месяца
    setCurrentDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(1);
    setCurrentDate(nextMonth);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = getWeekDates(currentDate);
  const weekDates = days.map(d => d.dateStr);
  const weekLabel = `${days[0].formatted} – ${days[6].formatted}`;
// Загружаем записи для недели при изменении currentDate
useEffect(() => {
  const loadAppointments = async () => {
    const grouped = await getAppointmentsForWeek(weekDates);
    setAppointmentsByDay(grouped);
  };
  loadAppointments();
}, [weekDates]);
  
  return (
    <View style={styles.container}>
      {/* Кнопки навигации */}
        <View style={styles.calendarRow}>
            {/* Заголовки дней слева */}
            <View style={styles.dayLabelsContainer}>
                {days.map((day) => (
                    <View key={day.dateStr} style={styles.dayLabelItem}>
                        <Text style={styles.weekday}>{day.weekdayShort}</Text>
                        <Text style={styles.date}>{day.formatted}</Text>
                    </View>
                    ))}
            </View>

                {/* Прокручиваемая шкала записей справа */}
           <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.daysScroll}
                contentContainerStyle={{
                  minWidth: days.length * CALENDAR_SETTINGS.FULL_WIDTH,
                  gap: 8,
                }}
                onScroll={(e) => {
                  const offset = e.nativeEvent.contentOffset.x;
                  setScrollPosition(offset);
                }}
                scrollEventThrottle={16}
            >
              <View style={styles.daysContainer} >
                <TimeGrid/>
                    {days.map((day) => (
                        <Day
                        key={day.dateStr}
                        date={day.dateStr}
                        appointments={appointmentsByDay[day.dateStr] || []}
                        getClientName={getClientName}
                        />
                    ))}
                    </View>
            </ScrollView>
        </View>
        <WeekNavigation
            goToPreviousWeek={goToPreviousWeek}
            goToNextWeek={goToNextWeek}
            goToToday={goToToday}
            goToPreviousMonth={goToPreviousMonth}
            goToNextMonth={goToNextMonth}
            weekLabel={weekLabel}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    calendarRow: {
      flexDirection: 'row', // ← левая колонка + прокрутка
      height: 480,
    },
    dayLabelsContainer: {
      width: 60,
      borderRightWidth: 1,
      borderColor: '#ddd',
      paddingRight: 8,
      marginRight: 8,
    },
    dayLabelItem: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      height: CALENDAR_SETTINGS.SEGMENT_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    weekday: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#555',
      textAlign: 'center',
    },
    date: {
      fontSize: 14,
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
      marginTop: 4,
    },
    daysScroll: {
      flex: 1,
    },
    daysContainer: {
      gap: 8,
      // width:600,
    },
  });
export default WeekNavigator;