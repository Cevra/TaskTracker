import React, { useMemo, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Worker } from '@/models/worker';
import { User } from '@/models/user';
import ChevronRight from '@assets/icons/chevron-right.svg';
import EmployeeOptions from './EmployeeOptions';
import Experiences from './Experiences';
import SecureButton from '../SecureButton';

type EditWorkerProps = {
  worker: Partial<Worker>;
  user: User;
  setWorker: (worker: Partial<Worker>) => void;
  setUser: (user: User) => void;
  onSubmit: () => Promise<void>;
};
const EditWorker = ({
  user,
  worker,
  setUser,
  setWorker,
  onSubmit,
}: EditWorkerProps) => {
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const name = useMemo(() => {
    const [firstName, ...rest] = user.name.split(' ');
    return { firstName, lastName: rest.join(' ') };
  }, [user]);

  const rotation = useSharedValue(90);
  const opacity = useSharedValue(0);
  const animatedChevronStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
  const animatedContainerStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: opacity.value ? 'auto' : 0,
  }));

  return (
    <ScrollView className="w-full h-full">
      <View className="w-full flex justify-center items-center">
        <Text className="text-4xl font-bold">Edit Details</Text>
      </View>

      <View className="w-full flex gap-4 px-4 pt-6">
        <TextInput
          className="w-full p-4 pt-2 pb-5 text-lg opacity-50 bg-[#B6D4EE] rounded"
          placeholder="First name"
          value={name.firstName}
          editable={false}
        />
        <TextInput
          className="w-full p-4 pt-2 pb-5 text-lg opacity-50 bg-[#B6D4EE] rounded"
          placeholder="Last name"
          value={name.lastName}
          editable={false}
        />
        <TextInput
          className="w-full p-4 pt-2 pb-5 text-lg opacity-50 bg-[#B6D4EE] rounded"
          placeholder="E-mail"
          value={user.email}
          editable={false}
        />
        <TextInput
          className="w-full p-4 pt-2 pb-5 text-lg bg-[#B6D4EE] rounded"
          placeholder="Phone number"
          onChangeText={(phone) => setUser({ ...user, phone } as User)}
          value={user.phone}
          editable={true}
        />
        <TextInput
          className="w-full p-4 pt-2 pb-5 text-lg bg-[#B6D4EE] rounded"
          placeholder="Years of experience"
          onChangeText={(yearsOfExperience) =>
            setWorker({
              ...worker,
              yearsOfExperience: parseInt(yearsOfExperience, 10),
            })
          }
          value={worker.yearsOfExperience?.toString()}
        />
      </View>

      <View className="w-full flex mb-4 px-4 pt-4 space-y-4">
        <TouchableWithoutFeedback
          onPress={() => {
            const newValue = !isExperiencesOpen;
            rotation.value = withSpring(newValue ? -90 : 90, {
              damping: 7,
            });
            opacity.value = withTiming(newValue ? 1 : 0, { duration: 350 });
            setIsExperiencesOpen(newValue);
          }}
        >
          <View className="w-full p-4 text-lg bg-[#B6D4EE] rounded flex flex-row justify-between">
            <Text className="text-lg text-[#808080]">Types of experience</Text>
            <Animated.View style={[animatedChevronStyles]}>
              <ChevronRight width={15} fill="#808080" />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[animatedContainerStyles]}
          className="w-full h-20 bg-[#B6D4EE]"
        >
          <Experiences worker={worker} setWorker={setWorker} />
        </Animated.View>
      </View>

      <EmployeeOptions
        openSections={openSections}
        setOpenSections={setOpenSections}
        setWorker={setWorker}
        worker={worker}
      />

      <View className="w-full flex justify-center items-center mt-8">
        <SecureButton text="DONE" onPress={onSubmit} />
      </View>
    </ScrollView>
  );
};

export default EditWorker;
