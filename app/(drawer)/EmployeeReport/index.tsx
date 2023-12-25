import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import Tasks from '@/components/Tasks';
import { User } from '@/models/user';
import { UserRepository } from '@/repositories/users';
import { ActivityIndicator, View, SafeAreaView } from 'react-native';
import BottomNavigation from '@/components/BottomNavigation';
import { Drawer } from 'expo-router/drawer';
import { Storage } from '@/services/storage';

const EmployeeReport = () => {
  const [worker, setWorker] = useState<User | null>();

  useEffect(() => {
    const getData = async () => {
      const userId = await Storage.instance.get('workerId');
      const firebaseWorker = await UserRepository.getById(
        userId!
      );
      setWorker(firebaseWorker);
    };

    getData();
  }, []);

  if (!worker) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <UnsafeBubbleLayout>
      <SafeAreaView className="w-full h-full mt-3 justify-end">
        <Drawer.Screen
          options={{ title: 'AddNewMember', headerShown: false }}
        />

        <Tasks color="#1F87FE" user={worker}></Tasks>
      </SafeAreaView>
      <BottomNavigation />
    </UnsafeBubbleLayout>
  );
};
export default EmployeeReport;
