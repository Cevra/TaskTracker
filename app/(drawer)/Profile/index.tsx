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
import { TextInput } from 'react-native-gesture-handler';
import { UserRepository } from '@/repositories/users';
import { Company } from '@/models/company';

export default function Profile() {
  const [user, setUser] = useState(Auth.currentUser);
  const [isEditing, setIsEditing] = useState(false);

  const [editedValues, setEditedValues] = useState({
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.company?.address || '',
    company: user?.company?.name || '',
  });
  const navigation = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const u = await Auth.instance.user();
      setUser(u);
      setEditedValues({
        phone: u?.phone || '',
        email: u?.email || '',
        address: u?.company?.address || '',
        company: u?.company?.name || '',
      });
    };

    getUser();
  }, []);

  const items = useMemo(() => {
    const rows = [
      { key: 'phone', icon: PhoneIcon, value: editedValues.phone },
      { key: 'mail', icon: MailIcon, value: editedValues.email },
    ];

    if (user?.type === 'company') {
      rows.push(
        { key: 'address', icon: MapPinIcon, value: editedValues.address },
        { key: 'company', icon: LayersIcon, value: editedValues.company },
      );
    }
    return rows;
  }, [editedValues, user]);

  const handleSave = async () => {
    try {
      await UserRepository.updateOne(user!.id, {
        phone: editedValues.phone,
        address: editedValues.address,
        company: {
          ...(user?.company ?? {}),
          name: editedValues.company,
        } as Company,
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Default>
      <Drawer.Screen options={{ title: 'Profile', headerShown: false }} />
      <SafeAreaView className="w-full h-screen flex justify-start space-y-8 p-5">
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
            <Text className={`text-xl mb-5 text-slate-600`}>
              {user?.type === 'company' ? 'Employer' : 'Employee'}
            </Text>
            <Text
              className={`text-3xl font-bold text-[${
                user?.worker?.color ?? '#1F87FE'
              }]`}
            >
              <Text className={`text-3xl ml-6 font-bold mt-4 `}>
                {user?.name}
              </Text>
            </Text>
          </View>

          <View className="flex border-t border-slate-400  justify-end w-full flex-row px-4 py-2">
            <View className="flex-row justify-center items-center space-x-2">
              <ClockIcon />
              <Text className="text-xl  text-slate-600 font-bold">Online</Text>
            </View>
          </View>
        </View>

        <View className="w-full bg-white rounded-3xl flex justify-start py-4 items-center px-6 mb-auto">
          {items.map((item) => (
            <View
              key={item.key}
              className="w-full flex flex-row justify-start items-center py-4 space-x-3 border-b border-slate-400 "
            >
              <item.icon />
              <TextInput
                value={item.value}
                onChangeText={(text) =>
                  setEditedValues((prev) => ({ ...prev, [item.key]: text }))
                }
                placeholder={`Enter ${item.key}`}
                style={{ flex: 1, fontSize: 18 }}
                onFocus={() => {
                  setIsEditing(true);
                }}
              />
            </View>
          ))}
          {isEditing && (
            <TouchableOpacity
              onPress={handleSave}
              className="bg-blue-500 border border-slate-400 text-white py-2 px-4 rounded-3xl mt-12"
            >
              <Text className="text-white text-xl">Save</Text>
            </TouchableOpacity>
          )}
        </View>

        <BottomNavigation />
      </SafeAreaView>
    </Default>
  );
}
