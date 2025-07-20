import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CALENDAR_SETTINGS } from '../../сonstants/calendar';

const TimeGrid = () => {
  const hours = Array.from({ length: CALENDAR_SETTINGS.TOTAL_HOURS }, (_, i) => {
    const hour = i + CALENDAR_SETTINGS.START_HOUR;
    return {
      index: i,
      label: `${hour}:00`,
      top: i * 60, // 60px на каждый час
    };
  });

  return (
    <View style={styles.container}>
      {hours.map((h) => (
        <React.Fragment key={h.index}>
          {/* Линия */}
          <View
            style={[
              styles.horizontalLine,
              {
                top: h.top,
              },
            ]}
          />

          {/* Подпись часа */}
          <Text
            style={[
              styles.hourLabel,
              {
                top: h.top,
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
      // flex:1,
      position: 'relative',
      height: CALENDAR_SETTINGS.FULL_HEIGHT,
      width: CALENDAR_SETTINGS.SEGMENT_WIDTH,
      marginBottom: 4,
      backgroundColor: '#a1a1f1',
      zIndex: 2,
    },
    horizontalLine: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      height: 1,
      backgroundColor: '#ddd',
    },
    hourLabel: {
      position: 'absolute',
      top: 0,
      left: 0,
      fontSize: 12,
      color: '#555',
      textAlign: 'center',
      height: 60,
    },
  });