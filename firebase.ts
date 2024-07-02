import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebase_api = process.env.FIREBASE_API

const firebaseConfig = {
  apiKey: firebase_api,
  authDomain: "nova-7011d.firebaseapp.com",
  projectId: "nova-7011d",
  storageBucket: "nova-7011d.appspot.com",
  messagingSenderId: "374047762823",
  appId: "1:374047762823:web:731185fb96e728ee900b22",
  measurementId: "G-BT9D4G2E1J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);