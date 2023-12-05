import React from "react";
import { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../../firebaseConfig";
import Users from "../repositories/users";
import BubbleLayout from "../layouts/Bubbles";

const Register = () => {

  const navigation = useRouter();

  const [CompanyName, setCompanyName] = useState("");
  const [CompanyID, setCompanyID] = useState("");
  const [Adress, setAdress] = useState("");

  const onRegisterPress = async () => {
    try {
      const currentUserId = auth.currentUser.uid;
      await Users.update(currentUserId, {
        companyName: CompanyName,
        companyID: CompanyID,
        adress: Adress,
      });

      console.log("User data updated successfully");
    } catch (error) {
      console.log("Error updating user data:", error);
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
            placeholder="Company name"
            onChangeText={(text) => setCompanyName(text)}
            value={CompanyName}
          />

          <TextInput
            className="w-80 h-16 mt-8 bg-secondary text-center flex items-center text-xl content-center justify-center rounded-full"
            placeholder="Company ID"
            onChangeText={(text) => setCompanyID(text)}
            value={CompanyID}
          />
          <TextInput
            className="w-80 h-16 mt-8 bg-secondary text-center flex items-center text-xl content-center justify-center  rounded-full"
            placeholder="Adress"
            onChangeText={(text) => setAdress(text)}
            value={Adress}
          />
        </View>

        <TouchableOpacity onPress={onRegisterPress}>
          <View className="w-80 h-16  mt-10 mb-10 bg-primary text-center flex flex-wrap items-center content-center justify-center ">
            <Text className=" text-white text-xl  font-normal">REGISTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BubbleLayout>
  );
};

export default Register;
