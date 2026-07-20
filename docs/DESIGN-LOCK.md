# Design lock — keep the dashboard looking like this

This starter is not a wireframe or an idea for an AI to rebuild. It is the actual complete STR Mission Control design.

## Files that stay exactly as they are

- `index.html`
- `style.css`
- `app.js`

Those files control the page structure, warm linen styling, spacing, cards, tabs, Calendar, Resources, flags, guest workflow, and core demo behavior. Do not edit them while connecting a personal dashboard.

## Files that are safe to personalize

- `config.js` — safe demo labels and an optional private Worker address. No secrets.
- `live-data-adapter.js` — the browser bridge that reads a private, authenticated Worker response.
- `worker/` — the included private Cloudflare Worker for Hospitable/PriceLabs connections, secrets, webhooks, and shared data.

## The simple rule for an AI helper

> Keep the existing dashboard exactly as it looks. Do not make a new UI. Do not edit the locked files. Install and configure the private connection inside `worker/`.

After setup, run this check from the project folder:

```text
node scripts/check-design-lock.mjs
```

If the check says a locked file changed, restore that file before continuing. The AI can add new integration files; it should not “improve” the visual template.

## Why this matters

Text prompts can describe a design, but they do not reproduce it perfectly. Keeping the original files is what preserves the exact layout and experience.
