// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

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


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Reference to the table element
const table = document.querySelector('table');

// Function to populate the table with data from Firestore
const populateTable = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "showtapes"));

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Create a new row for each document
            const row = table.insertRow();

            // Create cells for Name, Type, and Link
            const nameCell = row.insertCell(0);
            const typeCell = row.insertCell(1);
            const creatorCell = row.insertCell(2);
            const linkCell = row.insertCell(3);

            // Set the cell values from Firestore data
            nameCell.textContent = data.name;
            typeCell.textContent = data.type;
            linkCell.innerHTML = `<a href="${data.link}" target="_blank">${data.link}</a>`;
            creatorCell.textContent = data.creator;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call the function to populate the table when the page loads
window.addEventListener('load', populateTable);