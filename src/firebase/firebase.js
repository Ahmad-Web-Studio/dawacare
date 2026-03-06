// firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "dawacare-ab6f2.firebaseapp.com",
  projectId: "dawacare-ab6f2",
  storageBucket: "dawacare-ab6f2.appspot.com", // ✅ FIXED
  messagingSenderId: "1054553686744",
  appId: "1:1054553686744:web:53365141a96d817be94dad"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);