import React, { FC, useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import HomeIcon from '@assets/icons/home.svg';
import TimeIcon from '@assets/icons/time.svg';
import UserIcon from '@assets/icons/user.svg';
import type { SvgProps } from 'react-native-svg';
import { Auth } from '@/services/auth';

export default function BottomNavigation() {
  const navigation = useNavigation();
  const [user, setUser] = useState(Auth.currentUser);
  
  useEffect(() => {
    const getUser = async () => {
      const u = await Auth.instance.user();
      setUser(u);
      
    };

    getUser();
  }, []);

  const handleNavigation = (to: string) => {
    navigation.navigate(to as never);
  };

  const links = useMemo<[FC<SvgProps>, { to: string }][]>(
    () => [
      [HomeIcon, { to: 'Calendar' }],
      [TimeIcon, {to: user?.type === 'worker' ? 'EmployeeReport' : 'EmployeeList' }],
      [UserIcon, { to: 'Profile' }],
    ],
    [user?.type],
  );
  return (
    <View className="w-full px-10">
      <View className="w-full h-8 flex-row justify-between px-6 items-center rounded-3xl">
        {links.map(([Icon, { to }], idx: number) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleNavigation(to)}
          >
            <Icon width={20} height={20} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
