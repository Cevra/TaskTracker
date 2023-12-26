import React, { useEffect, useState } from 'react';
import TaskRow from '../TasksRow';
import { ActivityIndicator, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TaskRepositories } from '@/repositories/tasks';
import { endOfMonth, startOfMonth } from 'date-fns';
import { Task } from '@/models/task';
import { User } from '@/models/user';
import BottomNavigation from '../BottomNavigation';
import ClockIcon from '@assets/icons/clock.svg';
import Mail from '@assets/icons/mail.svg';
import Phone from '@assets/icons/phone.svg';
import Map from '@assets/icons/map-pin.svg';
import Layers from '@assets/icons/layers.svg';

type ProfileProps = {
  color: string;
  user: User;
};

const Profile = ({ color, user }: ProfileProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      const firebaseTasks = await TaskRepositories.getForRange(
        user.id,
        startOfMonth(new Date()),
        endOfMonth(new Date()),
      );
      setTasks(firebaseTasks);
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
    <View className="w-full  px-5  ">
      <View className="w-full h-1/5 pt-5 mb-7  bg-white rounded-3xl flex justify-between items-center ">
        <Text className="text-xl ml-6 font-bold">Employer</Text>

        <Text className={`text-3xl ml-6 font-bold mt-4 text-[${color}]`}>
          {user.name}
        </Text>
        <View className=" flex border-t  border-slate-400 justify-end w-full flex-row p-3 ">
          <View className=" flex-row justify-center items-center space-x-2">
            <ClockIcon />
            <Text className="text-xl   font-bold">Online</Text>
          </View>
        </View>
      </View>
      <ScrollView className="w-full h-2/3 pt-5 mb-7 bg-white rounded-3xl ">
        <View className="w-full h-12  flex flex-row justify-start items-center mt-3 p-0 px-2 pb-2  ">
          <View className="flex justify-between border-b flex-row border-slate-300  items-center space-x-6 h-full flex-1 pr-1 pt-1 pb-1">
            <Phone />
            <Text className={`text-xl font-bold text-slate-500`}>fgdf</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default Profile;
