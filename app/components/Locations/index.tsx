import React, { useEffect, useState } from 'react';
import { ScrollView, Alert, View, ActivityIndicator } from 'react-native';
import Card, { CardAction } from '../Card';
import { Location } from '@/models/location';
import { LocationRepository } from '@/repositories/locations';
import { Auth } from '@/services/auth';

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const onDelete = async (id: string): Promise<void> => {
    Alert.alert(
      'Deleting location',
      'By confirming you will permanently remove the location',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await LocationRepository.remove(id);
          },
        },
      ],
    );
  };

  useEffect(() => {
    const unsubscribe = LocationRepository.listenForUser(
      Auth.currentUser!.id!,
      (locations) => setLocations(locations),
    );

    return () => unsubscribe();
  }, []);

  if (locations.length === 0) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="h-full flex w-full px-5">
      {locations.map((location: Location) => (
        <Card
          actionType={CardAction.DELETE}
          title={`${location.city ?? ''} ${location.country ?? ''}`.trim()}
          subtitle={location.address}
          onAction={async () => {
            if (location.id) {
              return onDelete(location.id);
            }
          }}
          key={location.placeId}
        />
      ))}
    </ScrollView>
  );
};

export default Locations;
