import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"; 
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const database = getDatabase(app);
const auth = getAuth(app);

// Listen for submit event
document.getElementById('registrationform').addEventListener('submit', formSubmit);

// Submit form
function formSubmit(e) {
e.preventDefault();

const userId = auth.currentUser.uid; // Ensure the current user's UID is obtained

// Check if the user already has a submission
const submissionRef = ref(database, 'Information/' + userId);
get(submissionRef).then((snapshot) => {
            if (snapshot.exists()) {
                document.querySelector('.alert-error').style.display = 'block';
                setTimeout(function () {
                    document.querySelector('.alert-error').style.display = 'none';
                }, 7000);
            } else {
        // If no submission exists, proceed to create a new one
        let Fname = document.querySelector('#Fname').value;
        let Lname = document.querySelector('#Lname').value;
        let email = document.querySelector('#email').value;
        let number = document.querySelector('#number').value;
        let organization = document.querySelector('#N_organization').value;
        let S_organization = document.querySelector('#S_organization').value;
        let C_organization = document.querySelector('#C_organization').value;
        let ST_organization = document.querySelector('#ST_organization').value;
        let resources = document.querySelector('#resources').value;
        let additional = document.querySelector('#additional').value;

        sendMessage(Fname, Lname, email, number, organization, S_organization, C_organization, ST_organization, resources, additional);
    }
}).catch((error) => {
    console.error("Error fetching submission data: ", error);
});
}

// Send Message to Firebase
function sendMessage(Fname, Lname, email, number, N_organization, S_organization, C_organization, ST_organization, resources, additional) {
    const userId = auth.currentUser.uid; // Ensure the current user's UID is obtained

    set(ref(database, 'Information/' + userId), {
        Fname: Fname,
        Lname: Lname,
        email: email,
        number: number,
        organization: N_organization,
        S_organization: S_organization,
        C_organization: C_organization,
        ST_organization: ST_organization,
        resources: resources,
        additional: additional,
        userId: userId
    }).then(() => {
        document.querySelector('.alert').style.display = 'block';
        setTimeout(function () {
            document.querySelector('.alert').style.display = 'none';
        }, 7000);
        document.getElementById('registrationform').reset();
    }).catch((error) => {
        alert(error.message);
    });
}

let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

let GreetHead = document.getElementById('greet');
let SignoutBtn = document.getElementById('signoutbutton');


let Signout = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'login.html'
}

let CheckCred = () => {
    if (!sessionStorage.getItem("user-creds")) {
        window.location.href = 'login.html';
    } else {
        GreetHead.innerText = `Welcome ${UserInfo.firstname} ${UserInfo.lastname}!`;
    }
}

window.addEventListener('load', CheckCred);
SignoutBtn.addEventListener('click', Signout);
