import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { Schedule } from '@/models/schedule';
import EmployeeRow from './EmployeeRow';

type CalendarDetailsProps = {
  date: Date;
  schedule?: Partial<Schedule>;
  setIsEdit: (isEdit: boolean) => void;
};

export function CalendarDetails({
  date,
  schedule,
  setIsEdit,
}: CalendarDetailsProps) {
  return (
    <View className="w-full rounded-lg bg-modal p-4">
      <View className="flex flex-row justify-between mb-4">
        <Text className="text-2xl text-white font-bold">
          {format(date, 'dd. eeee')}
        </Text>
        <View>
          <TouchableOpacity onPress={() => setIsEdit(true)}>
            <Text className="text-2xl text-white font-bold">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-72 flex"
      >
        {schedule?.workers?.map((worker) => (
          <EmployeeRow
            name={worker.name}
            time={worker.time}
            location={worker.location?.city ?? schedule!.location!.city!}
            key={worker.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
