document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded")
    document.addEventListener("DOMContentLoaded", function () {
        const cookiePopup = document.getElementById("cookies");
        const acceptButton = document.getElementById("c-button-a");
    
        // Check if the user has already accepted cookies
        if (localStorage.getItem("cookieConsent") === "accepted") {
            cookiePopup.style.display = "none";
        } else {
            cookiePopup.style.display = "block";
        }
    
        // Accept cookies and store in localStorage
        acceptButton.addEventListener("click", function () {
            localStorage.setItem("cookieConsent", "accepted");
            cookiePopup.style.display = "none";
        });
    
        // The "Decline" button already redirects via HTML
    });
})

// Add A localStorage Method That Checks If The User Has Allowed Cookies Before, IF NOT COOKIES THEN 'COOKIES?', ELSE COOKIES NO 'COOKIES?'

// Run Github As A Test

