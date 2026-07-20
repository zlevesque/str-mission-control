# Private Worker — installer notes

This folder is the private helper for STR Mission Control. It receives Hospitable webhooks, stores only the dashboard fields it needs, and serves the completed dashboard from one private Worker address.

It does **not** need a Hospitable personal-access token for the first version. Hospitable webhooks plus its historic-webhook option provide the reservation feed. PriceLabs is optional.

## What a coding helper may do

A coding helper may work in this `worker/` folder, install the project dependencies, run Wrangler commands, create a KV namespace, and update the placeholder KV namespace ID in `wrangler.jsonc`.

It must not:

- Change `index.html`, `style.css`, or `app.js`.
- Ask for, store, print, or commit a secret value.
- Log into Cloudflare for you or approve a browser permission on your behalf.

If the helper runs `npx wrangler login`, **you** complete the browser sign-in and approval. That connects Wrangler on your own computer to Cloudflare; it does not send your password to the helper.

## Install order

1. Open a terminal in this `worker/` folder.
2. Run `npm install`.
3. Run `npx wrangler login` and complete the Cloudflare browser sign-in yourself.
4. Run `npx wrangler kv namespace create MISSION_CONTROL`.
5. Copy the ID Wrangler prints and replace `REPLACE_WITH_YOUR_KV_NAMESPACE_ID` in `wrangler.jsonc`.
6. Set the non-secret labels in `wrangler.jsonc`:
   - `BUSINESS_NAME`
   - `PROPERTY_NAME`
   - `HOSPITABLE_PROPERTY_ID` (optional but strongly recommended if the account has more than one property)
7. Run `npm run deploy`. This first makes a tiny private copy of the five dashboard files, then deploys that copy. It does **not** package your `node_modules`, documentation, or Git folder as website files.

Cloudflare prints a `workers.dev` address at the end. That address serves the completed dashboard and the private API together.

## Required Cloudflare secrets

Add these in the Cloudflare dashboard after the first deploy:

| Secret name | What it is |
| --- | --- |
| `DASHBOARD_ACCESS_TOKEN` | A long random access code that your approved team enters on the dashboard |
| `HOSPITABLE_WEBHOOK_SECRET` | A separate long random string placed only in the private Hospitable webhook URL |

Optional PriceLabs secret:

| Secret name | What it is |
| --- | --- |
| `PRICELABS_API_KEY` | Your optional PriceLabs Customer API key |

Never create `.dev.vars`, `.env`, or a text note with real secrets and then commit it. This repository ignores those files, but avoiding them is simpler and safer for first-time users.

## Hospitable webhook URL

After setting `HOSPITABLE_WEBHOOK_SECRET`, make this URL locally in your password manager or a private note:

```text
https://YOUR-WORKER.workers.dev/webhooks/hospitable?key=YOUR_HOSPITABLE_WEBHOOK_SECRET
```

This full URL behaves like a password because it contains the webhook secret. Put it only into Hospitable's private webhook setting. Never commit it, post it, or put it in a screenshot.

## What the Worker saves

For reservations, it saves only the small dashboard fields: first name, platform, dates, guest-count summary, pet-count summary, and the dashboard’s own checklist, prep-item, and personal-touch notes. It intentionally does not save guest email, phone number, property Wi-Fi information, smart-lock codes, raw Hospitable task notes, raw message text, review text, or the full webhook payload.

## PriceLabs (optional)

After you add `PRICELABS_API_KEY` as a Cloudflare Secret, open your private Mission Control address. In **Connect live data**, click **Find my PriceLabs listings**, choose the property, and click **Use this PriceLabs listing**. The Worker saves only the selected listing’s non-secret ID and PMS label in its private KV drawer.

The Worker then requests the next 30 days of PriceLabs listing prices through the Customer API and caches a small summary for about a day. It never sends the API key to the browser. If you skip PriceLabs, Hospitable guest operations still work normally.
