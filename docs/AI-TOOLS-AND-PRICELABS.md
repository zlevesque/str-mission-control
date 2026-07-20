# PriceLabs, AI tools, and this dashboard

There are two different PriceLabs connections. They do different jobs.

| What you want to do | Use this | Does the dashboard need it? |
| --- | --- | --- |
| Show dynamic prices in Mission Control | PriceLabs **Customer API** through the private Cloudflare Worker | Optional |
| Ask an AI questions about pricing or market conditions | PriceLabs **AI Connector (MCP)** | No |

## The simple recommendation

For a live STR Mission Control dashboard, use the **Customer API**. The private Worker keeps the API key hidden and sends only a small pricing summary to the page.

Use MCP only if you personally want an AI assistant to help analyze PriceLabs data or make deliberate changes. MCP is not the pipe that powers the dashboard.

PriceLabs describes the Customer API as the fit for custom dashboards and automated pricing workflows, while its AI Connector is for assistants such as Claude. [PriceLabs developer overview](https://developers.pricelabs.co/home/overview)

## Customer API: the dashboard path

Follow the PriceLabs part of [Live Setup](LIVE-SETUP-OUTLINE.md). In short:

1. In PriceLabs, open **Account Settings → API Details**.
2. Click **Enable**.
3. Choose **I Need API Access**.
4. Type `API` and continue.
5. Copy the key.
6. Add it directly in Cloudflare as a **Secret** named `PRICELABS_API_KEY`.
7. Deploy the secret change.
8. Open your private dashboard, click **Find my PriceLabs listings**, select the property, then click **Use this PriceLabs listing**.

The key belongs only in Cloudflare. It never goes into browser code, `config.js`, GitHub, a screenshot, or an AI chat.

PriceLabs says Customer API calls use the `X-API-Key` request header and its listing-price endpoint returns price information for the listings you ask for. [Enable the Customer API](https://developers.pricelabs.co/customer-api/api-reference/enable-the-api) · [Get listing prices](https://developers.pricelabs.co/customer-api/api-reference/customer-api/prices/for-listings)

## MCP: optional AI assistance

PriceLabs’ MCP/AI Connector can be useful for questions such as:

- “What has changed in my market this month?”
- “Which dates have the weakest booking pace?”
- “Explain this listing’s price recommendation.”

Its current official setup is a separate authorization flow inside Claude. You find an MCP URL and Client ID in **Account Settings → AI Connector (MCP)**, then authorize PriceLabs from Claude. It can have read and/or write permissions, so choose the smallest permission level that matches the task. [PriceLabs’ Claude MCP guide](https://developers.pricelabs.co/mcp/connect-to-claude)

If you use ChatGPT, Codex, or a different AI product and do not see an official PriceLabs connector, do not work around that by pasting an API key into a chat. The dashboard still works through the Customer API in your private Worker.

## Good labels prevent bad decisions

| Label in Mission Control | What it really means |
| --- | --- |
| Booked occupancy | Your property’s booked nights divided by available nights, based on Hospitable reservations |
| PriceLabs rate | Dynamic pricing guidance from PriceLabs for your listing |
| Market context | A wider-market signal, not the occupancy of your own property |

Do not call a market number “my occupancy.” They answer different questions.
