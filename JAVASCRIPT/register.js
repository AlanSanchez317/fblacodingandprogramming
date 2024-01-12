// Importing Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration object containing keys and identifiers
const firebaseConfig = {
    apiKey: "AIzaSyAHcabQDigUfzFQ63dy_kjiaqAPZB4edtI",
    authDomain: "codinganddevelopment-e7d2c.firebaseapp.com",
    databaseURL: "https://codinganddevelopment-e7d2c-default-rtdb.firebaseio.com",
    projectId: "codinganddevelopment-e7d2c",
    storageBucket: "codinganddevelopment-e7d2c.appspot.com",
    messagingSenderId: "991250122571",
    appId: "1:991250122571:web:25d3ea280f9b9c34db8ace"
};

// Initialize the Firebase application with the provided configuration
const app = initializeApp(firebaseConfig);

// Initialize database and authentication services
const db = getDatabase();
const auth = getAuth(app);

// Getting DOM elements for user inputs and form
let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let FnameInp = document.getElementById('fnameInp');
let LnameInp = document.getElementById('lnameInp');
let MainForm = document.getElementById('MainForm');

// Function to register new users
let RegisterUser = evt => {
    evt.preventDefault(); // Prevent default form submission behavior

    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
        .then((credentials) => {
            // On successful creation, save user's first and last name in the database
            set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
                firstname: FnameInp.value,
                lastname: LnameInp.value
            });
        })
        .catch((error) => {
            // Handle errors such as email already in use, weak password, etc.
            alert(error.message); // Alert user with the error message
            console.log(error.code); // Log error code for debugging
            console.log(error.message); // Log full error message for debugging
        });
};

// Event listener to handle form submission
MainForm.addEventListener('submit', RegisterUser);
