// src/components/AppointmentItem.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {parseTimeToMinutes} from '../../utils/calendar'
import {Appointment} from '../../types/Appointment'
import {CALENDAR_SETTINGS} from '../../сonstants/calendar'

type Props = {
  appointment: Appointment;
  getClientName?: (id: string) => string;

};

const AppointmentItem = ({ appointment, getClientName }: Props) => {
  const left = parseTimeToMinutes(appointment.start);
  const width = appointment.duration;
   // const minLeft = CALENDAR_SETTINGS.START_HOUR_VIEW * 60; // например, 8 * 60 = 480
  // const maxLeft = CALENDAR_SETTINGS.END_HOUR_VIEW * 60 - width; // например, 21 * 60 - width = 1260 - width

  return (
    <View style={[styles.appointment, { left, width }]}>
      <Text style={styles.title}>{appointment.title}</Text>
      <Text style={styles.time}>{appointment.start}</Text>
    </View>
  );
};

export default AppointmentItem;

const styles = StyleSheet.create({
  appointment: {
    position: 'absolute',
    height: CALENDAR_SETTINGS.SEGMENT_HEIGHT,
    backgroundColor: '#FF3B30', // основной цвет записи
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    zIndex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    fontSize: 10,
  },
});