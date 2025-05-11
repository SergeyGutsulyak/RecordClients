// src/components/TimeLine.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

type Appointment = {
  id: string;
  start: string; // "09:00"
  duration: number; // in minutes
};

const START_HOUR = 8;
const END_HOUR = 21;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;
const BAR_HEIGHT = 40;

const getColor = (type: 'busy' | 'free' | 'gap') => {
  switch (type) {
    case 'busy': return 'red';
    case 'free': return 'lightgreen';
    case 'gap': return 'black';
    default: return 'gray';
  }
};

const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return (hours - START_HOUR) * 60 + minutes;
};

const TimeLine = ({ appointments }: { appointments: Appointment[] }) => {
  const segments: Array<{ type: 'busy' | 'free' | 'gap'; start: number; end: number }> = [];

  let lastEnd = 0;

  const sortedAppts = [...appointments].sort(
    (a, b) => parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start)
  );

  // Добавляем начальный свободный интервал
  if (sortedAppts.length && sortedAppts[0].start !== '08:00') {
    segments.push({
      type: 'free',
      start: 0,
      end: parseTimeToMinutes(sortedAppts[0].start),
    });
  }

  // Проходим по всем записям и добавляем промежутки
  for (let i = 0; i < sortedAppts.length; i++) {
    const appt = sortedAppts[i];
    const startMin = parseTimeToMinutes(appt.start);
    const endMin = startMin + appt.duration;

    // Добавляем текущую запись
    segments.push({ type: 'busy', start: startMin, end: endMin });

    // Проверяем следующую запись или конец дня
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

  // Добавляем финальный свободный интервал
  if (lastEnd < TOTAL_MINUTES) {
    segments.push({ type: 'free', start: lastEnd, end: TOTAL_MINUTES });
  }

  return (
    <View style={styles.container}>
      {/* Подпись времени сверху */}
      <View style={styles.timeLabelsTop}>
        {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => (
          <Text key={i} style={styles.timeText}>
            {START_HOUR + i}:00
          </Text>
        ))}
      </View>

      {/* Шкала времени */}
      <Svg height={BAR_HEIGHT} width="100%">
        {segments.map((seg) => {
          const widthPerc = ((seg.end - seg.start) / TOTAL_MINUTES) * 100;
          const xPerc = (seg.start / TOTAL_MINUTES) * 100;

          return (
            <Rect
              key={`${seg.type}-${seg.start}-${seg.end}`}
              x={`${xPerc}%`}
              y={0}
              width={`${widthPerc}%`}
              height={BAR_HEIGHT}
              fill={getColor(seg.type)}
            />
          );
        })}
      </Svg>

      {/* Подписи снизу */}
      <View style={styles.timeLabelsBottom}>
        {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => (
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
  },
});

export default TimeLine;