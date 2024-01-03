import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Check from '@assets/icons/check.svg';
import Cross from '@assets/icons/cross.svg';

export enum CardAction {
  DELETE = 'delete',
  CHECKBOX = 'checkbox',
  VIEW = 'view',
  TASK = 'task',
}

type CardProps = {
  title: string;
  subtitle: string;
  onAction: () => Promise<void>;
  actionType: CardAction;
  color?: string;
  isChecked?: boolean;
  date?: Date;
};

const Card = ({
  color,
  title,
  subtitle,
  actionType,
  onAction,
  isChecked,
}: CardProps) => {
  const onPress = useCallback(
    async (e: GestureResponderEvent) => {
      e.preventDefault();
      await onAction();
    },
    [onAction],
  );
  const textSize = title.length > 15 ? 'text-md' : 'text-lg';
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="w-full h-24 flex flex-row justify-start items-center mt-3 p-0 px-2 pb-2 bg-[#C7DEF3] border-2 border-[#E0E0E0] shadow rounded-lg">
        {color && (
          <View
            style={{ backgroundColor: color }}
            className={`w-12 h-12 rounded-xl `}
          ></View>
        )}
        <View className="flex justify-left flex-row items-center  m-5 h-full flex-1 pr-1 pt-1 pb-1">
          <Text className={`${textSize} text-slate-600 font-bold`}>{title}</Text>
          <Text className={`text-xs text-[#4C5980]`}>{subtitle}</Text>
        </View>

        {actionType === CardAction.CHECKBOX && (
          <View
            className={`w-8 h-8 flex items-center justify-center rounded-xl border bg-white`}
          >
            {isChecked && <Check />}
          </View>
        )}

        {actionType === CardAction.VIEW && (
          <View
            className={`w-20 h-10 flex items-center justify-center rounded-xl bg-[#F0F3FA]`}
          >
            <Text className="text-[#1F87FE]">View</Text>
          </View>
        )}

        {actionType === CardAction.DELETE && (
          <View
            className={`w-10 h-10 flex items-center justify-center rounded-xl border bg-white`}
          >
            <Cross width={20} height={20} />
          </View>
        )}
        {actionType === CardAction.TASK && (
          <View className="w-full bg-white rounded-lg p-2 mt-2">
            <Text className="text-lg font-bold mb-1">TASK</Text>
            {/* Assuming you have task data with date, location, and hours properties */}
            {/* <Text>Date: {date}</Text> */}
            <Text>Location: {title}</Text>
            <Text>Hours: {subtitle}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
