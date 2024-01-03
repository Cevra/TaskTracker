import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';
import { Task } from '@/models/task';

type TaskRowProps = {
  task: Task;
  color: string;
};

const TaskRow = ({ color, task }: TaskRowProps) => {
  return (
    <View className="w-full h-12  flex flex-row justify-start items-center mt-3 p-0 px-2 pb-2  ">
      {color && (
        <View
          style={{ backgroundColor: color }}
          className={`w-6 h-6 m-4 rounded-lg`}
        ></View>
      )}

      <View className="flex justify-between flex-row items-center space-x-6 h-full flex-1 pr-1 pt-1 pb-1">
        <Text className="text-lg text-slate-600 font-bold">
          {format(task.clockedIn!, 'dd/MM/yyyy')}
        </Text>
        <Text className={`text-xl font-bold text-[#4C5980]`}>{task.place}</Text>
        <Text className={`text-lg font-bold text-[#219653]`}>
          {task.hours} H
        </Text>
      </View>
    </View>
  );
};

export default TaskRow;
