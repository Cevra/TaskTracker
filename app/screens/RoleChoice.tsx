import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BubbleLayout from '@/layouts/Bubbles';
import WorkerLogo from 'assets/icons/logo.svg';

const RoleChoice = () => {
  const navigation = useRouter();

  return (
    <BubbleLayout>
      <View className="flex w-full flex-col justify-between h-screen">
        <View className="justify-center items-center mt-36">
          <Text
            style={{ fontFamily: 'Square Peg' }}
            className="text-black leading-relaxed text-8xl"
          >
            TaskTracker
          </Text>
        </View>

        <View className="flex justify-center items-center gap-14">
          <TouchableOpacity onPress={() => navigation.push('/screens/Login')}>
            <View className="flex w-80 h-16 bg-input-secondary items-center justify-center rounded-full">
              <Text
                style={{ fontFamily: 'Poppins' }}
                className="text-black text-xl font-normal"
              >
                Company
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push('/screens/Login')}>
            <View className="w-80 h-16 bg-input-secondary text-center flex flex-wrap items-center content-center justify-center  rounded-full ">
              <Text
                style={{ fontFamily: 'Poppins' }}
                className=" text-black text-xl font-normal"
              >
                Worker
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex items-end justify-end">
          <WorkerLogo
            width={200}
            height={200}
            style={{ marginRight: -40, marginBottom: -15 }}
          />
        </View>
      </View>
    </BubbleLayout>
  );
};

export default RoleChoice;
