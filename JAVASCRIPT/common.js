// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHcabQDigUfzFQ63dy_kjiaqAPZB4edtI",
    authDomain: "codinganddevelopment-e7d2c.firebaseapp.com",
    databaseURL: "https://codinganddevelopment-e7d2c-default-rtdb.firebaseio.com",
    projectId: "codinganddevelopment-e7d2c",
    storageBucket: "codinganddevelopment-e7d2c.appspot.com",
    messagingSenderId: "991250122571",
    appId: "1:991250122571:web:25d3ea280f9b9c34db8ace"
};

// Initializing the Firebase application with the provided configuration
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Function to update greeting text based on username stored in sessionStorage
function updateGreeting() {
    const greetHead = document.getElementById('greet');
    if (greetHead) {
        const username = sessionStorage.getItem("username") || "User";
        greetHead.innerText = `Welcome ${username}!`;
    }
}

// Function to update the navbar profile picture
function updateNavbarProfilePic(url) {
    const profilePicElement = document.getElementById('navbarProfilePic');
    if (profilePicElement) {
        profilePicElement.src = url;
        profilePicElement.style.borderRadius = '50%'; // Styles the image to be circular
    }
}

// Function to fetch and set the user's profile picture from the database
function fetchAndSetUserProfilePic() {
    const user = auth.currentUser;
    if (user) {
        const userProfileRef = ref(database, 'users/' + user.uid + '/profilePicture');
        get(userProfileRef).then((snapshot) => {
            if (snapshot.exists()) {
                updateNavbarProfilePic(snapshot.val());
            }
        }).catch((error) => {
            console.error("Error fetching user profile picture: ", error);
        });
    }
}

// Function to handle sign-out, clears the sessionStorage and redirects to login page
function signOut() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

// Adding event listeners for load event and authentication state changes
window.addEventListener('load', () => {
    updateGreeting();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchAndSetUserProfilePic();
        }
    });
});