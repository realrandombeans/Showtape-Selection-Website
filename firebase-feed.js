// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

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

async function fetchFeedItems() {
    const feedContainer = document.querySelector(".container");

    try {
        // Update the Firestore query to order by 'posted' timestamp in descending order
        const querySnapshot = await getDocs(query(collection(db, "feed"), orderBy("posted", "desc")));

        querySnapshot.forEach((doc) => {
            // Create a new div element for each feed item
            const feedItem = document.createElement("div");
            feedItem.classList.add("feed-item");

            // Load the content of feeditem.html into the div
            fetch("/feeditem.html")
                .then((response) => response.text())
                .then((html) => {
                    feedItem.innerHTML = html;

                    // Customize the content based on the document data
                    const creatorElement = feedItem.querySelector("#creator");
                    const descriptionElement = feedItem.querySelector("#description");
                    const categoryElement = feedItem.querySelector("#category");
                    const timeElement = feedItem.querySelector("#time");
                    const avatarElement = feedItem.querySelector("#avatar"); // Add this line

                    const data = doc.data();

                    creatorElement.innerHTML = `<b>${data.creator}</b>`;
                    descriptionElement.textContent = data.description;
                    categoryElement.textContent = data.category;

                    // Convert the Firestore Timestamp to a JavaScript Date object
                    const timestamp = data.posted.toDate();
                    // Format the date and time as desired (e.g., using toLocaleString())
                    const formattedTime = timestamp.toLocaleString();

                    // Set the time element
                    timeElement.textContent = formattedTime;

                    // Determine the correct image filename based on the creator's name
                    let avatarFilename;
                    if (data.creator === "randombeans") {
                        avatarFilename = "randombeans.png";
                    } else if (data.creator === "EveningStar92") {
                        avatarFilename = "eveningstar92.png";
                    } else {
                        // Add a default image filename here in case the creator's name is not recognized
                        avatarFilename = "default.png";
                    }

                    // Set the src attribute of the avatar element while preserving the /media/profiles/ part
                    avatarElement.src = `/media/profiles/${avatarFilename}`;

                    // Append the feed item to the container
                    feedContainer.appendChild(feedItem);
                });
        });
    } catch (error) {
        console.error("Error fetching feed items:", error);
    }
}

// Call the function to fetch and display feed items
fetchFeedItems();