import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import ChooseDates from './steps/ChooseDates';

export default function ScheduleMembers() {
  return (
    <View>
      <Drawer.Screen
        options={{ title: 'ScheduleMembers', headerShown: false }}
      />
      <ChooseDates />
    </View>
  );
}
