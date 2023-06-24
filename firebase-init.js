// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_P8ByePTMju24hmVHhm29FYvu5waNIH0",
  authDomain: "showtapeselectionwebsite.firebaseapp.com",
  projectId: "showtapeselectionwebsite",
  storageBucket: "showtapeselectionwebsite.appspot.com",
  messagingSenderId: "1082599657064",
  appId: "1:1082599657064:web:fdd34471863f99da4bf5dd",
  measurementId: "G-DEJBVK6TT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);