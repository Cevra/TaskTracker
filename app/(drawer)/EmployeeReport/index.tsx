import React, { useEffect, useState } from 'react';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import Tasks from '@/components/Tasks';
import { User } from '@/models/user';
import { UserRepository } from '@/repositories/users';
import { ActivityIndicator, View, SafeAreaView } from 'react-native';
import BottomNavigation from '@/components/BottomNavigation';
import { Drawer } from 'expo-router/drawer';
import { Auth } from '@/services/auth';
import { useIsFocused } from '@react-navigation/native';
import {
  useGlobalSearchParams,
  useLocalSearchParams,
} from 'expo-router/src/hooks';

const EmployeeReport = () => {
  const params = useLocalSearchParams<{ workerId: string }>();
  const globalParams = useGlobalSearchParams<{ workerId: string }>();
  const [user, setUser] = useState<User | null>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const getData = async () => {
      let firebaseWorker;
      const currentUser = await Auth.instance.user();

      switch (currentUser?.type) {
        case 'worker':
          firebaseWorker = await UserRepository.getById(currentUser.id);
          break;
        default:
          firebaseWorker = await UserRepository.getById(
            params.workerId ?? globalParams.workerId!,
          );
          break;
      }
      setUser(firebaseWorker);
    };

    if (isFocused) {
      getData();
    }

    return () => {
      setUser(null);
    };
  }, [isFocused, params.workerId, globalParams.workerId]);

  if (!isFocused || !user) {
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
        <Tasks user={user}></Tasks>
        <BottomNavigation />
      </SafeAreaView>
    </UnsafeBubbleLayout>
  );
};
export default EmployeeReport;
