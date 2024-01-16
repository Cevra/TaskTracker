import React from 'react';
import Toast from 'react-native-toast-message';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { LayoutProps } from 'types';

const BubbleLayout = ({ children, enableKeyboardAvoid }: LayoutProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={enableKeyboardAvoid}
      className="w-full h-screen bg-layout justify-end items-center"
    >
      <View className="bg-circle w-52 h-52 rounded-full -left-9 -top-3 absolute" />
      <View className="bg-circle w-72 h-72 rounded-full -right-28 -bottom-20 absolute" />
      {children}
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default BubbleLayout;
