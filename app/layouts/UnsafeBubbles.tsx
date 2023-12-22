import React from 'react';
import Toast from 'react-native-toast-message';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { LayoutProps } from 'types';

// TODO: for some reason we get issues when setting justify-start for keyboard. Need to investigate why until marking as unsafe
const UnsafeBubbleLayout = ({ children }: LayoutProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="w-full h-screen bg-layout justify-start items-center"
    >
      <View className="bg-circle w-52 h-52 rounded-full -left-9 -top-3 absolute" />
      <View className="bg-circle w-72 h-72 rounded-full -right-28 -bottom-20 absolute" />
      {children}
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default UnsafeBubbleLayout;
