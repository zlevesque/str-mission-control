const defaultConfig = window.STR_MISSION_CONTROL_CONFIG || {};

const state = {
  config: {
    businessName: defaultConfig.businessName || "Maple Stay Co.",
    propertyName: defaultConfig.propertyName || "The Maple House",
    modules: {
      guestOps: true,
      occupancy: true,
      reviews: true,
      maintenance: true,
      revenue: false,
      ...defaultConfig.modules,
    },
    checklist: defaultConfig.checklist || ["House rules confirmed", "Pet details confirmed", "Special occasion noted", "Arrival prep complete"],
  },
  stays: [
    { guest: "Jordan Blake", dates: "Today → Sun", occasion: "Family reunion", done: [true, true, false, false] },
    { guest: "Priya Raman", dates: "Tomorrow → Mon", occasion: "Graduation weekend", done: [true, true, true, false] },
    { guest: "Sam Okafor", dates: "Fri → Tue", occasion: "Birthday trip", done: [true, false, false, false] },
  ],
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

  $("#stay-list").innerHTML = state.stays.map((stay, stayIndex) => {
    const complete = stay.done.filter(Boolean).length;
    const items = state.config.checklist.map((label, itemIndex) => `
      <button class="task ${stay.done[itemIndex] ? "done" : ""}" data-stay="${stayIndex}" data-task="${itemIndex}">
        <span>${stay.done[itemIndex] ? "✓" : ""}</span>${esc(label)}
      </button>`).join("");
    return `<article class="stay-card">
      <div class="stay-head"><div><h4>${esc(stay.guest)}</h4><p>${esc(stay.dates)} · ${esc(stay.occasion)}</p></div><span class="count">${complete}/${state.config.checklist.length}</span></div>
      <div class="task-row">${items}</div>
    </article>`;
  }).join("");
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

$("#add-flag").onclick = () => {
  const title = window.prompt("What needs attention? This is only a demo.");
  if (!title) return;
  const item = document.createElement("li");
  item.innerHTML = `<span class="flag-dot alert"></span>${esc(title)}`;
  $("#flag-list").appendChild(item);
};

renderDashboard();
