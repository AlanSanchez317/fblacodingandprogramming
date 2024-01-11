let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let GreetHead = document.getElementById('greet');

let Signout = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = './HTML/login.html';
}

let CheckCred = () => {
    if (!UserCreds) {
        window.location.href = './HTML/login.html';
    } else {
        // Use username from sessionStorage if available
        const username = sessionStorage.getItem("username") || "User";
        GreetHead.innerText = `Welcome ${username}!`;
    }
}

window.addEventListener('load', CheckCred);
document.getElementById('signoutbutton').addEventListener('click', Signout);
