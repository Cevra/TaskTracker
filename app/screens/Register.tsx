import React from 'react';
import { useState } from 'react';

import { View, Text, TouchableOpacity, TextInput } from 'react-native';
// import { useRouter } from 'expo-router';
import { Auth } from '@/services/auth';
import { UserRepository } from '../repositories/users';
import BubbleLayout from '../layouts/Bubbles';
import { Company } from '@/models/company';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import WorkerLogo from 'assets/icons/logo.svg';

const Register = () => {
  // const navigation = useRouter();

  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [address, setAddress] = useState('');

  const onRegisterPress = async () => {
    try {
      const currentUser = Auth.currentUser;
      currentUser.addCompanyDetails(
        new Company(companyName, companyId, address),
      );
      await UserRepository.update(currentUser);

      console.log('User data updated successfully');
    } catch (error) {
      console.log('Error updating user data:', error);
    }
  };
  return (
    <BubbleLayout>
      <View className="inline-flex items-center justify-center">
        <Text
          style={{ fontFamily: 'Square Peg', fontSize: 80 }}
          className="mt-0 text-black  leading-relaxed"
        >
          TaskTracker
        </Text>
      </View>
      <WorkerLogo />
      <View className="flex  ">
        <View>
          <TextInput
            className="w-80 h-16 mt-5 bg-secondary text-center text-xl  flex items-center content-center justify-center  rounded-full"
            placeholder="Company name"
            onChangeText={(text) => setCompanyName(text)}
            value={companyName}
          />

          <TextInput
            className="w-80 h-16 mt-8 bg-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Company ID"
            onChangeText={(text) => setCompanyId(text)}
            value={companyId}
          />
          <TextInput
            className="w-80 h-16 mt-8 bg-secondary text-center flex items-center text-xl content-center justify-center  rounded-full"
            placeholder="Adress"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>

        <TouchableOpacity onPress={onRegisterPress}>
          <View className="w-80 h-16  mt-10 mb-10 bg-primary text-center flex flex-wrap items-center content-center justify-center ">
            <Text className=" text-white text-xl  font-normal">REGISTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BubbleLayout>
  );
};

export default Register;
