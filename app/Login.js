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
import { initializeApp } from "firebase/app";
import { auth } from "../firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as SplashScreen from "expo-splash-screen";



SplashScreen.preventAutoHideAsync();
const Login = () => {
    
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = async () => {
    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // console.log('Login Successful:', userCredential.user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log('Login Failed:', error);
  });
  
   };
   const handleLinkPress = () => {
    setIsLinkPressed(!isLinkPressed);

 };
  return (
    <View className="w-full bg-secondary h-screen ">
      <ImageBackground
        className="w-full bg-secondary h-screen flex-1 items-center justify-center"
        source={require("../assets/background_bubbles.jpg")}
      >
    

        <View className=" inline-flex flex items-center justify-center ">
       
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
          className="w-40 h-40  mt-5 rounded-full object-cover"
          source={require("../assets/worker_logo.jpg")}
        />
        {/* <View> */}
        <View className="flex  " >

        <View >
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
        {fontsLoaded ? (
          <Text
            className="w-80 h-8  mt-10 mb-5 text-center text-black text-align-center text-xl  wrap-text font-normal  leading-normal"
          >
           Forgot password? 
          </Text>
          ) : null}

          <TouchableOpacity onPress={onLoginPress}>
            <View className="w-80 h-16  mt-5  bg-primary text-center flex flex-wrap items-center content-center justify-center ">
        {fontsLoaded ? (
              
              <Text
                className=" text-white text-xl  font-normal"
              >
                LOGIN
              </Text>
          ) : null}

            </View>
          </TouchableOpacity>
         

          {fontsLoaded ? (
              <Text
              className="w-80  mb-20 text-center text-black text-align-center  text-lg  wrap-text font-normal  leading-normal"
              >
                 Don’t have an accaount?
             <TouchableOpacity onPress={() => navigation.push("/CompanySignup")}>
        <Text style={isLinkPressed ? styles.linkPressed : styles.link}>Sign up</Text>
      </TouchableOpacity>
          
          </Text>
          ) : null}
       

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
export default Login;
