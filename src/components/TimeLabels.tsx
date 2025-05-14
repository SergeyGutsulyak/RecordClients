// src/components/TimeLabels.tsx
import React from 'react';
import { View, Text,  StyleSheet} from 'react-native';

type Props = {
  START_HOUR: number;
  END_HOUR: number;
  FULL_WIDTH: number;
};

const TimeLabels = ({ START_HOUR, END_HOUR, FULL_WIDTH,}: Props) => {
  const TOTAL_HOURS = END_HOUR - START_HOUR;

  return (
      <View style={styles.timeLabels}>
        {Array.from({ length: TOTAL_HOURS + 1 }).map((_, i) => (
          <Text key={i} style={[styles.timeText, { width: 60 }]}>
            {START_HOUR + i}:00
          </Text>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 30,
    zIndex: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});

export default TimeLabels;