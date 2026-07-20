# Using a coding helper safely

You do not need an AI to make the dashboard. The complete dashboard is already in this repository.

You may use Codex, Claude Code, or another coding helper for the small installation jobs that feel annoying for a first-time user: installing the Cloudflare Worker tools, creating the Worker’s KV memory drawer, and running a deployment command.

This page shows the safe boundary.

## The one-sentence rule

> A coding helper may work on the private Worker; you handle every login, permission screen, and secret value yourself.

## What the helper may do

| Safe job | Where it happens |
| --- | --- |
| Read the installation instructions | `worker/README.md` |
| Install normal Worker tooling | `worker/` folder |
| Run `npx wrangler login` | Your computer; you complete the browser sign-in |
| Create the Worker’s KV storage | Your Cloudflare account after you approve the login |
| Paste a KV **identifier** into `worker/wrangler.jsonc` | `worker/` folder |
| Deploy the Worker code | Your Cloudflare account after you approve the login |

## What the helper must never do

| Never do this | Why |
| --- | --- |
| Rebuild or redesign Mission Control | The complete template already exists. |
| Edit `index.html`, `style.css`, or `app.js` during installation | Those are the protected dashboard experience. |
| Ask for your Cloudflare, Hospitable, or PriceLabs password | A real tool never needs your password in chat. |
| Ask you to paste an API key, secret, door code, Wi-Fi password, guest contact detail, or webhook address into chat | Those values can expose your property or guests. |
| Save a secret into Git, `config.js`, `.env`, a screenshot, or a public note | Those places can be copied or published by mistake. |

## Safe way to start a helper

1. Open the downloaded `str-mission-control-main` folder in Codex, Claude Code, or another coding helper.
2. Say: “Please read `worker/README.md` and help me install the private Worker. Do not edit the dashboard files. Stop when I need to log in or enter a secret.”
3. Let it explain the next command before it runs it.
4. When it opens a Cloudflare login page, take over in your browser.
5. When it asks for a secret value, do **not** put that value into chat. Add it yourself in Cloudflare’s **Variables and Secrets** screen instead.

That is enough. There is no builder prompt, design prompt, card-selection prompt, or file-replacement step.

## The two moments you always do yourself

### 1. Cloudflare sign-in and approval

When the helper runs `npx wrangler login`, Cloudflare opens a normal browser page.

1. Check that the address bar belongs to Cloudflare.
2. Sign in normally.
3. Read the approval page.
4. Approve only if it says you are authorizing Wrangler on your own computer.
5. Return to the helper after Cloudflare confirms it worked.

You are approving a local command tool. You are not giving the chat your password.

### 2. Secret values

For this starter, the first two secrets are:

- `DASHBOARD_ACCESS_TOKEN`
- `HOSPITABLE_WEBHOOK_SECRET`

Create two different long random strings in your password manager. Then enter them yourself in Cloudflare:

**Workers & Pages → your Worker → Settings → Variables and Secrets → Add → Secret**

Use [Live Setup](LIVE-SETUP-OUTLINE.md) for the full picture-led explanation of what each secret does and where it goes next.

## How to check the helper did not change the template

After installation, run this from the main project folder:

```text
node scripts/check-design-lock.mjs
```

Good result: **“Design lock passed.”**

The helper should have added or changed files only inside `worker/`. If it changed a locked dashboard file, ask it to restore that file before continuing.

## If you do not want to use AI

That is completely okay. Follow [worker/README.md](../worker/README.md) one command at a time, then use [Live Setup](LIVE-SETUP-OUTLINE.md) for the Cloudflare, Hospitable, and optional PriceLabs clicks.
