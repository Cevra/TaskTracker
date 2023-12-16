import React, { useCallback, useState } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { addMonths, format } from 'date-fns';
import CalendarItem, { CalendarItemProps } from './CalendarItem';
import DefaultLayout from '../../layouts/Default';
import { generateCalendarDaysByDate } from '../../utils/date';
import CalendarDetailsModal from './CalendarDetailsModal';
import { DrawerToggleButton } from '@react-navigation/drawer';

const INCREMENT = 1;
const DECREMENT = -1;

export default function Calendar() {
  const [calendar, setCalendar] = useState(() => {
    const today = new Date();

    return { date: today, days: generateCalendarDaysByDate(today) };
  });
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const dimensions = useWindowDimensions();
  const offset = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleChange = useCallback((step: number) => {
    setCalendar(({ date: oldDate }) => {
      const newDate = addMonths(oldDate, step);
      return { date: newDate, days: generateCalendarDaysByDate(newDate) };
    });
  }, []);

  const renderItem = useCallback(({ item }: CalendarItemProps) => {
    return (
      <Animated.View>
        <TouchableOpacity
          onPress={() => {
            setTargetDate(item.date);
            setIsVisible(true);
          }}
        >
          <CalendarItem item={item} />
        </TouchableOpacity>
      </Animated.View>
    );
  }, []);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    opacity: opacity.value,
  }));

  const pan = Gesture.Pan().onFinalize(({ translationX }) => {
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

    opacity.value = withTiming(
      0,
      { duration: 500, easing: Easing.inOut(Easing.quad) },
      () => {
        opacity.value = withTiming(1, { duration: 800 });
      },
    );
  });

  return (
    <DefaultLayout>
      <CalendarDetailsModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        date={targetDate}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={pan}>
          <Animated.View className="w-full h-max" style={[{}, animatedStyles]}>
            <Animated.View className="flex flex-row justify-between">
              <Animated.View className="pt-4">
                <DrawerToggleButton />
              </Animated.View>

              <Animated.Text className="w-max mt-12 text-right text-2xl font-bold capitalize">
                {format(calendar.date, 'MMMM yyyy')}
              </Animated.Text>
            </Animated.View>

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
