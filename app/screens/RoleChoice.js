import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import BubbleLayout from "../layouts/Bubbles";


const RoleChoice = () => {

  const navigation = useRouter();

 
  return (
    <BubbleLayout>
        <View className=" flex items-center   justify-center ">
          <View  className=" basis-1/4 mt-10">
              <Text
                style={{ fontFamily: "Square Peg"}}
                className=" text-black   leading-relaxed text-[80rem]"
              >
                TaskTracker
              </Text>
          </View>
          <View className="flex basis-1/2 " >
            <TouchableOpacity onPress={() => navigation.push("/screens/Login")}>
              <View className="w-80 h-16 bg-secondary text-center flex items-center content-center justify-center  rounded-full">
                  <Text
                    style={{ fontFamily: "Poppins" }}
                    className=" text-black text-xl  font-normal"
                  >
                    Company
                  </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push("/screens/Login")}>
              <View className="w-80 h-16  mt-16 bg-secondary text-center flex flex-wrap items-center content-center justify-center  rounded-full ">
                  <Text
                    style={{ fontFamily: "Poppins" }}
                    className=" text-black text-xl  font-normal"
                  >
                    Worker
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="absolute bottom-[6] right-[-20] ">
          <Image
            className=" w-60 h-60  rounded-full object-cover"
            source={require("../../assets/worker_logo.jpg")}
            />
        </View>
    
      </BubbleLayout>
  );
};

export default RoleChoice;
