import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Text, View } from 'react-native';

export default function ScheduleAMember() {
  return (
    <View>
      <Drawer.Screen
        options={{ title: 'ScheduleAMember', headerShown: false }}
      />
      <Text>ScheduleAMember</Text>
    </View>
  );
}
