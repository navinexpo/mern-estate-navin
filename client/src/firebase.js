// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-231a1.firebaseapp.com",
  projectId: "mern-state-231a1",
  storageBucket: "mern-state-231a1.appspot.com",
  messagingSenderId: "885804240491",
  appId: "1:885804240491:web:f85a1775ba25e35ec4ab2e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);