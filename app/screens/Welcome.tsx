import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import BubbleLayout from '@/layouts/Bubbles';
import Header from '@/components/Header';
import SecureButton from '@/components/SecureButton';
import { Storage } from '@/services/storage';
import { STORAGE_KEYS } from '@/constants';

const Welcome = () => {
  const navigation = useRouter();

  return (
    <BubbleLayout>
      <Header showWelcome />
      <View>
        <Text className="w-80 h-30 mt-10 mb-5 text-center text-black text-align-center text-2xl wrap-text font-normal leading-normal">
          Your go-to tool for effortlessly hiring manual laborers and
          efficiently managing their schedules.
        </Text>

        <View className="mt-28 mb-10">
          <SecureButton
            text="GET STARTED"
            onPress={async () => {
              navigation.push('/screens/Register');
              await Storage.instance.set(STORAGE_KEYS.WELCOME, 'true');
            }}
          />
        </View>
      </View>
    </BubbleLayout>
  );
};

export default Welcome;
