import React, { useState, useMemo } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import Locations from '@/components/Locations';
import Search from '@/components/Search';
import { CardAction } from '@/components/Card';
import { FEATURES, STORAGE_KEYS } from '@/constants';
import { Storage } from '@/services/storage';
import ChevronRight from '@assets/icons/chevron-right.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Location } from '@/models/location';
import { ScheduleLocation } from 'types';
import { useIsFocused } from '@react-navigation/native';

export default function ChooseLocation() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const storage = useMemo(() => Storage.instance, []);
  const navigation = useRouter();
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }

  return (
    <UnsafeBubbleLayout>
      <Drawer.Screen
        options={{ title: 'Choose Location', headerShown: false }}
      />
      <SafeAreaView className="w-full h-full justify-between">
        <View className="w-full flex justify-center items-center mt-10 h-10">
          <Text className="text-2xl font-poppins">Choose Location</Text>
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
              if (loc?.id === location?.id) {
                setLocation(null);
                return;
              }

              if (loc?.id) {
                setLocation(loc);
                return;
              }
            }}
          ></Locations>
        </View>
        <View className="w-full flex flex-row justify-between px-8 py-4">
          <TouchableOpacity
            className="rotate-180"
            onPress={async () => {
              navigation.back();
            }}
          >
            <ChevronRight />
          </TouchableOpacity>
          {!!location?.id && (
            <TouchableOpacity
              onPress={async () => {
                await storage.set(
                  STORAGE_KEYS.SCHEDULE_LOCATION,
                  JSON.stringify({
                    id: location.id,
                    city: location.city,
                    country: location.country,
                    address: location.address,
                  } as ScheduleLocation),
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
      </SafeAreaView>
    </UnsafeBubbleLayout>
  );
}
