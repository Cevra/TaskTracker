import React from 'react';
import { Text, View } from 'react-native';

type EmployeeRowProps = {
  name: string;
  location: string;
  time?: string;
};

export default function EmployeeRow({
  name,
  location,
  time,
}: EmployeeRowProps) {
  return (
    <View className="flex flex-row justify-between h-10">
      <View className="flex-1 justify-center items-start border-r">
        <Text className=" text-lg border-r">{name}</Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">{location}</Text>
      </View>
      <View className="flex-1 justify-center items-end border-l">
        <Text className="text-lg">{time}</Text>
      </View>
    </View>
  );
}
