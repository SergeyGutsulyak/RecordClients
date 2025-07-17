// src/components/WeekNavigation.tsx
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../types/RootState';
import {
  goToPreviousWeek,
  goToNextWeek,
  goToToday,
  goToPreviousMonth,
  goToNextMonth,
} from '../../store/dateSlice';
import {getWeekDates} from '../../utils/calendar'

const WeekNavigation = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: RootState) => state.date);

  const days = getWeekDates(currentDate);
  const weekLabel = `${days[0].formatted} – ${days[6].formatted}`;

  return (
    <View style={styles.navigationContainer}>
      <View style={styles.topRow}>
        <Button title="← Неделя" onPress={() => dispatch(goToPreviousWeek())} />
        <Text style={styles.weekLabel}>{weekLabel}</Text>
        <Button title="Неделя →" onPress={() => dispatch(goToNextWeek())} />
      </View>

      <View style={styles.bottomRow}>
        <Button title="← Месяц" onPress={() => dispatch(goToPreviousMonth())} />
        <Button title="Сегодня" onPress={() => dispatch(goToToday())} />
        <Button title="Месяц →" onPress={() => dispatch(goToNextMonth())} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    marginBottom: 16,
    height:200,
    backgroundColor:"green",
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  weekLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeekNavigation;