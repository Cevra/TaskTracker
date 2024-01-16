import { Schedule } from '@/models/schedule';
import React from 'react';
import { Text, View } from 'react-native';
import type { CalendarDay } from 'types';

export type CalendarItemProps = {
  item: CalendarDay;
  schedule?: Partial<Schedule>;
  isSelected?: boolean;
  isAvailable?: boolean;
  isForWorker?: boolean;
};

const MAX_IN_CELL = 5;

const Employee = ({ name, color }: { name: string; color?: string }) => {
  return (
    <View className="mb-[5px]">
      <Text style={{ color: color ?? '#000' }} className={`text-[7px]`}>
        {name}
      </Text>
    </View>
  );
};

export default function CalendarItem({
  item,
  schedule,
  isSelected,
  isForWorker,
}: CalendarItemProps) {
  const { isActive, date } = item;

  return (
    <View className="mx-[1px] mt-2">
      <View className="w-full text-center flex justify-center items-center">
        <View className={`w-6 rounded-2xl ${isSelected ? 'bg-[#fff]' : ''}`}>
          <Text
            className={`w-full text-xs text-center font-bold ${
              isActive ? 'text-black' : 'text-gray-400'
            }`}
          >
            {date.getDate()}
          </Text>
        </View>
      </View>
      <View className="w-[50px] h-28 space-y-1 bg-shade-blue rounded p-1">
        {isForWorker ? (
          <Employee key={schedule?.id} name={schedule?.company ?? ''} />
        ) : (
          <>
            {schedule?.workers
              ?.slice(0, MAX_IN_CELL)
              .map((worker) => <Employee key={worker.id} name={worker.name} />)}
            {schedule?.workers?.length &&
              schedule.workers.length > MAX_IN_CELL && (
                <View className="w-full flex justify-center items-center">
                  <View className="px-[4px] py-[2px] bg-slate-200 rounded-2xl">
                    <Text className="text-[8px]">
                      +{schedule.workers.length - MAX_IN_CELL}
                    </Text>
                  </View>
                </View>
              )}
          </>
        )}
      </View>
    </View>
  );
}
