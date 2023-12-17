import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import Locations from '@/components/Locations';
import Search from '@/components/Search';
import { CardAction } from '@/components/Card';
import BottomNavigation from '@/components/BottomNavigation';
import { FEATURES, STORAGE_KEYS } from '@/constants';
import { Storage } from '@/services/storage';
import ChevronRight from '@assets/icons/chevron-right.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Location } from '@/models/location';

export default function ChooseLocation() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const storage = useMemo(() => Storage.instance, []);
  const navigation = useRouter();

  return (
    <UnsafeBubbleLayout>
      <SafeAreaView className="w-full h-full justify-between">
        <View className="w-full flex justify-center items-center mt-10 h-10">
          <Text className="text-2xl font-poppins">Choose location</Text>
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
          <Locations
            actionType={CardAction.CHECKBOX}
            onAction={async (loc) => {
              if (loc?.id) {
                setLocation(loc);
              }
            }}
          ></Locations>
        </View>
        <View className="w-full flex items-end px-8 py-4">
          {!!location?.id && (
            <TouchableOpacity
              onPress={async () => {
                await storage.set(
                  STORAGE_KEYS.SCHEDULE_LOCATION,
                  JSON.stringify({
                    id: location.id,
                    address: location.address,
                  }),
                );

                navigation.push(
                  '/(drawer)/ScheduleMembers/steps/ChooseMembers',
                );
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
