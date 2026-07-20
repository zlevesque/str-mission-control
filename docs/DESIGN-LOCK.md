# Design lock — keep the dashboard looking like this

This starter is not a wireframe or an idea for an AI to rebuild. It is the actual STR Mission Control design.

## Files that stay exactly as they are

- `index.html`
- `style.css`
- `app.js`

Those files control the page structure, warm linen styling, spacing, cards, tabs, flags, guest workflow, and core demo behavior. Do not edit them while setting up a personal dashboard.

## Files that are safe to personalize

- `config.js` — business name, property name, selected existing cards, and checklist labels.
- `live-data-adapter.js` — code that reads a private, authenticated dashboard response and hands it to the existing app.
- `worker/` — a new private Cloudflare Worker folder for Hospitable/PriceLabs connections, secrets, webhooks, and shared data.

## The simple rule for an AI helper

> Keep the existing dashboard exactly as it looks. Do not make a new UI. Do not edit the locked files. Only personalize `config.js` and add the private connection outside the dashboard design files.

After setup, run this check from the project folder:

```text
node scripts/check-design-lock.mjs
```

If the check says a locked file changed, restore that file before continuing. The AI can add new integration files; it should not “improve” the visual template.

## Why this matters

Text prompts can describe a design, but they do not reproduce it perfectly. Keeping the original files is what preserves the exact layout and experience.
