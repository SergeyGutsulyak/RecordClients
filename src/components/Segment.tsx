import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  left: number;
  width: number;
  SEGMENT_HEIGHT: number;
};

const Segment = ({ left, width, SEGMENT_HEIGHT }: Props) => {
  return (
    <View
      style={[
        styles.segment,
        {
          left,
          width,
          height: SEGMENT_HEIGHT,
          backgroundColor: 'red',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  segment: {
    position: 'absolute',
    top: 0,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default Segment;