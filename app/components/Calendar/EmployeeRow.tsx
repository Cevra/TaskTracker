import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Notes from '@assets/icons/pen.svg';
 
type EmployeeRowProps = {
  name: string;
  location: string;
  onNoteIconClick:()=>void;
};

export default function EmployeeRow({
  name,
  location,
  onNoteIconClick,
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
      <TouchableOpacity  onPress={onNoteIconClick}>

      <Notes />
      </TouchableOpacity>
      </View>
    </View>
  );
}
