import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "CADASTRE A SUA ;)",
  authDomain: "CADASTRE A SUA ;)",
  projectId: "CADASTRE A SUA ;)",
  storageBucket: "CADASTRE A SUA ;)",
  messagingSenderId: "CADASTRE A SUA ;)",
  appId: "CADASTRE A SUA ;)",
  measurementId: "CADASTRE A SUA ;)"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);