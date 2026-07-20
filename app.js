const defaultConfig = window.STR_MISSION_CONTROL_CONFIG || {};

const checklist = [
  "Guest needs confirmed",
  "House rules confirmed",
  "Pet details confirmed",
  "Personal touch planned",
  "Pre-arrival message scheduled",
  "Arrival prep complete",
];

const primingSteps = ["Check-up · day 1", "Pre-checkout", "Post-checkout", "Friends & family offer"];
const reviewSteps = ["Guest review", "Host review", "Response"];

const demoStays = [
  {
    id: "demo-jordan",
    guest: "Jordan Blake",
    channel: "Airbnb",
    checkIn: "2026-07-19",
    checkOut: "2026-07-22",
    dates: "Jul 19 → Jul 22",
    nights: "3 nights",
    party: "4 adults · 2 pets",
    occasion: "Family reunion",
    mentioned: ["family reunion", "two dogs"],
    prepItems: "Set out extra dog bowls and the large patio table.",
    personalTouches: "Welcome note with a few easy family-friendly ideas.",
    done: [true, true, true, true, true, true],
    priming: [true, false, false, false],
    reviews: [false, false, false],
  },
  {
    id: "demo-priya",
    guest: "Priya Raman",
    channel: "Airbnb",
    checkIn: "2026-07-16",
    checkOut: "2026-07-19",
    dates: "Jul 16 → Jul 19",
    nights: "3 nights",
    party: "3 adults · 1 pet",
    occasion: "Graduation weekend",
    mentioned: ["graduation", "celebrate"],
    prepItems: "Leave space for flowers and a small celebration dessert.",
    personalTouches: "Local coffee-shop suggestion for the graduate's family.",
    done: [true, true, true, true, false, false],
    priming: [false, false, false, false],
    reviews: [false, false, false],
  },
  {
    id: "demo-sam",
    guest: "Sam Okafor",
    channel: "Airbnb",
    checkIn: "2026-07-20",
    checkOut: "2026-07-24",
    dates: "Jul 20 → Jul 24",
    nights: "4 nights",
    party: "2 adults · 1 pet",
    occasion: "Birthday trip",
    mentioned: ["birthday", "first visit"],
    prepItems: "Pet bed, a few extra towels, and a simple cake stand.",
    personalTouches: "Made a short local-walk list for their first visit.",
    done: [true, false, true, false, true, false],
    priming: [true, false, false, false],
    reviews: [false, false, false],
  },
  {
    id: "demo-marco",
    guest: "Marco Ellis",
    channel: "Airbnb",
    checkIn: "2026-07-10",
    checkOut: "2026-07-12",
    dates: "Jul 10 → Jul 12",
    nights: "2 nights",
    party: "2 adults",
    occasion: "Quiet weekend away",
    mentioned: ["quiet", "first visit"],
    prepItems: "Place the extra blanket in the bedroom closet.",
    personalTouches: "Leave the calm morning-walk recommendation.",
    done: [true, true, true, true, true, false],
    priming: [true, true, true, false],
    reviews: [true, false, false],
  },
];

const demoFlags = [
  {
    id: "demo-hot-tub",
    kind: "alert",
    label: "Guest report · sample",
    title: "Guest report: hot tub is cold",
    detail: "A private dashboard can turn a real guest issue into a protected flag. This sample stays in your browser.",
  },
  {
    id: "demo-supplies",
    kind: "warm",
    label: "Supply reorder · sample",
    title: "Restock paper towels + coffee pods",
    detail: "This is a made-up supply reminder. Refresh the page to return to the original sample.",
  },
];

const resourceCards = [
  {
    title: "1 · Check-up",
    timing: "The day after check-in · stays longer than one night",
    copy: "Good morning, {{guest_first_name}}!\n\nI hope you have settled in well. Please let us know if there is anything you need so we can help make this a wonderful stay!",
    note: "A friendly early check-in gives guests an easy chance to ask for help before a small issue grows.",
  },
  {
    title: "2 · Pre-checkout",
    timing: "The evening before checkout · stays longer than one night",
    copy: "Hi {{guest_first_name}}!\n\nWe hope you have had a great stay. Before tomorrow's checkout, please gather used linens and towels, start any dishes you can, turn off lights, and let us know if you need anything before you travel.",
    note: "Keep this note kind and short. It reminds guests of the basics without sounding like a rulebook.",
  },
  {
    title: "3 · Post-checkout",
    timing: "A few hours after checkout",
    copy: "Hi {{guest_first_name}}!\n\nThank you for leaving the place in good shape. If there is anything we can improve, please let us know. We appreciate you and hope to host you again!",
    note: "This is a gentle moment to invite private feedback and start the review loop.",
  },
  {
    title: "4 · Celebration surprise",
    timing: "Only when a celebration is confirmed",
    copy: "Hi {{guest_first_name}}! We heard you are celebrating. We left a small welcome surprise for your group. We hope it makes the occasion even sweeter!",
    note: "Edit this to match the personal touch you actually provide. Never promise a gift you have not placed.",
  },
  {
    title: "5 · Friends & family",
    timing: "After a positive review, during a slower season",
    copy: "Hi {{guest_first_name}}! Thank you again for staying with us. If you or a friend returns in the future, please reach out directly and we will share the best available return-guest option.",
    note: "Use only after a positive stay. Make sure any offer follows your platform and local rules.",
  },
];

const vendorQuotes = [
  ["Pool care", "Clearwater Pool Co.", "Weekly cleaning", "$280.00", "Monthly", "Chosen"],
  ["Lawncare", "Green Path Yard", "Mow + trim", "$160.00", "Seasonal", "Quoted"],
  ["Handyman", "Home Fix Team", "General repairs", "$90/hr", "As needed", "Chosen"],
  ["Sauna / spa", "Warm Stone Service", "Quarterly check", "$150.00", "Quarterly", "Quoted"],
  ["Pest control", "Shield Pest", "Seasonal treatment", "$125.00", "Quarterly", "Chosen"],
  ["Cleaning", "Ready Turnovers", "STR turnover clean", "$200.00", "Per stay", "Chosen"],
];

const demoViewCopy = {
  today: "Sample data: nothing here belongs to a real guest or property.",
  week: "Sample data: Week lets you see the same complete guest workflow ahead of time.",
  upcoming: "Sample data: Upcoming shows the next stays in the same full dashboard template.",
  calendar: "Sample data: Calendar is a real calendar view. Private reservations will replace these sample bars after connection.",
  completed: "Sample data: completed stays appear only after every main checklist item is checked.",
  resources: "Sample data: copy a playbook message or explore the fictional service-quote library below.",
};

const state = {
  config: {
    businessName: defaultConfig.businessName || "Maple Stay Co.",
    propertyName: defaultConfig.propertyName || "The Maple House",
    timezone: defaultConfig.timezone || "America/New_York",
  },
  stays: freshDemoStays(),
  flags: freshDemoFlags(),
  activeView: "today",
  calendarDate: new Date(Date.UTC(2026, 6, 1)),
  live: false,
  metrics: {
    occupancy: 67,
    rate: "$247",
    market: "64%",
    rateCopy: "sample recommended rate",
    marketCopy: "sample market context",
  },
  status: "",
};

const $ = (selector) => document.querySelector(selector);

function freshDemoStays() {
  return demoStays.map((stay) => ({
    ...stay,
    mentioned: [...stay.mentioned],
    done: [...stay.done],
    priming: [...stay.priming],
    reviews: [...stay.reviews],
  }));
}

function freshDemoFlags() {
  return demoFlags.map((flag) => ({ ...flag, resolved: false }));
}

function normaliseStay(stay) {
  return {
    id: stay.id || stay.reservationId || `private-${stay.guest || Date.now()}`,
    guest: stay.guest || "Private guest",
    channel: stay.channel || "Stay",
    checkIn: stay.checkIn || "",
    checkOut: stay.checkOut || "",
    dates: stay.dates || "Dates to be confirmed",
    nights: stay.nights || "0 nights",
    party: stay.party || "Guest details to be confirmed",
    occasion: stay.occasion || "Stay details",
    mentioned: Array.isArray(stay.mentioned) ? stay.mentioned : [],
    prepItems: stay.prepItems || "",
    personalTouches: stay.personalTouches || "",
    done: checklist.map((_, index) => Boolean(stay.done?.[index])),
    priming: primingSteps.map((_, index) => Boolean(stay.priming?.[index])),
    reviews: reviewSteps.map((_, index) => Boolean(stay.reviews?.[index])),
  };
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[character]));
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

function dateFromIso(value) {
  return new Date(`${value}T00:00:00Z`);
}

function differenceInDays(from, to) {
  return Math.round((to.getTime() - from.getTime()) / 86400000);
}

function setStatus(message) {
  state.status = message;
  $("#demo-view-status").textContent = message;
}

function emitMutation(detail) {
  if (!state.live) return;
  window.dispatchEvent(new CustomEvent("str-mission-control:mutation", { detail }));
}

function renderFlags() {
  const openFlags = state.flags.filter((flag) => !flag.resolved);
  $("#flag-list").innerHTML = openFlags.map((flag) => `
    <article class="flag-card ${esc(flag.kind)}">
      <p class="eyebrow">${esc(flag.label)}</p>
      <h4>${esc(flag.title)}</h4>
      <p>${esc(flag.detail)}</p>
      <button class="resolve-flag" type="button" data-resolve-flag="${esc(flag.id)}">Resolve</button>
    </article>`).join("");
  $("#no-flags").classList.toggle("hidden", openFlags.length !== 0);
}

function outstandingItems() {
  return state.stays
    .map((stay) => {
      const remaining = [];
      checklist.forEach((label, index) => { if (!stay.done[index]) remaining.push(label); });
      if (!stay.priming.every(Boolean)) remaining.push("5-star priming");
      if (!stay.reviews.every(Boolean)) remaining.push("review follow-through");
      return { stay, remaining };
    })
    .filter(({ remaining }) => remaining.length)
    .sort((a, b) => b.remaining.length - a.remaining.length)
    .slice(0, 6);
}

function renderOutstanding() {
  const items = outstandingItems();
  $("#outstanding-count").textContent = state.live ? `${items.length} stays` : "Sample";
  $("#outstanding-list").innerHTML = items.map(({ stay, remaining }) => `
    <li><div><strong>${esc(stay.guest)}</strong><p>${esc(remaining.slice(0, 2).join(" · "))}${remaining.length > 2 ? " + more" : ""}</p></div><span class="count">${remaining.length} left</span></li>`).join("")
    || "<li><div><strong>All clear</strong><p>No unfinished workflow items.</p></div></li>";
}

function renderWorkflowSteps(steps, completedSteps, workflow, stayIndex) {
  return steps.map((label, stepIndex) => {
    const complete = completedSteps[stepIndex];
    const nextArrow = stepIndex < steps.length - 1 ? '<span class="workflow-arrow" aria-hidden="true">→</span>' : "";
    return `<button class="workflow-step ${complete ? "done" : ""}" type="button" data-stay="${stayIndex}" data-${workflow}="${stepIndex}">${complete ? "✓ " : ""}${esc(label)}</button>${nextArrow}`;
  }).join("");
}

function renderGuestOps() {
  const viewLabels = { today: "Today", week: "This week", upcoming: "Upcoming", completed: "Completed" };
  const visibleStays = state.activeView === "completed"
    ? state.stays.filter((stay) => stay.done.every(Boolean))
    : state.stays;
  return `
    <div class="section-heading">
      <div><p class="eyebrow">${esc(viewLabels[state.activeView] || "Today")}</p><h3>Guest ops</h3></div>
      <span class="count">${visibleStays.length} stays</span>
    </div>
    <div class="stay-list">
      ${visibleStays.map((stay) => renderStay(stay, state.stays.indexOf(stay))).join("") || "<p class=\"small-copy\">No sample checklists are complete yet. Try checking every box on one stay.</p>"}
    </div>`;
}

function renderStay(stay, stayIndex) {
  const complete = stay.done.filter(Boolean).length;
  const items = checklist.map((label, itemIndex) => `
    <button class="task ${stay.done[itemIndex] ? "done" : ""}" type="button" data-stay="${stayIndex}" data-task="${itemIndex}">
      <span>${stay.done[itemIndex] ? "✓" : ""}</span>${esc(label)}
    </button>`).join("");
  const mentioned = stay.mentioned.map((tag) => `<span class="mention-tag">${esc(tag)}</span>`).join("");
  return `<article class="stay-card">
    <div class="stay-head">
      <div>
        <div class="stay-name"><h4>${esc(stay.guest)}</h4><span class="channel-badge">${esc(stay.channel)}</span></div>
        <p>${esc(stay.party)}</p>
      </div>
      <div class="stay-timing"><p>${esc(stay.dates)} · ${esc(stay.nights)}</p><span class="count">${complete}/${checklist.length} done</span></div>
    </div>
    <div class="mentioned-row"><span class="workflow-label">Mentioned:</span><div class="mention-tags">${mentioned || "<span class=\"small-copy\">Nothing noted yet</span>"}</div></div>
    <p class="occasion-line">✨ <strong>${esc(stay.occasion)}</strong></p>
    <div class="task-row">${items}</div>
    <label class="guest-note"><span>🛏 <strong>Prep items</strong></span><input type="text" data-stay="${stayIndex}" data-note="prepItems" aria-label="Prep items for ${esc(stay.guest)}" value="${esc(stay.prepItems)}" /></label>
    <label class="guest-note"><span>📝 <strong>Personal touches</strong></span><input type="text" data-stay="${stayIndex}" data-note="personalTouches" aria-label="Personal touches for ${esc(stay.guest)}" value="${esc(stay.personalTouches)}" /></label>
    <div class="workflow-row"><span class="workflow-label">5★ Priming</span><div class="workflow-steps">${renderWorkflowSteps(primingSteps, stay.priming, "priming", stayIndex)}</div></div>
    <div class="workflow-row"><span class="workflow-label">Reviews</span><div class="workflow-steps">${renderWorkflowSteps(reviewSteps, stay.reviews, "review", stayIndex)}</div></div>
  </article>`;
}

function calendarSegments(year, month) {
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  const gridStart = new Date(firstOfMonth);
  gridStart.setUTCDate(1 - firstOfMonth.getUTCDay());
  const gridEnd = new Date(gridStart);
  gridEnd.setUTCDate(gridStart.getUTCDate() + 42);
  const segments = [];

  state.stays.forEach((stay, index) => {
    if (!stay.checkIn || !stay.checkOut) return;
    let cursor = dateFromIso(stay.checkIn);
    const stop = dateFromIso(stay.checkOut);
    if (cursor < gridStart) cursor = new Date(gridStart);
    while (cursor < stop && cursor < gridEnd) {
      const offset = differenceInDays(gridStart, cursor);
      const week = Math.floor(offset / 7);
      const endOfWeek = new Date(gridStart);
      endOfWeek.setUTCDate(gridStart.getUTCDate() + ((week + 1) * 7));
      const segmentEnd = stop < endOfWeek ? stop : endOfWeek;
      const span = differenceInDays(cursor, segmentEnd);
      if (span > 0) segments.push({ stay, index, week, column: cursor.getUTCDay() + 1, span, lane: index % 3 });
      cursor = new Date(segmentEnd);
    }
  });
  return { firstOfMonth, gridStart, segments };
}

function renderCalendar() {
  const year = state.calendarDate.getUTCFullYear();
  const month = state.calendarDate.getUTCMonth();
  const { firstOfMonth, gridStart, segments } = calendarSegments(year, month);
  const days = Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setUTCDate(gridStart.getUTCDate() + index);
    const inside = day.getUTCMonth() === month;
    const today = day.toISOString().slice(0, 10) === "2026-07-20";
    return `<div class="calendar-day ${inside ? "" : "outside-month"} ${today ? "calendar-today" : ""}"><span>${day.getUTCDate()}</span></div>`;
  }).join("");
  const bars = segments.map(({ stay, index, week, column, span, lane }) => `
    <button class="calendar-event event-${index % 3}" type="button" style="grid-column:${column} / span ${span};grid-row:${week + 1};margin-top:${30 + (lane * 21)}px" data-calendar-stay="${index}" title="${esc(stay.guest)} · ${esc(stay.dates)}">${esc(stay.guest)}</button>`).join("");
  return `
    <div class="calendar-header">
      <div><p class="eyebrow">Sample schedule</p><h3>${formatMonth(firstOfMonth)}</h3></div>
      <div class="calendar-nav"><button class="toolbar-button" type="button" data-calendar-shift="-1" aria-label="Previous month">←</button><button class="toolbar-button" type="button" data-calendar-today>Today</button><button class="toolbar-button" type="button" data-calendar-shift="1" aria-label="Next month">→</button></div>
    </div>
    <div class="calendar-shell" aria-label="Reservation calendar for ${formatMonth(firstOfMonth)}">
      <div class="calendar-weekdays"><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span></div>
      <div class="calendar-grid-days">${days}</div>
      <div class="calendar-bars">${bars}</div>
    </div>
    <p class="small-copy">In a connected private dashboard, reservation bars come from Hospitable. PriceLabs nightly rates can be added after its optional Customer API is connected.</p>`;
}

function renderResources() {
  const cards = resourceCards.map((card, index) => `
    <article class="resource-card">
      <div class="resource-heading"><div><h3>${esc(card.title)}</h3><p>${esc(card.timing)}</p></div><button class="text-button copy-resource" type="button" data-copy-resource="${index}">Copy</button></div>
      <pre>${esc(card.copy)}</pre>
      <p class="small-copy">${esc(card.note)}</p>
    </article>`).join("");
  const rows = vendorQuotes.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("");
  return `
    <section class="resources-view">
      <div class="section-heading resources-title"><div><p class="eyebrow">5★ Priming playbook</p><h3>Five guest-care messages</h3></div><span class="count">5 messages</span></div>
      <article class="strategy-card"><p class="eyebrow">The idea</p><p>Use a few kind, well-timed messages across the stay: check in early, make checkout simple, ask for private feedback after departure, and offer a thoughtful reason to return. Make every message sound like you.</p></article>
      <div class="resource-card-grid">${cards}</div>
      <div class="service-library-heading"><div><p class="eyebrow">Service quotes library</p><h3>Your vendor options in one place</h3></div><div class="service-library-actions"><input type="search" id="vendor-filter" placeholder="Filter sample vendors…" /><button class="toolbar-button" type="button" data-reset-vendors>Refresh sample list</button></div></div>
      <div class="vendor-table-wrap"><table class="vendor-table"><thead><tr><th>Category</th><th>Provider</th><th>Sub-service</th><th>Quote amount</th><th>Frequency</th><th>Status</th></tr></thead><tbody id="vendor-table-body">${rows}</tbody></table></div>
      <p class="small-copy">Every company, price, and status in this table is fictional. A private live version can connect your own secure spreadsheet later.</p>
    </section>`;
}

function renderMainView() {
  const resources = state.activeView === "resources";
  $("#dashboard-grid").classList.toggle("single-column", resources);
  $("#side-panel").classList.toggle("hidden", resources);
  if (resources) $("#main-view").innerHTML = renderResources();
  else if (state.activeView === "calendar") $("#main-view").innerHTML = renderCalendar();
  else $("#main-view").innerHTML = renderGuestOps();
}

function renderMetrics() {
  const occupancy = Math.max(0, Math.min(100, Number(state.metrics.occupancy) || 0));
  $("#occupancy-number").textContent = `${Math.round(occupancy)}%`;
  $("#occupancy-bar").style.width = `${occupancy}%`;
  $("#occupancy-copy").textContent = state.live
    ? "Booked nights divided by available nights for the next 30 days."
    : "Sample number only. A private dashboard calculates this from Hospitable reservations.";
  $("#rate-number").textContent = state.metrics.rate || "—";
  $("#market-number").textContent = state.metrics.market || "—";
  $("#rate-copy").textContent = state.metrics.rateCopy || "PriceLabs connection not added";
  $("#market-copy").textContent = state.metrics.marketCopy || "market context unavailable";
}

function renderDashboard() {
  $("#dashboard-business").textContent = state.config.businessName;
  $("#dashboard-title").textContent = `${state.config.propertyName} · Mission Control`;
  $("#data-pill").textContent = state.live ? "● Private live data" : "● Sample data";
  $("#data-pill").classList.toggle("live-data-pill", state.live);
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
  });
  renderMainView();
  renderOutstanding();
  renderFlags();
  renderMetrics();
  if (!state.status) setStatus(state.live ? "Private live data connected. Sync and Refresh ask only your private Worker." : demoViewCopy[state.activeView]);
}

function resetDemo() {
  state.stays = freshDemoStays();
  state.flags = freshDemoFlags();
  state.live = false;
  state.metrics = { occupancy: 67, rate: "$247", market: "64%", rateCopy: "sample recommended rate", marketCopy: "sample market context" };
  state.status = "";
  renderDashboard();
}

function filterVendors(value) {
  const query = value.trim().toLowerCase();
  const rows = vendorQuotes.filter((row) => row.join(" ").toLowerCase().includes(query));
  const body = $("#vendor-table-body");
  if (!body) return;
  body.innerHTML = rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")
    || "<tr><td colspan=\"6\">No sample vendors match that search.</td></tr>";
}

$("#try-demo").onclick = () => {
  $("#dashboard").classList.remove("hidden");
  $("#live-setup").classList.add("hidden");
  $("#dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
  state.status = "";
  renderDashboard();
};

$("#open-live-setup").onclick = () => {
  $("#dashboard").classList.remove("hidden");
  $("#live-setup").classList.remove("hidden");
  $("#live-setup").scrollIntoView({ behavior: "smooth", block: "start" });
  renderDashboard();
};

document.querySelectorAll("[data-view]").forEach((button) => {
  button.onclick = () => {
    state.activeView = button.dataset.view;
    state.status = "";
    renderDashboard();
  };
});

$("#main-view").addEventListener("click", async (event) => {
  const task = event.target.closest("[data-task]");
  if (task) {
    const stay = state.stays[Number(task.dataset.stay)];
    const index = Number(task.dataset.task);
    stay.done[index] = !stay.done[index];
    state.status = "";
    renderDashboard();
    emitMutation({ type: "workflow", stayId: stay.id, field: "done", index, value: stay.done[index] });
    return;
  }
  const priming = event.target.closest("[data-priming]");
  if (priming) {
    const stay = state.stays[Number(priming.dataset.stay)];
    const index = Number(priming.dataset.priming);
    stay.priming[index] = !stay.priming[index];
    state.status = "";
    renderDashboard();
    emitMutation({ type: "workflow", stayId: stay.id, field: "priming", index, value: stay.priming[index] });
    return;
  }
  const review = event.target.closest("[data-review]");
  if (review) {
    const stay = state.stays[Number(review.dataset.stay)];
    const index = Number(review.dataset.review);
    stay.reviews[index] = !stay.reviews[index];
    state.status = "";
    renderDashboard();
    emitMutation({ type: "workflow", stayId: stay.id, field: "reviews", index, value: stay.reviews[index] });
    return;
  }
  const copy = event.target.closest("[data-copy-resource]");
  if (copy) {
    const resource = resourceCards[Number(copy.dataset.copyResource)];
    await navigator.clipboard.writeText(resource.copy);
    setStatus(`Copied the sample “${resource.title}” message. Edit it to sound like you before using it.`);
    return;
  }
  const shift = event.target.closest("[data-calendar-shift]");
  if (shift) {
    state.calendarDate.setUTCMonth(state.calendarDate.getUTCMonth() + Number(shift.dataset.calendarShift));
    state.status = "";
    renderDashboard();
    return;
  }
  if (event.target.closest("[data-calendar-today]")) {
    state.calendarDate = new Date(Date.UTC(2026, 6, 1));
    state.status = "";
    renderDashboard();
    return;
  }
  if (event.target.closest("[data-reset-vendors]")) {
    const filter = $("#vendor-filter");
    if (filter) filter.value = "";
    filterVendors("");
    setStatus("Sample vendor list refreshed. No external sheet was contacted.");
  }
});

$("#main-view").addEventListener("input", (event) => {
  const note = event.target.closest("[data-note]");
  if (note) {
    const stay = state.stays[Number(note.dataset.stay)];
    stay[note.dataset.note] = note.value;
    setStatus(state.live ? "Saving your private note…" : "Sample note saved in this browser only. Refresh to reset it.");
    emitMutation({ type: "note", stayId: stay.id, field: note.dataset.note, value: note.value });
    return;
  }
  if (event.target.matches("#vendor-filter")) filterVendors(event.target.value);
});

$("#sync-demo").onclick = () => {
  if (state.live) {
    window.dispatchEvent(new Event("str-mission-control:refresh"));
    return;
  }
  setStatus("Sample sync complete. Nothing left this browser and no real account was contacted.");
};

$("#refresh-demo").onclick = () => {
  if (state.live) {
    window.dispatchEvent(new Event("str-mission-control:refresh"));
    return;
  }
  resetDemo();
  setStatus("Sample refreshed. The original pretend data is back.");
};

$("#add-flag").onclick = () => {
  $("#add-flag-form").classList.remove("hidden");
  $("#new-flag-title").focus();
};

$("#cancel-flag").onclick = () => {
  $("#add-flag-form").reset();
  $("#add-flag-form").classList.add("hidden");
};

$("#add-flag-form").onsubmit = (event) => {
  event.preventDefault();
  const title = $("#new-flag-title").value.trim();
  if (!title) return;
  const flag = {
    id: `${state.live ? "private" : "sample"}-flag-${Date.now()}`,
    kind: "warm",
    label: state.live ? "Manual flag" : "Manual flag · sample",
    title,
    detail: state.live ? "Private team flag." : "This sample flag exists only in this browser tab. Refresh to remove it.",
    resolved: false,
  };
  state.flags.push(flag);
  $("#add-flag-form").reset();
  $("#add-flag-form").classList.add("hidden");
  renderFlags();
  setStatus(state.live ? "Saving your private flag…" : "Sample flag added. No real account, task, or message changed.");
  emitMutation({ type: "flag-create", flag });
};

$("#flag-list").onclick = (event) => {
  const button = event.target.closest("[data-resolve-flag]");
  if (!button) return;
  const flag = state.flags.find((item) => item.id === button.dataset.resolveFlag);
  if (!flag) return;
  flag.resolved = true;
  renderFlags();
  setStatus(state.live ? "Saving the resolved private flag…" : "Sample flag resolved in this browser only.");
  emitMutation({ type: "flag-resolve", flagId: flag.id });
};

window.STR_MISSION_CONTROL = {
  replaceDashboardData(payload) {
    if (!payload || typeof payload !== "object") return;
    if (Array.isArray(payload.stays)) state.stays = payload.stays.map(normaliseStay);
    if (Array.isArray(payload.flags)) state.flags = payload.flags.map((flag, index) => ({
      id: flag.id || `private-flag-${index}`,
      kind: flag.kind === "alert" ? "alert" : "warm",
      label: flag.label || "Private flag",
      title: flag.title || "Needs attention",
      detail: flag.detail || "",
      resolved: Boolean(flag.resolved),
    }));
    if (payload.businessName) state.config.businessName = payload.businessName;
    if (payload.propertyName) state.config.propertyName = payload.propertyName;
    if (payload.metrics) state.metrics = { ...state.metrics, ...payload.metrics };
    state.status = "";
    renderDashboard();
  },
  setLiveMode(enabled) {
    state.live = Boolean(enabled);
    $("#disconnect-live").classList.toggle("hidden", !state.live);
    state.status = "";
    renderDashboard();
  },
  setStatus,
  resetDemo,
};

renderDashboard();
