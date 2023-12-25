import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { differenceInHours, format } from 'date-fns';
import { User } from '@/models/user';
import ClockIcon from '@assets/icons/clock.svg';
import { Schedule } from '@/models/schedule';
import { TaskRepository } from '@/repositories/tasks';
import { Task } from '@/models/task';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckInIcon from '@assets/icons/check-in.svg';

const ClockRow = ({ task, color }: { color: string; task: Task }) => {
  const rows = [];

  if (task.clockedOut) {
    rows.push({ type: 'clockout', date: task.clockedOut });
  }

  if (task.clockedIn) {
    rows.push({ type: 'clockin', date: task.clockedIn });
  }

  return rows.map(({ type, date }) => (
    <View
      key={`${task.id}-${format(date!, 'HH-mm-ss')}`}
      className="w-full h-10  flex flex-row justify-start items-center mt-3 p-0 px-2 pb-2  "
    >
      {color && (
        <View
          style={{ backgroundColor: color }}
          className={`w-6 h-6 m-4 rounded-lg`}
        ></View>
      )}

      <View className="flex justify-between flex-row items-center space-x-6 h-full flex-1 pr-1 pt-1 pb-1">
        <Text className="text-lg text-slate-600 font-bold">
          {type === 'clockin' ? 'Clocked in' : 'Clocked out'}
        </Text>
        <Text className={`text-lg font-bold text-[#219653]`}>
          {format(date!, 'HH:mm')}
        </Text>
      </View>
    </View>
  ));
};

type CalendarDetailsWorkerProps = {
  date: Date;
  user: User | null;
  schedule?: Partial<Schedule>;
};

type TaskProps = {
  list: Task[];
  loading: boolean;
  activeTask: Task | null;
  isClockedIn: boolean;
};

export function CalendarDetailsWorker({
  date,
  user,
  schedule,
}: CalendarDetailsWorkerProps) {
  const [tasks, setTasks] = useState<TaskProps>({
    loading: true,
    list: [],
    activeTask: null,
    isClockedIn: false,
  });

  useEffect(() => {
    const getData = async () => {
      if (date) {
        const tasks = await TaskRepository.getTasksForSchedule(
          user!.id,
          schedule!.id!,
        );
        const activeTask = tasks[tasks.length - 1];
        setTasks({
          list: tasks,
          loading: false,
          activeTask,
          isClockedIn: !!activeTask?.clockedIn && !activeTask?.clockedOut,
        });
      }
    };

    getData();
  }, [schedule, user, date]);

  const onPress = useCallback(
    async (tasks: TaskProps) => {
      const location =
        schedule?.workers?.find((w) => w.id === user?.id)?.location?.city ??
        schedule?.location?.city;
      const isNewTask = !tasks.activeTask;
      const activeTask = tasks.activeTask;

      if (isNewTask || (activeTask?.clockedIn && activeTask?.clockedOut)) {
        const newTask = new Task(user!.id, location!, schedule!.id!);
        newTask.clockedIn = new Date();
        const res = await TaskRepository.add(newTask);
        newTask.id = res.id;

        setTasks((prev) => ({
          ...prev,
          isClockedIn: true,
          list: [newTask, ...prev.list],
          activeTask: newTask,
        }));
        return;
      }

      if (activeTask) {
        const target = { ...activeTask };
        target.clockedOut = new Date();
        target.hours = differenceInHours(target.clockedIn!, target.clockedOut);
        await TaskRepository.update(target.id, target);
        setTasks((prev) => ({
          ...prev,
          list: prev.list.map((item) =>
            item.id === target.id ? ({ ...target } as Task) : item,
          ),
          isClockedIn: false,
          activeTask: { ...target } as Task,
        }));
        return;
      }
    },
    [schedule, user],
  );

  return (
    <View className="w-full h-[77vh] rounded-lg border bg-modal p-4">
      <View className="flex flex-row justify-between mb-4">
        <Text className="text-2xl text-white font-bold">
          {format(date, 'dd. eeee')}
        </Text>
      </View>

      <View className="w-full h-auto bg-white rounded-3xl flex justify-center items-center">
        <View className="w-full flex items-center justify-center py-4">
          <Text className={`text-lg`}>Address</Text>
          <Text
            className={`text-3xl font-bold text-[${
              user?.worker?.color ?? '#1F87FE'
            }]`}
          >
            {schedule?.workers?.find((w) => w.id === user?.id)?.location
              ?.city ?? schedule?.location?.city}
          </Text>
        </View>

        <View className="flex border-t justify-end w-full flex-row px-4 py-2">
          <View className="flex-row justify-center items-center space-x-2">
            {tasks.loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <>
                <ClockIcon />
                <Text className="text-xl font-bold">
                  {tasks.isClockedIn ? 'Clocked in' : 'Clocked out'}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

      <View className="w-full h-96 mt-7 bg-white rounded-3xl">
        <ScrollView className="w-full h-2/3 pt-5 mt-7 mb-1 bg-white rounded-3xl">
          {tasks.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            tasks.list?.map((task) => (
              <ClockRow
                color={user?.worker?.color ?? '#1F87FE'}
                key={task.id}
                task={task}
              />
            ))
          )}
        </ScrollView>

        <View className="w-full flex mt-1 justify-center items-end px-4">
          <TouchableOpacity
            className="flex h-24 justify-center items-center my-2 px-5 rounded-3xl bg-[#7496B7]"
            onPress={() => onPress(tasks)}
          >
            <CheckInIcon
              className={`${tasks.isClockedIn ? 'rotate-180' : ''}`}
              width={50}
            />
            <Text className="text-white text-md font-bold">
              {tasks.isClockedIn ? 'Clock Out' : 'Clock In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
