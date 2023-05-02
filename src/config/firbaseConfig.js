// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDP5ptC3-L0XnaAmTcdzvYUiTQFX5hhaE",
  authDomain: "blog-app-178d7.firebaseapp.com",
  projectId: "blog-app-178d7",
  storageBucket: "blog-app-178d7.appspot.com",
  messagingSenderId: "640327187146",
  appId: "1:640327187146:web:e1ab967824ef6f81251233",
  measurementId: "G-7RMBM9NJT2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export {
  getRedirectResult,
  auth,
  GoogleAuthProvider,
  signInWithRedirect,
  provider,
  onAuthStateChanged,
};
