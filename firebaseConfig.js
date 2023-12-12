import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDSrHwTWThoNAZN81d1gn9FmiRPfeWdiHY',
  authDomain: 'task-tracker-afb91.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'task-tracker-afb91',
  storageBucket: 'task-tracker-afb91.appspot.com',
  messagingSenderId: '779604134665',
  appId: '1:779604134665:web:b8ba2a2ab71ea289d061d8',
  measurementId: 'G-measurement-id',
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);
