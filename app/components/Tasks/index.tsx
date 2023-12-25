import React, { useEffect, useState } from 'react';
import TaskRow from '../TasksRow';
import { ActivityIndicator, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TaskRepository } from '@/repositories/tasks';
import { endOfMonth, startOfMonth } from 'date-fns';
import { Task } from '@/models/task';
import { User } from '@/models/user';
import BottomNavigation from '../BottomNavigation';
import ClockIcon from '@assets/icons/clock.svg';
import Krug from '@assets/icons/repeat.svg';

type TasksProps = {
  color: string;
  user: User;
};

const Tasks = ({ color, user }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const firebaseTasks = await TaskRepository.getForRange(
        user.id,
        startOfMonth(new Date()),
        endOfMonth(new Date()),
      );
      setTasks(firebaseTasks);
      const hours = firebaseTasks.reduce(
        (total, task) => total + task.hours,
        0,
      );
      setTotalHours(hours);
    };

    getData();
  }, [user.id]);

  if (tasks.length === 0) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="w-full px-5">
      <View className="w-full h-1/5 pt-5 mb-7  bg-white rounded-3xl flex justify-between items-center ">
        <Text className={`text-3xl ml-6 font-bold mt-4 text-[${color}]`}>
          {user.name}
        </Text>
        <View className=" flex border-t justify-between w-full flex-row p-3 ">
          <View className="  flex-row justify-center items-center space-x-2">
            <Krug className="" />
            <Text className="text-xl   font-bold">TOTAL HOURS</Text>
          </View>
          <View className=" flex-row justify-center items-center space-x-2">
            <ClockIcon />
            <Text className="text-xl  font-bold">{totalHours}</Text>
          </View>
        </View>
      </View>
      <ScrollView className="w-full h-2/3 pt-5 mb-7 bg-white rounded-3xl ">
        <Text className="text-xl ml-6 font-bold">Work History</Text>
        {tasks.map((task) => {
          return (
            <TaskRow
              color={user.worker!.color}
              task={task}
              key={task.id}
            ></TaskRow>
          );
        })}
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default Tasks;
