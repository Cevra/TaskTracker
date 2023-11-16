import React from "react";
import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { resolveAssetSource } from "react-native";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const HomeScreen = () => {
  const fonts = {
    "Square Peg": require("../assets/fonts/SquarePeg-Regular.ttf"),
    "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
  };

  const [fontsLoaded, fontError] = useFonts(fonts);

  const navigation = useRouter();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Configure the status bar

  return (
    <View className="w-full bg-secondary h-screen ">
      <ImageBackground
        className="w-full bg-secondary h-screen flex-1 items-center justify-center"
        source={require("../assets/background_bubbles.jpg")}
      >
        <View className=" inline-flex flex items-center justify-center ">
        {fontsLoaded ? (
          <Text
            style={{ fontFamily: "Poppins" }}
            className="mt-6  text-black text-3xl  leading-normal"
          >
            Welcome to
          </Text>
            ) : null}
          {fontsLoaded ? (
            <Text
              style={{ fontFamily: "Square Peg", fontSize: 80 }}
              className="mt-3 text-black   leading-relaxed"
            >
              TaskTracker
            </Text>
          ) : null}
        </View>
        <Image
          className="w-60 h-60  mt-5 rounded-full object-cover"
          source={require("../assets/screen_one_worker.jpg")}
        />
        <View>
        {fontsLoaded ? (
          <Text
            className="w-80 h-30  mt-10 mb-5 text-center text-black text-align-center  text-2xl  wrap-text font-normal  leading-normal"
          >
            Your go-to tool for effortlessly hiring manual laborers and
            efficiently managing their schedules.
          </Text>
          ) : null}

          <TouchableOpacity onPress={() => navigation.push("/Settings")}>
            <View className="w-80 h-16  mt-5 mb-20 bg-primary text-center flex flex-wrap items-center content-center justify-center ">
        {fontsLoaded ? (
              
              <Text
                className=" text-white text-xl  font-normal"
              >
                GET STARTED
              </Text>
          ) : null}

            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default HomeScreen;
