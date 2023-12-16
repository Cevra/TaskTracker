import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Auth } from '@/services/auth';
import { UserRepository } from '../repositories/users';
import { Company } from '@/models/company';
import TopBubbleLayout from '@/layouts/TopBubble';
import WorkerLogo from 'assets/icons/logo.svg';
import SecureButton from '@/components/SecureButton';
import Toast from 'react-native-toast-message';

const Register = () => {
  const navigation = useRouter();

  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [address, setAddress] = useState('');

  const onRegisterPress = async () => {
    try {
      const currentUser = Auth.currentUser!;
      currentUser.addCompanyDetails(
        new Company(companyName, companyId, address),
      );
      await UserRepository.update(currentUser);

      navigation.replace('/(drawer)/Calendar');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Unable to register!',
        text2: 'Make sure all fields are ok and try again',
      });
    }
  };
  return (
    <TopBubbleLayout>
      <View className="inline-flex items-center justify-center pt-28">
        <Text
          style={{ fontFamily: 'Square Peg' }}
          className="mt-0 text-black text-8xl  leading-relaxed"
        >
          TaskTracker
        </Text>
      </View>
      <WorkerLogo width={200} height={200} />
      <View className="flex  ">
        <View>
          <TextInput
            className="w-80 h-16 mt-5 bg-input-secondary text-center text-xl  flex items-center content-center justify-center rounded-full"
            placeholder="Company name"
            onChangeText={(text) => setCompanyName(text)}
            value={companyName}
          />

          <TextInput
            className="w-80 h-16 mt-8 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Company ID"
            onChangeText={(text) => setCompanyId(text)}
            value={companyId}
          />
          <TextInput
            className="w-80 h-16 mt-8 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Address"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>

        <View className="mt-10 mb-10">
          <SecureButton text="REGISTER" onPress={onRegisterPress} />
        </View>
      </View>
    </TopBubbleLayout>
  );
};

export default Register;
