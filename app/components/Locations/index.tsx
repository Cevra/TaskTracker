import React from 'react';
import { ScrollView } from 'react-native';
import Default from '@/layouts/Default';
import Card, { CardAction } from '../Card';

const Locations = () => {
  const data = [1, 2, 3, 4, 5, 1, 1, 1, 1, 1, 1, 1];

  return (
    <Default>
      <ScrollView className="h-full flex border w-full px-5">
        {data.map((_, idx) => (
          <Card
            actionType={CardAction.DELETE}
            title="Location"
            subtitle="Sub title"
            onAction={() => {}}
            key={idx}
          />
        ))}
      </ScrollView>
    </Default>
  );
};

export default Locations;
