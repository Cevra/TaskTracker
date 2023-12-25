import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import Tasks from '@/components/Tasks';
import { User } from '@/models/user';
import { UserRepository } from '@/repositories/users';
import { ActivityIndicator, View, SafeAreaView } from 'react-native';
import BottomNavigation from '@/components/BottomNavigation';

const EmployeeReport = () => {
  const search = useLocalSearchParams() as unknown as {
    params: { workerId: string };
  };

  const [worker, setWorker] = useState<User | null>();

  useEffect(() => {
    const getData = async () => {
      const firebaseWorker = await UserRepository.getById(
        search.params.workerId!,
      );
      setWorker(firebaseWorker);
    };

    getData();
  }, [search.params.workerId]);
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
        <Tasks color="#1F87FE" user={worker}></Tasks>
      </SafeAreaView>
      <BottomNavigation />
    </UnsafeBubbleLayout>
  );
};
export default EmployeeReport;
