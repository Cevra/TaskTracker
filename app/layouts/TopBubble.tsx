import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LayoutProps } from 'types';

const TopBubbleLayout = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView className="w-full h-screen bg-layout justify-center items-center">
      <View className="bg-circle w-52 h-52 rounded-full -left-9 -top-3 absolute" />
      {children}
    </SafeAreaView>
  );
};

export default TopBubbleLayout;
