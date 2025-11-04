const homeSheetURL =
    "https://docs.google.com/spreadsheets/d/1-G-94CAchrLPPIp86qn-lvgUIsEXyUlIJjtywQCSjOU/gviz/tq?tqx=out:json";

let homeReviews = [];
let homeSlideIndex = 1;
let autoSlideTimer;

async function loadHomeReviews() {
    const res = await fetch(homeSheetURL);
    const text = await res.text();

    const json = JSON.parse(
        text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
    );

    homeReviews = json.table.rows.map((r) => ({
        date: r.c[0]?.v || "",
        name: r.c[1]?.v || "",
        highlight: r.c[2]?.v || "",
        rating: r.c[3]?.v || 0,
        extra: r.c[4]?.v || "",
        type: r.c[5]?.v || "",
    }));

    // newest → oldest
    homeReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    // only newest 3
    homeReviews = homeReviews.slice(0, 3);

    displayHomeSlides(homeReviews);
    showHomeSlides(homeSlideIndex);

    // ✅ start auto-slide
    startAutoSlide();
}

function displayHomeSlides(list) {
    document.getElementById("reviewSlides").innerHTML = list
        .map(
            (r) => `
      <div class="homeReviewCard">
        <p class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</p>
        <p class="text">“${r.highlight}”</p>
        <p class="name">- ${r.name}</p>
      </div>
    `
        )
        .join("");
}

function plusHomeSlides(n) {
    showHomeSlides((homeSlideIndex += n));
    restartAutoSlide();
}

function showHomeSlides(n) {
    let slides = document.getElementsByClassName("homeReviewCard");
    if (slides.length === 0) return;

    if (n > slides.length) homeSlideIndex = 1;
    if (n < 1) homeSlideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[homeSlideIndex - 1].style.display = "block";
}

// ✅ autoplay every 5 seconds
function startAutoSlide() {
    autoSlideTimer = setInterval(() => {
        homeSlideIndex++;
        showHomeSlides(homeSlideIndex);
    }, 5000);
}

// ✅ if user clicks next/prev, restart timer
function restartAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

loadHomeReviews();
