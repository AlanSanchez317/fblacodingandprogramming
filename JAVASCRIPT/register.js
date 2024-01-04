import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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


let EmailInp = document.getElementById('emailInp')
let PassInp = document.getElementById('passwordInp')
let FnameInp = document.getElementById('fnameInp')
let LnameInp = document.getElementById('lnameInp')
let MainForm = document.getElementById('MainForm')

let RegisterUser = evt => {
    evt.preventDefault();

    createUserWithEmailAndPassword(auth, EmailInp.value, PassInp.value)
    .then((credentials)=>{
        set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
            firstname: FnameInp.value,
            lastname: LnameInp.value
        })
    })
    .catch((error)=>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}

MainForm.addEventListener('submit', RegisterUser);