// Retrieve user credentials from sessionStorage
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let GreetHead = document.getElementById('greet');

// Function to handle sign-out process
let Signout = () => {
    // Clear user credentials and other info from sessionStorage
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    // Redirect to the login page after signing out
    window.location.href = './HTML/login.html';
}

// Function to check user credentials
let CheckCred = () => {
    // If user credentials are not present, redirect to login page
    if (!UserCreds) {
        window.location.href = './HTML/login.html';
    } else {
        // Retrieve and display the username, or default to "User" if not available
        const username = sessionStorage.getItem("username") || "User";
        GreetHead.innerText = `Welcome ${username}!`;
    }
}

// Add event listeners for loading the page and sign out button
window.addEventListener('load', CheckCred);
document.getElementById('signoutbutton').addEventListener('click', Signout);
