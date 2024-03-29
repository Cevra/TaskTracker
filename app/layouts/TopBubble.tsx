import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { LayoutProps } from 'types';

const TopBubbleLayout = ({
  children,
  classNames,
  enableKeyboardAvoid = true,
}: LayoutProps) => {
  return (
    <KeyboardAvoidingView
      enabled={enableKeyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={`w-full h-full bg-layout justify-end items-center ${
        classNames ?? ''
      }`}
    >
      <View className="bg-circle w-52 h-52 rounded-full -left-9 -top-3 absolute" />
      {children}
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default TopBubbleLayout;
