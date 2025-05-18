// import React from 'react';
// import { SafeAreaView } from 'react-native';
// import SyncScrollTimeLine from './src/components/SyncScrollTimeLine';

// export default function App() {
//   const appointments = [
//     { id: '1', start: '09:00', duration: 60 },
//     { id: '2', start: '10:30', duration: 75 },
//     { id: '3', start: '12:00', duration: 90 },
//     { id: '4', start: '15:20', duration: 20 },
//     { id: '5', start: '18:00', duration: 60 },
//   ];

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <SyncScrollTimeLine appointments={appointments} />
//     </SafeAreaView>
//   );
// }
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated,{useSharedValue, useAnimatedScrollHandler, useAnimatedStyle} from 'react-native-reanimated';
import {
  ScrollView,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// Данные таблицы
const rowHeaders = ['1', '2', '3','4', '5', '6', '7', '8','9', '10', '11','12','13','14','15','16'];
const colHeaders = ['Заголовок A', 'Заголовок B', 'Заголовок C', 'Заголовок D'];
const data = [
  ['A1', 'B1', 'C1', 'D1'],
  ['A2', 'B2', 'C2', 'D2'],
  ['A3', 'B3', 'C3', 'D3'],
  ['A1', 'B1', 'C1', 'D1'],
  ['A2', 'B2', 'C2', 'D2'],
  ['A3', 'B3', 'C3', 'D3'],
  ['A1', 'B1', 'C1', 'D1'],
  ['A2', 'B2', 'C2', 'D2'],
  ['A3', 'B3', 'C3', 'D3'],
  ['A1', 'B1', 'C1', 'D1'],
  ['A2', 'B2', 'C2', 'D2'],
  ['A3', 'B3', 'C3', 'D3'],
  ['A1', 'B1', 'C1', 'D1'],
  ['A2', 'B2', 'C2', 'D2'],
  ['A3', 'B3', 'C3', 'D3'],
  ['A1', 'B1', 'C1', 'D1'],
  ['A2', 'B2', 'C2', 'D2'],
  ['A3', 'B3', 'C3', 'D3'],
  ['A1', 'B1', 'C1', 'D1'],
  ['A2', 'B2', 'C2', 'D2'],
  ['A3', 'B3', 'C3', 'D3'],
];

export default function App() {
  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const onScrollHorizontal = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const onScrollVertical = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const animatedStyleX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -scrollX.value }],
    };
  }, []);
  const animatedStyleY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -scrollY.value }],
    };
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Верхний левый угол (фиксированная ячейка) */}
        <View style={styles.cornerHeader}>
          <Text style={styles.headerText}></Text>
        </View>

        {/* Горизонтальные заголовки */}
        <Animated.View
          style={[
            styles.horizontalHeaders, animatedStyleX
          ]}
        >
          <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalHeaderRow}>
              {colHeaders.map((header, i) => (
                <View key={i} style={styles.columnHeaderCell}>
                  <Text style={styles.headerText}>{header}</Text>
                </View>
              ))}
            </View>
          </Animated.ScrollView>
        </Animated.View>

        {/* Вертикальные заголовки */}
        <Animated.View
          style={[
            styles.verticalHeaders, animatedStyleY
          ]}
        >
          <Animated.ScrollView showsVerticalScrollIndicator={false}>
            {rowHeaders.map((header, i) => (
              <View key={i} style={styles.rowHeaderCell}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
            ))}
          </Animated.ScrollView>
        </Animated.View>

        {/* Основное тело таблицы */}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScrollHorizontal}
          scrollEventThrottle={16}
          style={styles.bodyScrollViewHorizontal}
        >
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={onScrollVertical}
            scrollEventThrottle={16}
            style={styles.bodyScrollViewVertical}
          >
            <View style={styles.tableBody}>
              {data.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((cell, cellIndex) => (
                    <View key={cellIndex} style={styles.cell}>
                      <Text>{cell}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </Animated.ScrollView>
        </Animated.ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const CELL_WIDTH = 150;
const CELL_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 5,
  },

  // Фиксированная ячейка сверху слева
  cornerHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  // Горизонтальные заголовки
  horizontalHeaders: {
    position: 'absolute',
    top: 0,
    left: 80,
    right: 0,
    height: 40,
    zIndex: 2,
    backgroundColor: '#f0f0f0',
    width: CELL_WIDTH * colHeaders.length, // например, 150 * 4 = 600
  },
  horizontalHeaderRow: {
    flexDirection: 'row',
    // width: CELL_WIDTH * colHeaders.length, // например, 150 * 4 = 600
    // backgroundColor:'red',
  },
  columnHeaderCell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },

  // Вертикальные заголовки
  verticalHeaders: {
    position: 'absolute',
    top: 40,
    left: 0,
    bottom: 0,
    width: 80,
    zIndex: 1,
    backgroundColor: '#f0f0f0',
  },
  rowHeaderCell: {
    height: CELL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },

  // Основное тело таблицы
  bodyScrollViewHorizontal: {
    flex: 1,
  },
  bodyScrollViewVertical: {
    flex: 1,
  },
  tableBody: {
    flexDirection: 'column',
    marginLeft:80,
    marginTop:40,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerText: {
    fontWeight: 'bold',
  },
});