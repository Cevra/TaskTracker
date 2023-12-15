import React from 'react';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import { CalendarDetails } from './CalendarDetails';

type CalendarDetailsModalProps = {
  date: Date;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

export default function CalendarDetailsModal({
  date,
  isVisible,
  setIsVisible,
}: CalendarDetailsModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      <View className="w-full px-4 absolute top-1/4">
        <CalendarDetails date={date} />
      </View>
    </Modal>
  );
}
