import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { CalendarDetails } from './CalendarDetails';
import { CalendarDetailsEdit } from './CalendarDetailsEdit';
import { Schedule } from '@/models/schedule';
import { ScheduleMember } from 'types';

type CalendarDetailsModalProps = {
  date: Date;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  schedule?: Partial<Schedule>;
  onUpdate: (workers: ScheduleMember[]) => Promise<void>;
};

export default function CalendarDetailsModal({
  date,
  isVisible,
  setIsVisible,
  schedule,
  onUpdate,
}: CalendarDetailsModalProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      <View className="w-full px-4 absolute top-1/4">
        {isEdit ? (
          <CalendarDetailsEdit
            onUpdate={onUpdate}
            setIsEdit={setIsEdit}
            schedule={schedule}
            date={date}
          />
        ) : (
          <CalendarDetails
            setIsEdit={setIsEdit}
            schedule={schedule}
            date={date}
          />
        )}
      </View>
    </Modal>
  );
}
