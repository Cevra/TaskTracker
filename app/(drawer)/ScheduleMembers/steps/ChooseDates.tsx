import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, GestureResponderEvent } from 'react-native';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import Toast from 'react-native-toast-message';
import { STORAGE_KEYS } from '@/constants';
import { Storage } from '@/services/storage';
import Calendar from '@/components/Calendar';
import Default from '@/layouts/Default';
import type {
  ChooseDatesState,
  ScheduleLocation,
  ScheduleMember,
  SelectedDate,
} from 'types';
import type { CalendarDay } from '@/components/Calendar/CalendarItem';
import SecureButton from '@/components/SecureButton';
import { Schedule } from '@/models/schedule';
import { Auth } from '@/services/auth';
import { ScheduleRepository } from '@/repositories/schedules';
import { UserRepository } from '@/repositories/users';

export default function ChooseDates() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  const storage = useMemo(() => Storage.instance, []);
  const [payload, setPayload] = useState<ChooseDatesState | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      const location: ScheduleLocation = JSON.parse(
        (await storage.get(STORAGE_KEYS.SCHEDULE_LOCATION)) ?? '{}',
      );

      const workers: ScheduleMember[] = JSON.parse(
        (await storage.get(STORAGE_KEYS.SCHEDULE_WORKERS)) ?? '{}',
      );

      setPayload({
        location,
        workers,
      });

      setIsLoaded(true);
    };

    getData();
  }, [storage]);

  const onItemClick = useCallback(
    (day: CalendarDay) => {
      const idx = selectedDates.findIndex((d) => d.key === day.key);

      if (idx !== -1) {
        setSelectedDates(selectedDates.filter((_, i) => i !== idx));
        return;
      }

      setSelectedDates([...selectedDates, { date: day.date, key: day.key }]);
    },
    [setSelectedDates, selectedDates],
  );

  const onPress = useCallback(
    async (e: GestureResponderEvent) => {
      e.preventDefault();
      const userId = Auth.currentUser!.id!;
      const user = await UserRepository.getById(userId);
      const schedules = selectedDates.map(
        ({ date: scheduledAt }) =>
          new Schedule(
            user!.id,
            user!.company!.name,
            scheduledAt,
            payload!.location,
            payload!.workers,
            payload!.workers.map((w) => w.id),
          ),
      );

      try {
        await ScheduleRepository.addBatch(schedules);

        Toast.show({
          type: 'success',
          text1: 'Schedule added!',
        });

        setTimeout(() => {
          navigation.navigate('Calendar' as never);
        }, 1000);
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Unable to save schedule',
          text2: 'Please check data and try again',
        });
      }
    },
    [selectedDates, navigation, payload],
  );

  if (!isLoaded) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <Drawer.Screen options={{ title: 'ChooseDates', headerShown: false }} />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Default>
      <Drawer.Screen options={{ title: 'ChooseDates', headerShown: false }} />
      <Calendar
        showAvailableDays
        hideModal
        onItemClick={onItemClick}
        selectedDates={selectedDates}
        workerIds={payload?.workers.map((w) => w.id)}
      />
      <View className="w-full flex justify-center items-center">
        <SecureButton classNames="h-10 -mb-3" text="SAVE" onPress={onPress} />
      </View>
    </Default>
  );
}
