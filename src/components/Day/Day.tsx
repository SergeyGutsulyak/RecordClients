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
  // const [items, setItems] = useState(appointments);
  return (
    <View style={styles.container}>
      {/* Шкала записей */}
      <View style={styles.timelineWrapper}>
        {appointments.map((appt) => {
          return (
            <AppointmentItem
              key={appt.id}
              appointment={appt}
              date={date}
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
  },
  timelineWrapper: {
     position: 'relative',
  },
});