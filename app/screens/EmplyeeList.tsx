import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import TopBubbleLayout from '@/layouts/TopBubble';
import { useRouter } from 'expo-router/src/hooks';
import { User } from '@/models/user';
import { auth } from 'firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Auth } from '@/services/auth';

const EmployeeList = () => {
    const navigation = useRouter();

    const [userNames, setUserNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const authInstance = Auth.instance;
        const names = await authInstance.getUserNames();
        setUserNames(names);
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    fetchUserNames();
}, []);
  return (
    <TopBubbleLayout>
      <SafeAreaView className=" mt-24 ">
        {/* <Header hideTitle={true} logo={{ width: 150, height: 150 }} /> */}

        <View className="flex mt-10">
          <View className="w-full mt-0 mb-10  flex justify-center items-center">
            <Text className="text-3xl font-bold">Employee list</Text>
          </View>
        </View>
        <View>
        <Text>User Names:</Text>
        {userNames.map((name, index) => (
          <Text key={index}>{name}</Text>
        ))}
      </View>
      </SafeAreaView>
    </TopBubbleLayout>
  
  );
};
export default EmployeeList;
