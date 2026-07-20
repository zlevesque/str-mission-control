# STR Mission Control

**A friendly, configurable operations dashboard starter for short-term-rental hosts.**

STR Mission Control helps a host move from "I have too many tabs open" to one calm, useful dashboard. It starts with a safe fake-data demo, then lets each host choose the cards, labels, and workflow that match their property.

## Start here — no coding required

This page is a **repository**: a public folder on the internet that holds all the project files. You do not need to understand GitHub, use a terminal, or make an account to try the demo.

### I just want to try the demo

1. Near the top of this page, click the green **Code** button.
2. Click **Download ZIP**. Your computer downloads one little package containing the project.
3. Open your **Downloads** folder and double-click `str-mission-control-main.zip`. A regular folder with the same name appears.
4. Open that new folder, then double-click **index.html**. If your computer asks which app to use, choose Chrome, Safari, or another web browser.
5. Click **Try the demo**.

That is it. The demo uses pretend names and pretend tasks; it does not connect to Hospitable or send anything anywhere. Refresh the page whenever you want a clean start.

### I want a dashboard for my property later

Start with the safe demo above. When you are ready, select **Build my dashboard**, choose your cards, and download your settings. The downloaded file stays on your computer until you choose to use it.

Read the plain-English walkthrough in [docs/START-HERE.md](docs/START-HERE.md). It starts from the very first click.

Using ChatGPT, Codex, Claude, or another AI builder? Read [docs/AI-TOOLS-AND-PRICELABS.md](docs/AI-TOOLS-AND-PRICELABS.md) before trying to connect PriceLabs. The demo and builder prompt work with any tool; direct PriceLabs MCP support is not the same thing as building your dashboard.

## What this repository is

- A public, fake-data-only teaching artifact.
- A simple configurator and dashboard prototype, including guest mentions, preparation notes, personal-touch notes, priming, and review follow-through.
- The design and documentation foundation for a future Hospitable + Cloudflare deployment guide.

## What this repository is not yet

- A live connection to Hospitable.
- A place for guest credentials, door codes, or real reservation data.
- A promise that a first secure webhook deployment takes five minutes.

The intended experience is two-stage:

| Stage | Honest target |
| --- | --- |
| Explore the demo and choose a dashboard | 5–10 minutes |
| Connect a real Hospitable property for the first time | Guided setup after accounts and access are ready |

## The product shape

```text
Try the demo → choose your cards → download config + builder prompt
                                           ↓
                         Cloudflare Worker + KV + Hospitable webhooks
                                           ↓
                              private dashboard for the host's team
```

The production architecture will follow a safety-first pattern:

- Hospitable is a data source, not the dashboard UI.
- A Cloudflare Worker receives webhooks and serves an authenticated API.
- Shared checklist state lives in a server-side data store, not in one person's browser.
- Credentials and guest-sensitive fields never belong in this repository or a static web page.

## Repository layout

```text
.
├── index.html                 # Clickable fake-data demo + configurator
├── app.js                     # Demo behavior and configuration export
├── style.css                  # Calm, accessible dashboard design
├── config.example.js          # The one file a host customizes first
└── docs/
    ├── START-HERE.md          # Plain-English first steps
    ├── AI-TOOLS-AND-PRICELABS.md # Which AI/PriceLabs path to use
    ├── LIVE-SETUP-OUTLINE.md  # Planned Cloudflare + Hospitable flow
    └── SECURITY.md            # What never goes in a public repo
```

## Contributing

Keep every example fictional. Before opening a pull request, check that it contains no API tokens, property IDs, guest names, door codes, Wi-Fi details, or real screenshots.

## License

MIT. See [LICENSE](LICENSE).
