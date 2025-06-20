// src/components/Day.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import AppointmentItem from './AppointmentItem';
import { CALENDAR_SETTINGS } from '../сonstants/calendar';
import {Appointment} from '../../types/Appointment'
import { parseTimeToMinutes, formatMinutesToTime} from '../../utils/calendar';

type Props = {
  date: string; // "2025-04-05"
  appointments: Appointment[];
  getClientName?: (id: string) => string;
  onAppointmentMove?: (appointmentId: string, newStartMinute: number) => void;

};

const Day = ({ date, appointments, getClientName, onAppointmentMove}: Props) => {
  const [items, setItems] = useState(appointments);

  const handleMove = (id: string, newStartMinute: number) => {
    // Обновляем состояние и отправляем вверх (например, в WeekNavigator)
    setItems((prev) =>
      prev.map((appt) =>
        appt.id === id
          ? {
              ...appt,
              start: formatMinutesToTime(newStartMinute),
            }
          : appt
      )
    );

    // Передаем наверх
    if (onAppointmentMove) {
      onAppointmentMove(id, newStartMinute);
    }
  };
  return (
    <View style={styles.container}>
      {/* Шкала записей */}
      <View style={styles.timelineWrapper}>
        {appointments.map((appt) => {
          const startMinutes = parseTimeToMinutes(appt.start);
          const width = appt.duration; // 1 мин = 1 px
          const left = startMinutes;

          return (
            <AppointmentItem
              key={appt.id}
              appointment={appt}
              left={left}
              width={width}
              getClientName={getClientName}
              onMove={(id, newStartMinute) => handleMove(id, newStartMinute)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Day;

const styles = StyleSheet.create({
  container: {
    width: CALENDAR_SETTINGS.FULL_WIDTH,
    height: CALENDAR_SETTINGS.SEGMENT_HEIGHT,
  },
  timelineWrapper: {
    position: 'relative',
    width: CALENDAR_SETTINGS.FULL_WIDTH,
    height: CALENDAR_SETTINGS.SEGMENT_HEIGHT,
    backgroundColor: '#f9f9f9',
  },
});