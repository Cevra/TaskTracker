import {initializeApp} from 'firebase/app';
//import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from 'firebase/firestore';

// import {getDatabase} from "firebase/database"


// import 'firebase/firestore';

// import { getFirestore } from "firebase/firestore";


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDSrHwTWThoNAZN81d1gn9FmiRPfeWdiHY",
    authDomain: "task-tracker-afb91.firebaseapp.com",
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: "task-tracker-afb91",
  storageBucket: "task-tracker-afb91.appspot.com",
  messagingSenderId: "779604134665",
  appId: "1:779604134665:web:b8ba2a2ab71ea289d061d8",
  measurementId: 'G-measurement-id',
};

export const app = initializeApp(firebaseConfig);
// For more information on how t o access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const auth = getAuth(app);
export const db = getFirestore(app);


