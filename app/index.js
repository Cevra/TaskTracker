import React from "react";
import { View} from "react-native";
import { useFonts } from "expo-font";
import Welcome from "./screens/Welcome";

const HomeScreen = () => {
  const fonts = {
    "Square Peg": require("../assets/fonts/SquarePeg-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  };

  const [fontsLoaded, fontError] = useFonts(fonts);

  if (!fontsLoaded) {
    return <View></View>;
  }

  return <Welcome />;
};
export default HomeScreen;
