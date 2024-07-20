// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_PROJECT,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
 
} = process.env;

const firebaseConfig = {
  apiKey: "AIzaSyA0yfnpoAUBVjuVLrykRzznZgh0GvEzpLc",
  authDomain: "netflix-gpt-76bf0.firebaseapp.com",
  projectId: "netflix-gpt-76bf0",
  storageBucket: "netflix-gpt-76bf0.appspot.com",
  messagingSenderId: "340197733300",
  appId: "1:340197733300:web:236993b3ffd3b92fa8f8e1"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
