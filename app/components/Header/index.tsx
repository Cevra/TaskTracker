import React from 'react';
import { View, Text } from 'react-native';
import WorkerLogo from '@assets/icons/logo.svg';
import { DEFAULT_LOGO_HEIGHT, DEFAULT_LOGO_WIDTH } from '@/constants';

type HeaderProps = {
  logo?: {
    width?: number;
    height?: number;
  };
  hideTitle?: boolean;
  showWelcome?: boolean;
};

const Header = ({ logo, hideTitle, showWelcome }: HeaderProps) => {
  return (
    <View className="flex items-center justify-center">
      {showWelcome && (
        <Text
          style={{ fontFamily: 'Poppins' }}
          className="mt-6 text-black text-3xl leading-normal"
        >
          Welcome to
        </Text>
      )}
      {!hideTitle && (
        <Text
          style={{ fontFamily: 'Square Peg' }}
          className="mt-3 text-8xl text-black leading-relaxed"
        >
          TaskTracker
        </Text>
      )}
      <WorkerLogo
        width={logo?.width ?? DEFAULT_LOGO_WIDTH}
        height={logo?.height ?? DEFAULT_LOGO_HEIGHT}
      />
    </View>
  );
};

export default Header;
