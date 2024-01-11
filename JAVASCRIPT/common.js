function updateGreeting() {
    const greetHead = document.getElementById('greet');
    if (greetHead) {
        const username = sessionStorage.getItem("username") || "User";
        greetHead.innerText = `Welcome ${username}!`;
    }
}

// Signout Function
function signOut() {
    sessionStorage.clear(); // Clears sessionStorage
    window.location.href = 'login.html'; // Redirect to login page
}

// Event Listeners
window.addEventListener('load', updateGreeting);