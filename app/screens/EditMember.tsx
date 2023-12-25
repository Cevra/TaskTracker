import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Auth } from '@/services/auth';
import { Worker } from '@/models/worker';
import { User } from '@/models/user';
import EditWorker from '@/components/EditWorker';
import EditUser from '@/components/EditUser';
import Header from '@/components/Header';
import Default from '@/layouts/Default';
import { UserRepository } from '@/repositories/users';
import { FirebaseError } from 'firebase/app';

const EditMember = () => {
  const navigation = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [worker, setWorker] = useState<Partial<Worker>>({});
  const [password, setPassword] = useState('elma123');
  const [confirmPassword, setConfirmPassword] = useState('elma123');
  const [screen, setScreen] = useState<'user' | 'worker'>('user');

  const onRegister = useCallback((pass: string, confirmPass: string) => {
    if (pass.length > 6 && pass === confirmPass) {
      setScreen('worker');
      return;
    }

    let text = 'Passwords must match';
    if (pass.length < 6) {
      text = 'Passwords must bet at least 6 characters';
    }

    Toast.show({
      type: 'error',
      text1: text,
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const user = await Auth.instance.user();
      setUser(user);
      setWorker(user?.worker || {});
    };

    getUser();
  }, []);

  const onSubmit = useCallback(
    async (worker: Partial<Worker>, user: User, password: string) => {
      try {
        await Auth.instance.updatePassword(password);
        user.worker = { ...worker, isSetup: true } as Worker;
        await UserRepository.updateOne(user.id, user);
        await Auth.instance.signIn(user.email, password);
        navigation.replace('/screens/UserUpdated');
      } catch (e) {
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/requires-recent-login') {
            navigation.replace('/screens/Login');
            return;
          }
        }

        Toast.show({
          type: 'error',
          text1: 'Unable to update user',
        });
      }
    },
    [navigation],
  );

  return (
    <Default>
      <SafeAreaView className="w-full mt-16">
        {screen === 'user' && <Header logo={{ width: 150, height: 150 }} />}
        {screen === 'user' ? (
          <EditUser
            user={user}
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            onRegister={onRegister}
          />
        ) : (
          <EditWorker
            user={user!}
            setUser={setUser}
            setWorker={setWorker}
            worker={worker}
            onSubmit={() => onSubmit(worker, user!, password)}
          />
        )}
      </SafeAreaView>
    </Default>
  );
};

export default EditMember;
