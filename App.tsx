import React from 'react';
import { SafeAreaView } from 'react-native';
import SyncScrollTimeLine from './src/components/SyncScrollTimeLine';

export default function App() {
  const appointments = [
    { id: '1', start: '09:00', duration: 60 },
    { id: '2', start: '10:30', duration: 75 },
    { id: '3', start: '12:00', duration: 90 },
    { id: '4', start: '15:20', duration: 20 },
    { id: '5', start: '18:00', duration: 60 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SyncScrollTimeLine appointments={appointments} />
    </SafeAreaView>
  );
}