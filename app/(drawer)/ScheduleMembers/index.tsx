import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import ChooseLocation from './steps/ChooseLocation';

export default function ScheduleMembers() {
  return (
    <View>
      <Drawer.Screen
        options={{ title: 'ScheduleMembers', headerShown: false }}
      />
      <ChooseLocation />
    </View>
  );
}
