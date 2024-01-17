import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { STORAGE_KEYS } from '@/constants';
import { Storage } from '@/services/storage';
import { ScrollView } from 'react-native';
import { Auth } from '@/services/auth';
import { ScheduleMember } from 'types';
import { Schedule } from '@/models/schedule';
import SecureButton from '@/components/SecureButton';
import NoteIcon from '@assets/icons/note.svg';
import { ScheduleRepository } from '@/repositories/schedules';
import Toast from 'react-native-toast-message';
import NoteModal from '@/components/NoteModal';
import BubbleLayout from '@/layouts/Bubbles';
import { sendEmail } from '@/utils/mail';
import { useIsFocused } from '@react-navigation/native';

type ScheduleWorkerEntry = {
  worker: ScheduleMember;
  schedule: Schedule;
};

export default function AddNotes() {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleWorker, setScheduleWorker] =
    useState<ScheduleWorkerEntry | null>(null);
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      const store = Storage.instance;
      const dates = JSON.parse(
        (await store.get(STORAGE_KEYS.SCHEDULE_DATES)) ?? '[]',
      ) as string[];
      const workers = JSON.parse(
        (await store.get(STORAGE_KEYS.SCHEDULE_WORKERS)) ?? '[]',
      );
      const location = JSON.parse(
        (await store.get(STORAGE_KEYS.SCHEDULE_LOCATION)) ?? '{}',
      );

      const user = await Auth.instance.user();
      if (!user?.company) {
        return;
      }

      const schedules = dates.map(
        (date: string) =>
          new Schedule(
            user.id,
            user.company!.name,
            date,
            location,
            workers.map((w: ScheduleMember) => ({ ...w })),
            workers.map((w: ScheduleMember) => w.id),
          ),
      );

      setSchedules(schedules);
      setIsLoading(false);
    };

    getData();
  }, []);

  const onPress = useCallback(
    async (schedules: Schedule[]) => {
      try {
        await ScheduleRepository.addBatch(schedules);

        Toast.show({
          type: 'success',
          text1: 'Schedule added!',
        });
        const store = Storage.instance;

        const workers = JSON.parse(
          (await store.get(STORAGE_KEYS.SCHEDULE_WORKERS)) ?? '[]',
        );
        const dates = JSON.parse(
          (await store.get(STORAGE_KEYS.SCHEDULE_DATES)) ?? '[]',
        ) as string[];
        const user = await Auth.instance.user();

        await sendEmail({
          to: [...new Set<string>(workers.map((w: ScheduleMember) => w.email))],
          subject: `You have been scheduled for work!`,
          text: `${user?.company
            ?.name} has scheduled you for work on the following dates: ${dates.join(
            ', ',
          )}`,
        });

        setTimeout(() => {
          navigation.navigate('Calendar' as never);
        }, 1000);
      } catch (e) {
        Toast.show({
          type: 'error',
          text1: 'Unable to save schedule',
          text2: 'Please check data and try again',
        });
      }
    },
    [navigation],
  );

  const onNoteSubmit = useCallback(
    (note: string, scheduleWorkerEntry: ScheduleWorkerEntry) => {
      const { worker, schedule } = scheduleWorkerEntry!;
      setScheduleWorker(null);
      setIsNoteModalVisible(false);
      setSchedules((prev) =>
        prev.map((s) => {
          if (s.scheduledAt === schedule.scheduledAt) {
            s.workers.forEach((w) => {
              if (w.id === worker.id) {
                w.note = note;
              }
            });
          }

          return s;
        }),
      );
    },
    [],
  );

  if (!isFocused) {
    return null;
  }

  return (
    <BubbleLayout enableKeyboardAvoid={false}>
      <Drawer.Screen options={{ title: 'Add Notes', headerShown: false }} />
      <SafeAreaView
        className="w-full h-full justify-between"
        style={{ opacity: isNoteModalVisible ? 0.5 : 1 }}
      >
        <View className="w-full flex justify-center items-center mt-10 h-10">
          <Text className="text-2xl font-poppins">Add Notes</Text>
        </View>
        <View className="w-full max-h-[600px] mb-auto">
          {isLoading ? (
            <View className="h-full justify-center items-center flex w-full px-5">
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <ScrollView className="h-full flex w-full px-5">
              {schedules.map((schedule) =>
                schedule.workers.map((worker) => (
                  <View
                    key={worker.id}
                    className={`w-full h-24 flex flex-row justify-between items-center mt-3 p-1 px-2 pb-2 bg-[#C7DEF3] border-2 border-[#E0E0E0] shadow rounded-lg`}
                  >
                    <View className="flex flex-col gap-2 pl-2">
                      <Text className={`text-lg text-slate-600 mt-3 `}>
                        {schedule.scheduledAt}
                      </Text>
                      <Text className={`text-md text-[#4C5980]`}>
                        {worker.name}
                      </Text>
                    </View>
                    <View className="pr-4">
                      <TouchableOpacity
                        onPress={() => {
                          setScheduleWorker({
                            worker,
                            schedule,
                          });
                          setIsNoteModalVisible(true);
                        }}
                      >
                        <NoteIcon />
                      </TouchableOpacity>
                    </View>
                  </View>
                )),
              )}
            </ScrollView>
          )}
        </View>

        <View className="w-full flex justify-center items-center">
          <SecureButton
            classNames="h-10 -mb-3"
            text="SAVE"
            onPress={() => onPress(schedules)}
          />
        </View>
      </SafeAreaView>
      {isNoteModalVisible && scheduleWorker && (
        <NoteModal
          worker={scheduleWorker.worker}
          isVisible={isNoteModalVisible}
          setIsVisible={(isVisible) => {
            setIsNoteModalVisible(isVisible);
            setScheduleWorker(null);
          }}
          onNoteSubmit={(note) => onNoteSubmit(note, scheduleWorker)}
        />
      )}
    </BubbleLayout>
  );
}
