import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    GithubAuthProvider, 
    sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAHcabQDigUfzFQ63dy_kjiaqAPZB4edtI",
    authDomain: "codinganddevelopment-e7d2c.firebaseapp.com",
    databaseURL: "https://codinganddevelopment-e7d2c-default-rtdb.firebaseio.com",
    projectId: "codinganddevelopment-e7d2c",
    storageBucket: "codinganddevelopment-e7d2c.appspot.com",
    messagingSenderId: "991250122571",
    appId: "1:991250122571:web:25d3ea280f9b9c34db8ace"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

document.addEventListener('DOMContentLoaded', () => {
    let EmailInp = document.getElementById('emailInp');
    let PassInp = document.getElementById('passwordInp');
    let MainForm = document.getElementById('MainForm');
    let ForgotPasswordLabel = document.getElementById('forgotpasslabel');
    let alertMessage = document.getElementById('alertMessage');
    let LoginButton = document.getElementById('loginButton');
    let googleSignInButton = document.getElementById('googleSignInButton');
    let githubSignInButton = document.getElementById('githubSignInButton');

    const storeUserDataAndRedirect = (user) => {
        // Fetch username from database
        get(ref(db, 'users/' + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const username = userData.username || user.displayName || user.email.split('@')[0];
                sessionStorage.setItem("username", username);
            } else {
                const username = user.displayName || user.email.split('@')[0];
                sessionStorage.setItem("username", username);
            }
            sessionStorage.setItem("user-info", JSON.stringify({ firstname: user.displayName || user.email, lastname: '' }));
            sessionStorage.setItem("user-creds", JSON.stringify(user));
            window.location.href = "../index.html";
        });
    };

    let SignInUser = evt => {
        evt.preventDefault();
        signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
            .then((credentials) => {
                storeUserDataAndRedirect(credentials.user);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    let SignInWithGoogle = (event) => {
        event.preventDefault();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                storeUserDataAndRedirect(result.user);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    let SignInWithGitHub = (event) => {
        event.preventDefault();
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                storeUserDataAndRedirect(result.user);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    let ForgotPassword = () => {
        const email = EmailInp.value.trim();
        if (email === '') {
            alertMessage.style.display = 'block';
            setTimeout(() => { alertMessage.style.display = 'none'; }, 3000);
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("A Password Reset Link has been sent to your email");
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    };

    LoginButton.addEventListener('click', SignInUser);
    MainForm.addEventListener('submit', SignInUser);
    ForgotPasswordLabel.addEventListener('click', ForgotPassword);
    googleSignInButton.addEventListener('click', SignInWithGoogle);
    githubSignInButton.addEventListener('click', SignInWithGitHub);
});