// Check if the user has already accepted or declined cookies
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    name = name + "=";
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookie');
    const declineBtn = document.getElementById('decline-cookie');

    if (!getCookie('cookieConsent')) {
        popup.style.display = 'block';
        document.getElementById("blur-box").style.display = 'block';
    }

    acceptBtn.addEventListener('click', function () {
        setCookie('cookieConsent', 'accepted', 90);
        popup.style.display = 'none';
    document.getElementById("blur-box").style.display = 'none';
    });

    declineBtn.addEventListener('click', function () {
        setCookie('cookieConsent', 'declined', 90);
        popup.style.display = 'none';
        document.getElementById("blur-box").style.display = 'none';
    });
});
