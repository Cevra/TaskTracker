import React from "react";
import { View} from "react-native";
import { useFonts } from "expo-font";
import Welcome from "./screens/Welcome";

const HomeScreen = () => {


  const [fontsLoaded, fontError] = useFonts(fonts);

  if (fontError) {
    return <View></View>;
  }

  if (!fontsLoaded) {
    return <View></View>;
  }

  return <Welcome />;
};
export default HomeScreen;
