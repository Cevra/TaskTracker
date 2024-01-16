import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import Search from '@/components/Search';
import Card, { CardAction } from '@/components/Card';
import { FEATURES, STORAGE_KEYS } from '@/constants';
import { Storage } from '@/services/storage';
import { User } from '@/models/user';
import { ScheduleRepository } from '@/repositories/schedules';
import { ScrollView } from 'react-native';
import { Auth } from '@/services/auth';
import { UserRepository } from '@/repositories/users';
import type { ScheduleLocation, ScheduleMember } from 'types';
import ChevronRight from '@assets/icons/chevron-right.svg';

export default function ChooseMembers() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [workers, setWorkers] = useState<User[]>([]);
  const [selected, setSelected] = useState<Record<string, User>>({});
  const [clicked, setClicked] = useState(false);
  const storage = useMemo(() => Storage.instance, []);
  const navigation = useRouter();

  useEffect(() => {
    const getData = async () => {
      const store = Storage.instance;
      const dates = JSON.parse(
        (await store.get(STORAGE_KEYS.SCHEDULE_DATES)) ?? '[]',
      ) as string[];
      const takenWorkers = await ScheduleRepository.getWorkersForDays(dates);
      const takenWorkerIds = new Set(...takenWorkers.map((w) => w.id));
      const employedWorkers = await UserRepository.getEmployedFor(
        Auth.currentUser!.id!,
      );
      const other = await UserRepository.getOtherWorkers(Auth.currentUser!.id!);

      setWorkers([
        ...employedWorkers.filter((w) => !takenWorkerIds.has(w.id)),
        ...other.filter((w) => !takenWorkerIds.has(w.id)),
      ]);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <UnsafeBubbleLayout>
      <Drawer.Screen options={{ title: 'ChooseMembers', headerShown: false }} />
      <SafeAreaView className="w-full h-full justify-between">
        <View className="w-full flex justify-center items-center mt-10 h-10">
          <Text className="text-2xl font-poppins">Schedule members</Text>
        </View>
        {FEATURES.search && (
          <Search
            classNames="my-5"
            search={searchPhrase}
            setSearch={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        )}
        <View className="w-full max-h-[600px] mb-auto">
          {isLoading ? (
            <View className="h-full justify-center items-center flex w-full px-5">
              <ActivityIndicator size="large" />
            </View>
          ) : workers.length > 0 ? (
            <ScrollView className="h-full   flex w-full px-5">
              {workers.map((u: User) => {
                return (
                  <Card
                    actionType={CardAction.CHECKBOX}
                    title={`${u.name ?? ''}`.trim()}
                    subtitle={''}
                    color={`${u.worker?.color ?? '#000'}`}
                    onAction={async () => {
                      if (selected[u.id]) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { [u.id]: _, ...rest } = selected;
                        setSelected(rest);
                        return;
                      }

                      setSelected({ ...selected, [u.id]: u });
                    }}
                    isChecked={!!selected[u.id]}
                    key={u.id}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <View className="h-full justify-center items-center flex w-full pl-2">
              <Text>No workers available for chosen dates.</Text>
            </View>
          )}
        </View>
        <View className="w-full flex items-end px-8 py-4">
          {!!workers.length && (
            <TouchableOpacity
              onPress={async () => {
                const location = JSON.parse(
                  (await storage.get(STORAGE_KEYS.SCHEDULE_LOCATION)) ?? '{}',
                ) as ScheduleLocation;

                await storage.set(
                  STORAGE_KEYS.SCHEDULE_WORKERS,
                  JSON.stringify(
                    workers.map(
                      (w) =>
                        ({
                          id: w.id,
                          name: w.name,
                          location,
                          note: '',
                        }) as ScheduleMember,
                    ),
                  ),
                );

                navigation.push('/(drawer)/ScheduleMembers/steps/AddNotes');
              }}
            >
              <ChevronRight />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </UnsafeBubbleLayout>
  );
}
