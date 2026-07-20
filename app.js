const defaultConfig = window.STR_MISSION_CONTROL_CONFIG || {};

const demoStays = [
  { guest: "Jordan Blake", dates: "Today → Sun", occasion: "Family reunion", done: [true, true, true, true, true, true] },
  { guest: "Priya Raman", dates: "Tomorrow → Mon", occasion: "Graduation weekend", done: [true, true, true, true, false, false] },
  { guest: "Sam Okafor", dates: "Fri → Tue", occasion: "Birthday trip", done: [true, false, true, false, true, false] },
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
  stays: demoStays.map((stay) => ({ ...stay, done: [...stay.done] })),
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
    maintenance: "#maintenance-module",
    revenue: "#revenue-module",
  };
  Object.entries(map).forEach(([key, selector]) => {
    $(selector).classList.toggle("hidden", !state.config.modules[key]);
  });
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
    return `<article class="stay-card">
      <div class="stay-head"><div><h4>${esc(stay.guest)}</h4><p>${esc(stay.dates)} · ${esc(stay.occasion)}</p></div><span class="count">${complete}/${state.config.checklist.length}</span></div>
      <div class="task-row">${items}</div>
    </article>`;
  }).join("") || "<p class=\"small-copy\">No pretend checklists are complete yet. Try checking every box on one stay.</p>";
  $("#demo-view-status").textContent = demoViewCopy[state.activeView];
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === state.activeView);
  });
  applyModules();
}

function downloadConfig() {
  syncConfigFromForm();
  const code = `window.STR_MISSION_CONTROL_CONFIG = ${JSON.stringify({ ...state.config, timezone: "America/New_York", theme: "linen" }, null, 2)};\n`;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
  link.download = "my-str-mission-control-config.js";
  link.click();
  URL.revokeObjectURL(link.href);
}

function builderPrompt() {
  const cards = Object.entries(state.config.modules).filter(([, enabled]) => enabled).map(([name]) => name).join(", ");
  return `Build a private, mobile-friendly short-term-rental operations dashboard called "${state.config.propertyName} Mission Control" for ${state.config.businessName}.

Use this configuration:
- Modules: ${cards}
- Guest checklist: ${state.config.checklist.join("; ")}
- Design: calm, warm, simple, and accessible. Avoid generic SaaS blue.

Must include these default operating controls:
- Six guest-priming tasks: guest needs, house rules, pet details, personal touch, pre-arrival message, and arrival preparation.
- A review workflow for guest-review reminder, host review, and public response.
- View tabs: Today, Week, Upcoming, Calendar, Completed, and Resources.
- Sync and Refresh buttons. In the demo they must clearly use fake data; in production they must call a secure server-side source.
- Actual property occupancy calculated from Hospitable reservation nights divided by available nights.
- A PriceLabs section for private dynamic-rate data and market context. Use the PriceLabs Customer API for a deployed dashboard, and use PriceLabs MCP only for AI-assisted analysis. Never expose either provider's key in browser code.

Start with a fake-data demo. Then explain, in child-friendly numbered steps, how to connect a real Hospitable property through a private Cloudflare Worker. Keep API keys, guest contact information, door codes, Wi-Fi details, and webhook secrets out of static files and out of Git. Use shared server-side state for checklist updates.`;
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
  $("#copy-status").textContent = "Copied. Paste it into Codex or Claude Code when you are ready to build your private version.";
};

$("#stay-list").onclick = (event) => {
  const button = event.target.closest("[data-stay]");
  if (!button) return;
  const stay = state.stays[Number(button.dataset.stay)];
  const task = Number(button.dataset.task);
  stay.done[task] = !stay.done[task];
  renderDashboard();
};

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
  state.stays = demoStays.map((stay) => ({ ...stay, done: [...stay.done] }));
  state.activeView = "today";
  renderDashboard();
  $("#demo-view-status").textContent = "Demo refreshed. The original pretend data is back.";
};

$("#add-flag").onclick = () => {
  const title = window.prompt("What needs attention? This is only a demo.");
  if (!title) return;
  const item = document.createElement("li");
  item.innerHTML = `<span class="flag-dot alert"></span>${esc(title)}`;
  $("#flag-list").appendChild(item);
};

renderDashboard();
