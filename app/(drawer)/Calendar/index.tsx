import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { View } from 'react-native';
import Calendar from '@/components/Calendar';
import Default from '@/layouts/Default';
import BottomNavigation from '@/components/BottomNavigation';
import { useIsFocused } from '@react-navigation/native';

export default function CalendarView() {
  const isFocused = useIsFocused();

  return (
    <Default>
      <Drawer.Screen options={{ title: 'Calendar', headerShown: false }} />
      <Calendar isFocused={isFocused} />
      <View className="w-full -mb-2">
        <BottomNavigation />
      </View>
    </Default>
  );
}
