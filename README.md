# STR Mission Control

**A friendly, configurable operations dashboard starter for short-term-rental hosts.**

STR Mission Control helps a host move from "I have too many tabs open" to one calm, useful dashboard. It starts with a safe fake-data demo, then lets each host choose the cards, labels, and workflow that match their property.

## Start here

1. Open `index.html` in a browser.
2. Select **Try the demo** to click through a pretend property. Nothing is connected and nothing is saved.
3. Select **Build my dashboard** to choose the cards you want and download a starter configuration.

The beginner guide is in [docs/START-HERE.md](docs/START-HERE.md).

## What this repository is

- A public, fake-data-only teaching artifact.
- A simple configurator and dashboard prototype.
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
    ├── LIVE-SETUP-OUTLINE.md  # Planned Cloudflare + Hospitable flow
    └── SECURITY.md            # What never goes in a public repo
```

## Contributing

Keep every example fictional. Before opening a pull request, check that it contains no API tokens, property IDs, guest names, door codes, Wi-Fi details, or real screenshots.

## License

MIT. See [LICENSE](LICENSE).
