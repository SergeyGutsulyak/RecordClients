// src/components/AppointmentItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Appointment} from '../../types/Appointment'
import {CALENDAR_SETTINGS} from '../сonstants/calendar'

type Props = {
  appointment: Appointment;
  left: number;
  width: number;
  getClientName?: (id: string) => string;
};

const AppointmentItem = ({ appointment, left, width, getClientName }: Props) => {
  return (
    <View
      style={[
        styles.appointment,
        {
          left: left,
          width: width,
          backgroundColor: appointment.status === 'confirmed' ? '#FF3B30' : '#50C878',
        },
      ]}
    >
      <Text style={styles.title}>{appointment.title}</Text>
      {appointment.clientId && (
        <Text style={styles.client}>
          {getClientName?.(appointment.clientId)}
        </Text>
      )}
    </View>
  );
};

export default AppointmentItem;

const styles = StyleSheet.create({
  appointment: {
    position: 'absolute',
    top: 0,
    height: CALENDAR_SETTINGS.SEGMENT_HEIGHT,
    borderRadius: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  client: {
    color: '#eee',
    fontSize: 10,
    marginTop: 4,
  },
});