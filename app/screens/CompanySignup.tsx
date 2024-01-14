import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { UserRepository } from '@/repositories/users';
import { Auth } from '@/services/auth';
import TopBubbleLayout from '@/layouts/TopBubble';
import Header from '@/components/Header';
import { ValidationError } from '@/errors/validation-error';
import Toast from 'react-native-toast-message';
import SecureButton from '@/components/SecureButton';
import { FirebaseError } from 'firebase/app';
import { FIREBASE_ERROR_MESSAGES } from '@/constants';
import { SafeAreaView } from 'react-native-safe-area-context';

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
        type: 'company',
      });

      await UserRepository.add(user);
      auth.signIn(email, password);
      navigation.replace('/screens/Register');
    } catch (error) {
      if (error instanceof ValidationError) {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      } else if (error instanceof FirebaseError) {
        Toast.show({
          type: 'error',
          text1: FIREBASE_ERROR_MESSAGES[error.code] ?? '',
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
      <SafeAreaView className="h-screen">
        <Header />

        <View className="flex mt-5">
          <View className="flex flex-col gap-8">
            <TextInput
              className="w-80 h-14 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
              placeholder="Full name"
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <TextInput
              className="w-80 h-14 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              className="w-80 h-14 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
              placeholder="Enter your password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
            />
            <TextInput
              className="w-80 h-14 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
              placeholder="Confirm your password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry
            />
          </View>

          <View className="mt-10 mb-10">
            <SecureButton text="NEXT STEP" onPress={handleSignUp} />
          </View>
        </View>
      </SafeAreaView>
    </TopBubbleLayout>
  );
};

export default CompanySignUp;
