import React, { useCallback, useEffect, useState } from 'react';
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
import { DrawerToggleButton } from '@react-navigation/drawer';
import { addMonths, format } from 'date-fns';
import { generateCalendarDaysByDate } from '@/utils/date';
import { ScheduleRepository } from '@/repositories/schedules';
import { Schedule } from '@/models/schedule';
import { Auth } from '@/services/auth';
import CalendarDetailsModal from './CalendarDetailsModal';
import CalendarItem, { CalendarDay, CalendarItemProps } from './CalendarItem';
import { SelectedDate } from 'types';

const INCREMENT = 1;
const DECREMENT = -1;

type CalendarProps = {
  workerIds?: string[];
  showAvailableDays?: boolean;
  hideModal?: boolean;
  isFocused?: boolean;
  onItemClick?: (item: CalendarDay) => void;
  selectedDates?: SelectedDate[];
};

const getDefault = () => {
  const today = new Date();

  const { days, end, start } = generateCalendarDaysByDate(today);
  return { date: today, days, end, start };
};

export default function Calendar({
  workerIds,
  showAvailableDays,
  hideModal,
  onItemClick,
  selectedDates,
  isFocused,
}: CalendarProps) {
  const [schedules, setSchedules] = useState<Record<string, Schedule>>({});
  const [calendar, setCalendar] = useState(() => getDefault());
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const dimensions = useWindowDimensions();
  const offset = useSharedValue(0);
  const opacity = useSharedValue(1);

  const handleChange = useCallback((step: number) => {
    setCalendar(({ date: oldDate }) => {
      const newDate = addMonths(oldDate, step);
      const { days, end, start } = generateCalendarDaysByDate(newDate);
      return { date: newDate, days, end, start };
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const schedules = await ScheduleRepository.getForRang(
        Auth.currentUser!.id!,
        calendar.start,
        calendar.end,
      );

      setSchedules(schedules);
    };

    getData();
  }, [calendar.end, calendar.start]);

  useEffect(() => {
    if (isFocused) {
      setCalendar(() => getDefault());
    }
  }, [isFocused]);

  const renderItem = useCallback(
    ({ item }: CalendarItemProps) => {
      const schedule = schedules[item.key];
      const isSelected = selectedDates?.some((d) => d.key === item.key);
      const isAvailable = showAvailableDays
        ? !schedule?.workers?.some((w) => workerIds?.includes(w.id))
        : false;

      return (
        <Animated.View>
          <TouchableOpacity
            onPress={() => {
              if (onItemClick && isAvailable) {
                onItemClick(item);
                return;
              }

              if (!hideModal) {
                setTargetDate(item.date);
                setIsVisible(true);
              }
            }}
          >
            <CalendarItem
              isSelected={isSelected}
              isAvailable={isAvailable}
              schedule={schedule}
              item={item}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [
      schedules,
      workerIds,
      onItemClick,
      hideModal,
      selectedDates,
      showAvailableDays,
    ],
  );

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
    <>
      {!hideModal && (
        <CalendarDetailsModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          date={targetDate}
        />
      )}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={pan}>
          <Animated.View className="w-full h-max" style={[{}, animatedStyles]}>
            <Animated.View className="flex flex-row justify-between items-center mt-4">
              <Animated.View>
                <DrawerToggleButton tintColor="#000" />
              </Animated.View>

              <Animated.Text className="w-max text-right text-2xl font-bold capitalize">
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
    </>
  );
}
