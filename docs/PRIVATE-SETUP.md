# Private setup — keep real data private and keep the design intact

This page is for the moment you move beyond pretend demo data. It explains what **private setup** means, how to use the copied AI prompt safely, and how to check that nothing important was changed.

## The 30-second version

Your downloaded dashboard is the finished visual template. Do not ask an AI to remake it.

Instead:

1. Use the dashboard to choose your cards.
2. Replace the project’s `config.js` with the settings file you downloaded.
3. Click **Copy private setup prompt**.
4. Give that prompt to Codex, Claude Code, or another coding AI with your downloaded project folder open.
5. Let it create a separate private connection for your data.

The AI may connect data **behind** the existing dashboard. It may not redesign the dashboard.

## What “private” means

Think of the dashboard as a pretty front door and the Worker as the locked room behind it.

- The front door is the public starter: its layout and fake demo data are safe to share.
- The locked room is your private Cloudflare Worker: it holds the connection to Hospitable, optional PriceLabs data, and any real guest-operation information.
- Your keys stay in Cloudflare’s secret storage. They never go into the front door, GitHub, or an AI chat.

## Before you copy the prompt

Do these simple things first:

1. Download and unzip the project. [Start Here](START-HERE.md) shows every click.
2. Open `index.html`, click **Build my dashboard**, and choose your cards.
3. Click **Download my settings**.
4. In your Downloads folder, drag the downloaded `config.js` into the project folder.
5. When Finder or File Explorer asks whether to replace the old file, choose **Replace**.
6. Double-click `index.html` again and make sure your business name, property name, and chosen cards are correct.

You now have a personalized dashboard using fake sample data. That is the correct and safe starting point.

## How to use the private setup prompt

1. In the dashboard, click **Build my dashboard** again.
2. Continue to the last screen.
3. Click **Copy private setup prompt**. A small message should say it was copied.
4. Open Codex, Claude Code, or your preferred coding AI.
5. Open the **downloaded project folder** in that tool—not a blank new project and not a GitHub webpage.
6. Paste the prompt.
7. Tell the AI which connection you want first. Example: “Connect Hospitable first. Do not connect PriceLabs yet.”
8. Tell it clearly: “Do not change the design-locked files. Do not ask me for, store, or display any secret.”

Do not paste API keys, tokens, passwords, real guest names, reservation IDs, door codes, Wi-Fi details, or screenshots of sensitive settings into the chat.

## What the AI is allowed to change

| Safe to change or create | What it is for |
| --- | --- |
| `config.js` | Business name, property name, selected existing cards, labels, and the non-secret address of the private Worker |
| `live-data-adapter.js` | Lets the existing dashboard display an authorized response from the private Worker |
| `worker/` (new folder) | Private connection code, webhook checks, shared task data, and deployment instructions |
| New private integration documentation | Explains how you deploy and test your own setup |

## What the AI must not change

| Leave this alone | Why |
| --- | --- |
| `index.html` | Page structure and the actual dashboard template |
| `style.css` | Colors, typography, spacing, cards, and visual style |
| `app.js` | The core dashboard behavior and configuration flow |
| `.design-lock.json` | The saved fingerprints that protect the three files above |

These rules are not cosmetic. They are how every host gets the same STR Mission Control experience instead of a slightly different AI-generated dashboard.

## What a good private-setup result looks like

When the AI says it is done, pause before adding any secrets. Look in your project folder.

You should see:

- The original `index.html`, `style.css`, and `app.js` still present.
- A `worker/` folder or clear Worker deployment instructions.
- A changed `live-data-adapter.js` that talks only to your private Worker—not directly to Hospitable or PriceLabs from the browser.
- A `config.js` that still contains names, choices, and an optional Worker address, but no secret values.

Then run this from the project folder:

```text
node scripts/check-design-lock.mjs
```

Good result: **“Design lock passed.”**

If it says a locked file changed, stop. Ask the AI to restore the locked file before moving forward. The integration can be fixed outside the design files.

## Where you add the real keys

The AI can tell you the *names* of the secrets it expects. You personally add the secret values in Cloudflare’s Worker Secrets area.

| Example secret name | What it holds | Who should see the value |
| --- | --- | --- |
| `HOSPITABLE_TOKEN` | Hospitable access token | Only the approved owner/admin |
| `HOSPITABLE_WEBHOOK_SECRET` | Proof that a webhook came from Hospitable | Only the approved owner/admin |
| `PRICELABS_API_KEY` | Optional PriceLabs Customer API key | Only the approved owner/admin |
| `DASHBOARD_SESSION_SECRET` | The private dashboard’s login/session protection | Only the approved owner/admin |

It is okay for the AI to write `HOSPITABLE_TOKEN` as a placeholder. It is **not** okay for the actual token value to appear in a prompt, file, Git commit, screenshot, or public repository.

## The simplest safety test

Before connecting a real stay:

1. Deploy the Worker with its secrets stored privately in Cloudflare.
2. Send one clearly fake test reservation through the Worker.
3. Confirm it appears only on your private dashboard.
4. Check the public GitHub repository. It must still show fake examples only.
5. Remove the test and then connect the correct Hospitable property.

For the full order of Cloudflare, webhooks, testing, and first data, read [Live Setup](LIVE-SETUP-OUTLINE.md).

## Current status of this starter

The design lock and safe places for live code are ready. A complete, click-by-click live deployment kit is still being built. Until the Worker starter, verified provider screens, and troubleshooting guide are included, this repository should be treated as a safe demo and a protected design template—not a one-click connection to real guest data.
