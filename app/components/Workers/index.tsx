import React, { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import Card, { CardAction } from '@/components/Card';
import { Auth } from '@/services/auth';
import { User } from '@/models/user';
import { UserRepository } from '@/repositories/users';

interface WorkersProps {
  actionType: CardAction;
  onAction: (user: User) => Promise<void>;
}

const Workers = ({ actionType, onAction }: WorkersProps) => {
  const [workers, setWorkers] = useState<User[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});

  useEffect(() => {
    const getData = async () => {
      const employedWorkers = await UserRepository.getEmployedFor(
        Auth.currentUser!.id!,
      );

      const other = await UserRepository.getOtherWorkers(Auth.currentUser!.id!);
      setWorkers([...employedWorkers, ...other]);
    };

    getData();
  }, []);

  if (workers.length === 0) {
    return (
      <View className="h-full justify-center items-center flex w-full px-5">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="h-full flex w-full px-5">
      {workers.map((u: User) => {
        return (
          <Card
            actionType={actionType}
            title={`${u.name ?? ''}`.trim()}
            subtitle={''}
            color={`${u.worker?.color ?? ''}`}
            onAction={() => {
              if (actionType === CardAction.CHECKBOX) {
                setSelected({ ...selected, [u.id]: u.id });
              }
              return onAction(u);
            }}
            isChecked={!!selected[u.id]}
            key={u.id}
          />
        );
      })}
    </ScrollView>
  );
};

export default Workers;
