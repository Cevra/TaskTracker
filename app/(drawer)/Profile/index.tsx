import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import Default from '@/layouts/Default';
import { Auth } from '@/services/auth';
import ClockIcon from '@assets/icons/clock.svg';
import BottomNavigation from '@/components/BottomNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneIcon from '@assets/icons/phone.svg';
import MailIcon from '@assets/icons/mail.svg';
import MapPinIcon from '@assets/icons/map-pin.svg';
import LayersIcon from '@assets/icons/layers.svg';

export default function Profile() {
  const [user, setUser] = useState(Auth.currentUser);
  const navigation = useRouter();

  useEffect(() => {
    const getUser = async () => {
      setUser(await Auth.instance.user());
    };

    getUser();
  }, []);

  const items = useMemo(
    () => [
      { key: 'phone', icon: PhoneIcon, value: user?.phone },
      { key: 'mail', icon: MailIcon, value: user?.email },
      { key: 'address', icon: MapPinIcon, value: user?.address },
      { key: 'company', icon: LayersIcon, value: user?.company?.name },
    ],
    [user],
  );

  return (
    <Default>
      <Drawer.Screen options={{ title: 'Profile', headerShown: false }} />
      <SafeAreaView className="w-full h-full border flex justify-start space-y-8 p-5">
        <View className="w-full flex justify-end items-end px-4">
          <TouchableOpacity
            className="bg-white rounded-3xl py-2 px-4"
            onPress={async (e) => {
              e.preventDefault();
              await Auth.instance.signOut();
              navigation.replace('/screens/Login');
            }}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-auto bg-white rounded-3xl flex justify-center items-center">
          <View className="w-full flex items-center justify-center py-4">
            <Text className={`text-lg`}>
              {user?.type === 'company' ? 'Employer' : 'Employee'}
            </Text>
            <Text
              className={`text-3xl font-bold text-[${
                user?.worker?.color ?? '#1F87FE'
              }]`}
            >
              {user?.name}
            </Text>
          </View>

          <View className="flex border-t justify-end w-full flex-row px-4 py-2">
            <View className="flex-row justify-center items-center space-x-2">
              <ClockIcon />
              <Text className="text-xl font-bold">Online</Text>
            </View>
          </View>
        </View>

        <View className="w-full bg-white rounded-3xl flex justify-start py-4 items-center px-6 mb-auto">
          {items.map((item) => (
            <View
              key={item.key}
              className="w-full flex flex-row justify-start items-center py-4 space-x-3 border-b"
            >
              <item.icon />
              <Text className="text-lg">{item.value}</Text>
            </View>
          ))}
        </View>

        <View>
          <BottomNavigation />
        </View>
      </SafeAreaView>
    </Default>
  );
}
