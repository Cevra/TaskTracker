import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { UserRepository } from '@/repositories/users';
import TopBubbleLayout from '@/layouts/TopBubble';
import Header from '@/components/Header';
import { Auth } from '@/services/auth';
import { Drawer } from 'expo-router/drawer';
import { ValidationError } from '@/errors/validation-error';
import Toast from 'react-native-toast-message';
import SecureButton from '@/components/SecureButton';
import { FirebaseError } from 'firebase/app';
import { FIREBASE_ERROR_MESSAGES } from '@/constants';
import { generatePassword } from '@/utils/password';
import { Worker } from '@/models/worker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sendEmail } from '@/utils/mail';
import { generateRandomColor } from '@/utils/color';

const AddANewMember = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const addNewMember = async () => {
    const password = generatePassword(6);
    const confirmPassword = password;
    const name = `${firstName} ${lastName}`;
    const auth = Auth.instance;
    try {
      const response = await sendEmail({
        to: [email],
        subject: `Welcome ${name} to TaskTracker!`,
        text: `You have been invited to join TaskTracker. Your password is: ${password}. Download the app from your app store and start clocking your hours!`,
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const user = await auth.signUp({
        name,
        password,
        confirmPassword,
        phone,
        email,
        type: 'worker',
      });
      const workerColor = generateRandomColor();
      user.addWorkerDetails(new Worker(Auth.currentUser!.id, workerColor));
      await UserRepository.add(user);

      Toast.show({
        type: 'success',
        text1: 'New member invited!',
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      } else if (error instanceof FirebaseError) {
        Toast.show({
          type: 'error',
          text1:
            FIREBASE_ERROR_MESSAGES[error.code] ?? 'Unable to invite member',
        });
      } else if (error instanceof Error) {
        Toast.show({
          type: 'error',
          text1: 'Unknown error',
        });
      }
    }
  };

  return (
    <TopBubbleLayout>
      <Drawer.Screen options={{ title: 'AddNewMember', headerShown: false }} />

      <SafeAreaView className=" mt-24 ">
        <Header hideTitle={true} logo={{ width: 150, height: 150 }} />

        <View className="flex mt-10">
          <View className="w-full mt-0 mb-10  flex justify-center items-center">
            <Text className="text-3xl font-bold">Add a New Member</Text>
          </View>
          <View className="flex flex-col gap-4">
            <TextInput
              className="w-80 h-16 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
              placeholder="First name"
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
            <TextInput
              className="w-80 h-16 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
              placeholder="Last name"
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
            <TextInput
              className="w-80 h-16 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
              placeholder="Phone number"
              onChangeText={(text) => setPhoneNumber(text)}
              value={phone}
            />
            <TextInput
              className="w-80 h-16 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
              placeholder="E-mail"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>

          <View className="mt-12 mb-10 flex items-center w-full ">
            <SecureButton
              text="SEND INVITATION"
              onPress={addNewMember}
              classNames="h-16 w-60 flex justify-center"
            />
          </View>
        </View>
      </SafeAreaView>
    </TopBubbleLayout>
  );
};

export default AddANewMember;
