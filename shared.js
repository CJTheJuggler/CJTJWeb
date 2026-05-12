/* ============================================
   CONFIG — YOUR GOOGLE SHEET WEB APP URL
   ============================================ */

const sheetURL = "https://script.google.com/macros/s/AKfycbyv1R9-H7OM_8rGDugfLMEi6PMkLWYKdO53lA6o6kZDecat_OQRYUDCrr8nwMv2kXzp/exec"; 
// Replace with your deployed Web App URL



/* ============================================
   CHALLENGE 1 — REVIEWS FROM GOOGLE SHEETS
   ============================================ */

let reviewIndex = 0;
let reviewList = [];

function renderReview() {
    const reviewBox = document.querySelector(".reviews");
    if (!reviewBox || reviewList.length === 0) return;

    // Remove old review
    const old = reviewBox.querySelector(".review-text");
    if (old) old.remove();

    const r = reviewList[reviewIndex];

    const p = document.createElement("p");
    p.classList.add("review-text");

    // Format date
    const dateFormatted = new Date(r.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    // Format: “(12 May 2026) Highlight — Name”
    p.textContent = `(${dateFormatted}) ${r.highlight} — ${r.name}`;

    reviewBox.appendChild(p);

    reviewIndex = (reviewIndex + 1) % reviewList.length;
}



/* ============================================
   CHALLENGE 2 — EVENTS FROM GOOGLE SHEETS
   ============================================ */

function renderEvents(events) {
    const container = document.querySelector(".event-container");
    if (!container) return;

    container.innerHTML = "";

    events.forEach(ev => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");

        // Format date
        const dateObj = new Date(ev.Date);
        const formattedDate = dateObj.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric"
        });

        // Handle multiple types
        const types = ev.Types.split(",").map(t => t.trim());

        // Build type tags inside an H2
        const typeHTML = `
            <h2 class="event-types">
                ${types.map(t => `<span class="event-type ${t}">${t}</span>`).join(" ")}
            </h2>
        `;

        // Build date + time
        const dateHTML = `
            <p class="event-date"><strong>${formattedDate} — ${ev.Time}</strong></p>
        `;

        // Build location
        const locationHTML = `
            <p class="event-location">${ev.Location}</p>
        `;

        // Combine into event card
        eventElement.innerHTML = typeHTML + dateHTML + locationHTML;

        container.appendChild(eventElement);
    });
}



/* ============================================
   MASTER LOADER — FETCH EVERYTHING
   ============================================ */

async function loadData() {
    try {
        const response = await fetch(sheetURL);
        const data = await response.json();

        /* -------------------------
           REVIEWS
        ------------------------- */
        reviewList = data.reviews || [];

        // Sort newest → oldest
        reviewList.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (reviewList.length > 0) {
            renderReview();
            setInterval(renderReview, 5000);
        }

        /* -------------------------
           EVENTS
        ------------------------- */
        let events = data.events || [];

        // Sort by date
        events.sort((a, b) => new Date(a.Date) - new Date(b.Date));

        renderEvents(events);

    } catch (error) {
        console.error("Error loading data:", error);
    }
}

loadData();