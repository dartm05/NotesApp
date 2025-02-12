import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
dotenv.config();

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tasks-app-b53c1.firebaseapp.com",
  projectId: "tasks-app-b53c1",
  storageBucket: "tasks-app-b53c1.appspot.com",
  messagingSenderId: "837347397183",
  appId: "1:837347397183:web:7459af4a625032b543b28a",
  measurementId: "G-TYQ8Z7H17C",
};

initializeApp(firebaseConfig);
export const db = getFirestore();

export { api } from "./infrastructure/routes";
