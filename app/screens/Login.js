import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import BubbleLayout from "../layouts/Bubbles";

const Login = () => {
  const navigation = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.push("/(drawer)/ScheduleAMember");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <BubbleLayout>
      <View className=" inline-flex items-center justify-center ">
        <Text
          style={{ fontFamily: "Square Peg", fontSize: 80 }}
          className="mt-3 text-black   leading-relaxed"
        >
          TaskTracker
        </Text>
      </View>
      <Image
        className="w-40 h-40  mt-5 rounded-full object-cover"
        source={require("../../assets/worker_logo.jpg")}
      />
      {/* <View> */}
      <View className="flex  ">
        <View>
          <TextInput
            className="w-80 h-16 mt-10 bg-secondary text-center text-xl flex items-center content-center justify-center rounded-full"
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            className="w-80 h-16 mt-10 bg-secondary text-center flex items-center text-xl content-center justify-center  rounded-full"
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <Text className="w-80 h-8  mt-10 mb-5 text-center text-black text-align-center text-xl  wrap-text font-normal  leading-normal">
          Forgot password?
        </Text>

        <TouchableOpacity onPress={onLoginPress}>
          <View className="w-80 h-16  mt-5  bg-primary text-center flex flex-wrap items-center content-center justify-center ">
            <Text className=" text-white text-xl  font-normal">LOGIN</Text>
          </View>
        </TouchableOpacity>

        <Text className="w-80  mb-20 text-center text-black text-align-center  text-lg  wrap-text font-normal  leading-normal">
          Don’t have an accaount? 
          <TouchableOpacity
            onPress={() => navigation.push("/screens/CompanySignup")}
          >
            <Text className="text-blue-700 underline text-lg"> Sign up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </BubbleLayout>
  );
};

export default Login;
