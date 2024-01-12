import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { Schedule } from '@/models/schedule';
import EmployeeRow from './EmployeeRow';
import NoteModal from '@/components/NoteModal';
import { ScheduleMember } from 'types';

type CalendarDetailsProps = {
  date: Date;
  schedule?: Partial<Schedule>;
  setIsEdit: (isEdit: boolean) => void;
  onUpdate: (workers: ScheduleMember[]) => Promise<void>;
};

export function CalendarDetails({
  date,
  schedule,
  setIsEdit,
  onUpdate,
}: CalendarDetailsProps) {
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<ScheduleMember | null>(
    null,
  );

  const handleNoteIconClick = (worker: ScheduleMember) => {
    setSelectedWorker(worker);
    setIsNoteModalVisible(true);
  };
  const handleNoteSubmit = (note: string) => {
    if (selectedWorker) {
      const updatedWorkers = schedule!.workers!.map((worker) =>
        worker.id === selectedWorker.id ? { ...worker, note: note } : worker,
      );
      onUpdate(updatedWorkers);
      setSelectedWorker(null);
    }
    setIsNoteModalVisible(false);
  };

  return (
    <View className="w-full rounded-lg bg-modal p-4">
      <View className="flex flex-row justify-between mb-4">
        <Text className="text-2xl text-white font-bold">
          {format(date, 'dd. eeee')}
        </Text>
        <View>
          <TouchableOpacity onPress={() => setIsEdit(true)}>
            <Text className="text-2xl text-white font-bold">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-72 flex"
      >
        {schedule?.workers?.map((worker) => (
          <EmployeeRow
            name={worker.name}
            
            location={worker.location?.city ?? schedule!.location!.city!}
            key={worker.id}
            onNoteIconClick={() => handleNoteIconClick(worker)}
          />
        ))}
      </ScrollView>
      {selectedWorker && (
        <NoteModal
          worker={selectedWorker}
          isVisible={isNoteModalVisible}
          setIsVisible={setIsNoteModalVisible}
          onNoteSubmit={handleNoteSubmit}
        />
      )}
    </View>
  );
}
