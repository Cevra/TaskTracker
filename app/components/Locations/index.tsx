import React, { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
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
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = LocationRepository.listenForUser(
      Auth.currentUser!.id!,
      (locations) => setLocations(locations),
    );
    setDataLoaded(true);
    return () => unsubscribe();
  }, []);

  if (!dataLoaded) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="h-full z-0 relative flex w-full px-3">
      {locations.map((loc: Location) => (
        <Card
          actionType={actionType}
          title={`${loc.city ?? ''} ${loc.country ?? ''}`.trim()}
          subtitle={loc.address}
          onAction={() => {
            if (actionType === CardAction.CHECKBOX) {
              setLocation(loc);
            }

            return onAction(loc);
          }}
          isChecked={location?.id === loc.id}
          key={loc.placeId}
        />
      ))}
    </View>
  );
};

export default Locations;
