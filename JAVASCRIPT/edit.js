import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyAHcabQDigUfzFQ63dy_kjiaqAPZB4edtI",
authDomain: "codinganddevelopment-e7d2c.firebaseapp.com",
databaseURL: "https://codinganddevelopment-e7d2c-default-rtdb.firebaseio.com",
projectId: "codinganddevelopment-e7d2c",
storageBucket: "codinganddevelopment-e7d2c.appspot.com",
messagingSenderId: "991250122571",
appId: "1:991250122571:web:25d3ea280f9b9c34db8ace"
};
initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();

window.onload = function() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadFormData(user.uid);
        } else {
            // User not logged in, handle accordingly
        }
    });
};

function loadFormData(userId) {
    const dataRef = ref(database, 'Information/' + userId);
    get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val();
            document.getElementById('editFname').value = data.Fname || '';
            document.getElementById('editLname').value = data.Lname || '';
            document.getElementById('editEmail').value = data.email || '';
            document.getElementById('editNumber').value = data.number || '';
            document.getElementById('editN_organization').value = data.organization || '';
            document.getElementById('editS_organization').value = data.S_organization || '';
            document.getElementById('editC_organization').value = data.C_organization || '';
            document.getElementById('editST_organization').value = data.ST_organization || '';
            document.getElementById('editResources').value = data.resources || '';
            document.getElementById('editAdditional').value = data.additional || '';
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    updateFormData(auth.currentUser.uid);
});

function updateFormData(userId) {
    let Fname = document.getElementById('editFname').value;
    let Lname = document.getElementById('editLname').value;
    let email = document.getElementById('editEmail').value;
    let number = document.getElementById('editNumber').value;
    let N_organization = document.getElementById('editN_organization').value;
    let S_organization = document.getElementById('editS_organization').value;
    let C_organization = document.getElementById('editC_organization').value;
    let ST_organization = document.getElementById('editST_organization').value;
    let resources = document.getElementById('editResources').value;
    let additional = document.getElementById('editAdditional').value;

    const updateRef = ref(database, 'Information/' + userId);
    update(updateRef, {
        Fname: Fname,
        Lname: Lname,
        email: email,
        number: number,
        organization: N_organization,
        S_organization: S_organization,
        C_organization: C_organization,
        ST_organization: ST_organization,
        resources: resources,
        additional: additional
    }).then(() => {
        alert("Data updated successfully");
        document.getElementById('editForm').reset();
    }).catch((error) => {
        console.error("Update failed: " + error.message);
    });
}

let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

let GreetHead = document.getElementById('greet');

let Signout = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'login.html';
}

let CheckCred = () => {
    if (!sessionStorage.getItem("user-creds")) {
        window.location.href = 'login.html';
    } else {
        // Use username from sessionStorage if available
        const username = sessionStorage.getItem("username") || "User";
        GreetHead.innerText = `Welcome ${username}!`;
    }
}

window.addEventListener('load', CheckCred);
document.getElementById('signoutbutton').addEventListener('click', Signout);
