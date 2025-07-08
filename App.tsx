import React, { useState } from 'react';
import { View } from 'react-native';

import WeekNavigator from './src/components/WeekNavigator/WeekNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store';
// import userData from './data/user.json';

export default function App() {
  // const getAppointmentsByDay = (): Record<string, any> => {
  //   return userData.appointments;
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <View style={{ paddingTop: 40 }}>
          <WeekNavigator/>
        </View>
      </Provider>
    </GestureHandlerRootView>
  );
}