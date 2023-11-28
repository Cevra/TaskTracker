import { Text, View } from 'react-native';
import { addMonths, isSameMonth } from 'date-fns';

const Employee = ({ name, color }) => {
  return (
    <Text className={`text-[10px] ${color}`}>{name}</Text>
  );
}

export default function CalendarItem({ item }) {
  const { isActive, date } = item;

  return (
    <View className="mx-1 mt-2">
      <View className="w-full text-center flex justify-center">
        <Text className={`w-full text-xs text-center font-bold ${isActive ? 'text-black' : 'text-gray-400'}`}>{date.getDate()}</Text>
      </View>
      <View className="w-11 h-20 bg-shade-blue rounded-lg p-1">
        <Employee name='Musab' color='text-red-500' />
        <Employee name='Mirsad' color='text-blue-500' />
        <Employee name='Elma' color='text-green-500' />
      </View>
    </View>
  );
}