import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import Calendar from '@/components/Calendar';

export default function CalendarView() {
  return (
    <View>
      <Drawer.Screen options={{ title: 'Calendar', headerShown: false }} />
      <Calendar />
    </View>
  );
}
