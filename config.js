/*
  This is the active personalization file for your downloaded dashboard.
  It is safe to change the names, cards, and checklist below.

  Never put an API key, password, webhook secret, real guest detail, door code,
  or Wi-Fi detail in this file. A private Cloudflare Worker stores secrets.
*/

window.STR_MISSION_CONTROL_CONFIG = {
  businessName: "Maple Stay Co.",
  propertyName: "The Maple House",
  timezone: "America/New_York",
  theme: "linen",
  // Optional: a private, authenticated Worker endpoint. This URL is not a secret.
  privateApiUrl: "",
  modules: {
    guestOps: true,
    occupancy: true,
    reviews: true,
    maintenance: true,
    revenue: true,
  },
  checklist: [
    "Guest needs confirmed",
    "House rules confirmed",
    "Pet details confirmed",
    "Personal touch planned",
    "Pre-arrival message scheduled",
    "Arrival prep complete",
  ],
};
