import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from 'expo-router';
import { CardAction } from '@/components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import Workers from '@/components/Workers';
import { ScrollView } from 'react-native-gesture-handler';
import { Auth } from '@/services/auth';
import UnsafeBubbleLayout from '@/layouts/UnsafeBubbles';
import BottomNavigation from '@/components/BottomNavigation';

const EmployeeList = () => {
  const navigation = useNavigation();

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await Auth.instance.start();
      setDataLoaded(true);
    };

    fetchData();
  }, []);

  return (
    <UnsafeBubbleLayout>
      <SafeAreaView className="w-full h-full  justify-between">
        {/* <Header hideTitle={true} logo={{ width: 150, height: 150 }} /> */}

        <View className="flex mt-10">
          <View className="w-full mt-0   flex justify-center items-center">
            <Text className="text-3xl font-bold">Employee list</Text>
          </View>
        </View>

        <View>
          <View className="w-full h-2/3 mb-auto">
            {!dataLoaded ? (
              <View className="h-full justify-center items-center flex w-full px-5">
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <ScrollView className="h-full flex  w-full px-5">
                <Workers
                  actionType={CardAction.VIEW}
                  onAction={(user) => {
                    navigation.navigate(
                      //@ts-expect-error invalid-library
                      `screens/EmployeeReport` as never,
                      {
                        params: { workerId: user.id },
                      } as never,
                    );

                    return Promise.resolve();
                  }}
                />
              </ScrollView>
            )}
          </View>
        </View>
        <BottomNavigation />
      </SafeAreaView>
    </UnsafeBubbleLayout>
  );
};
export default EmployeeList;
