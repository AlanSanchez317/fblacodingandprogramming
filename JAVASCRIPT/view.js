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


function AddItemsToTable(Fname, Lname, email, number, organization, S_organization, C_organization, ST_organization, resources, additional) {
    var dataContainer = document.createElement('div');
    dataContainer.classList.add('data-item');
    styleDataContainer(dataContainer);

    // Correctly pass the dataContainer to createLabelValue
    createLabelValue('First Name:', Fname, dataContainer);
    createLabelValue('Last Name:', Lname, dataContainer);
    createLabelValue('Email:', email, dataContainer);
    createLabelValue('Phone Number:', number, dataContainer);
    createLabelValue('Organization Name:', organization, dataContainer);
    createLabelValue('Street Address:', S_organization, dataContainer);
    createLabelValue('City:', C_organization, dataContainer);
    createLabelValue('State:', ST_organization, dataContainer);
    createLabelValue('Resources:', resources, dataContainer);
    createLabelValue('Additional Info:', additional, dataContainer);

    // Append the data container to the data-container div
    document.getElementById('data-container').appendChild(dataContainer);
}

function createLabelValue(label, value, container) {
    var rowDiv = document.createElement('div');
    styleRow(rowDiv);

    var labelDiv = document.createElement('div');
    var valueDiv = document.createElement('div');

    styleLabel(labelDiv, label);
    styleValue(valueDiv, value);

    rowDiv.appendChild(labelDiv);
    rowDiv.appendChild(valueDiv);
    container.appendChild(rowDiv);
}

function styleDataContainer(container) {
    container.style.padding = '15px';
    container.style.marginBottom = '10px';
    container.style.backgroundColor = '#2B2B5F'; // Dark purple shade
    container.style.border = '1px solid #433675';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';
    container.style.color = '#EAEAEA';
    container.style.margin = '10px 0';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'auto auto'; // Two columns layout
    container.style.gap = '10px';
}

function styleRow(rowDiv) {
    rowDiv.style.display = 'grid';
    rowDiv.style.gridTemplateColumns = '1fr 2fr'; // Adjust column sizes
    rowDiv.style.gap = '10px';
    rowDiv.style.alignItems = 'center';
}

function styleLabel(labelDiv, labelText) {
    labelDiv.innerText = labelText;
    labelDiv.style.fontWeight = '600';
    labelDiv.style.fontSize = '14px';
    labelDiv.style.textTransform = 'uppercase';
    labelDiv.style.color = '#8854D0'; // Dark purple color for labels
}

function styleValue(valueDiv, valueText) {
    valueDiv.innerText = valueText;
    valueDiv.style.fontSize = '14px';
    valueDiv.style.textAlign = 'left';
    valueDiv.style.color = '#D8BFD8'; // Light purple color for values
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
