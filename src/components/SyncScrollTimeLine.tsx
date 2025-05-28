// src/components/SyncScrollTimeLine.tsx
import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';


type Appointment = {
  id: string;
  start: string; // "09:00"
  duration: number; // in minutes
};

const START_HOUR = 8;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const TOTAL_MINUTES = TOTAL_HOURS * 60;

const MINUTES_IN_VISIBLE_WINDOW = 6 * 60; // 6 часов
const PIXELS_PER_MINUTE = 1;
const WINDOW_WIDTH = MINUTES_IN_VISIBLE_WINDOW * PIXELS_PER_MINUTE;
const FULL_WIDTH = TOTAL_MINUTES * PIXELS_PER_MINUTE;

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

const SyncScrollTimeLine = ({ appointments }: { appointments: Appointment[] }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const segments: Array<{ type: 'busy' | 'free' | 'gap'; start: number; end: number }> = [];

  let lastEnd = 0;

  const sortedAppts = [...appointments].sort(
    (a, b) => parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start)
  );

  if (sortedAppts.length && sortedAppts[0].start !== '08:00') {
    segments.push({
      type: 'free',
      start: 0,
      end: parseTimeToMinutes(sortedAppts[0].start),
    });
  }

  for (let i = 0; i < sortedAppts.length; i++) {
    const appt = sortedAppts[i];
    const startMin = parseTimeToMinutes(appt.start);
    let endMin = startMin + appt.duration;

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

    lastEnd = nextStart;
  }
   if (lastEnd < TOTAL_MINUTES) {
    segments.push({ type: 'free', start: lastEnd, end: TOTAL_MINUTES });
  }
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: xOffset, animated: false });
    }
  };

  return (
      <ScrollView
        horizontal
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator
        style={styles.scrollView}
      >
        <View style={styles.container}>
            <View style={styles.timeLabels}>
                {Array.from({ length: TOTAL_HOURS + 1 }).map((_, i) => (
                    <Text key={i} style={[styles.timeText, { width: 60 }]}>
                    {START_HOUR + i}:00
                    </Text>
                    ))}
            </View>
        <View>
            <Svg height={40} width={FULL_WIDTH}>
                {segments.map((seg) => {
                const x = seg.start * PIXELS_PER_MINUTE;
                const width = (seg.end - seg.start) * PIXELS_PER_MINUTE;
                return (
                    <Rect
                    key={`${seg.type}-${seg.start}-${seg.end}`}
                    x={x}
                    y={0}
                    width={width}
                    height={40}
                    fill={getColor(seg.type)}
                    />
                );
                })}
            </Svg>
            </View>
        </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        marginTop: 40, // компенсируем отрицательным margin, если нужно сохранить общую высоту
      },
    timeLabelsContainer: {
        height: 30,
        zIndex: 1, // чтобы метки были поверх шкалы
      },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 30,
  },
  timeText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'left',
  },
  scrollView: {

    height: 40,
    marginBottom: 10,
  },
});

export default SyncScrollTimeLine;