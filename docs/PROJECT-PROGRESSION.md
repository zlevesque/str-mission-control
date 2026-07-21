# STR Mission Control — project progression

**Status:** Complete — template, setup path, and public documentation are ready for review.

**Purpose of this note:** a readable record of the decisions and edits that shaped this repository. It is a review log, not a raw conversation transcript. It deliberately leaves out real property, guest, vendor, account, and secret information.

## The final decision

We chose a **complete plug-and-play template**, not a dashboard generator.

Every user starts with the same finished STR Mission Control design and all of its core operations sections. They do not choose cards, recreate the design with a prompt, or ask an AI to rebuild the interface. To make it their own, they connect private Hospitable data through the included Cloudflare Worker and can optionally connect PriceLabs.

```text
Finished STR Mission Control template
                +
Private Cloudflare Worker
                +
Hospitable webhooks
                +
Optional PriceLabs Customer API
                =
Their private live dashboard
```

## Progression of the work

| Stage | What was requested or discovered | Decision and resulting change |
| --- | --- | --- |
| Foundation | Review the existing Mission Control work and AlphaForge prompt ideas as a possible foundation. | Kept the calm operations-dashboard direction and used the original workflow concepts as inspiration only. No private material was copied into the public template. |
| Public-template safety | Confirm that real or harmful data was removed before making the repository public. | Kept all sample names, vendors, messages, flags, prices, and property details fictional. Added repeated safety guidance against publishing secrets, guest data, access codes, Wi-Fi details, and screenshots. |
| Beginner download path | The initial repository instructions assumed people already knew how repositories work. | Added first-click instructions: GitHub **Code → Download ZIP → unzip → open `index.html` → Try the full demo**. |
| Demo completeness | The first demo did not include enough of the original operational system. | Added the full guest-workflow shape: Mentioned tags, Prep items, Personal touches, 5-star Priming steps, Reviews steps, outstanding tasks, and Flags. |
| Calendar and Resources | Calendar and Resources were missing or did not preserve the original dashboard’s usefulness. | Added a real Month Calendar with reservation bars and a Resources view with five message/playbook cards plus a fictional service-quotes library. |
| Flags and PriceLabs | Add the repairs/supplies flag area and explain the PriceLabs connection for different AI tools. | Added the Flags module. Documented that the **PriceLabs Customer API** powers the dashboard while **MCP** is optional for AI-assisted analysis. |
| Builder concern | A copied “builder prompt” would not reliably recreate the exact dashboard design, JavaScript behavior, or CSS. | Removed the dashboard builder and card-selector direction. The source code is now the protected, finished design. |
| Live private-data plan | Users should plug in webhooks and keys, rather than make an AI generate a new app. | Added an included Cloudflare Worker, KV storage, protected dashboard endpoint, Hospitable webhook endpoint, and browser-to-Worker adapter. |
| Easy PriceLabs selection | Users should not need to find and paste a PriceLabs listing ID or PMS name. | Added a private PriceLabs listing picker in the dashboard. After the API key is saved in Cloudflare, the user clicks **Find my PriceLabs listings**, chooses a property, and saves it. |
| Cloudflare deployment quality | A dry run revealed that the Worker would accidentally include development tools as website assets. | Added an asset-preparation script so the Worker deploys only the five dashboard files it needs. Cloudflare dry-run validation now succeeds. |
| In-page setup experience | The live setup section initially sent people back to the repository for next steps. | Replaced that redirect with the complete seven-step setup walkthrough directly after **Connect my live data**. The repository is now optional reference material, not required navigation. |

## What the finished dashboard includes

- Today, Week, Upcoming, Calendar, Completed, and Resources views
- Guest operations with checklists and outstanding-task summaries
- Mentioned tags for guest context
- Editable Prep items and Personal touches fields
- 5-star Priming workflow
- Guest review, host review, and response workflow
- Repairs and supplies Flags area
- Occupancy from Hospitable reservation data
- Optional PriceLabs rate and market-context area
- Calendar with reservation bars
- Resources with five guest-care messages and a service-quotes library

All of the public examples are fictional and reset in demo mode.

## The live-data setup, in plain language

The user opens the downloaded dashboard and clicks **Connect my live data**. The page itself walks them through these seven steps:

1. Create or sign in to Cloudflare.
2. Open the downloaded folder in a coding helper only to install the included private Worker—not to redesign the dashboard.
3. Deploy the Worker and copy its private `workers.dev` address.
4. Save two random strings as Cloudflare Secrets: a dashboard access token and a Hospitable webhook secret.
5. Add a Hospitable webhook for reservations, and optionally reviews.
6. Return to the form, paste the Worker address and dashboard access token, then connect.
7. Optionally save a PriceLabs Customer API key in Cloudflare and choose the listing from the private dashboard.

The page explicitly tells users not to paste provider API keys, secrets, webhook URLs, passwords, guest contact data, door codes, or Wi-Fi information into GitHub or an AI chat.

## Privacy and safety decisions

The public repository contains no actual provider keys or property data. The Worker is designed to store only a small operational subset of reservation data:

- Guest first name
- Booking platform
- Dates
- Guest and pet-count summaries
- Dashboard checklist state
- Prep-item and personal-touch notes entered by the approved team

It intentionally does **not** store guest email, phone number, raw provider task notes, raw message text, review text, Wi-Fi information, smart-lock codes, or the full webhook payload.

Provider secrets are saved only in Cloudflare Secrets. They are never added to `config.js`, browser code, the public repository, screenshots, or AI chats.

## Documentation added or improved

| File | What it is for |
| --- | --- |
| [START-HERE.md](START-HERE.md) | First-time GitHub ZIP download and demo instructions. |
| [LIVE-SETUP-OUTLINE.md](LIVE-SETUP-OUTLINE.md) | Detailed reference for Cloudflare, Hospitable, and PriceLabs. |
| [PRIVATE-SETUP.md](PRIVATE-SETUP.md) | Safe boundaries for using Codex, Claude Code, or another coding helper. |
| [AI-TOOLS-AND-PRICELABS.md](AI-TOOLS-AND-PRICELABS.md) | Customer API versus MCP explanation. |
| [DESIGN-LOCK.md](DESIGN-LOCK.md) | Explains why the completed design files are protected. |
| [SECURITY.md](SECURITY.md) | Public-sharing safety checklist. |
| [worker/README.md](../worker/README.md) | Step-by-step Worker installer notes for a coding helper. |

## Verification completed

- JavaScript syntax checks passed.
- The design-lock check passed after each intentional design change.
- The public repository was scanned for credential-shaped strings; no credentials were found.
- The private Worker passed Cloudflare’s local `--dry-run` validation.
- The demo’s complete guest workflow, Calendar, Resources, and live-connect form were checked during development.
- The Worker packages only its required dashboard assets, not development dependencies or repository files.

## What remains intentionally outside this template

This repository is complete as a reusable template and installation path. Each individual host still needs to do their own private, account-specific actions:

- Create or sign in to Cloudflare
- Authorize the local Wrangler sign-in in their own browser
- Create their own secrets
- Create their own Hospitable webhook
- Optionally enable their own PriceLabs Customer API

Those actions cannot and should not be done in a public repository or by sharing secrets in an AI chat.

## Relevant implementation commits

| Commit | Summary |
| --- | --- |
| `04fbd95` | Clarified the private live-setup path. |
| `bcfa630` | Added the complete plug-and-play dashboard, Worker, and beginner setup guides. |
| `a52c937` | Added the seven-step setup walkthrough directly inside the live-data page. |

## Completion statement

STR Mission Control is complete for this release: it is a safe public teaching template with a finished design, a complete fictional demo, an included private-data Worker, optional PriceLabs support, and beginner-friendly live setup directly in the dashboard.
