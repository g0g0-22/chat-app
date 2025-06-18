// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPUTtXzalyw6KKxb-hCUs771qpFpeWhzs",
  authDomain: "chat-app-d9a3b.firebaseapp.com",
  projectId: "chat-app-d9a3b",
  storageBucket: "chat-app-d9a3b.firebasestorage.app",
  messagingSenderId: "431967459845",
  appId: "1:431967459845:web:2a60efcbf5a24e855e1a6c",
  measurementId: "G-KG08TQXER3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
