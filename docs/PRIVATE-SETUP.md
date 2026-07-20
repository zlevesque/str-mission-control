# Private setup — where live data belongs

The downloaded dashboard is safe because it uses pretend information. A real dashboard adds a private helper behind it; it does **not** put keys into the webpage.

## Three simple places

| Place | What belongs there | What does not belong there |
| --- | --- | --- |
| `config.js` | Property name, chosen cards, checklist labels, optional private dashboard URL | API keys, passwords, webhook secrets, real guest details |
| `live-data-adapter.js` | Browser code that asks the host's private Worker for already-authorized dashboard data | Provider keys or webhook secrets |
| `worker/` | Hospitable/PriceLabs connections, webhook verification, shared notes/checklists, private secrets | Public GitHub files or hard-coded secrets |

## What the AI setup prompt should do

1. Leave `index.html`, `style.css`, and `app.js` unchanged.
2. Create a private Cloudflare Worker in `worker/`.
3. Put Hospitable and PriceLabs credentials in the Worker secret store.
4. Configure the Worker to verify webhooks and return only authenticated dashboard data.
5. Use `live-data-adapter.js` to hand that safe response to the existing dashboard.
6. Run `node scripts/check-design-lock.mjs` before finishing.

The public starter will always remain safe to share. Each host's live Worker and its secrets stay private.
