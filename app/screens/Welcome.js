import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import BubbleLayout from "../layouts/Bubbles";

const Welcome = () => {
  const navigation = useRouter();

  return (
    <BubbleLayout>
      <View className=" inline-flex items-center justify-center ">
        <Text
          style={{ fontFamily: "Poppins" }}
          className="mt-6  text-black text-3xl  leading-normal"
        >
          Welcome to
        </Text>

        <Text
          style={{ fontFamily: "Square Peg", fontSize: 80 }}
          className="mt-3 text-black   leading-relaxed"
        >
          TaskTracker
        </Text>
      </View>
      <Image
        className="w-60 h-60  mt-5 rounded-full object-cover"
        source={require("../../assets/worker_logo.jpg")}
      />
      <View>
        <Text className="w-80 h-30  mt-10 mb-5 text-center text-black text-align-center  text-2xl  wrap-text font-normal  leading-normal">
          Your go-to tool for effortlessly hiring manual laborers and
          efficiently managing their schedules.
        </Text>

        <TouchableOpacity onPress={() => navigation.push("/screens/RoleChoice")}>
          <View className="w-80 h-16  mt-5 mb-20 bg-primary text-center flex flex-wrap items-center content-center justify-center ">
            <Text className=" text-white text-xl  font-normal">
              GET STARTED
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </BubbleLayout>
  );
};
export default Welcome;
