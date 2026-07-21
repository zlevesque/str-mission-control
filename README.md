# STR Mission Control

**A complete, calm operations dashboard template for short-term-rental hosts.**

This is not a dashboard builder. It is the finished template: guest preparation, mentions, prep notes, personal touches, 5-star priming, review follow-through, repairs and supplies, Calendar, and a Resources library for playbooks and service quotes.

Every example is fictional. Your private live connection replaces the sample data; it does not recreate or redesign the dashboard.

## Try the full demo — no account or coding needed

1. Click the green **Code** button near the top of this GitHub page.
2. Click **Download ZIP**.
3. Open your Downloads folder and double-click `str-mission-control-main.zip`.
4. Open the new `str-mission-control-main` folder.
5. Double-click `index.html`.
6. Click **Try the full demo**.

Everything you see is pretend. Refresh the page for a clean sample start.

Read [Start Here](docs/START-HERE.md) if you want the very first-click walkthrough.

Want the story of how this template evolved? Read [Project Progression](docs/PROJECT-PROGRESSION.md).

## Connect one private property

When you are ready, click **Connect my live data** inside the template. The complete guide is [Live Setup](docs/LIVE-SETUP-OUTLINE.md).

The connection uses:

```text
Hospitable webhooks → private Cloudflare Worker → same Mission Control template
```

The Worker is included in this repository. It stores only the small dashboard fields it needs and never exposes provider keys to the browser.

You may use a coding helper for Worker installation. Read [Using a coding helper safely](docs/PRIVATE-SETUP.md) first: the helper can run normal setup commands, but you personally handle Cloudflare sign-in, approval, and every secret value.

## Optional PriceLabs connection

Hospitable provides your real stays and booked occupancy. PriceLabs can add optional pricing context such as next-30-day rate guidance.

Use the PriceLabs **Customer API** behind the private Worker. Its **MCP connector** is a separate optional connection for AI-assisted analysis; it is not needed to run this dashboard. Read [AI Tools and PriceLabs](docs/AI-TOOLS-AND-PRICELABS.md).

## The exact design stays intact

`index.html`, `style.css`, and `app.js` are the finished STR Mission Control experience. They are protected by a design lock.

The live connection belongs in `worker/`. After installation, run:

```text
node scripts/check-design-lock.mjs
```

If it says a design-locked file changed, restore that file. The Worker should never need to redesign your dashboard.

## Repository layout

```text
.
├── index.html                    # Complete sample dashboard
├── app.js                        # Protected dashboard behavior
├── style.css                     # Protected dashboard design
├── config.js                     # Safe demo labels only; never secrets
├── live-data-adapter.js          # Browser bridge to a private Worker
├── worker/                       # Ready-to-deploy Cloudflare Worker
│   ├── README.md                 # Worker install notes
│   ├── wrangler.jsonc            # Private Worker configuration
│   └── src/index.js              # Webhook, storage, API, and private dashboard logic
└── docs/
    ├── START-HERE.md
    ├── LIVE-SETUP-OUTLINE.md
    ├── PRIVATE-SETUP.md
    ├── AI-TOOLS-AND-PRICELABS.md
    ├── DESIGN-LOCK.md
    ├── PROJECT-PROGRESSION.md
    └── SECURITY.md
```

## Safety promise

Never put real guest names, contact details, access codes, Wi-Fi information, API keys, token values, webhook URLs, or real screenshots in this public repository.

See [Security](docs/SECURITY.md) before sharing or deploying anything.

## License

MIT. See [LICENSE](LICENSE).
