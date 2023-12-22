import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { Schedule } from '@/models/schedule';
import EmployeeRowEdit, { OnChangeProps } from './EmployeeRowEdit';
import { ScheduleRepository } from '@/repositories/schedules';
import { UserRepository } from '@/repositories/users';
import { User } from '@/models/user';
import { LocationRepository } from '@/repositories/locations';
import { Location } from '@/models/location';
import { ScheduleMember } from 'types';
import Toast from 'react-native-toast-message';

type CalendarDetailsProps = {
  date: Date;
  schedule?: Partial<Schedule>;
  setIsEdit: (isEdit: boolean) => void;
  onUpdate: (workers: ScheduleMember[]) => Promise<void>;
};

export function CalendarDetailsEdit({
  date,
  schedule,
  setIsEdit,
  onUpdate,
}: CalendarDetailsProps) {
  const [workers, setWorkers] = useState<ScheduleMember[]>(
    schedule?.workers ?? [],
  );
  const [options, setOptions] = useState<{
    workers: Partial<User>[];
    locations: Location[];
  }>({
    workers: [],
    locations: [],
  });

  useEffect(() => {
    const getData = async () => {
      if (date) {
        const workers = await ScheduleRepository.getWorkersForDay(date);
        const workerIds = workers.map((worker) => worker.id);
        workerIds.push(...(schedule?.workers?.map((w) => w.id) ?? []));
        const users = await UserRepository.filterBy({
          type: 'worker',
          excludeUserIds: workerIds,
        });

        const locations = await LocationRepository.getAll();

        setOptions({
          workers: [...workers, ...users],
          locations,
        });
      }
    };

    getData();
  }, [date, schedule?.workers]);

  const onChange = useCallback(
    ({ name, value, id }: OnChangeProps) => {
      if (!value) {
        return;
      }

      switch (name) {
        case 'time': {
          setWorkers((oldWorkers) => {
            return oldWorkers.map((w) =>
              w.id === id ? { ...w, time: value } : w,
            );
          });
          return;
        }
        case 'worker': {
          setWorkers((oldWorkers) => {
            const worker = options.workers.find((w) => w.id === value);
            let updated = oldWorkers;

            if (worker) {
              updated = oldWorkers.map((w) =>
                w.id === id ? { ...w, name: worker.name!, id: worker.id! } : w,
              );
            }

            return updated;
          });

          return;
        }

        case 'location': {
          setWorkers((oldWorkers) => {
            const newLocation = options.locations.find((l) => l.id === value);

            if (newLocation) {
              return oldWorkers.map((w) =>
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
              );
            }

            return oldWorkers;
          });
          return;
        }
      }
    },
    [setWorkers, options.workers, options.locations],
  );

  return (
    <View className="w-full rounded-lg bg-modal p-4">
      <View className="flex flex-row justify-between mb-4">
        <Text className="text-2xl text-white font-bold">
          {format(date, 'dd. eeee')}
        </Text>
        <View>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              try {
                onUpdate(workers);
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
            }}
          >
            <Text className="text-2xl text-white font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-72 flex"
      >
        {workers.map((worker) => (
          <EmployeeRowEdit
            id={worker.id}
            location={worker.location ?? schedule!.location!}
            time={worker.time}
            options={options}
            onChange={onChange}
            key={worker.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
