document.addEventListener("DOMContentLoaded", () => {
    console.log("JS Loaded")
    setCookie = (cName, cValue, expDays) => {
        let date = new Date();
        date.setTime(date.getTime() + (expDays*24*60*60*1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "path=/";
    }
    
    cookieMessage = () => {
        if (!getCookie("cookie"))
            document.querySelector("#cookie").style.display = "block";
    }
    
    window.addEventListener("load", cookieMessage);

    if(localStorage.getItem(setCookie) === null) {

        document.querySelector("#c-button-a").addEventListener("click", () => {
            document.querySelector("#cookies").style.display = "none";
            document.querySelector(".blur-box").style.display = "none";
            setCookie("cookie", true, 90);
            console.log("Cookies Logged");
        })

        

    }else {
        getCookie = (cName) => {
            const name = cName + "=";
            const cDecoded = decodeURIComponent(document.cookie);
            const cArr = cDecoded.split("; ");
            let value;
            cArr.forEach(val => {
                if(val.indexOf(name) === 0) value = val.substring(name.length);
            })
        
            return value;
        }
    }
})

// Add A localStorage Method That Checks If The User Has Allowed Cookies Before, IF NOT COOKIES THEN 'COOKIES?', ELSE COOKIES NO 'COOKIES?'

// Run Github As A Test