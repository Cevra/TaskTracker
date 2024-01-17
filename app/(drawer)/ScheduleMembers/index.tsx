import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ChooseDates from './steps/ChooseDates';

export default function ScheduleMembers() {
  const isFocused = useIsFocused();
  return (
    <View>
      <Drawer.Screen
        options={{ title: 'ScheduleMembers', headerShown: false }}
      />
      {isFocused && <ChooseDates />}
    </View>
  );
}
