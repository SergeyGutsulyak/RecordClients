// src/components/ScrollableTimeLine.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

type Appointment = {
  id: string;
  start: string; // "09:00"
  duration: number; // in minutes
};

const START_HOUR = 8;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const TOTAL_MINUTES = TOTAL_HOURS * 60;
const BAR_HEIGHT = 40;

const MINUTES_IN_VISIBLE_WINDOW = 6 * 60; // 6 часов
const PIXELS_PER_MINUTE = 2; // плотность шкалы (можно менять)
const WINDOW_WIDTH = MINUTES_IN_VISIBLE_WINDOW * PIXELS_PER_MINUTE;

const getColor = (type: 'busy' | 'free' | 'gap') => {
  switch (type) {
    case 'busy': return 'red';
    case 'free': return 'lightgreen';
    case 'gap': return 'black';
  }
};

const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours - START_HOUR) * 60 + minutes;
};

const ScrollableTimeLine = ({ appointments }: { appointments: Appointment[] }) => {
  const segments: Array<{ type: 'busy' | 'free' | 'gap'; start: number; end: number }> = [];

  let lastEnd = 0;

  const sortedAppts = [...appointments].sort(
    (a, b) => parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start)
  );

  // Начальный свободный участок
  if (sortedAppts.length && sortedAppts[0].start !== '08:00') {
    segments.push({
      type: 'free',
      start: 0,
      end: parseTimeToMinutes(sortedAppts[0].start),
    });
  }

  // Основные записи и промежутки
  for (let i = 0; i < sortedAppts.length; i++) {
    const appt = sortedAppts[i];
    const startMin = parseTimeToMinutes(appt.start);
    const endMin = startMin + appt.duration;

    segments.push({ type: 'busy', start: startMin, end: endMin });

    const nextAppt = sortedAppts[i + 1];
    const nextStart = nextAppt ? parseTimeToMinutes(nextAppt.start) : TOTAL_MINUTES;

    const gap = nextStart - endMin;
    if (gap > 0) {
      segments.push({
        type: gap < 30 ? 'gap' : 'free',
        start: endMin,
        end: nextStart,
      });
    }

    lastEnd = endMin;
  }

  // Финальный свободный участок
  if (lastEnd < TOTAL_MINUTES) {
    segments.push({ type: 'free', start: lastEnd, end: TOTAL_MINUTES });
  }

  return (
    <View style={styles.container}>
      {/* Верхние метки времени */}
      <View style={styles.timeLabelsTop}>
        {Array.from({ length: TOTAL_HOURS + 1 }).map((_, i) => (
          <Text key={i} style={styles.timeText}>
            {START_HOUR + i}:00
          </Text>
        ))}
      </View>

      {/* Прокручиваемая шкала времени */}
      <ScrollView horizontal showsHorizontalScrollIndicator style={styles.scrollView}>
        <Svg height={BAR_HEIGHT} width={TOTAL_MINUTES * PIXELS_PER_MINUTE}>
          {segments.map((seg) => {
            const x = seg.start * PIXELS_PER_MINUTE;
            const width = (seg.end - seg.start) * PIXELS_PER_MINUTE;

            return (
              <Rect
                key={`${seg.type}-${seg.start}-${seg.end}`}
                x={x}
                y={0}
                width={width}
                height={BAR_HEIGHT}
                fill={getColor(seg.type)}
              />
            );
          })}
        </Svg>
      </ScrollView>

      {/* Нижние метки времени */}
      <View style={styles.timeLabelsBottom}>
        {Array.from({ length: TOTAL_HOURS + 1 }).map((_, i) => (
          <Text key={i} style={styles.timeText}>
            {START_HOUR + i}:00
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollView: {
    height: 50,
    marginBottom: 8,
  },
  timeLabelsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timeLabelsBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#555',
    minWidth: `${100 / TOTAL_HOURS}%`,
    textAlign: 'center',
  },
});

export default ScrollableTimeLine;