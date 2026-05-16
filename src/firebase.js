import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiU5wJdI4r0nQWTCxp9oUxw5D5qpY-OE4",
  authDomain: "studysync-878b8.firebaseapp.com",
  projectId: "studysync-878b8",
  storageBucket: "studysync-878b8.firebasestorage.app",
  messagingSenderId: "53374174830",
  appId: "1:53374174830:web:65034da5d64a79f387887f",
  measurementId: "G-1X4QZ51H14"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);