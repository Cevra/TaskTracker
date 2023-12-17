import React, { FC, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import HomeIcon from '@assets/icons/home.svg';
import TimeIcon from '@assets/icons/time.svg';
import UserIcon from '@assets/icons/user.svg';
import type { SvgProps } from 'react-native-svg';

export default function BottomNavigation() {
  const navigation = useNavigation();
  const links = useMemo<[FC<SvgProps>, { to: string }][]>(
    () => [
      [HomeIcon, { to: 'Calendar' }],
      [TimeIcon, { to: 'Timesheet' }],
      [UserIcon, { to: 'Profile' }],
    ],
    [],
  );
  return (
    <View className="w-full px-10">
      <View className="w-full h-8 flex-row justify-between px-6 items-center rounded-3xl">
        {links.map(([Icon, { to }], idx: number) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              navigation.navigate(to as never);
            }}
          >
            <Icon width={20} height={20} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
