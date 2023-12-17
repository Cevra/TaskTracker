import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import Search from '@/components/Search';
import { CardAction } from '@/components/Card';
import BottomNavigation from '@/components/BottomNavigation';
import { FEATURES, STORAGE_KEYS } from '@/constants';
import { Storage } from '@/services/storage';
import ChevronRight from '@assets/icons/chevron-right.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Workers from '@/components/Workers';
import { User } from '@/models/user';
import { ScheduleMember } from 'types';

export default function ChooseMembers() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [workers, setWorkers] = useState<ScheduleMember[]>([]);
  const storage = useMemo(() => Storage.instance, []);
  const navigation = useRouter();

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
        <View className="w-full h-2/3 mb-auto">
          <Workers
            actionType={CardAction.CHECKBOX}
            onAction={async (user: User) => {
              if (user?.id) {
                setWorkers([...workers, { id: user.id, name: user.name }]);
              }
            }}
          ></Workers>
        </View>
        <View className="w-full flex items-end px-8 py-4">
          {!!workers.length && (
            <TouchableOpacity
              onPress={async () => {
                await storage.set(
                  STORAGE_KEYS.SCHEDULE_WORKERS,
                  JSON.stringify(workers),
                );

                navigation.push('/(drawer)/ScheduleMembers/steps/ChooseDates');
              }}
            >
              <ChevronRight />
            </TouchableOpacity>
          )}
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </UnsafeBubbleLayout>
  );
}
