import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Auth } from '@/services/auth';
import BubbleLayout from '@/layouts/Bubbles';
import SecureButton from '@/components/SecureButton';
import Header from '@/components/Header';

const ResetPassword = () => {
  const navigation = useRouter();
  const [email, setEmail] = useState('');

  const onResetPassword = useCallback(
    async (email: string) => {
      const auth = Auth.instance;
      try {
        await auth.sendResetPasswordEmail(email);

        Toast.show({
          type: 'success',
          text1: 'Password reset email sent!',
        });

        setTimeout(() => navigation.replace('/screens/Login'), 1000);
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Unable to reset password',
        });
      }
    },
    [navigation],
  );

  return (
    <BubbleLayout>
      <SafeAreaView className="flex w-full h-screen items-center justify-between pt-10">
        <Header />

        <View className="flex flex-col mb-20 justify-between gap-y-5 items-stretch">
          <View>
            <TextInput
              className="w-80 h-16 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View>
            <SecureButton
              text="RESET PASSWORD"
              onPress={() => onResetPassword(email)}
            />
            <Text className="w-80 mt-2 text-center text-black text-align-center text-lg wrap-text font-normal leading-normal">
              Remember password?
              <TouchableOpacity
                onPress={() => navigation.replace('/screens/Login')}
              >
                <Text className="pl-2 pt-[3px] text-blue-700 font-bold text-lg">
                  Sign in
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </BubbleLayout>
  );
};

export default ResetPassword;
