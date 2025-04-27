const overlay = document.getElementById('overlay');

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function hideOverlay() {
    overlay.classList.add('fade-out');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500);
}

if (getCookie("cookieConsent")) {
    hideOverlay();
} else {
    overlay.style.pointerEvents = 'auto';
}

document.getElementById('accept').addEventListener('click', () => {
    setCookie("cookieConsent", "accepted", 90);
    hideOverlay();
    console.log('Cookies accepted');
});

document.getElementById('decline').addEventListener('click', () => {
    setCookie("cookieConsent", "declined", 90);
    hideOverlay();
    console.log('Cookies declined');
});



let loaderTimeout = setTimeout(() => {
    document.getElementById("juggling-loader").style.display = "block";
}, 2000);

// When page is fully loaded, remove loader (if shown)
window.addEventListener("load", () => {
    clearTimeout(loaderTimeout);
    document.getElementById("juggling-loader").style.display = "none";
});