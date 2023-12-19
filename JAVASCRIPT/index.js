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