import React, { useCallback, useState } from 'react';
import { View, useWindowDimensions  } from 'react-native';
import {  GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { addMonths, isSameMonth } from 'date-fns';
import CalendarItem from './CalendarItem';
import DefaultLayout from '../layouts/Default';
import { generateCalendarDaysByDate } from '../utils/date';
import { MONTHS } from '../constants';

const INCREMENT = 1;
const DECREMENT = -1;

export default function Calendar() {
  const [calendar, setCalendar] = useState(() => {
    const today = new Date();

    return { date: today, days: generateCalendarDaysByDate(today) };
  });
  const dimensions = useWindowDimensions();
  const offset = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleChange = useCallback((step) => {
    setCalendar(({ date: oldDate }) => {

      const newDate = addMonths(oldDate, step);
      //  new Date(oldDate.getFullYear(), oldDate.getMonth() + step, 1);
      return { date: newDate, days: generateCalendarDaysByDate(newDate) };
    })
  }, []);


  const renderItem = useCallback(({ item }) => {
    return (
      <Animated.View>
        <CalendarItem item={item} />
      </Animated.View>
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
    ],
    opacity: opacity.value
  }));

  const pan = Gesture.Pan()
    .onFinalize(({ translationX }) => {
      const deviceWidth = dimensions.width;
      const isLeftSwipe = translationX < -100;
      const isRightSwipe = translationX > 100;

      if (!isLeftSwipe && !isRightSwipe) {
        return;
      }

      const step = isLeftSwipe ? INCREMENT : DECREMENT;
      const offsetStart = isLeftSwipe ? -deviceWidth : deviceWidth;
      runOnJS(handleChange)(step);

      offset.value = withTiming(offsetStart, { duration: 500 }, () => {
        offset.value = withTiming(-offsetStart, { duration: 0 }, () => {
          offset.value = withTiming(0, { duration: 500 });
        });
      });

      opacity.value = withTiming(0, { duration: 500 , easing: Easing.inOut(Easing.quad)}, () => {
        opacity.value = withTiming(1, { duration: 800 });
      });

    });

  return (
    <DefaultLayout>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={pan}>
          <Animated.View className="w-full h-max" style={[{}, animatedStyles]}>
            <Animated.Text className="w-max mt-4 text-right text-2xl font-bold capitalize">
              {MONTHS[calendar.date.getMonth()]} {calendar.date.getFullYear()}
            </Animated.Text>
            <Animated.FlatList
              data={calendar.days}
              renderItem={renderItem}
              scrollEnabled={false}
              keyExtractor={(item) => item.key}
              numColumns={7}
            />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </DefaultLayout>
  );
}
