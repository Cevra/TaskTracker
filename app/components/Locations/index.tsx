import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Card, { CardAction } from '../Card';
import { Location } from '@/models/location';
import { LocationRepository } from '@/repositories/locations';
import { Auth } from '@/services/auth';

interface LocationsProps {
  actionType: CardAction;
  onAction: (location: Location) => Promise<void>;
}

const Locations = ({ actionType, onAction }: LocationsProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = LocationRepository.listenForUser(
      Auth.currentUser!.id!,
      (locations) => {
        setIsLoading(false);
        setLocations(locations);
      },
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="h-full z-0 relative flex w-full px-3">
      {locations.length === 0 ? (
        <View className="h-full justify-center items-center flex w-full pl-2">
          <Text>No locations available. Please add some first.</Text>
        </View>
      ) : (
        locations.map((loc: Location) => (
          <Card
            actionType={actionType}
            title={`${loc.city ?? ''} ${loc.country ?? ''}`.trim()}
            subtitle={loc.address}
            onAction={() => {
              if (actionType === CardAction.CHECKBOX) {
                setLocation(loc.id === location?.id ? null : loc);
              }

              return onAction(loc);
            }}
            isChecked={location?.id === loc.id}
            key={loc.placeId}
          />
        ))
      )}
    </View>
  );
};

export default Locations;
