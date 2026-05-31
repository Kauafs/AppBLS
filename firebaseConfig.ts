import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "Cadastre a sua :)",
  authDomain: "Cadastre a sua :)",
  projectId: "Cadastre a sua :)",
  storageBucket: "Cadastre a sua :)",
  messagingSenderId: "Cadastre a sua :)",
  appId: "Cadastre a sua :)",
  measurementId: "Cadastre a sua :)"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);