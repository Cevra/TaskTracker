import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ChevronRight from '@assets/icons/chevron-right.svg';

type OnPressFn = ((value: string) => void) | ((value: boolean) => void);

type OptionProps = {
  value: string | boolean;
  isSelected: boolean;
  onPress: OnPressFn;
};

const Option = ({ onPress, value, isSelected }: OptionProps) => (
  <TouchableOpacity
    className="w-full flex items-end p-2"
    onPress={() => onPress(value as never)}
  >
    <Text
      className={`text-lg font-normal capitalize ${
        isSelected ? 'font-extrabold' : ''
      }`}
    >
      {value}
    </Text>
  </TouchableOpacity>
);

type CollapsibleOptionsProps = {
  isOpen: boolean;
  options: string[];
  label: string;
  onClick: () => void;
  isSelected: (value: string | boolean) => boolean;
  onPress: OnPressFn;
};

const CollapsibleOptions = ({
  isOpen,
  onClick,
  onPress,
  label,
  options,
  isSelected,
}: CollapsibleOptionsProps) => {
  return (
    <View className="px-5 space-y-2">
      <View className="w-full">
        <TouchableOpacity
          className="w-full flex flex-row justify-between items-center"
          onPress={() => onClick()}
        >
          <Text className="font-poppins text-lg">{label}</Text>
          <View className="rotate-90 bg-[#B6D4EE] px-2">
            <ChevronRight width={15} fill="#808080" />
          </View>
        </TouchableOpacity>
      </View>
      {isOpen && (
        <View className="w-full bg-[#B6D4EE]">
          {options.map((value) => (
            <Option
              key={value}
              isSelected={isSelected(value)}
              value={value}
              onPress={onPress}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default CollapsibleOptions;
