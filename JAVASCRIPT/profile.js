import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

document.getElementById('profileForm').addEventListener('submit', function(e) {
e.preventDefault();

const user = auth.currentUser;
if (!user) {
alert("You must be logged in to update your profile.");
return;
}

// Get the current profile data
const userProfileRef = ref(database, 'users/' + user.uid);
get(userProfileRef).then((snapshot) => {
if (snapshot.exists()) {
    const currentData = snapshot.val();
    
    // Only update the fields that have changed
    const updatedData = {
        username: document.getElementById('username').value || currentData.username,
        birthday: document.getElementById('birthday').value || currentData.birthday,
        workplace: document.getElementById('workplace').value || currentData.workplace,
        bio: document.getElementById('bio').value || currentData.bio,
        info: document.getElementById('info').value || currentData.info,
    };

    // Update profile data in Firebase
    set(ref(database, 'users/' + user.uid), updatedData).then(() => {
        // Handle profile picture upload if a new picture is chosen
        const profilePic = document.getElementById('profilePic').files[0];
        if (profilePic) {
            const imageRef = storageRef(storage, 'profilePictures/' + user.uid);
            uploadBytes(imageRef, profilePic).then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            }).then((url) => {
                set(ref(database, 'users/' + user.uid + '/profilePicture'), url).then(() => {
                    updateProfileDisplay(url, updatedData);
                });
            });
        } else {
            updateProfileDisplay(currentData.profilePicture || null, updatedData);
        }
    }).catch((error) => {
        console.error("Error updating profile: ", error);
    });

} else {
    console.log("No user data available");
}
}).catch((error) => {
console.error("Error fetching user data: ", error);
});
});

function updateProfileDisplay(profilePicUrl, userData) {
const profileImageDisplay = document.getElementById('profileImageDisplay');
const finalImageUrl = profilePicUrl ? profilePicUrl : '../IMAGES/defaultpfpicon.png';

if (profileImageDisplay) {
profileImageDisplay.src = finalImageUrl;
}

if (userData) {
document.getElementById('usernameDisplay').textContent = userData.username;
document.getElementById('birthdayDisplay').textContent = userData.birthday ? 'Birthday: ' + userData.birthday : '';
document.getElementById('workplaceDisplay').textContent = userData.workplace ? 'Workplace: ' + userData.workplace : '';
document.getElementById('bioDisplay').textContent = userData.bio ? 'Bio: ' + userData.bio : '';
document.getElementById('infoDisplay').textContent = userData.info ? 'Additional Info: ' + userData.info : '';
}
}


document.getElementById('toggleEdit').addEventListener('click', function() {
    var form = document.getElementById('profileForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

function fetchAndDisplayProfile() {
const user = auth.currentUser;
if (user) {
const userProfileRef = ref(database, 'users/' + user.uid);
get(userProfileRef).then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        updateProfileDisplay(data.profilePicture, data);
    } else {
        // Set default placeholder data
        updateProfileDisplay(null, {
            username: 'Username',
            bio: 'Your bio goes here...',
            birthday: 'DD/MM/YYYY',
            workplace: 'Your workplace',
            info: 'Additional info...'
        });
        console.log("No user data available");
    }
}).catch((error) => {
    console.error("Error fetching user data: ", error);
});
}
}


window.addEventListener('load', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            fetchAndDisplayProfile();
        } else {
            console.log("User is not logged in");
        }
    });
});

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