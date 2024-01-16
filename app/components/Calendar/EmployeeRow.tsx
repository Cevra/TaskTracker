import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { User } from '@/models/user';
import { ScheduleLocation, ScheduleMember } from 'types';
import { Location } from '@/models/location';
import Picker, { PickerStyle } from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NoteIcon from '@assets/icons/note.svg';

export type OnChangeProps = {
  name: string;
  value: string;
  id: string;
  idx?: number;
};

type EmployeeRowProps = {
  worker: ScheduleMember;
  location: ScheduleLocation;
  options: {
    workers: Partial<User>[];
    locations: Location[];
  };
  isEdit: boolean;
  onChange: (props: OnChangeProps) => void;
  onNoteIconClick: () => void;
};

export default function EmployeeRowEdit({
  worker,
  location,
  options,
  isEdit,
  onChange,
  onNoteIconClick,
}: EmployeeRowProps) {
  const pickerStyle = useMemo(() => {
    const style = StyleSheet.create({
      pickerInputContainer: {
        height: '100%',
        borderRadius: 7,
        backgroundColor: isEdit ? 'white' : 'transparent',
        borderWidth: isEdit ? 1 : 0,
        justifyContent: 'center',
      },
      pickerInput: {
        textAlign: 'center',
      },
    });

    const pickerStyle = StyleSheet.create<PickerStyle>({
      inputAndroidContainer: style.pickerInputContainer,
      inputIOSContainer: style.pickerInputContainer,
      inputAndroid: style.pickerInput,
      inputIOS: style.pickerInput,
    });

    return pickerStyle;
  }, [isEdit]);

  return (
    <View className="flex flex-row justify-between h-10">
      <View className="flex-1 px-2 py-1 w-full border-r">
        <Picker
          disabled={!isEdit}
          placeholder="Worker"
          style={pickerStyle}
          onValueChange={(value) =>
            onChange({ name: 'worker', value, id: worker.id })
          }
          value={worker.id}
          items={[
            ...options.workers.map((w) => ({ label: w.name!, value: w.id })),
            { label: worker.name, value: worker.id },
          ]}
        />
      </View>
      <View className="flex-1 px-2 py-1 w-full">
        <Picker
          disabled={!isEdit}
          onValueChange={(value) =>
            onChange({ name: 'location', value, id: worker.id })
          }
          value={location.id}
          placeholder="Location"
          style={pickerStyle}
          items={options.locations.map((l) => ({
            label: l.city!,
            value: l.id,
          }))}
        />
      </View>
      <View className="flex-1 justify-center items-center border-l">
        <TouchableOpacity className="pl-4" onPress={onNoteIconClick}>
          <NoteIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
