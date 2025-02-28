document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("announcement");
});

setTimeout(() => {
    banner.classList.add("visible");
}, 250);

setTimeout(() => {
    banner.classList.remove("visible");
}, 15000);


