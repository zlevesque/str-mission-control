/*
  STR Mission Control — your first customization file.

  Change the words between quotes. Keep real passwords, API keys, and guest
  details out of this file. This example is safe to share publicly.
*/

window.STR_MISSION_CONTROL_CONFIG = {
  businessName: "Maple Stay Co.",
  propertyName: "The Maple House",
  timezone: "America/New_York",
  theme: "linen",
  modules: {
    guestOps: true,
    occupancy: true,
    reviews: true,
    maintenance: true,
    revenue: false,
  },
  checklist: [
    "House rules confirmed",
    "Pet details confirmed",
    "Special occasion noted",
    "Arrival prep complete",
  ],
};
