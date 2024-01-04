document.addEventListener('DOMContentLoaded', function () {
    var fadeIns = document.querySelectorAll('.fade-in');
    
    function fadeInElements() {
        fadeIns.forEach(function (fadeIn) {
            var bounding = fadeIn.getBoundingClientRect();
            if (bounding.top < window.innerHeight && bounding.bottom >= 0) {
                fadeIn.style.opacity = '1';
                fadeIn.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', fadeInElements);
    fadeInElements(); // Initial check
});

let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

let GreetHead = document.getElementById('greet');
let SignoutBtn = document.getElementById('signoutbutton');


let Signout = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = './HTML/login.html'
}

let CheckCred = () => {
    if (!sessionStorage.getItem("user-creds")) {
        window.location.href = './HTML/login.html';
    } else {
        GreetHead.innerText = `Welcome ${UserInfo.firstname} ${UserInfo.lastname}!`;
    }
}

window.addEventListener('load', CheckCred);
SignoutBtn.addEventListener('click', Signout);