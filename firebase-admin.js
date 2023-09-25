// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, setDoc, doc, addDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js"; // Import Storage

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
const storage = getStorage(app);


// Check the user's authentication status
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, you can proceed with your application logic here.
        // For example, fetch data from Firestore.
    } else {
        // User is not signed in, redirect to the 403 HTML page.
        window.location.href = "403.html";
    }
});

// Handle the logout button click event
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            auth.signOut().then(() => {
                // Redirect to the login page
                window.location.href = "login.html";
            }).catch((error) => {
                // Handle any errors if necessary
                console.error("Error signing out:", error);
            });
        });
    }
});

// ... (previous code)

const addShowtapeForm = document.getElementById("addShowtapeForm");

addShowtapeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const docId = addShowtapeForm.docId.value;
    const name = addShowtapeForm.name.value;
    const link = addShowtapeForm.link.value;
    const creator = addShowtapeForm.creator.value;
    const type = addShowtapeForm.type.value;

    try {
        // Add the Showtape document to Firestore
        await setDoc(doc(db, "showtapes", docId), {
            name,
            link,
            creator,
            type,
        });

        // Reset the form
        addShowtapeForm.reset();

        // You can optionally show a success message to the user
        alert("Showtape added successfully!");
    } catch (error) {
        console.error("Error adding Showtape:", error);
        alert("Failed to add. Try again later.");
    }
});

const addNewsForm = document.getElementById("addNewsForm");

const addNewsForm = document.getElementById("addNewsForm");

addNewsForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const category = addNewsForm.category.value;
    const creator = addNewsForm.creator.value;
    const description = addNewsForm.description.value;
    const mediaFile = addNewsForm.media.files[0]; // Get the selected file

    try {
        // Generate the timestamp for when the news is posted
        const postedTimestamp = new Date();

        // Initialize mediaUrl as null (no media)
        let mediaUrl = null;

        // Check if a file is selected
        if (mediaFile) {
            // Upload the media file to Firebase Storage
            const storageRef = ref(storage, `news/${mediaFile.name}`);
            await uploadBytes(storageRef, mediaFile);

            // Get the URL of the uploaded media file
            mediaUrl = await getDownloadURL(storageRef);
        }

        // Add the News document to Firestore with media URL (if available)
        await addDoc(collection(db, "feed"), {
            category,
            creator,
            description,
            mediaUrl, // Store the media URL in Firestore (null if no media)
            posted: postedTimestamp,
        });

        // Reset the form
        addNewsForm.reset();

        // You can optionally show a success message to the user
        alert("News added successfully!");
    } catch (error) {
        console.error("Error adding News:", error);
        alert("Failed to add. Try again later.");
    }
});
