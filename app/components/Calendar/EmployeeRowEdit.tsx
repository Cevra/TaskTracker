import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { User } from '@/models/user';
import { ScheduleLocation } from 'types';
import { Location } from '@/models/location';
import Picker from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Notes from '@assets/icons/pen.svg';

export type OnChangeProps = {
  name: string;
  value: string;
  id: string;
  idx?: number;
};

type EmployeeRowProps = {
  id: string;
  location: ScheduleLocation;
  note?: string;
  time?: ReactNode;
  options: {
    workers: Partial<User>[];
    locations: Location[];
  };
  onChange: (props: OnChangeProps) => void;
  onNoteIconClick: () => void;
};

export default function EmployeeRowEdit({
  id,
  location,
  options,
  onChange,
  onNoteIconClick,
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
        <TouchableOpacity onPress={onNoteIconClick}>
          <Notes />
        </TouchableOpacity>
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
