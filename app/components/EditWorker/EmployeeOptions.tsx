import React from 'react';
import { View } from 'react-native';
import { Worker } from '@/models/worker';
import CollapsibleOptions from './CollapsibleOptions';

type EmployeeOptionsProps = {
  worker: Partial<Worker>;
  openSections: Record<string, boolean>;
  setOpenSections: (openSections: Record<string, boolean>) => void;
  setWorker: (worker: Partial<Worker>) => void;
};

const EmployeeOptions = ({
  openSections,
  setOpenSections,
  worker,
  setWorker,
}: EmployeeOptionsProps) => {
  return (
    <View className="flex space-y-4">
      <View>
        <CollapsibleOptions
          isOpen={openSections.english}
          onClick={() =>
            setOpenSections({
              ...openSections,
              english: !openSections.english,
            })
          }
          options={['none', 'some english', 'fluent']}
          isSelected={(english) => worker.english === english}
          label="English language"
          onPress={(english: string) => {
            setWorker({ ...worker, english });
          }}
        />
      </View>

      <View>
        <CollapsibleOptions
          isOpen={openSections.driverLicense}
          onClick={() =>
            setOpenSections({
              ...openSections,
              driverLicense: !openSections.driverLicense,
            })
          }
          options={['yes', 'no']}
          isSelected={(license) =>
            (worker.driverLicense && license === 'yes') ||
            (!worker.driverLicense && license === 'no')
          }
          label="Driver's license"
          onPress={(driverLicense: string) => {
            setWorker({ ...worker, driverLicense: driverLicense === 'yes' });
          }}
        />
      </View>

      <View>
        <CollapsibleOptions
          isOpen={openSections.workingWithTools}
          onClick={() =>
            setOpenSections({
              ...openSections,
              workingWithTools: !openSections.workingWithTools,
            })
          }
          options={['yes', 'no']}
          isSelected={(workingWithTools) =>
            (worker.workingWithTools && workingWithTools === 'yes') ||
            (!worker.workingWithTools && workingWithTools === 'no')
          }
          label="Working with tools"
          onPress={(workingWithTools: string) => {
            setWorker({
              ...worker,
              workingWithTools: workingWithTools === 'yes',
            });
          }}
        />
      </View>

      <View>
        <CollapsibleOptions
          isOpen={openSections.ownsTools}
          onClick={() =>
            setOpenSections({
              ...openSections,
              ownsTools: !openSections.ownsTools,
            })
          }
          options={['yes', 'no']}
          isSelected={(ownsTools) =>
            (worker.ownsTools && ownsTools === 'yes') ||
            (!worker.ownsTools && ownsTools === 'no')
          }
          label="Owning tools"
          onPress={(ownsTools: string) => {
            setWorker({
              ...worker,
              ownsTools: ownsTools === 'yes',
            });
          }}
        />
      </View>

      <View>
        <CollapsibleOptions
          isOpen={openSections.ownsVehicle}
          onClick={() =>
            setOpenSections({
              ...openSections,
              ownsVehicle: !openSections.ownsVehicle,
            })
          }
          options={['yes', 'no']}
          isSelected={(ownsVehicle) =>
            (worker.ownsVehicle && ownsVehicle === 'yes') ||
            (!worker.ownsVehicle && ownsVehicle === 'no')
          }
          label="Owning a vehicle"
          onPress={(ownsVehicle: string) => {
            setWorker({
              ...worker,
              ownsVehicle: ownsVehicle === 'yes',
            });
          }}
        />
      </View>
    </View>
  );
};

export default EmployeeOptions;
