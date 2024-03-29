import React, { useEffect, useState } from 'react';
import Picker from 'react-native-picker-select';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subWeeks,
} from 'date-fns';
import TaskRow from '../TasksRow';
import { TaskRepository } from '@/repositories/tasks';
import { Task } from '@/models/task';
import { User } from '@/models/user';
import ClockIcon from '@assets/icons/clock.svg';
import Circle from '@assets/icons/repeat.svg';
import ChevronDown from '@assets/icons/chevron-down.svg';

type TasksProps = {
  user: User;
};

const Tasks = ({ user }: TasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let startDate, endDate;

      switch (selectedFrequency) {
        case 'monthly':
          startDate = startOfMonth(new Date());
          endDate = endOfMonth(new Date());
          break;
        case 'weekly':
          startDate = startOfWeek(new Date());
          endDate = endOfWeek(new Date());
          break;
        case 'biweekly':
          endDate = endOfWeek(new Date());
          startDate = subWeeks(endDate, 2);
          break;
      }

      try {
        const firebaseTasks = await TaskRepository.getForRange(
          user.id,
          startDate!,
          endDate!,
          selectedFrequency,
        );
        setTasks(firebaseTasks);
        const hours = firebaseTasks.reduce(
          (total, task) => total + task.hours,
          0,
        );
        setTotalHours(hours);
      } catch (error) {
        //console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [user.id, selectedFrequency]);

  if (loading) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="w-full px-5">
      <View className="w-full h-1/5 pt-5 mb-7 border-box flex-col space-y-5   bg-white rounded-3xl justify-center items-center ">
        <View className="pt-5 w-full justify-center items-center">
          <View className="flex flex-row justify-center items-center">
            <Picker
              placeholder={{ label: 'Monthly', value: 'monthly' }}
              style={{
                placeholder: style.pickerInput,
                inputAndroidContainer: style.pickerInputContainer,
                inputIOSContainer: style.pickerInputContainer,
                inputAndroid: style.pickerInput,
                inputIOS: style.pickerInput,
                iconContainer: {
                  width: 30,
                  paddingBottom: 2,
                },
              }}
              onValueChange={(value) => setSelectedFrequency(value)}
              items={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Weekly', value: 'weekly' },
                { label: 'Biweekly', value: 'biweekly' },
              ]}
              Icon={
                (() => <ChevronDown width={15} />) as unknown as React.ReactNode
              }
              value={selectedFrequency}
            />
          </View>
          <Text
            style={{ color: user.worker!.color }}
            className={`text-3xl font-bold text-[${user.worker!.color}]`}
          >
            {user.name}
          </Text>
        </View>
        <View className="flex border-t justify-between items-center m-2 mb-6 w-full flex-row p-3 ">
          <View className="flex-row justify-center items-center space-x-2">
            <Circle className="" />
            <Text className="text-lg font-bold">TOTAL HOURS</Text>
          </View>
          <View className=" flex-row justify-center items-center space-x-2">
            <ClockIcon />
            <Text className="text-xl font-bold">{totalHours}</Text>
          </View>
        </View>
      </View>
      <ScrollView className="w-full h-2/3 pt-5 mb-7 bg-white rounded-3xl ">
        <Text className="text-xl ml-6 font-bold">Work History</Text>
        {tasks.length === 0 ? (
          <Text className="text-lg pl-4 mt-3 font-normal">
            There were no tasks for this time period
          </Text>
        ) : (
          tasks.map((task) => {
            return (
              <TaskRow
                color={user.worker!.color}
                task={task}
                key={task.id}
              ></TaskRow>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  pickerInputContainer: {
    height: '10%',
    width: '100%',
    padding: 15,
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pickerInput: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    paddingRight: 20,
  },
});

export default Tasks;
