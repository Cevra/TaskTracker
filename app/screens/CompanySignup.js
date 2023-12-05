import React from "react";
import { useState } from "react";

import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";

import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/firestore";
import users from "../repositories/users";
import BubbleLayout from "../layouts/Bubbles";


const CompanySignUp = () => {

  const navigation = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await users.add(user.uid, {
        uid: user.uid,
        name: name,
        email: email,
      });
      await signInWithEmailAndPassword(auth, email, password);
      navigation.push("/screens/Register");
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle error here
    }
  };
  return (
    <BubbleLayout>
      <View className=" inline-flex items-center justify-center ">
        <Text
          style={{ fontFamily: "Square Peg", fontSize: 80 }}
          className="mt-0 text-black   leading-relaxed"
        >
          TaskTracker
        </Text>
      </View>
      <Image
        className="w-40 h-40  rounded-full object-cover"
        source={require("../../assets/worker_logo.jpg")}
      />

      <View className="flex  ">
        <View>
          <TextInput
            className="w-80 h-16 mt-5 bg-secondary text-center text-xl  flex items-center content-center justify-center  rounded-full"
            placeholder="Full name"
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <TextInput
            className="w-80 h-16 mt-8 bg-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            className="w-80 h-16 mt-8 bg-secondary text-center flex items-center text-xl content-center justify-center  rounded-full"
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <TextInput
            className="w-80 h-16 mt-10 bg-secondary text-center flex items-center text-xl content-center justify-center  rounded-full"
            placeholder="Confirm your password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleSignUp}>
          <View className="w-80 h-16  mt-10 mb-10 bg-primary text-center flex flex-wrap items-center content-center justify-center ">
            <Text className=" text-white text-xl  font-normal">NEXT STEP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BubbleLayout>
  );
};

export default CompanySignUp;
