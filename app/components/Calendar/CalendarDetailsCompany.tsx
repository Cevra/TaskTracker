import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { format } from 'date-fns';
import { Schedule } from '@/models/schedule';
import EmployeeRow, { OnChangeProps } from './EmployeeRow';
import { ScheduleRepository } from '@/repositories/schedules';
import { UserRepository } from '@/repositories/users';
import { User } from '@/models/user';
import { LocationRepository } from '@/repositories/locations';
import { Location } from '@/models/location';
import { ScheduleMember } from 'types';
import { Auth } from '@/services/auth';
import Toast from 'react-native-toast-message';
import NoteModal from '../NoteModal';

type CalendarDetailsCompanyProps = {
  date: Date;
  schedule?: Partial<Schedule>;
  onUpdate: (workers: ScheduleMember[]) => Promise<void>;
};

type DropdownOptions = {
  workers: Partial<User>[];
  locations: Location[];
};

export function CalendarDetailsCompany({
  date,
  schedule,
  onUpdate,
}: CalendarDetailsCompanyProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [workers, setWorkers] = useState<ScheduleMember[]>(
    schedule?.workers ?? [],
  );
  const [options, setOptions] = useState<DropdownOptions>({
    workers: [],
    locations: [],
  });
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<ScheduleMember | null>(
    null,
  );

  useEffect(() => {
    const getData = async () => {
      if (date) {
        const workers = await ScheduleRepository.getWorkersForDay(date);
        const workerIds = workers.map((worker) => worker.id);
        const availableWorkers = await UserRepository.filterBy({
          type: 'worker',
          excludeUserIds: workerIds,
        });

        const locations = await LocationRepository.getForUser(
          Auth.currentUser!.id!,
        );

        setOptions({
          workers: availableWorkers,
          locations,
        });
        setIsLoading(false);
      }
    };

    getData();
  }, [date, schedule?.workers]);

  const onChange = useCallback(
    ({ name, value, id }: OnChangeProps) => {
      if (!value || !id || id === value) {
        return;
      }

      if (name === 'worker') {
        const worker = workers.find((w) => w.id === id);

        if (worker) {
          setOptions((prev) => ({
            ...prev,
            workers: [...prev.workers.filter((w) => w.id !== value), worker],
          }));
        }
      }

      setWorkers((prev) => {
        switch (name) {
          case 'worker': {
            const worker = options.workers.find((w) => w.id === value);

            return worker
              ? prev.map((w) =>
                  w.id === id
                    ? { ...w, name: worker.name!, id: worker.id! }
                    : w,
                )
              : prev;
          }
          case 'location': {
            const newLocation = options.locations.find((l) => l.id === value);

            return newLocation
              ? prev.map((w) =>
                  w.id === id
                    ? {
                        ...w,
                        location: {
                          id: newLocation.id!,
                          address: newLocation.address!,
                          city: newLocation.city!,
                          country: newLocation.country!,
                        },
                      }
                    : w,
                )
              : prev;
          }
          default: {
            return prev;
          }
        }
      });
    },
    [options.workers, options.locations, workers],
  );

  const handleNoteIconClick = useCallback((worker: ScheduleMember) => {
    setSelectedWorker(worker);
    setIsNoteModalVisible(true);
  }, []);

  const handleNoteSubmit = useCallback(
    async (note: string, worker: ScheduleMember) => {
      setWorkers((prev) =>
        prev.map((w) => (worker.id === w.id ? { ...w, note: note } : w)),
      );
      setSelectedWorker(null);
      setIsNoteModalVisible(false);
      setIsEdit(true);
    },
    [],
  );

  if (isLoading) {
    return (
      <View className="w-full rounded-lg bg-modal items-center justify-center h-72 p-4">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="w-full rounded-lg bg-modal p-4">
      <View className="flex flex-row justify-between mb-4">
        <Text className="text-2xl text-white font-bold">
          {format(date, 'dd. eeee')}
        </Text>
        <View>
          <TouchableOpacity
            onPress={async (e) => {
              e.stopPropagation();

              if (isEdit) {
                try {
                  await onUpdate(workers);
                  Toast.show({
                    type: 'success',
                    text1: 'Schedule updated!',
                  });
                } catch {
                  Toast.show({
                    type: 'error',
                    text1: 'Unable to update schedule',
                  });
                }

                setTimeout(() => setIsEdit(false), 1000);
                return;
              }

              setIsEdit(true);
            }}
          >
            <Text className="text-2xl text-white font-bold">
              {isEdit ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-72 flex"
      >
        {workers.map((worker) => (
          <EmployeeRow
            key={worker.id}
            worker={worker}
            location={worker.location || schedule!.location!}
            isEdit={isEdit}
            options={options}
            onChange={onChange}
            onNoteIconClick={() => handleNoteIconClick(worker)}
          />
        ))}
      </ScrollView>
      {selectedWorker && (
        <NoteModal
          worker={selectedWorker}
          isVisible={isNoteModalVisible}
          setIsVisible={setIsNoteModalVisible}
          onNoteSubmit={(note) => handleNoteSubmit(note, selectedWorker)}
        />
      )}
    </View>
  );
}
