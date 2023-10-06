import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

// Initialize Firebase (replace with your Firebase configuration)
const firebaseConfig = {
    apiKey: "AIzaSyDbpneE6UvYKTN3EwJK0tveYbgEPvBZHi4",
    authDomain: "showtape-central.firebaseapp.com",
    projectId: "showtape-central",
    storageBucket: "showtape-central.appspot.com",
    messagingSenderId: "289212060902",
    appId: "1:289212060902:web:635af5b031c43a677ed727"
};

const secondFirebaseConfig = {
    apiKey: "AIzaSyA_P8ByePTMju24hmVHhm29FYvu5waNIH0",
    authDomain: "showtapeselectionwebsite.firebaseapp.com",
    projectId: "showtapeselectionwebsite",
    storageBucket: "showtapeselectionwebsite.appspot.com",
    messagingSenderId: "1082599657064",
    appId: "1:1082599657064:web:402090b5d86f8da84bf5dd",
    measurementId: "G-HJ5FRYRW99"
};

// Initialize the first Firebase app
const app = initializeApp(firebaseConfig);

// Initialize the second Firebase app
const secondApp = initializeApp(secondFirebaseConfig, "secondFirebase");


// Function to handle the "Add CEC Edition" button click
async function handleAddCECEdition() {
    const userID = document.getElementById("userID").value;

    // Create a Firestore database reference for the second Firebase app
    const db = getFirestore(app);

    // Check if the user is authenticated on the second Firebase app
    const auth = getAuth(secondApp);
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Add a document with the user ID and "cecedition" field set to "true"
                await addDoc(collection(db, "cecedition"), {
                    [userID]: "true"
                });

                alert("CEC Edition added successfully!");
            } catch (error) {
                console.error("Error adding CEC Edition: ", error);
                alert("An error occurred while adding CEC Edition.");
            }
        } else {
            alert("You must be authenticated with the second Firebase app to request CEC Edition.");
        }
    });
}

export { handleAddCECEdition };