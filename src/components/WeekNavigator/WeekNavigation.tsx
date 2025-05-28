// src/components/WeekNavigation.tsx
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

type Props = {
  goToPreviousWeek: () => void;
  goToNextWeek: () => void;
  goToToday: () => void;
  goToPreviousMonth: () => void; // ← новая пропса
  goToNextMonth: () => void;    // ← новая пропса
  weekLabel: string;
};

const WeekNavigation = ({
  goToPreviousWeek,
  goToNextWeek,
  goToToday,
  goToPreviousMonth,
  goToNextMonth,
  weekLabel,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.monthNavRow}>
        <Button title="⬅️ Месяц" onPress={goToPreviousMonth} />
        <Button title="Месяц ➡️" onPress={goToNextMonth} />
      </View>
      <View style={styles.row}>
        <Button title="←" onPress={goToPreviousWeek} />
        <Text style={styles.weekLabel}>{weekLabel}</Text>
        <Button title="→" onPress={goToNextWeek} />
      </View>
      <View style={styles.todayContainer}>
        <Button title="Сегодня" onPress={goToToday} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    height:80,
  },
  monthNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  weekLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 8,
    color: '#333',
  },
});

export default WeekNavigation;