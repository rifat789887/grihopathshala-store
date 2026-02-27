// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWXa-LycD1obdDcteGHsPS9u8OHN72kks",
  authDomain: "android-app-10f49.firebaseapp.com",
  databaseURL: "https://android-app-10f49-default-rtdb.firebaseio.com",
  projectId: "android-app-10f49",
  storageBucket: "android-app-10f49.appspot.com",
  messagingSenderId: "474159488984",
  appId: "1:474159488984:web:f5a0a844cbdb9151731cad",
  measurementId: "G-FL3BJTLM0Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environments
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
