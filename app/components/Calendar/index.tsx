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
import CalendarItem, { CalendarItemProps } from './CalendarItem';
import { User } from '@/models/user';
import type { CalendarDay, ScheduleMember, SelectedDate } from 'types';
import { sendEmail } from '@/utils/mail';

const INCREMENT = 1;
const DECREMENT = -1;

type CalendarProps = {
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

type CalendarSchedules = Record<string, Partial<Schedule>>;

export default function Calendar({
  hideModal,
  onItemClick,
  selectedDates,
  isFocused,
}: CalendarProps) {
  const [schedules, setSchedules] = useState<CalendarSchedules>({});
  const [user, setUser] = useState(Auth.currentUser);
  const [calendar, setCalendar] = useState(() => getDefault());
  const [selectedDay, setSelectedDay] = useState<CalendarDay>({
    key: format(new Date(), 'yyyy-MM-dd'),
    date: new Date(),
    isActive: true,
  });
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
      const authUser = (await Auth.instance.user()) as User;
      setUser(authUser);
      const schedules = await ScheduleRepository.getForRange(
        authUser.id,
        authUser.type!,
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

      return (
        <Animated.View>
          <TouchableOpacity
            onPress={() => {
              if (onItemClick) {
                onItemClick(item);
                return;
              }

              if (!hideModal) {
                setSelectedDay(item);
                setIsVisible(true);
              }
            }}
          >
            <CalendarItem
              isSelected={isSelected}
              schedule={schedule}
              item={item}
              isForWorker={user?.type === 'worker'}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [schedules, onItemClick, hideModal, selectedDates, user?.type],
  );

  const onUpdate = useCallback(
    async (
      workers: ScheduleMember[],
      schedules: CalendarSchedules,
      day: CalendarDay,
    ) => {
      const schedule = schedules[day.key];

      if (schedule?.id) {
        const newWorkerIds = new Set(workers.map((w) => w.id));
        await ScheduleRepository.update(schedule.id, {
          workers,
          workerIds: [...newWorkerIds],
        });

        const user = await Auth.instance.user();
        const removed = schedule.workers?.filter(
          (w) => !newWorkerIds.has(w.id),
        );
        const added = workers.filter(
          (w) => !schedule.workerIds?.includes(w.id),
        );
        const date = format(day.date, 'yyyy-MM-dd');

        await Promise.all([
          sendEmail({
            to: [...new Set<string>(removed?.map((w) => w.email) ?? [])],
            subject: `You have been removed from a schedule: ${date}`,
            text: `You are no longer scheduled to work for ${user?.company?.name} on ${date}`,
          }),
          sendEmail({
            to: [...new Set<string>(added?.map((w) => w.email) ?? [])],
            subject: `You have been added to a schedule: ${date}`,
            text: `You are scheduled to work for ${user?.company?.name} on ${date}`,
          }),
        ]);

        setSchedules((old) => {
          return {
            ...old,
            [day.key]: { ...schedule, workers, workerIds: [...newWorkerIds] },
          };
        });
      }
    },
    [],
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
          onUpdate={(workers) => onUpdate(workers, schedules, selectedDay)}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          schedule={schedules[selectedDay.key]}
          date={selectedDay.date}
          user={user}
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
