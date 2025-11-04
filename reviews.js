const sheetURL =
  "https://docs.google.com/spreadsheets/d/1-G-94CAchrLPPIp86qn-lvgUIsEXyUlIJjtywQCSjOU/gviz/tq?tqx=out:json";

let allReviews = [];

// Convert dd/mm/yyyy to Date
function parseDDMMYYYY(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

async function loadReviews() {
  try {
    const res = await fetch(sheetURL);
    const text = await res.text();

    const json = JSON.parse(
      text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
    );

    allReviews = json.table.rows.map((r) => ({
      date: r.c[0]?.v || "",
      name: r.c[1]?.v || "",
      highlight: r.c[2]?.v || "",
      rating: r.c[3]?.v || 0,
      extra: r.c[4]?.v || "",
      type: r.c[5]?.v || ""
    }));

    // ✅ Sort by date descending
    allReviews.sort((a, b) => parseDDMMYYYY(b.date) - parseDDMMYYYY(a.date));

    displayReviews(allReviews);
  } catch (err) {
    console.error("Error loading reviews:", err);
  }
}

function displayReviews(list) {
  const container = document.getElementById("reviewList");
  if (!container) return;

  container.innerHTML = list
    .map(
      (r) => `
      <div class="reviewCard">
        <p class="question">What was your highlight from the performance?</p>
        <p class="answer">“${r.highlight}”</p>

        <p class="question">How satisfied were you with communication?</p>
        <p class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</p>

        <p class="question">Anything else you'd like to share?</p>
        <p class="answer">“${r.extra}”</p>

        <p class="name">- ${r.name} (${r.type})</p>
      </div>
    `
    )
    .join("");
}

loadReviews();
