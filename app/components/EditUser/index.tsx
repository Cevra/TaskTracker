import React from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';
import SecureButton from '@/components/SecureButton';
import { User } from '@/models/user';

type EditUserProps = {
  user: User | null;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  onRegister: (password: string, confirmPassword: string) => void;
};
const EditUser = ({
  user,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  onRegister,
}: EditUserProps) => {
  if (!user) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex px-7 w-full mt-10">
      <View className="flex space-y-4">
        <TextInput
          className="w-full h-16 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
          placeholder="First name"
          editable={false}
          value={user.name}
        />
        <TextInput
          className="w-full h-16 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
          editable={false}
          value={user.email}
        />
        <TextInput
          className="w-full h-16 bg-input-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
          placeholder="Password"
          onChangeText={(pass) => setPassword(pass)}
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          className="w-full h-16 bg-input-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
          placeholder="Confirm Password"
          onChangeText={(pass) => setConfirmPassword(pass)}
          value={confirmPassword}
          secureTextEntry={true}
        />
      </View>

      <View className="mt-12 mb-10 flex items-center w-full ">
        <SecureButton
          text="REGISTER"
          onPress={async () => onRegister(password, confirmPassword)}
          classNames="h-16 flex justify-center"
        />
      </View>
    </View>
  );
};

export default EditUser;
