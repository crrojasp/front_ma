import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxX5RiIiCpfrauIXyRDnZV4m1NyV2IgoU",
    authDomain: "fir-pets-db.firebaseapp.com",
    projectId: "fir-pets-db",
    storageBucket: "fir-pets-db.appspot.com",
    messagingSenderId: "913155770397",
    appId: "1:913155770397:web:e5fabfc19d817effe2def4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
    persistence : getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const userRef = collection(db, 'users');
export const  pointRef = collection(db, 'points');