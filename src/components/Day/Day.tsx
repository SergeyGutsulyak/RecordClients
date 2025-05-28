// src/components/Day.tsx
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import AppointmentItem from './AppointmentItem';
import { CALENDAR_SETTINGS } from '../сonstants/calendar';
import {Appointment} from '../../types/Appointment'

type Props = {
  date: string; // "2025-04-05"
  appointments: Appointment[];
  getClientName?: (id: string) => string;
};

const Day = ({ date, appointments, getClientName }: Props) => {
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
            />
          );
        })}
      </View>
    </View>
  );
};

// Парсер времени "10:00" → 600 (минут)
export const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
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