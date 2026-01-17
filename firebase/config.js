// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwWztuOM5S4mTnc278hx9a4uk_8LP2Ez8",
  authDomain: "gctmobapp.firebaseapp.com",
  projectId: "gctmobapp",
  storageBucket: "gctmobapp.firebasestorage.app",
  messagingSenderId: "964302716930",
  appId: "1:964302716930:web:23fb3557d4c4fcadf9e71b",
  measurementId: "G-0M2BE8ZZ1M"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const app = getApps().length === 0
//   ? initializeApp(firebaseConfig)
//   : getApp();

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);