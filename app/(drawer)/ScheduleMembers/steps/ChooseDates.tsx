import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { format } from 'date-fns';
import { STORAGE_KEYS } from '@/constants';
import { Storage } from '@/services/storage';
import Calendar from '@/components/Calendar';
import Default from '@/layouts/Default';
import type { CalendarDay } from '@/components/Calendar/CalendarItem';
import type { SelectedDate } from 'types';
import ChevronRight from '@assets/icons/chevron-right.svg';

export default function ChooseDates() {
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  const storage = useMemo(() => Storage.instance, []);
  const navigation = useRouter();

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
    async (
      nav: { push: (path: string) => void },
      store: Readonly<Storage>,
      dates: SelectedDate[],
    ) => {
      await store.set(
        STORAGE_KEYS.SCHEDULE_DATES,
        JSON.stringify(dates.map((d) => format(d.date, 'yyyy-MM-dd'))),
      );

      nav.push('/(drawer)/ScheduleMembers/steps/ChooseLocation');
    },
    [],
  );

  return (
    <Default>
      <SafeAreaView className="w-full items-center h-screen">
        <Drawer.Screen options={{ title: 'ChooseDates', headerShown: false }} />
        <Calendar
          hideModal
          onItemClick={onItemClick}
          selectedDates={selectedDates}
        />
        <View className="w-full flex items-end px-8 pt-10">
          {!!selectedDates.length && (
            <TouchableOpacity
              onPress={() => onPress(navigation, storage, selectedDates)}
            >
              <ChevronRight />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Default>
  );
}
