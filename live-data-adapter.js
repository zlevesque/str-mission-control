/*
  PRIVATE-INTEGRATION WORKSPACE

  The dashboard design is intentionally not in this file. An AI setup helper
  may edit this file and create worker/ files to connect a private Cloudflare
  Worker to the existing dashboard. Do not put API keys or webhook secrets here.

  When a private Worker returns data, pass only the safe, authenticated response
  to the existing core app:

  window.STR_MISSION_CONTROL.replaceDashboardData({
    businessName: "My Stay Company",
    propertyName: "My Property",
    stays: [],
    flags: [],
  });

  The starter deliberately remains in fake-data mode until that private setup
  has been completed. This file makes no network request by default.
*/
