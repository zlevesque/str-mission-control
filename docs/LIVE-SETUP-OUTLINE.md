# Live setup — from safe demo to a private real dashboard

This page explains the **real-data path** in plain English. Read it after you have tried the demo and chosen the cards you want.

## First, an important honest note

The downloaded dashboard works today as a **safe demo**. It shows pretend stays, tasks, flags, and numbers. Nothing is connected to Hospitable or PriceLabs yet.

Live setup is the separate job of connecting the downloaded dashboard to a small **private helper**. We will call that helper the *Worker*. The Worker keeps private information out of the public webpage and out of GitHub.

So there are two different wins:

| What you are doing | How long it should feel like | What you get |
| --- | --- | --- |
| Try the demo and choose cards | About 5–10 minutes | Your own version of this exact dashboard design, using pretend data |
| Connect a real property for the first time | More time and careful setup | A private dashboard that can receive real, protected data |

If you expected a single button that instantly connects Hospitable, that button does **not** exist yet. We will build the Worker and screenshot guide before calling this an easy one-click live setup.

## Before you begin

Make sure these three things are true:

- You have a downloaded copy of this project on your computer. See [Start Here](START-HERE.md) if you do not.
- You already used **Build my dashboard**, downloaded `config.js`, and replaced the old `config.js` in your downloaded project folder.
- You are the person allowed to create a Cloudflare account and make a webhook/token in Hospitable—or you have permission from that person.

Do **not** collect or paste any keys yet. You will add them later, directly into Cloudflare's private secret area.

## The live-setup path, one small step at a time

### 1. Start with your customized demo

1. Open your downloaded project folder.
2. Double-click `index.html`.
3. Confirm that the business name, property name, and chosen cards look right.
4. Refresh the page once. It should still be a fake-data demo; that is expected.

At this point, the dashboard should look exactly like the starter. Changing `config.js` changes names and selected existing cards only—it does not redesign the page.

### 2. Enter private setup

1. In the dashboard, click **Build my dashboard**.
2. Continue through the choices until you reach the final screen.
3. Click **Copy private setup prompt**.
4. Open Codex, Claude Code, or your preferred coding AI **with the downloaded project folder open**.
5. Paste the copied prompt and ask it to set up a private live connection.

The copied prompt is an instruction sheet for the AI. It does **not** send data, create an account, or connect Hospitable by itself.

### 3. Let the AI build the private connection, not a new dashboard

Tell the AI which sources you want to connect—for example, Hospitable first and PriceLabs later. Give it **no keys, passwords, real guest names, door codes, or Wi-Fi details**.

Its work should be limited to these safe places:

| The AI may work here | Why |
| --- | --- |
| `config.js` | Your non-secret names, card choices, and private Worker address |
| `live-data-adapter.js` | The small bridge that lets the existing dashboard display a safe private response |
| A new `worker/` folder | The private connection code, webhook checks, and shared task state |

It must leave `index.html`, `style.css`, and `app.js` alone. Those three files are the actual STR Mission Control design. Read [Design Lock](DESIGN-LOCK.md) if you want to check its work.

### 4. Create the Worker in Cloudflare

The AI should walk you through this when the Worker files exist. The eventual screenshot guide will show each button, but the simple job is:

1. Create or sign in to a Cloudflare account.
2. Create a Worker for **your private Mission Control**, not for the public repository.
3. Deploy the Worker code from your private `worker/` folder.
4. Copy the Worker’s web address. It will look like a web link and is okay to place in `config.js`; the address is not a password.

The Worker is like a locked receptionist: Hospitable can give it an update, and your dashboard can ask it for approved information. The public web page never needs to know your provider keys.

### 5. Add secrets in Cloudflare—not in this project

Cloudflare has a private **Secrets** area for the Worker. Add each value there yourself. If a screen asks you to save a secret into a file that will be uploaded to GitHub, stop.

| Private value | Put it in | Never put it in |
| --- | --- | --- |
| Hospitable personal-access token | Cloudflare Worker secret | A prompt, `config.js`, GitHub, or browser code |
| Hospitable webhook signing secret | Cloudflare Worker secret | A screenshot, email, or public repository |
| PriceLabs Customer API key, if you choose PriceLabs | Cloudflare Worker secret | The static dashboard files or a public prompt |
| Dashboard login/session secret | Cloudflare Worker secret | `index.html`, a shared note, or GitHub |

You can tell the AI the **name** of a secret, such as `HOSPITABLE_TOKEN`. Do not tell it the secret’s value. You enter the value directly in Cloudflare.

### 6. Connect Hospitable’s webhook

A webhook is simply an automatic doorbell: Hospitable rings it when something changes.

1. In Hospitable, find its **Webhooks** settings. The exact menu label can move as Hospitable updates its app, so the finished screenshot guide will verify the current clicks.
2. Create a webhook named something obvious, such as `Mission Control`.
3. Paste in your private Worker web address.
4. Select only the events the Worker was built to handle—normally reservation changes, guest messages, and review-related events. Do not select every checkbox just because it is available.
5. If Hospitable gives you a signing secret, copy it directly into the matching Cloudflare Worker secret. Do not save it in the project folder.

### 7. Test with pretend information first

Before allowing real guest information through:

1. Have the AI/Worker send one clearly marked fake test reservation.
2. Open your private dashboard.
3. Confirm the test appears in the correct card or calendar area.
4. Confirm no test value appears in the public GitHub repository.
5. Delete the test after it works.

Only after that test passes should the Worker request or accept real reservation information.

### 8. Add the first real data carefully

1. Confirm the selected Hospitable property is the correct one.
2. Pull only the upcoming stays needed for the dashboard.
3. Open the private dashboard in a normal browser window.
4. Check the arrival dates, guest task counts, flags, and occupancy calculation against Hospitable.
5. Give access only to people who should see guest operations.

If a number looks wrong, pause and fix the source mapping before relying on it.

## Which tool supplies which number?

Different tools answer different questions. Keeping them separate prevents misleading reporting.

| What the dashboard shows | Correct source | In simple words |
| --- | --- | --- |
| Actual occupancy at your property | Hospitable reservation calendar | Your booked nights divided by available nights |
| Arrivals, preparation tasks, guest messages, and reviews | Hospitable reservation data + webhooks | What is happening at your property |
| Dynamic prices and minimum-stay guidance | PriceLabs Customer API | The pricing guidance for your listings |
| Wider market occupancy, RevPAR, or demand trends | PriceLabs market tools / MCP | The market around you, not your own booked calendar |

PriceLabs’ [Customer API](https://developers.pricelabs.co/customer-api/api-reference/overview) is the right path for a private custom dashboard. PriceLabs’ [MCP connector](https://developers.pricelabs.co/mcp/overview) is a separate AI-assistant tool. It is optional; the dashboard does not need MCP in order to work.

## Final safety check

Before treating the setup as complete:

1. Run `node scripts/check-design-lock.mjs` from the project folder. It should say the design lock passed.
2. Open the public GitHub repository and confirm it contains no real guest data, keys, door codes, Wi-Fi details, phone numbers, or real screenshots.
3. Open your dashboard from its private address and confirm that it requires the protection you chose.
4. Change one harmless task and make sure the two approved team members see the same result.

## What we still need to build for this to become truly beginner-friendly

This page is the route map. Before calling live setup finished, the project still needs:

- A ready-to-deploy private Worker starter.
- A verified, current Hospitable webhook walkthrough.
- A verified Cloudflare walkthrough with screenshots and fake example values.
- A safe test button and an easy “something went wrong” troubleshooting section.

Until those pieces ship, the public project remains a safe demo and design template—not an instant live-data product.
