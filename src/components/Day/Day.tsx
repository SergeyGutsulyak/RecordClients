// src/components/Day.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';

import AppointmentItem from './AppointmentItem';
import {Appointment} from '../../types/Appointment'

type Props = {
  date: string; // "2025-04-05"
  dayIndex: number; 
  appointments: Appointment[];
};

const Day = ({ date, dayIndex, appointments}: Props) => {
  // const [items, setItems] = useState(appointments);
  return (
    <View style={styles.container}>
      {/* Шкала записей */}
      <View style={styles.timelineWrapper}>
        {appointments.map((appt) => {
          return (
            <AppointmentItem
              key={appt.id}
              dayIndex={dayIndex}
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