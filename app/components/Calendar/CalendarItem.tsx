import { Schedule } from '@/models/schedule';
import React from 'react';
import { Text, View } from 'react-native';

export type CalendarDay = {
  date: Date;
  isActive: boolean;
  key: string;
};

export type CalendarItemProps = {
  item: CalendarDay;
  schedule?: Partial<Schedule>;
  isSelected?: boolean;
  isAvailable?: boolean;
};

const Employee = ({ name, color }: { name: string; color?: string }) => {
  return (
    <Text className={`text-[10px] ${color ? color : 'text-black'}`}>
      {name}
    </Text>
  );
};

export default function CalendarItem({
  item,
  schedule,
  isSelected,
  isAvailable,
}: CalendarItemProps) {
  const { isActive, date } = item;

  return (
    <View className="mx-[1px] mt-2">
      <View className="w-full text-center flex justify-center items-center">
        <View
          className={`w-6 rounded-2xl ${isAvailable ? 'bg-[#D9D9D9]' : ''} ${
            isSelected ? 'bg-[#fff]' : ''
          }`}
        >
          <Text
            className={`w-full text-xs text-center font-bold ${
              isActive ? 'text-black' : 'text-gray-400'
            }`}
          >
            {date.getDate()}
          </Text>
        </View>
      </View>
      <View className="w-[50px] h-28 bg-shade-blue rounded p-1">
        {schedule?.workers?.map((worker) => (
          <Employee key={worker.id} name={worker.name} />
        ))}
      </View>
    </View>
  );
}
