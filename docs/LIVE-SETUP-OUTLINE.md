# Live Setup Outline

This is the production path we will turn into a screenshot-led guide. It is intentionally written before the live connector is added, so the project does not pretend that the feature already exists.

## The goal

Connect one Hospitable property to one private dashboard without putting secrets or guest-sensitive information in public code.

## The future click-by-click flow

1. **Choose your dashboard shape.** Use the demo configurator first.
2. **Create a free Cloudflare account.** Cloudflare hosts the small private worker that receives updates.
3. **Create the private data store.** The worker needs shared storage so two team members see the same checkmarks.
4. **Create private secrets.** A dashboard password, a webhook secret, and a Hospitable personal-access token. Add a PriceLabs API key only if the host chooses the PriceLabs section. These belong in Cloudflare, never GitHub.
5. **Deploy the worker.** The guide will provide a one-click or copy-and-paste command.
6. **Register the Hospitable webhook.** Hospitable sends booking, reservation-change, message, and review events to the worker.
7. **Run a safe test.** Confirm that fake data arrives before allowing the live dashboard to show it.
8. **Backfill upcoming stays.** The dashboard asks Hospitable for the first set of upcoming reservations.
9. **Open the private dashboard.** Save its password on each approved device.

## Which tool supplies which number?

Do not use one source for every number. The dashboard should label the source clearly.

| What the host sees | Correct source | Simple meaning |
| --- | --- | --- |
| Actual property occupancy | Hospitable reservation calendar | Booked nights ÷ available nights for the selected dates. |
| Arrivals, guest preparation, and review tasks | Hospitable webhooks and reservation data | What is really happening at the host's property. |
| Dynamic rates and minimum-stay guidance | PriceLabs Customer API | The private rate data that belongs in a real custom dashboard. |
| Market occupancy, RevPAR, and demand trends | PriceLabs MCP / market tools | A comparison with the wider market, not the host's actual booked occupancy. |

PriceLabs describes its **Customer API** as the option for custom dashboards and pricing workflows. Its **MCP** is for an AI assistant to query listings, analyze performance, and update pricing with natural language. Keep both connections behind the private Worker; never call PriceLabs directly from a public browser page.

Useful official reading: [PriceLabs developer overview](https://developers.pricelabs.co/home/overview) and [PriceLabs MCP market tools](https://developers.pricelabs.co/mcp/tools/market-and-insights).

## What the screenshot guide must show

- The Cloudflare account-creation screen.
- Where to create a Worker and a data store.
- Exactly where secrets are added, with fake values only.
- Hospitable's Apps → Webhooks area.
- Where a host enables their PriceLabs Customer API and adds its key to the Worker secrets area.
- Which event checkboxes to select.
- What a successful test looks like.
- The common mistakes and their calm fixes.

## Important honesty note

Exploring the demo can take five minutes. A first secure live connection may take longer because it involves accounts, private keys, and a real provider's settings. The finished guide should state that plainly instead of promising magic.
