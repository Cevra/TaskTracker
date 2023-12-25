import React from 'react';
import { Text, View } from 'react-native';
import { Worker } from '@/models/worker';
import { WORKER_EXPERIENCES } from '@/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
type ExperiencesProps = {
  worker: Partial<Worker>;
  setWorker: (worker: Partial<Worker>) => void;
};

const Experience = ({
  experience,
  propKey,
  worker,
  setWorker,
}: { propKey: string; experience: string } & ExperiencesProps) => {
  const value = worker.experiences?.[propKey];
  const isSelected = typeof value === 'boolean';

  return (
    <View className="w-full flex flex-row justify-between my-1">
      <View className="w-2/3">
        <Text>{experience}</Text>
      </View>
      <View className="w-1/3 flex flex-row justify-between">
        <TouchableOpacity
          onPress={() =>
            setWorker({
              ...worker,
              experiences: { ...(worker.experiences ?? {}), [propKey]: true },
            })
          }
        >
          <View
            className={`w-5 h-5 flex justify-center items-center border rounded-full`}
          >
            {isSelected && value && (
              <View className="w-3 h-3 bg-primary rounded-full"></View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setWorker({
              ...worker,
              experiences: { ...(worker.experiences ?? {}), [propKey]: false },
            })
          }
        >
          <View
            className={`w-5 h-5 flex justify-center items-center border rounded-full`}
          >
            {isSelected && !value && (
              <View className="w-3 h-3 bg-primary rounded-full"></View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Experiences = ({ worker, setWorker }: ExperiencesProps) => {
  return (
    <View className="p-4">
      <View className="w-full flex flex-row justify-between mb-1">
        <View className="w-2/3"></View>
        <View className="w-1/3 flex flex-row justify-between">
          <Text>Yes</Text>
          <Text>No</Text>
        </View>
      </View>
      {Object.entries(WORKER_EXPERIENCES).map(([key, value]) => (
        <Experience
          worker={worker}
          setWorker={setWorker}
          key={key}
          propKey={key}
          experience={value}
        />
      ))}
    </View>
  );
};

export default Experiences;
