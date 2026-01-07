import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAoLTgMvDADkz-W2Biacfaaa3rJTrYAzrs",
  authDomain: "payviewmarketplace.firebaseapp.com",
  projectId: "payviewmarketplace",
  storageBucket: "payviewmarketplace.appspot.com",
  messagingSenderId: "152264264220",
  appId: "1:152264264220:web:e01e154c1dfbdd694b6dd9",
  measurementId: "G-GSWYE53L1E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
