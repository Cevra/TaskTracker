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
import { auth, db } from "../firebaseConfig";
import Users from "./repositories/users";
import * as SplashScreen from "expo-splash-screen";
import { Use } from "react-native-svg";
import { getAuth } from "firebase/auth";



SplashScreen.preventAutoHideAsync();
const Register = () => {
    
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

  const [CompanyName, setCompanyName] = useState('META5');
  const [CompanyID, setCompanyID] = useState('META5');
  const [Adress, setAdress] = useState('KOd intere');
 



  const onRegisterPress = async () => {
    try {
        // console.log(auth.currentUser);
       const currentUserId = auth.currentUser.uid;
        await Users.update(currentUserId, {
            companyName: CompanyName,
            companyID: CompanyID,
            adress: Adress,
        });

      
   
       console.log('User data updated successfully');
    } catch (error) {
       console.log('Error updating user data:', error);
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
        {fontsLoaded ? (
              
              <Text
                className=" text-white text-xl  font-normal"
              >
                REGISTER
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
export default Register;
