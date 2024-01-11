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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

function updateGreeting() {
    const greetHead = document.getElementById('greet');
    if (greetHead) {
        const username = sessionStorage.getItem("username") || "User";
        greetHead.innerText = `Welcome ${username}!`;
    }
}

function updateNavbarProfilePic(url) {
    const profilePicElement = document.getElementById('navbarProfilePic');
    if (profilePicElement) {
        profilePicElement.src = url;
        profilePicElement.style.borderRadius = '50%'; // Make the image circular
    }
}

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

// Signout Function
function signOut() {
    sessionStorage.clear(); // Clears sessionStorage
    window.location.href = 'login.html'; // Redirect to login page
}

// Event Listeners
window.addEventListener('load', () => {
    updateGreeting();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchAndSetUserProfilePic();
        }
    });
});