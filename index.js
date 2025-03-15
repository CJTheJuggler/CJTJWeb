var elNotice = document.getElementById('js_cookieNotice')
var elAccept = document.getElementById('js_cookieNotice_accept')
var elRefuse = document.getElementById('js_cookieNotice_refuse')


// adding possibility to opt out only for analytics
var gaProperty = 'UA-XXX';
var disableStr = 'ga-disable-' + gaProperty;

if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true;
}
function gaOptout() {
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    window[disableStr] = true;
}


function setCookie(name, value, days) {
    var expiry = new Date()
    expiry.setTime(expiry.getTime() + (days * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + expiry.toUTCString()
    document.cookie = name + '=' + value + ';' + expires + ';' + 'path=/'
}

function getCookie(name) {
    var name = name + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return false
}

function cookieIsSet() {
    return getCookie('acceptCookies')
}

function showNotice() {
    elNotice.style.display = 'block'
}

function hideNotice() {
    elNotice.style.display = 'none'
}

function setAcceptCookie() {
    setCookie('acceptCookies', '1', 365)
}

function loadExternalScripts() {

    // load analytics
    // your analytics code here...

    // load iframes after accept
    // convert data-src to src for iframes
    var externalContents = document.querySelectorAll('[iframe-src]');
    if (externalContents[0]) {
        for (var i = 0; i < externalContents.length; i++) {
            var iframe = document.createElement('iframe');
            iframe.src = externalContents[i].getAttribute('iframe-src');

            iframe.frameborder = externalContents[i].getAttribute('frameborder');
            iframe.allowfullscreen = externalContents[i].getAttribute('allowfullscreen');
            // TODO convert more attribute or find better way to append all setted attributes and class to that element
            externalContents[i].parentNode.replaceWith(iframe, externalContents[i]);
        }
    }

    // Custom content
    // ... your custom script here

}

window.onload = function () {
    if (!cookieIsSet()) setTimeout(function () { showNotice() }, 2000);
    else loadExternalScripts();

    elAccept.onclick = elAccept.ontouch = function (e) {
        e.preventDefault();
        hideNotice();
        setAcceptCookie();
        loadExternalScripts();
    }

    if (elRefuse) {
        elRefuse.onclick = elRefuse.ontouch = function (e) {
            e.preventDefault();
            hideNotice();
        }
    }
}