getCookie = (cName, cValue, expDays) => {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();

    document.cookie = cName + "=" + cValue + "; " + expires + " path=/";
}

document.querySelector("#cookie-button").addEventListener("click", () => {
    document.querySelector("#cookies").style.display = "none";
    setCookie("cookie", true, 90);
})




let loaderTimeout = setTimeout(() => {
    document.getElementById("juggling-loader").style.display = "block";
}, 500);

// When page is fully loaded, remove loader (if shown)
window.addEventListener("load", () => {
    clearTimeout(loaderTimeout);
    document.getElementById("juggling-loader").style.display = "none";
});

