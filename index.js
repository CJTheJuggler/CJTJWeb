document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded")
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    document.querySelector("#c-button-a").addEventListener("click", () => {
        document.querySelector("#cookies").style.display = "none";
        document.querySelector(".blur-box").style.display = "none";
        setCookie("cookie", true, 90);
        console.log("Cookies Logged");
    })

    cookieMessage = () => {
        if (!getCookie("cookie"))
            document.querySelector("#cookie").style.display = "block";
    }

    window.addEventListener("load", cookieMessage);

    function checkCookie() {
        let user = getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 365);
            }
        }
    }

})
