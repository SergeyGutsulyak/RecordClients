// src/components/WeekNavigator.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/RootState';
import { CALENDAR_SETTINGS } from '../сonstants/calendar';
import WeekNavigation from './WeekNavigation'; 
import Day from '../Day/Day';
import TimeGrid from './TimeGrid'

import { Appointment } from '../../types/Appointment';
import { AppointmentsByDay } from '../../types/AppointmentsByDay';
import { setAppointments } from '../../store/appointmentsSlice';
import {getWeekDates} from '../../utils/calendar'

import {
  getAppointmentsForWeek,
  addNewAppointment,
  updateAppointmentStart,
  getAllAppointments
} from '../../database/db';
type Props = {
  appointmentsByDay: AppointmentsByDay;
};

const WeekNavigator = () => {

  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.date);
  const { byId, byDate } = useSelector((state: RootState) => state.appointments);
  
  const [scrollPosition, setScrollPosition] = useState<number>(
    CALENDAR_SETTINGS.START_HOUR_VIEW * 60
  );
 
  const scrollViewRef = useRef<ScrollView>(null);
// Загружаем записи при изменении даты
  useEffect(() => {
    const loadAppointments = async () => {
    const appts = await getAppointmentsForWeek(currentDate);
    console.log(appts)
    dispatch(setAppointments(appts));
  };

  loadAppointments();
}, [currentDate]);

  const currentDay = new Date(currentDate);
  const days = getWeekDates(currentDay);
  const weekDates = days.map(d => d.dateStr);
  // const weekLabel = `${days[0].formatted} – ${days[6].formatted}`;

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
                    appointments={(byDate[day.dateStr] || []).map(id => byId[id])}
                  />
                    ))}
              </View>
            </ScrollView>
        </View>
        <WeekNavigation />
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