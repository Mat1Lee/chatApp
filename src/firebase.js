import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUirqAArdwX2sNRjRjzzuw1ZFtaCRKDa8",
  authDomain: "portfolio-bfd57.firebaseapp.com",
  databaseURL: "https://portfolio-bfd57-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-bfd57",
  storageBucket: "portfolio-bfd57.appspot.com",
  messagingSenderId: "807431456604",
  appId: "1:807431456604:web:85dc3b7bd237dba2b5e399",
  measurementId: "G-EHGG6MVPCJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
