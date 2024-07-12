import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase_api = process.env.FIREBASE_API;

const firebaseConfig = {
  apiKey: firebase_api,
  authDomain: "nova-66fa5.firebaseapp.com",
  projectId: "nova-66fa5",
  storageBucket: "nova-66fa5.appspot.com",
  messagingSenderId: "175076928875",
  appId: "1:175076928875:web:78e4a27bfed51366b8302e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
