import React, { useState } from 'react';
import { View } from 'react-native';
import WeekNavigator from './src/components/WeekNavigator/WeekNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//import DayHeaders from './src/components/Day/DayHeaders';
import Day from './src/components/Day/Day';
import userData from './data/user.json';
import { AppointmentsByDay } from './src/types/AppointmentsByDay'
// import {Appointment} from './src/types/Appointment'

import { getWeekDates, DayData } from './src/utils/calendar';

export default function App() {
  const getAppointmentsByDay = (): Record<string, any> => {
    return userData.appointments;
  };

  // const getClientName = (clientId: string): string => {
  //   return clientId && userData.clients[clientId]
  //     ? userData.clients[clientId].name
  //     : 'Гость';
  // };
    const getClientName = (clientId: string): string => {
    return clientId;
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ paddingTop: 40 }}>
        <WeekNavigator
          appointmentsByDay={getAppointmentsByDay()}
          getClientName={getClientName}
        />
      </View>
    </GestureHandlerRootView>
  );
}