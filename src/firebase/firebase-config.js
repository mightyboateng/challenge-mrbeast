import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FirebaseApiKey,
  authDomain: process.env.REACT_APP_FirebaseAuthDomain,
  projectId: process.env.REACT_APP_FirebaseProjectId,
  storageBucket: process.env.REACT_APP_FirebaseStorageBucket,
  messagingSenderId: process.env.REACT_APP_FirebaseMessagingSenderId,
  appId: process.env.REACT_APP_FirebaseAppId,
  measurementId: process.env.REACT_APP_MeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(app);
const realtimeDb = getDatabase(app)
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const getSpecificUser = (userUid) => doc(firestoreDb, "users", userUid);

export { app, auth, googleProvider, getSpecificUser, firestoreDb, realtimeDb };
