import React from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import Welcome from '@/screens/Welcome';
import { FONTS } from '@/constants';
import * as SplashScreen from 'expo-splash-screen';
import Locations from './components/Locations';

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
  const [fontsLoaded, fontError] = useFonts(FONTS);

  if (fontError) {
    return <View></View>;
  }

  if (!fontsLoaded) {
    return <View></View>;
  }

  return <Locations />;
  // return <Welcome />;
};

export default HomeScreen;
