import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const getSpecificUser = (userUid) => doc(db, "users", userUid);

export { app, auth, googleProvider, getSpecificUser, db };
