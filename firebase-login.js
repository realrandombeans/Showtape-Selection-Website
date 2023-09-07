// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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
    appId: "1:1082599657064:web:402090b5d86f8da84bf5dd",
    measurementId: "G-HJ5FRYRW99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

// Get references to the form and login status div
const loginForm = document.getElementById("login-form");
const loginStatus = document.getElementById("login-status");

// Add an event listener to the form for handling login
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get user inputs
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
        // Attempt to sign in with the provided email and password
        await signInWithEmailAndPassword(auth, email, password);

        // Authentication successful, you can redirect or update UI as needed
        loginStatus.textContent = "Login successful!";
        window.location.href = "/admin.html";
    } catch (error) {
        // Handle login errors (e.g., invalid credentials)
        loginStatus.textContent = `Login failed: ${error.message}`;
    }
});