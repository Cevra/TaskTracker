import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import WorkerLogo from '@assets/icons/logo.svg';
import { Auth } from '@/services/auth';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const [type, setType] = useState('worker');

  useEffect(() => {
    const getUser = async () => {
      const user = await Auth.instance.user();
      if (user?.type) {
        setType(user.type);
      }
    };

    getUser();
  }, []);
  const navigateToScreen = (screenName: string) => {
    props.navigation.navigate(screenName);
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      style={{ backgroundColor: '#B0D9F7' }}
    >
      <View className="w-full flex items-center mb-16">
        <WorkerLogo width={100} height={100} />
      </View>

      {type === 'company' && (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('ScheduleMembers', {
              screen: 'steps/ChooseDates',
            })
          }
          style={styles.button}
        >
          <Text className="text-white text-xl">Schedule a Member</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => navigateToScreen('Calendar')}
        style={styles.button}
      >
        <Text className="text-white text-xl">
          {type === 'company' ? 'Edit a Schedule' : 'View Schedule'}
        </Text>
      </TouchableOpacity>

      {type === 'company' && (
        <TouchableOpacity
          onPress={() => navigateToScreen('AddNewMember')}
          style={styles.button}
        >
          <Text className="text-white text-xl">Add New Member</Text>
        </TouchableOpacity>
      )}

      {type === 'company' && (
        <TouchableOpacity
          onPress={() => navigateToScreen('Locations')}
          style={styles.button}
        >
          <Text className="text-white text-xl ">Add a Job Location</Text>
        </TouchableOpacity>
      )}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#758AB6',
    borderRadius: 30,
    marginVertical: 5,
    marginBottom: 30,
    marginTop: 8,
    height: 86,
    width: 231,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerStatusBarHeight: 0,
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#B0D9F7',
          flexDirection: 'column',
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    ></Drawer>
  );
}
