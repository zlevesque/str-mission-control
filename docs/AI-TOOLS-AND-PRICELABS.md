# AI Tools and PriceLabs — choose the safe path

You can use this template with **Claude, ChatGPT, Codex, or another AI builder**. The fake-data demo and the **Copy my builder prompt** button do not require a PriceLabs connection at all.

There are two different jobs here:

1. **Building your private dashboard.** Any AI builder can help with this. Give it the copied builder prompt and your downloaded settings file.
2. **Getting live PriceLabs information into that dashboard.** This needs a private connection. It is not something to paste into a public website or an AI chat.

## Pick the row that matches you

| If you are using… | Use this for building the dashboard | Use this for live PriceLabs dashboard data | What to avoid |
| --- | --- | --- | --- |
| Claude | Paste in the builder prompt and settings. | Use the **PriceLabs Customer API** through a private Cloudflare Worker. | Do not put the Customer API key in the webpage. |
| Claude and you want to talk to PriceLabs inside Claude | Same builder prompt and settings. | The PriceLabs **MCP connector** can help with AI-assisted pricing analysis and actions. It is a separate Claude connection, not the dashboard's data pipe. | Do not treat MCP as a replacement for the private Customer API. |
| ChatGPT, Codex, or another AI tool | Paste in the same builder prompt and settings. | Use the **PriceLabs Customer API** through a private Cloudflare Worker. | Do not copy Claude-only MCP steps or paste a key into the AI chat. |

## A simple rule

**MCP helps an AI talk with PriceLabs. The Customer API helps your private dashboard show PriceLabs data.** They are different tools for different jobs.

PriceLabs currently documents its MCP connector as beta and starts with Claude. Its documentation says support for more AI clients is on the way. So, if you use ChatGPT, Codex, or another tool and do not see an official PriceLabs connector, that is expected. Build the dashboard with your preferred tool, then ask it to connect the **Customer API** behind your private Cloudflare Worker.

## Copy this sentence into your AI builder

> I am using the PriceLabs Customer API for live dashboard data. Put the API key only in my private Cloudflare Worker secret store. Do not put it in browser code, a public repository, or this chat. Label actual property occupancy as Hospitable booking occupancy, and label PriceLabs market occupancy as market context.

## If you use Claude MCP

Follow PriceLabs' own **Connect to Claude** guide. It uses a PriceLabs-provided connection URL, a client ID, and a sign-in/authorization step. Choose the least permission needed. If you only want answers and analysis, use read-only permission rather than write permission.

This is optional. You can finish the demo, choose your dashboard, and build a private version without MCP.

## Never do these things

- Never paste an API key, MCP client ID, secret, token, or password into this public repository.
- Never add a key directly to `app.js`, `config.example.js`, or browser developer tools.
- Never paste real guest details into an AI prompt just to test a dashboard.
- Never assume an unofficial connector is safe because it uses the letters “MCP.” Wait for the provider's official instructions.

## Official PriceLabs reading

- [PriceLabs developer overview](https://developers.pricelabs.co/home/overview)
- [PriceLabs Customer API overview](https://developers.pricelabs.co/customer-api/api-reference/overview)
- [PriceLabs MCP overview](https://developers.pricelabs.co/mcp/overview)
- [PriceLabs: Connect to Claude](https://developers.pricelabs.co/mcp/connect-to-claude)
