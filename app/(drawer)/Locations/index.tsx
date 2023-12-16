import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import Toast from 'react-native-toast-message';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TopBubbleLayout from '@/layouts/TopBubble';
import { parseGoogleMapsResponse } from '@/utils/maps';
import Header from '@/components/Header';
import { Location } from '@/models/location';
import { LocationRepository } from '@/repositories/locations';
import { Address } from 'types';
import SecureButton from '@/components/SecureButton';
import { Auth } from '@/services/auth';
import Locations from '@/components/Locations';

const DEFAULT_ADDRESS: Address = { address: '', placeId: '' };

const AddLocation = () => {
  const [address, setAddress] = useState<Address>(DEFAULT_ADDRESS);

  const onSave = useCallback(async () => {
    if (!address.placeId) {
      return;
    }

    const location = new Location(Auth.currentUser!.id!, address);

    try {
      await LocationRepository.add(location);
      Toast.show({
        type: 'success',
        text1: 'Location Added',
        text2: 'You know have a new work location',
      });
      setAddress(DEFAULT_ADDRESS);
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Failed to add',
        text2: 'Please try again or contact support',
      });
    }
  }, [address]);

  return (
    <TopBubbleLayout classNames="pt-16">
      <Drawer.Screen options={{ title: 'Locations', headerShown: false }} />
      <Header hideTitle={true} logo={{ width: 100, height: 100 }} />

      <View className="w-full">
        <View className="w-full mt-4 mb-2 flex justify-center items-center">
          <Text className="text-4xl font-bold">Add a New Location</Text>
        </View>

        <View className="w-full px-4">
          <GooglePlacesAutocomplete
            placeholder="Enter your location"
            debounce={300}
            fetchDetails={true}
            styles={{
              container: {
                flex: 0,
                zIndex: 0,
              },
              listView: {
                zIndex: 10,
              },
            }}
            onFail={(error) => {
              console.error(error);
            }}
            onPress={async (_, details) => {
              if (!details) {
                return;
              }

              const parsedAddress = parseGoogleMapsResponse(details);
              setAddress(parsedAddress);
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
          />
        </View>
      </View>

      <View className="w-full h-[480px]">
        <Locations />
      </View>

      <View className="w-full flex mt-3 justify-center items-center">
        <SecureButton text="SAVE" onPress={onSave} />
      </View>
    </TopBubbleLayout>
  );
};

export default AddLocation;
