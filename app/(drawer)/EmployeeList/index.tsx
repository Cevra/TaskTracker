import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { CardAction } from '@/components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workers from '@/components/Workers';
import { Auth } from '@/services/auth';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import BottomNavigation from '@/components/BottomNavigation';
import { Drawer } from 'expo-router/drawer';
import { useNavigation } from 'expo-router';

const EmployeeList = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await Auth.instance.start();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <UnsafeBubbleLayout>
      <SafeAreaView className="w-full h-full justify-between">
        <Drawer.Screen
          options={{ title: 'EmployeeList', headerShown: false }}
        />

        <View className="flex mt-10">
          <View className="w-full mt-0 flex justify-center items-center">
            <Text className="text-3xl font-bold">Employee list</Text>
          </View>
        </View>

        <View>
          <View className="w-full max-h-[600px] mb-auto">
            {isLoading ? (
              <View className="h-full justify-between items-center flex w-full px-5">
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <Workers
                actionType={CardAction.VIEW}
                onAction={async (user) => {
                  // @ts-expect-error invalid lib ts definitions
                  navigation.navigate('EmployeeReport', { workerId: user.id });
                }}
              />
            )}
          </View>
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </UnsafeBubbleLayout>
  );
};
export default EmployeeList;
