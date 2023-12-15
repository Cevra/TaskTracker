import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { format } from 'date-fns';

const Employee = () => {
  return (
    <View className="flex flex-row justify-between h-10">
      <View className="flex-1 justify-center items-start border-r">
        <Text className=" text-lg border-r">User</Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">User</Text>
      </View>
      <View className="flex-1 justify-center items-end border-l">
        <Text className="text-lg">User</Text>
      </View>
    </View>
  );
};

export function CalendarDetails({ date }: { date: Date }) {
  return (
    <View className="w-full rounded-lg bg-modal p-4">
      <View className="flex flex-row justify-between mb-4">
        <Text className="text-2xl text-white font-bold">
          {format(date, 'dd. eeee')}
        </Text>
        <View>
          <Text className="text-2xl text-white font-bold">Edit</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-72 flex"
      >
        {Array(30)
          .fill(0)
          .map((_, index) => (
            <Employee key={index} />
          ))}
      </ScrollView>
    </View>
  );
}
