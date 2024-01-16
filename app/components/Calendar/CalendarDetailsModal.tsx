import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { CalendarDetailsCompany } from './CalendarDetailsCompany';
import { Schedule } from '@/models/schedule';
import { ScheduleMember } from 'types';
import { User } from '@/models/user';
import { CalendarDetailsWorker } from './CalendarDetailsWorker';

type CalendarDetailsModalProps = {
  date: Date;
  user: User | null;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  schedule?: Partial<Schedule>;
  onUpdate: (workers: ScheduleMember[]) => Promise<void>;
};

export default function CalendarDetailsModal({
  date,
  isVisible,
  schedule,
  user,
  setIsVisible,
  onUpdate,
}: CalendarDetailsModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      <View
        className={`w-full px-2 absolute ${
          user?.type === 'worker' ? 'top-24' : 'top-1/4'
        }`}
      >
        {user?.type === 'worker' ? (
          <CalendarDetailsWorker user={user} date={date} schedule={schedule} />
        ) : (
          <CalendarDetailsCompany
            onUpdate={onUpdate}
            schedule={schedule}
            date={date}
          />
        )}
      </View>
    </Modal>
  );
}
