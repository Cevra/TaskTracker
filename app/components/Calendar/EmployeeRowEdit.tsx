import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { User } from '@/models/user';
import { ScheduleLocation } from 'types';
import { Location } from '@/models/location';
import Picker from 'react-native-picker-select';

export type OnChangeProps = {
  name: string;
  value: string;
  id: string;
  idx?: number;
};

type EmployeeRowProps = {
  id: string;
  location: ScheduleLocation;
  time?: string;
  options: {
    workers: Partial<User>[];
    locations: Location[];
  };
  onChange: (props: OnChangeProps) => void;
};

export default function EmployeeRowEdit({
  id,
  location,
  time,
  options,
  onChange,
}: EmployeeRowProps) {
  return (
    <View className="flex flex-row justify-between h-10">
      <View className="flex-1 px-2 py-1 w-full border-r">
        <Picker
          placeholder="Worker"
          style={{
            inputAndroidContainer: style.pickerInputContainer,
            inputIOSContainer: style.pickerInputContainer,
            inputAndroid: style.pickerInput,
            inputIOS: style.pickerInput,
          }}
          onValueChange={(value) => onChange({ name: 'worker', value, id })}
          value={id}
          items={options.workers.map((w) => ({ label: w.name!, value: w.id }))}
        />
      </View>
      <View className="flex-1 px-2 py-1 w-full">
        <Picker
          onValueChange={(value) => onChange({ name: 'location', value, id })}
          value={location.id}
          placeholder="Location"
          style={{
            inputAndroidContainer: style.pickerInputContainer,
            inputIOSContainer: style.pickerInputContainer,
            inputAndroid: style.pickerInput,
            inputIOS: style.pickerInput,
          }}
          items={options.locations.map((l) => ({
            label: l.city!,
            value: l.id,
          }))}
        />
      </View>
      <View className="flex-1 w-full justify-center items-end border-l">
        <TextInput
          className="border bg-white rounded-lg w-[90px] text-center py-[7px]"
          placeholder="Time"
          onChangeText={(text) => onChange({ name: 'time', value: text, id })}
          value={time}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  pickerInputContainer: {
    height: '100%',
    borderRadius: 7,
    backgroundColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
  },
  pickerInput: {
    textAlign: 'center',
  },
});
