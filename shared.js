const overlay = document.getElementById('cookie-overlay');
const acceptBtn = document.getElementById('accept-btn');
const declineBtn = document.getElementById('decline-btn');

// Helper to check if 90 days have passed
function hasNinetyDaysPassed(savedTime) {
    const now = new Date().getTime();
    const ninetyDaysInMs = 90 * 24 * 60 * 60 * 1000;
    return (now - savedTime) > ninetyDaysInMs;
}

window.addEventListener('load', () => {
    const cookieData = JSON.parse(localStorage.getItem('cookieChoice'));

    if (cookieData && cookieData.choice === 'accepted') {
        if (!hasNinetyDaysPassed(cookieData.timestamp)) {
            overlay.style.display = 'none';
        } else {
            // 90 days passed, clear the old choice
            localStorage.removeItem('cookieChoice');
        }
    }
    else if (cookieData && cookieData.choice === 'declined') {
        // Optional: allow declined users to never see it again or re-ask after 90 days
        if (!hasNinetyDaysPassed(cookieData.timestamp)) {
            overlay.style.display = 'none';
        } else {
            localStorage.removeItem('cookieChoice');
        }
    }
});

acceptBtn.addEventListener('click', () => {
    const cookieData = {
        choice: 'accepted',
        timestamp: new Date().getTime()
    };
    localStorage.setItem('cookieChoice', JSON.stringify(cookieData));
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500); // Match the transition duration
});

declineBtn.addEventListener('click', () => {
    const cookieData = {
        choice: 'declined',
        timestamp: new Date().getTime()
    };
    localStorage.setItem('cookieChoice', JSON.stringify(cookieData));
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500); // Match the transition duration
});



let loaderTimeout = setTimeout(() => {
    document.getElementById("juggling-loader").style.display = "block";
}, 2000);

// When page is fully loaded, remove loader (if shown)
window.addEventListener("load", () => {
    clearTimeout(loaderTimeout);
    document.getElementById("juggling-loader").style.display = "none";
});
