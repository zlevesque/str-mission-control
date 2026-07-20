/*
  This is the active non-secret label file for your downloaded dashboard.
  It is safe to change the example business and property names below.

  Never put an API key, password, webhook secret, real guest detail, door code,
  or Wi-Fi detail in this file. A private Cloudflare Worker stores secrets.
*/

window.STR_MISSION_CONTROL_CONFIG = {
  businessName: "Maple Stay Co.",
  propertyName: "The Maple House",
  timezone: "America/New_York",
  theme: "linen",
  // Optional: a private Worker address. This web address is not a secret.
  privateApiUrl: "",
};
