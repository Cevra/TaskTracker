import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { UserRepository } from '@/repositories/users';
import { Auth } from '@/services/auth';
import TopBubbleLayout from '@/layouts/TopBubble';
import WorkerLogo from 'assets/icons/logo.svg';

const CompanySignUp = () => {
  const navigation = useRouter();

  const [name, setName] = useState('MH');
  const [email, setEmail] = useState('mirsad@metata.io');
  const [password, setPassword] = useState('sifra1');
  const [confirmPassword, setConfirmPassword] = useState('sifra1');

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
    <TopBubbleLayout>
      <View className="inline-flex items-center justify-center pt-24">
        <Text
          style={{ fontFamily: 'Square Peg' }}
          className="mt-0 text-black text-8xl leading-relaxed"
        >
          TaskTracker
        </Text>
      </View>
      <WorkerLogo width={150} height={150} />

      <View className="flex">
        <View>
          <TextInput
            className="w-80 h-14 mt-5 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
            placeholder="Full name"
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <TextInput
            className="w-80 h-14 mt-8 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            className="w-80 h-14 mt-8 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <TextInput
            className="w-80 h-14 mt-10 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Confirm your password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleSignUp}>
          <View className="w-80 h-14 mt-10 mb-10 bg-primary text-center flex flex-wrap items-center content-center justify-center rounded">
            <Text className=" text-white text-xl font-normal">NEXT STEP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TopBubbleLayout>
  );
};

export default CompanySignUp;
