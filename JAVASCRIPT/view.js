import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
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

let allData = [];
let uniqueStates = new Set();
let uniqueCities = new Set();

function SelectAllData() {
const db = getDatabase(app);
const dbRef = ref(db, 'Information');

// Fetch the data snapshot before iterating
get(dbRef).then((snapshot) => {
snapshot.forEach((childSnapshot) => {
    const CurrentRecord = childSnapshot.val();
    allData.push(CurrentRecord);
    uniqueStates.add(CurrentRecord.ST_organization);
    uniqueCities.add(CurrentRecord.C_organization);
    
    const {
        Fname,
        Lname,
        email,
        number,
        organization,
        S_organization,
        C_organization,
        ST_organization,
        resources,
        additional
    } = CurrentRecord;

    AddItemsToTable(
        Fname,
        Lname,
        email,
        number,
        organization,
        S_organization,
        C_organization,
        ST_organization,
        resources,
        additional
    );
});

populateDropdown('stateFilter', uniqueStates);
populateDropdown('cityFilter', uniqueCities);
});
}

document.getElementById('filterButton').addEventListener('click', applyFilters);


function populateDropdown(dropdownId, optionsSet) {
const dropdown = document.getElementById(dropdownId);
// Clear existing options
dropdown.innerHTML = '<option value="">Select ' + (dropdownId === 'stateFilter' ? 'State' : 'City') + '</option>';
optionsSet.forEach((option) => {
let opt = document.createElement('option');
opt.value = option;
opt.innerText = option;
dropdown.appendChild(opt);
});
}

window.onload = SelectAllData;


function AddItemsToTable(
    Fname,
    Lname,
    email,
    number,
    organization,
    S_organization,
    C_organization,
    ST_organization,
    resources,
    additional
) {
    var dataContainer = document.createElement('div');
    dataContainer.classList.add('data-item');

    // Create and append label-value pairs to the data container
    createLabelValue('First Name:', Fname);
    createLabelValue('Last Name:', Lname);
    createLabelValue('Email:', email);
    createLabelValue('Phone Number:', number);
    createLabelValue('Organization Name:', organization);
    createLabelValue('Street Address:', S_organization);
    createLabelValue('City:', C_organization);
    createLabelValue('State:', ST_organization);
    createLabelValue('Resources:', resources);
    createLabelValue('Additional Info:', additional);


    // Append the data container to the data-container div
    document.getElementById('data-container').appendChild(dataContainer);

    function createLabelValue(label, value) {
        var labelDiv = document.createElement('div');
        labelDiv.classList.add('data-label');
        labelDiv.innerText = label;

        var valueDiv = document.createElement('div');
        valueDiv.classList.add('data-value');
        valueDiv.innerText = value;

        dataContainer.appendChild(labelDiv);
        dataContainer.appendChild(valueDiv);
    }
}

function applyFilters() {
const searchInput = document.getElementById('searchInput').value.toLowerCase();
const stateFilter = document.getElementById('stateFilter').value;
const cityFilter = document.getElementById('cityFilter').value;
const sortFilter = document.getElementById('sortFilter').value;

let filteredData = allData.filter(item => {
const matchesState = item.ST_organization === stateFilter || stateFilter === '';
const matchesCity = item.C_organization === cityFilter || cityFilter === '';
const matchesSearch = item.Fname.toLowerCase().includes(searchInput) ||
                      item.Lname.toLowerCase().includes(searchInput) ||
                      item.email.toLowerCase().includes(searchInput) ||
                      item.organization.toLowerCase().includes(searchInput) ||
                      item.number.includes(searchInput);
return matchesState && matchesCity && matchesSearch;
});

// Sort the filtered data based on the selected sorting option
if (sortFilter === 'name-asc') {
filteredData.sort((a, b) => a.Fname.localeCompare(b.Fname));
} else if (sortFilter === 'name-desc') {
filteredData.sort((a, b) => b.Fname.localeCompare(a.Fname));
}

displayFilteredData(filteredData);
}

function displayFilteredData(data) {
// Clear existing data display
document.getElementById('data-container').innerHTML = '';

// Add filtered data to the display
data.forEach(item => {
// Ensure the properties match those expected by AddItemsToTable
AddItemsToTable(
    item.Fname,
    item.Lname,
    item.email,
    item.number,
    item.organization,
    item.S_organization,
    item.C_organization,
    item.ST_organization,
    item.resources,
    item.additional
);
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