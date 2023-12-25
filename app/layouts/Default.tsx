import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { LayoutProps } from 'types';

const Default = ({ children }: LayoutProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="w-full h-screen bg-layout justify-end items-center"
    >
      {children}
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default Default;
