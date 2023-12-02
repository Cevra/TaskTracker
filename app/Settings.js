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

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

const Settings = () => {
  const fonts = {
    "Square Peg": require("../assets/fonts/SquarePeg-Regular.ttf"),
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  };

  const [fontsLoaded, fontError] = useFonts(fonts);
  const navigation = useRouter();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  {
    /* <Text>Settings!</Text>
  <Button title="Go home!" onPress={() => navigation.replace("/")} /> */
  }
  return (
    <View className="w-full bg-secondary h-screen  mx-auto ">
      <ImageBackground
        className="w-full  bg-secondary h-screen flex  items-center justify-center"
        source={require("../assets/background_bubbles.jpg")}
      >
        <View className=" flex items-center   justify-center ">
          <View  className=" basis-1/4 mt-10">
            {fontsLoaded ? (
              <Text
                style={{ fontFamily: "Square Peg"}}
                className=" text-black   leading-relaxed text-[80rem]"
              >
                TaskTracker
              </Text>
            ) : null}
          </View>
          <View className="flex basis-1/2 " >
            <TouchableOpacity onPress={() => navigation.push("/Login")}>
              <View className="w-80 h-16 bg-secondary text-center flex items-center content-center justify-center  rounded-full">
                {fontsLoaded ? (
                  <Text
                    style={{ fontFamily: "Poppins" }}
                    className=" text-black text-xl  font-normal"
                  >
                    Company
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("/Login")}>
              <View className="w-80 h-16  mt-20 bg-secondary text-center flex flex-wrap items-center content-center justify-center  rounded-full ">
                {fontsLoaded ? (
                  <Text
                    style={{ fontFamily: "Poppins" }}
                    className=" text-black text-xl  font-normal"
                  >
                    Worker
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="absolute bottom-[6] right-[-20] ">
          <Image
            className=" w-60 h-60  rounded-full object-cover"
            source={require("../assets/worker_logo.jpg")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Settings;
