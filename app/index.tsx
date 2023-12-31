import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';
import { FONTS, STORAGE_KEYS } from '@/constants';
import { Storage } from '@/services/storage';
import { Auth } from '@/services/auth';
import Welcome from '@/screens/Welcome';
import Default from './layouts/Default';
import Login from './screens/Login';

SplashScreen.preventAutoHideAsync();

const Loading = () => {
  return (
    <Default>
      <View></View>
    </Default>
  );
};

const HomeScreen = () => {
  const navigation = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);
  const [firstScreen, setFirstScreen] = useState<
    'loading' | 'welcome' | 'login'
  >('loading');
  const screens = useMemo(
    () => ({
      loading: Loading,
      welcome: Welcome,
      login: Login,
    }),
    [],
  );

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(FONTS);
        await Auth.instance.start();
      } catch (e) {
        // handle font error
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        // setTimeout(() => setAppIsReady(true), 500);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      const user = Auth.currentUser;

      if (user) {
        const details = await Auth.instance.user();
        navigation.replace(
          details?.type === 'worker' && !details?.worker?.isSetup
            ? '/screens/EditMember'
            : '/(drawer)/Calendar',
        );
      } else {
        const storage = Storage.instance;
        const welcome = await storage.get(STORAGE_KEYS.WELCOME);

        setFirstScreen(welcome ? 'login' : 'welcome');
      }

      await SplashScreen.hideAsync();
    }
  }, [appIsReady, navigation, setFirstScreen]);

  if (!appIsReady) {
    return null;
  }

  const Component = screens[firstScreen];

  return (
    <View onLayout={onLayoutRootView}>
      <Component />
    </View>
  );
};

export default HomeScreen;
