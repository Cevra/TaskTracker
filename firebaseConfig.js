import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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

export const auth = getAuth(app);

export const db = getFirestore(app);
