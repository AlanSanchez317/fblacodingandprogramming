import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, get, ref, child} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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


let EmailInp = document.getElementById('emailInp')
let PassInp = document.getElementById('passwordInp')
let MainForm = document.getElementById('MainForm')
let ForgotPasswordLabel = document.getElementById('forgotpasslabel')

let SignInUser = evt => {
    evt.preventDefault();

    signInWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials)=>{
        get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot)=>{
            if(snapshot.exists){
                sessionStorage.setItem("user-info", JSON.stringify({
                   firstname: snapshot.val().firstname,
                   lastname: snapshot.val().lastname 
                }))
                sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                window.location.href = "../index.html";
            }
        })
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

let ForgotPassword = () =>{
    sendPasswordResetEmail(auth, EmailInp.value)
    .then(()=>{
        alert("A Password Reset Link has been sent to your email");
    })
    .catch((error)=>{
        console.log(error.code);
        console.log(error.message);
    })
}

let LoginButton = document.getElementById('loginButton');
LoginButton.addEventListener('click', SignInUser);

MainForm.addEventListener('submit', SignInUser);
ForgotPasswordLabel.addEventListener('click', ForgotPassword)

