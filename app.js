const defaultConfig = window.STR_MISSION_CONTROL_CONFIG || {};

const demoStays = [
  {
    guest: "Jordan Blake",
    channel: "Airbnb",
    dates: "Today → Sun",
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
    guest: "Priya Raman",
    channel: "Airbnb",
    dates: "Tomorrow → Mon",
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
    guest: "Sam Okafor",
    channel: "Airbnb",
    dates: "Fri → Tue",
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
];

const primingSteps = ["Check-up · day 1", "Pre-checkout", "Post-checkout", "Friends & family offer"];
const reviewSteps = ["Guest review", "Host review", "Response"];

function freshDemoStays() {
  return demoStays.map((stay) => ({
    ...stay,
    done: [...stay.done],
    priming: [...stay.priming],
    reviews: [...stay.reviews],
  }));
}

function normaliseStay(stay) {
  return {
    guest: stay.guest || "Demo guest",
    channel: stay.channel || "Stay",
    dates: stay.dates || "Dates to be confirmed",
    nights: stay.nights || "0 nights",
    party: stay.party || "Guest details to be confirmed",
    occasion: stay.occasion || "Stay details",
    mentioned: Array.isArray(stay.mentioned) ? stay.mentioned : [],
    prepItems: stay.prepItems || "",
    personalTouches: stay.personalTouches || "",
    done: Array.isArray(stay.done) ? stay.done : [],
    priming: Array.isArray(stay.priming) ? stay.priming : [],
    reviews: Array.isArray(stay.reviews) ? stay.reviews : [],
  };
}

const demoFlags = [
  {
    id: "hot-tub",
    kind: "alert",
    label: "Guest report · auto-detected demo",
    title: "Guest report: hot tub is cold",
    detail: "This shows the kind of flag a private dashboard could create after a guest mentions an issue.",
  },
  {
    id: "supplies",
    kind: "warm",
    label: "Supply reorder · manual demo",
    title: "Restock paper towels + coffee pods",
    detail: "This is a made-up manual supply flag. It stays in this browser until you resolve or refresh it.",
  },
];

const demoViewCopy = {
  today: "Demo view: Today. Sync and Refresh use pretend data only.",
  week: "Demo view: Week. In a real dashboard, this groups arrivals, tasks, and reviews by week.",
  upcoming: "Demo view: Upcoming. In a real dashboard, this shows the next arrivals from Hospitable.",
  calendar: "Demo view: Calendar. The real calendar is built from private reservation data.",
  completed: "Demo view: Completed. Only fully finished pretend checklists appear below.",
  resources: "Demo view: Resources. A real dashboard can link your private house manual, vendor list, and team playbooks.",
};

const state = {
  config: {
    businessName: defaultConfig.businessName || "Maple Stay Co.",
    propertyName: defaultConfig.propertyName || "The Maple House",
    modules: {
      guestOps: true,
      occupancy: true,
      reviews: true,
      maintenance: true,
      revenue: true,
      ...defaultConfig.modules,
    },
    checklist: defaultConfig.checklist || [
      "Guest needs confirmed",
      "House rules confirmed",
      "Pet details confirmed",
      "Personal touch planned",
      "Pre-arrival message scheduled",
      "Arrival prep complete",
    ],
  },
  stays: freshDemoStays(),
  flags: demoFlags.map((flag) => ({ ...flag, resolved: false })),
  activeView: "today",
};

const $ = (selector) => document.querySelector(selector);

function show(selector) {
  $(selector).classList.remove("hidden");
  $(selector).scrollIntoView({ behavior: "smooth", block: "start" });
}

function hide(selector) {
  $(selector).classList.add("hidden");
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[character]));
}

function syncConfigFromForm() {
  state.config.businessName = $("#business-name").value.trim() || "My Stay Company";
  state.config.propertyName = $("#property-name").value.trim() || "My First Property";
  document.querySelectorAll("[data-module]").forEach((input) => {
    state.config.modules[input.dataset.module] = input.checked;
  });
}

function applyModules() {
  const map = {
    guestOps: "#guest-ops-module",
    occupancy: "#occupancy-module",
    reviews: "#reviews-module",
    maintenance: ["#outstanding-module", "#maintenance-module"],
    revenue: "#revenue-module",
  };
  Object.entries(map).forEach(([key, selectors]) => {
    (Array.isArray(selectors) ? selectors : [selectors]).forEach((selector) => {
      $(selector).classList.toggle("hidden", !state.config.modules[key]);
    });
  });
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

function renderWorkflowSteps(steps, completedSteps, workflow, stayIndex) {
  return steps.map((label, stepIndex) => {
    const complete = completedSteps[stepIndex];
    const nextArrow = stepIndex < steps.length - 1 ? '<span class="workflow-arrow" aria-hidden="true">→</span>' : "";
    return `<button class="workflow-step ${complete ? "done" : ""}" type="button" data-stay="${stayIndex}" data-${workflow}="${stepIndex}">${complete ? "✓ " : ""}${esc(label)}</button>${nextArrow}`;
  }).join("");
}

function renderDashboard() {
  $("#dashboard-business").textContent = state.config.businessName;
  $("#dashboard-title").textContent = `${state.config.propertyName} · Mission Control`;
  $("#stay-count").textContent = `${state.stays.length} stays`;

  const visibleStays = state.activeView === "completed"
    ? state.stays.filter((stay) => stay.done.every(Boolean))
    : state.stays;

  $("#stay-list").innerHTML = visibleStays.map((stay) => {
    const stayIndex = state.stays.indexOf(stay);
    const complete = stay.done.filter(Boolean).length;
    const items = state.config.checklist.map((label, itemIndex) => `
      <button class="task ${stay.done[itemIndex] ? "done" : ""}" data-stay="${stayIndex}" data-task="${itemIndex}">
        <span>${stay.done[itemIndex] ? "✓" : ""}</span>${esc(label)}
      </button>`).join("");
    const mentioned = stay.mentioned.map((tag) => `<span class="mention-tag">${esc(tag)}</span>`).join("");
    return `<article class="stay-card">
      <div class="stay-head">
        <div>
          <div class="stay-name"><h4>${esc(stay.guest)}</h4><span class="channel-badge">${esc(stay.channel)}</span></div>
          <p>${esc(stay.party)}</p>
        </div>
        <div class="stay-timing"><p>${esc(stay.dates)} · ${esc(stay.nights)}</p><span class="count">${complete}/${state.config.checklist.length} done</span></div>
      </div>
      <div class="mentioned-row"><span class="workflow-label">Mentioned:</span><div class="mention-tags">${mentioned}</div></div>
      <p class="occasion-line">✨ <strong>${esc(stay.occasion)}</strong></p>
      <div class="task-row">${items}</div>
      <label class="guest-note"><span>🛏 <strong>Prep items</strong></span><input type="text" data-stay="${stayIndex}" data-note="prepItems" aria-label="Prep items for ${esc(stay.guest)}" value="${esc(stay.prepItems)}" /></label>
      <label class="guest-note"><span>📝 <strong>Personal touches</strong></span><input type="text" data-stay="${stayIndex}" data-note="personalTouches" aria-label="Personal touches for ${esc(stay.guest)}" value="${esc(stay.personalTouches)}" /></label>
      <div class="workflow-row"><span class="workflow-label">5★ Priming</span><div class="workflow-steps">${renderWorkflowSteps(primingSteps, stay.priming, "priming", stayIndex)}</div></div>
      <div class="workflow-row"><span class="workflow-label">Reviews</span><div class="workflow-steps">${renderWorkflowSteps(reviewSteps, stay.reviews, "review", stayIndex)}</div></div>
    </article>`;
  }).join("") || "<p class=\"small-copy\">No pretend checklists are complete yet. Try checking every box on one stay.</p>";
  $("#demo-view-status").textContent = demoViewCopy[state.activeView];
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
  });
  renderFlags();
  applyModules();
}

function downloadConfig() {
  syncConfigFromForm();
  const config = {
    businessName: state.config.businessName,
    propertyName: state.config.propertyName,
    timezone: defaultConfig.timezone || "America/New_York",
    theme: defaultConfig.theme || "linen",
    privateApiUrl: "",
    modules: state.config.modules,
    checklist: state.config.checklist,
  };
  const code = `window.STR_MISSION_CONTROL_CONFIG = ${JSON.stringify(config, null, 2)};\n`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
  link.download = "config.js";
  link.click();
  URL.revokeObjectURL(link.href);
}

function builderPrompt() {
  const cards = Object.entries(state.config.modules).filter(([, enabled]) => enabled).map(([name]) => name).join(", ");
  return `Set up the downloaded STR Mission Control starter as a private dashboard for "${state.config.propertyName}" at ${state.config.businessName}. This is a configuration and private-integration task, NOT a UI-generation task.

Use this configuration:
- Modules: ${cards}
- Guest checklist: ${state.config.checklist.join("; ")}

Non-negotiable design lock:
- Do not redesign, replace, move, or restyle the dashboard.
- Do not edit index.html, style.css, or app.js. They are the exact STR Mission Control design and core behavior.
- Keep the guest-card order, typography, warm linen palette, tabs, card spacing, Mentioned tags, Prep items, Personal touches, 5-star Priming, Reviews, Outstanding, and Flags exactly as they are.
- Only edit config.js, live-data-adapter.js, and files inside a new worker/ folder. Use config.js to show or hide the selected existing cards; do not create substitute cards.
- Run node scripts/check-design-lock.mjs before handing back the completed dashboard. If it fails, restore the locked file instead of changing the design.

Must include these default operating controls:
- Six guest-priming tasks: guest needs, house rules, pet details, personal touch, pre-arrival message, and arrival preparation.
- A richer guest card: a clearly labelled Mentioned tag row, an editable Prep items line, an editable Personal touches line for future reference, a 5-star priming flow (check-up day 1, pre-checkout, post-checkout, friends-and-family offer), and a three-step Reviews flow (guest review, host review, response). In the demo, use only fictional examples and browser-only edits; in production, save this shared work securely on the server.
- A review workflow for guest-review reminder, host review, and public response.
- An Outstanding list that shows fake unfinished work with remaining counts.
- A Flags area with a manual Add action, a fake auto-detected guest issue, a fake manual supply-reorder flag, and Resolve actions. Do not send a real guest message or create a live provider action until the host has privately connected their own account.
- View tabs: Today, Week, Upcoming, Calendar, Completed, and Resources.
- Sync and Refresh buttons. In the demo they must clearly use fake data; in production they must call a secure server-side source.
- Actual property occupancy calculated from Hospitable reservation nights divided by available nights.
- A PriceLabs section for private dynamic-rate data and market context. Use the PriceLabs Customer API for a deployed dashboard, and use PriceLabs MCP for separately authorized AI-assisted analysis or actions. Never expose either provider's key in browser code.

Start with the existing fake-data demo. Then explain, in child-friendly numbered steps, how to connect a real Hospitable property through a private Cloudflare Worker. Put all Hospitable and PriceLabs keys, webhook secrets, guest contact information, door codes, and Wi-Fi details in the private Worker or its secret store—never config.js, live-data-adapter.js, browser code, or Git. Use shared server-side state for checklist updates and notes.`;
}

$("#try-demo").onclick = () => {
  hide("#builder");
  show("#dashboard");
  show("#next-step");
  renderDashboard();
};

$("#build-mine").onclick = () => show("#builder");

$("#builder-form").onsubmit = (event) => {
  event.preventDefault();
  syncConfigFromForm();
  renderDashboard();
  show("#dashboard");
  show("#next-step");
};

$("#download-config").onclick = downloadConfig;

$("#edit-choices").onclick = () => show("#builder");

$("#copy-prompt").onclick = async () => {
  await navigator.clipboard.writeText(builderPrompt());
  $("#copy-status").textContent = "Copied. Paste it into your preferred AI builder only when you are ready to add a private data connection.";
};

$("#stay-list").onclick = (event) => {
  const button = event.target.closest("[data-task]");
  if (!button) return;
  const stay = state.stays[Number(button.dataset.stay)];
  const task = Number(button.dataset.task);
  stay.done[task] = !stay.done[task];
  renderDashboard();
};

$("#stay-list").addEventListener("click", (event) => {
  const primingButton = event.target.closest("[data-priming]");
  if (primingButton) {
    const stay = state.stays[Number(primingButton.dataset.stay)];
    const step = Number(primingButton.dataset.priming);
    stay.priming[step] = !stay.priming[step];
    renderDashboard();
    return;
  }
  const reviewButton = event.target.closest("[data-review]");
  if (reviewButton) {
    const stay = state.stays[Number(reviewButton.dataset.stay)];
    const step = Number(reviewButton.dataset.review);
    stay.reviews[step] = !stay.reviews[step];
    renderDashboard();
  }
});

$("#stay-list").addEventListener("input", (event) => {
  const note = event.target.closest("[data-note]");
  if (!note) return;
  const stay = state.stays[Number(note.dataset.stay)];
  stay[note.dataset.note] = note.value;
  $("#demo-view-status").textContent = "Pretend note saved in this browser only. A private dashboard would save it for the whole team.";
});

document.querySelectorAll("[data-view]").forEach((button) => {
  button.onclick = () => {
    state.activeView = button.dataset.view;
    renderDashboard();
  };
});

$("#sync-demo").onclick = () => {
  $("#demo-view-status").textContent = "Demo sync complete. Nothing left this browser and no real account was contacted.";
};

$("#refresh-demo").onclick = () => {
  state.stays = freshDemoStays();
  state.flags = demoFlags.map((flag) => ({ ...flag, resolved: false }));
  state.activeView = "today";
  renderDashboard();
  $("#demo-view-status").textContent = "Demo refreshed. The original pretend data is back.";
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
  state.flags.push({
    id: `manual-${Date.now()}`,
    kind: "warm",
    label: "Manual flag · demo only",
    title,
    detail: "This pretend flag exists only in this browser tab. Refresh to remove it.",
    resolved: false,
  });
  $("#add-flag-form").reset();
  $("#add-flag-form").classList.add("hidden");
  renderFlags();
  $("#demo-view-status").textContent = "Pretend flag added. No real account, task, or message was changed.";
};

$("#flag-list").onclick = (event) => {
  const button = event.target.closest("[data-resolve-flag]");
  if (!button) return;
  const flag = state.flags.find((item) => item.id === button.dataset.resolveFlag);
  if (!flag) return;
  flag.resolved = true;
  renderFlags();
  $("#demo-view-status").textContent = "Pretend flag resolved in this browser only. No real provider was contacted.";
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
    renderDashboard();
  },
};

renderDashboard();
