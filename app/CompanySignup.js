import React from "react";
import { useState } from 'react';
import { useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  StyleSheet
} from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import {
    FormControl,
    FormLabel,
    Input,
    Checkbox

   } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';


import { auth, db } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/firestore';
import * as SplashScreen from "expo-splash-screen";
import users from "./repositories/users";



SplashScreen.preventAutoHideAsync();
const CompanySignUp = () => {
    
  const [isInputField, isLinkPressed, setIsInputField] = useState(false);

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

  const [name, setName] = useState('Gov');
  const [email, setEmail] = useState('Gov@gmail.com');
  const [password, setPassword] = useState('GovGov');
  const [confirmPassword, setConfirmPassword] = useState('GovGov');

  const handleSignUp = async () => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await users.add(user.uid, {
            uid: user.uid,
            name: name,
            email: email,
        });
        await signInWithEmailAndPassword(auth, email, password);
        navigation.push('/Register');
    } catch (error) {
        console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle error here
    }
 };
  return (
    <View className="w-full bg-secondary h-screen ">
      <ImageBackground
        className="w-full bg-secondary h-screen flex-1 items-center justify-center"
        source={require("../assets/background_bubbles.jpg")}
      >
    

        <View className=" inline-flex items-center justify-center ">
       
          {fontsLoaded ? (
            <Text
              style={{ fontFamily: "Square Peg", fontSize: 80 }}
              className="mt-0 text-black   leading-relaxed"
            >
              TaskTracker
            </Text>
          ) : null}
        </View>
        <Image
          className="w-40 h-40  rounded-full object-cover"
          source={require("../assets/worker_logo.jpg")}
        />
        {/* <View> */}
        <View className="flex  " >

        <View >
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
       

          <TouchableOpacity  onPress={handleSignUp}>
            <View className="w-80 h-16  mt-10 mb-10 bg-primary text-center flex flex-wrap items-center content-center justify-center ">
        {fontsLoaded ? (
              
              <Text
                className=" text-white text-xl  font-normal"
              >
                NEXT STEP
              </Text>
          ) : null}

            </View>
          </TouchableOpacity>
         


        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       paddingHorizontal: 10,
    },
    inputField: {
       marginBottom: 10,
       paddingHorizontal: 10,
       borderWidth: 1,
       borderRadius: 5,
       height: 40,
    },
    link: {
      color: 'darkblue',
      textDecorationLine: 'underline',
   },
   linkPressed: {
      color: 'blue',
      textDecorationLine: 'underline',
      fontSize:20,
   },
   });
export default CompanySignUp;
