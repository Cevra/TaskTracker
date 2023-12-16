import React, { FC, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import HomeIcon from '@assets/icons/home.svg';
import TimeIcon from '@assets/icons/time.svg';
import UserIcon from '@assets/icons/user.svg';

export default function BottomNavigation() {
  const navigation = useRouter();
  const links = useMemo<[FC, { to: string }][]>(
    () => [
      [HomeIcon, { to: 'Calendar' }],
      [TimeIcon, { to: 'Timesheet' }],
      [UserIcon, { to: 'Profile' }],
    ],
    [],
  );
  return (
    <View className="w-11/12 h-12 flex-row justify-between px-8 items-center rounded-3xl bg-bottom-nav">
      {links.map(([Icon, { to }], idx: number) => (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            navigation.push(to);
          }}
        >
          <Icon />
        </TouchableOpacity>
      ))}
    </View>
  );
}
