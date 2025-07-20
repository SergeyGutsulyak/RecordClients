// src/components/Day.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import AppointmentItem from './AppointmentItem';
import { CALENDAR_SETTINGS } from '../../сonstants/calendar';
import {Appointment} from '../../types/Appointment'
import { parseTimeToMinutes, formatMinutesToTime} from '../../utils/calendar';
import { green } from 'react-native-reanimated/lib/typescript/Colors';

type Props = {
  date: string; // "2025-04-05"
  appointments: Appointment[];
};

const Day = ({ date, appointments}: Props) => {
  const [items, setItems] = useState(appointments);

  return (
    <View style={styles.container}>
      {/* Шкала записей */}
      <View style={styles.timelineWrapper}>
        {appointments.map((appt) => {
          // const startMinutes = parseTimeToMinutes(appt.start);
          // const width = appt.duration; // 1 мин = 1 px
          // const left = startMinutes;
          return (
            <AppointmentItem
              key={appt.id}
              appointment={appt}
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
    flex:1,
    backgroundColor: 'orange',
    width: CALENDAR_SETTINGS.SEGMENT_WIDTH,
    minHeight: CALENDAR_SETTINGS.FULL_HEIGHT,
  },
  timelineWrapper: {
    position: 'relative',
    width: CALENDAR_SETTINGS.SEGMENT_HEIGHT,
    height: CALENDAR_SETTINGS.FULL_HEIGHT,
    backgroundColor: '#f9f9f9',
  },
});