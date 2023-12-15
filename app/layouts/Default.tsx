import React from 'react';
import { SafeAreaView } from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import { LayoutProps } from '../../types';

const Default = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView className="w-full h-screen bg-layout justify-end items-center">
      {children}
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default Default;
