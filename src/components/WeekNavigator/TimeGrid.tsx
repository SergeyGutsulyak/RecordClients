import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CALENDAR_SETTINGS } from '../../сonstants/calendar';

const TimeGrid = () => {
  const hours = Array.from({ length: CALENDAR_SETTINGS.TOTAL_HOURS }, (_, i) => {
    const hour = i + CALENDAR_SETTINGS.START_HOUR;
    return {
      index: i,
      label: `${hour}:00`,
      left: i * 60, // 60px на каждый час
    };
  });

  return (
    <View style={styles.container}>
      {hours.map((h) => (
        <React.Fragment key={h.index}>
          {/* Линия */}
          <View
            style={[
              styles.verticalLine,
              {
                left: h.left,
              },
            ]}
          />

          {/* Подпись часа */}
          <Text
            style={[
              styles.hourLabel,
              {
                left: h.left,
              },
            ]}
          >
            {h.label}
          </Text>
        </React.Fragment>
      ))}
    </View>
  );
};

export default TimeGrid;

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      height: 30,
      width: CALENDAR_SETTINGS.FULL_WIDTH,
      marginBottom: 4,
      backgroundColor: '#fff',
      zIndex: 2,
    },
    verticalLine: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: 1,
      backgroundColor: '#ddd',
    },
    hourLabel: {
      position: 'absolute',
      top: 0,
      left: 0,
      fontSize: 12,
      color: '#555',
      textAlign: 'center',
      width: 60,
    },
  });