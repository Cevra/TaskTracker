import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Auth } from '@/services/auth';
import BubbleLayout from '@/layouts/Bubbles';
import WorkerLogo from '@assets/icons/logo.svg';

const Login = () => {
  const navigation = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = async () => {
    const auth = Auth.instance;
    try {
      await auth.signIn(email, password);
      // navigation.push('/screens/Home');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  };

  return (
    <BubbleLayout>
      <View className="flex items-center justify-center pt-36">
        <Text
          style={{ fontFamily: 'Square Peg' }}
          className="mt-3 text-8xl text-black leading-relaxed"
        >
          TaskTracker
        </Text>
        <WorkerLogo width={200} height={200} />
      </View>
      <View className="flex mt-5">
        <View className="flex flex-col my-10 gap-10">
          <TextInput
            className="w-80 h-16 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded"
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            className="w-80 h-16 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded"
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <Text className="w-80 h-8 text-center text-black text-align-center text-xl wrap-text font-normal leading-normal">
          Forgot password?
        </Text>

        <TouchableOpacity onPress={onLoginPress}>
          <View className="w-80 h-16 mt-5 bg-primary text-center flex flex-wrap items-center content-center justify-center rounded">
            <Text className="text-white text-xl font-normal">LOGIN</Text>
          </View>
        </TouchableOpacity>

        <Text className="w-80 mb-20 text-center text-black text-align-center text-lg wrap-text font-normal leading-normal">
          Don’t have an accaount?
          <TouchableOpacity
            onPress={() => navigation.push('/screens/CompanySignup')}
          >
            <Text className="pl-2 pt-[3px] text-blue-700 font-bold text-lg">
              Sign up
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </BubbleLayout>
  );
};

export default Login;
