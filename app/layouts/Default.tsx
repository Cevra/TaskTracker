import React from 'react';
import { SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { LayoutProps } from 'types';

const Default = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView className="w-full h-screen bg-layout justify-end items-center">
      {children}
      <Toast />
    </SafeAreaView>
  );
};

export default Default;
