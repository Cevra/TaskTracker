import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import BubbleLayout from '@/layouts/Bubbles';
import { UserRepository } from '@/repositories/users';
import { Auth } from '@/services/auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import WorkerLogo from 'assets/icons/logo.svg';

const CompanySignUp = () => {
  const navigation = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    const auth = Auth.instance;

    try {
      const user = await auth.signUp({
        name,
        email,
        password,
        confirmPassword,
      });

      await UserRepository.add(user);

      auth.signIn(email, password);

      navigation.push('/screens/Register');
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error?.message;
        console.log({
          errorMessage,
        });
      }
    }
  };
  return (
    <BubbleLayout>
      <View className="inline-flex items-center justify-center">
        <Text
          style={{ fontFamily: 'Square Peg', fontSize: 80 }}
          className="mt-0 text-black leading-relaxed"
        >
          TaskTracker
        </Text>
      </View>
      <WorkerLogo />
      {/* <Image
        className="w-40 h-40  rounded-full object-cover"
        source={require('../../assets/worker_logo.jpg')}
      /> */}

      <View className="flex">
        <View>
          <TextInput
            className="w-80 h-16 mt-5 bg-secondary text-center text-xl  flex items-center content-center justify-center  rounded-full"
            placeholder="Full name"
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <TextInput
            className="w-80 h-16 mt-8 bg-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            className="w-80 h-16 mt-8 bg-secondary text-center flex items-center text-xl content-center justify-center  rounded-full"
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <TextInput
            className="w-80 h-16 mt-10 bg-secondary text-center flex items-center text-xl content-center justify-center  rounded-full"
            placeholder="Confirm your password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleSignUp}>
          <View className="w-80 h-16  mt-10 mb-10 bg-primary text-center flex flex-wrap items-center content-center justify-center ">
            <Text className=" text-white text-xl  font-normal">NEXT STEP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BubbleLayout>
  );
};

export default CompanySignUp;
