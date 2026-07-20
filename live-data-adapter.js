/*
  PRIVATE LIVE-DATA BRIDGE

  The dashboard design lives in index.html, style.css, and app.js. This small
  file only talks to the private Worker after the owner enters its web address
  and dashboard access code in the on-page form.

  API keys never go here. The Worker keeps provider keys in Cloudflare Secrets.
*/

(() => {
  const storedUrlKey = "str-mission-control-worker-url";
  const storedTokenKey = "str-mission-control-access-token";
  const $ = (selector) => document.querySelector(selector);
  let workerUrl = localStorage.getItem(storedUrlKey) || window.STR_MISSION_CONTROL_CONFIG?.privateApiUrl || "";
  let accessToken = sessionStorage.getItem(storedTokenKey) || "";
  let priceLabsListings = [];

  function cleanWorkerUrl(value) {
    return value.trim().replace(/\/$/, "");
  }

  function apiUrl(path) {
    return `${workerUrl}${path}`;
  }

  async function request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${accessToken}`);
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    const response = await fetch(apiUrl(path), {
      ...options,
      headers,
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || "The private Worker did not accept that request.");
    }
    return response.json();
  }

  async function refresh() {
    if (!workerUrl || !accessToken) return;
    window.STR_MISSION_CONTROL.setStatus("Refreshing your private data…");
    const payload = await request("/api/dashboard", { method: "GET" });
    window.STR_MISSION_CONTROL.replaceDashboardData(payload);
    window.STR_MISSION_CONTROL.setLiveMode(true);
    window.STR_MISSION_CONTROL.setStatus("Private live data refreshed.");
  }

  async function connect() {
    const urlInput = $("#worker-url");
    const tokenInput = $("#dashboard-access-token");
    workerUrl = cleanWorkerUrl(urlInput.value || workerUrl);
    accessToken = tokenInput.value || accessToken;
    if (!workerUrl || !accessToken) throw new Error("Add your Worker address and dashboard access code first.");
    localStorage.setItem(storedUrlKey, workerUrl);
    sessionStorage.setItem(storedTokenKey, accessToken);
    await refresh();
    $("#live-connect-status").textContent = "Connected. Your access code will disappear when this browser tab closes.";
    tokenInput.value = "";
    $("#pricing-connection").classList.remove("hidden");
  }

  async function loadPriceLabsListings() {
    const status = $("#pricing-connection-status");
    status.textContent = "Looking for the listings connected to your private PriceLabs key…";
    const payload = await request("/api/pricelabs-listings", { method: "GET" });
    priceLabsListings = Array.isArray(payload.listings) ? payload.listings : [];
    if (!priceLabsListings.length) {
      status.textContent = "No usable listings were found. Check that the Cloudflare secret is named PRICELABS_API_KEY, then try again.";
      return;
    }
    const select = $("#pricelabs-listing");
    select.replaceChildren();
    priceLabsListings.forEach((listing, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = listing.name;
      select.append(option);
    });
    $("#pricelabs-listing-label").classList.remove("hidden");
    $("#save-pricelabs-listing").classList.remove("hidden");
    status.textContent = "Choose the property you want this dashboard to show, then save it.";
  }

  async function savePriceLabsListing() {
    const index = Number($("#pricelabs-listing").value);
    const listing = priceLabsListings[index];
    if (!listing) throw new Error("Choose one PriceLabs listing first.");
    const payload = await request("/api/mutations", {
      method: "POST",
      body: JSON.stringify({ type: "pricing-listing", listingId: listing.id, pms: listing.pms }),
    });
    window.STR_MISSION_CONTROL.replaceDashboardData(payload);
    window.STR_MISSION_CONTROL.setLiveMode(true);
    $("#pricing-connection-status").textContent = "PriceLabs is connected. It may take a moment to collect the first pricing summary.";
  }

  async function sendMutation(event) {
    if (!workerUrl || !accessToken) return;
    try {
      const payload = await request("/api/mutations", { method: "POST", body: JSON.stringify(event.detail) });
      window.STR_MISSION_CONTROL.replaceDashboardData(payload);
      window.STR_MISSION_CONTROL.setStatus("Private dashboard saved for your approved team.");
    } catch (error) {
      window.STR_MISSION_CONTROL.setStatus(`Could not save that private change: ${error.message}`);
    }
  }

  $("#worker-url").value = workerUrl;

  $("#live-connect-form").onsubmit = async (event) => {
    event.preventDefault();
    try {
      await connect();
    } catch (error) {
      $("#live-connect-status").textContent = error.message;
    }
  };

  $("#disconnect-live").onclick = () => {
    sessionStorage.removeItem(storedTokenKey);
    accessToken = "";
    window.STR_MISSION_CONTROL.resetDemo();
    $("#pricing-connection").classList.add("hidden");
    $("#pricelabs-listing-label").classList.add("hidden");
    $("#save-pricelabs-listing").classList.add("hidden");
    $("#live-connect-status").textContent = "Returned to safe sample data. Your Worker address remains on this device; the access code does not.";
  };

  $("#load-pricelabs-listings").onclick = () => {
    loadPriceLabsListings().catch((error) => { $("#pricing-connection-status").textContent = error.message; });
  };

  $("#save-pricelabs-listing").onclick = () => {
    savePriceLabsListing().catch((error) => { $("#pricing-connection-status").textContent = error.message; });
  };

  if (workerUrl && accessToken) $("#pricing-connection").classList.remove("hidden");

  window.addEventListener("str-mission-control:mutation", sendMutation);
  window.addEventListener("str-mission-control:refresh", () => {
    refresh().catch((error) => window.STR_MISSION_CONTROL.setStatus(`Could not refresh private data: ${error.message}`));
  });
})();
