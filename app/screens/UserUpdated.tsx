import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import BubbleLayout from '@/layouts/Bubbles';
import SecureButton from '@/components/SecureButton';
import BigCheck from '@assets/icons/big-check.svg';

const UserUpdated = () => {
  const navigation = useRouter();

  return (
    <BubbleLayout>
      <SafeAreaView className="w-full mt-16 flex justify-between items-center h-screen">
        <View className="mt-44 px-8">
          <Text className="font-poppins text-2xl text-center">
            You successfuly entered your information
          </Text>
        </View>
        <View className="w-72 h-72 bg-primary rounded-full mx-auto flex justify-center items-center">
          <BigCheck width={200} />
        </View>
        <View>
          <SecureButton
            onPress={async () => {
              navigation.replace('/(drawer)/Calendar');
            }}
            text="GET STARTED"
          />
        </View>
      </SafeAreaView>
    </BubbleLayout>
  );
};

export default UserUpdated;
