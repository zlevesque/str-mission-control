# Connect your live dashboard — slow, safe, and simple

This is the guide for turning the complete sample dashboard into **your own private Mission Control**.

You are not building a new dashboard. You are not choosing cards. The finished template already includes Today, Week, Upcoming, Calendar, Completed, Resources, reviews, flags, guest prep, the 5-star playbook, and the service-quotes library.

You are only connecting your private accounts behind it.

## What you will end up with

```text
Hospitable sends an update
            ↓
Your private Cloudflare Worker receives it
            ↓
The same Mission Control template shows the safe parts of it
            ↓
You and your approved teammate open one private web address
```

The public GitHub project remains safe to share. Your live data, access codes, and provider keys stay in your own Cloudflare account.

## Read this before touching anything

- You need one property for this first setup. If you manage several properties, set up one Worker per property until the multi-property version exists.
- You do **not** put a Hospitable or PriceLabs key into the dashboard, `config.js`, GitHub, or an AI chat.
- A coding helper may do the boring computer chores. You still do every sign-in, approval, and secret-value entry yourself.
- Plan for a calm first session, not a rushed five minutes. Once the private connection exists, the template itself is plug-and-play.

## Tiny dictionary

| Word | Means |
| --- | --- |
| Dashboard | The pretty Mission Control page you can see and click. |
| Worker | A tiny private helper on Cloudflare. It receives updates and protects the keys. |
| Secret | A password-like value. Never put it in a public file or chat. |
| Webhook | A doorbell. Hospitable rings it when a reservation, message, or review changes. |
| KV | The Worker’s small locked memory drawer for reservations, checkmarks, and flags. |

## Part 1: put the template in a safe place

1. Download the repository using the green **Code** button and **Download ZIP**. [Start Here](START-HERE.md) shows every click.
2. Unzip it in your Downloads folder.
3. Open the new `str-mission-control-main` folder.
4. Double-click `index.html` and click **Try the full demo**. Make sure you can see the Calendar and Resources tabs.
5. Keep this folder. It is your starting template.

Do not add real data while the folder is only a downloaded demo. The private Worker comes first.

## Part 2: create or sign in to Cloudflare

Cloudflare is where your private helper lives. It is not where you design the dashboard.

1. Go to [Cloudflare](https://dash.cloudflare.com/sign-up) in a normal browser window.
2. If you do not have an account, choose **Sign up** and create one. If you already have one, sign in.
3. Complete any email verification Cloudflare asks for.
4. When you arrive at the Cloudflare dashboard, stop. You do not need to click around or create random projects yet.

Cloudflare’s current Worker guide calls this area **Workers & Pages**. Its exact visual layout can change, but the name is what you are looking for. [Cloudflare’s official dashboard guide](https://developers.cloudflare.com/workers/get-started/dashboard/) explains the current starting point.

## Part 3: let a coding helper help without giving it your password

You do not need an AI to design or rebuild anything. The dashboard is already done.

You may use Codex, Claude Code, or another coding helper to run the installation commands in the `worker` folder. Give it this short instruction in your own words:

> Open `worker/README.md` and follow it one step at a time. Do not edit `index.html`, `style.css`, or `app.js`. Stop whenever I need to sign in, approve access, or enter a secret value.

That is the only instruction it needs. It is an installer helper, not a dashboard builder.

### What “giving the helper access” safely looks like

1. Open the downloaded `str-mission-control-main` folder in your coding helper.
2. Let it open the `worker` folder and install the normal project tools.
3. It may run `npx wrangler login`.
4. Your browser opens a Cloudflare sign-in or approval page.
5. **You** sign in and click the approval button. Do not type your Cloudflare password into the coding chat.
6. Return to the helper only after the browser says the login worked.

This authorizes Wrangler—the Cloudflare command tool—on **your own computer**. It does not give the helper your password, and it does not require you to paste a Cloudflare API key into a chat.

If a helper asks you to paste a secret into a file, terminal command, GitHub page, or chat, say no and use the next section instead.

## Part 4: make the Worker’s locked memory drawer

The Worker needs a small place to remember reservations, checkmarks, notes, and flags. Cloudflare calls this KV.

Ask the helper to run this inside the `worker` folder:

```text
npx wrangler kv namespace create MISSION_CONTROL
```

Cloudflare prints a line with a long **id**. It is an identifier, not a secret.

1. Copy that id.
2. Open `worker/wrangler.jsonc`.
3. Find the words `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.
4. Replace only those words with the id Cloudflare gave you.
5. Change the two friendly labels in the same file:
   - `BUSINESS_NAME`
   - `PROPERTY_NAME`

Do not add keys or passwords to this file.

## Part 5: deploy your private Worker

Ask the helper to run:

```text
npm run deploy
```

This command first makes a tiny private copy of the dashboard files the Worker needs, then deploys it. At the end, Wrangler prints a web address that ends in `workers.dev`. Copy it somewhere private; this is your Mission Control home address.

Open this address in your browser. You should see the exact dashboard template—not a new AI-made design.

Then add `/health` to the end of the address and open it. Example:

```text
https://your-mission-control.workers.dev/health
```

You should see a small message that says the private Worker is running. If you do, the hard part is alive.

## Part 6: add your private secrets in Cloudflare

Now you will create two long, random strings. A password manager is the easiest safe place to generate and keep them. Make two different strings; do not reuse your email or Airbnb password.

Give them simple private labels:

| Cloudflare secret name | What you paste as its value | What it does |
| --- | --- | --- |
| `DASHBOARD_ACCESS_TOKEN` | Your first random string | Lets your approved team open the private dashboard |
| `HOSPITABLE_WEBHOOK_SECRET` | Your second random string | Protects the special web address Hospitable uses to ring the doorbell |

To add each one in Cloudflare:

1. In Cloudflare, choose **Workers & Pages**.
2. Select your Mission Control Worker.
3. Choose **Settings**.
4. Find **Variables and Secrets** and click **Add**.
5. Choose the type **Secret**—not plain text.
6. Type the secret name exactly as it appears in the table above.
7. Paste that secret’s value from your password manager.
8. Click **Deploy** or save the change, as Cloudflare asks.
9. Repeat for the second secret.

Cloudflare hides a saved secret value afterward. That is good. Its official instructions confirm this exact Settings → Variables and Secrets → Add flow and recommend secrets for API keys and tokens. [Read the official Cloudflare secrets guide](https://developers.cloudflare.com/workers/configuration/secrets/).

## Part 7: connect Hospitable

Hospitable will send reservation updates to your Worker. First make one private webhook address:

```text
YOUR-WORKER-ADDRESS/webhooks/hospitable?key=YOUR_HOSPITABLE_WEBHOOK_SECRET
```

Example shape only—do not copy this as a real address:

```text
https://your-mission-control.workers.dev/webhooks/hospitable?key=your-private-random-string
```

That entire address behaves like a password because it contains your secret. Keep it out of screenshots, notes shared with others, GitHub, and AI chats.

Then, inside Hospitable:

1. Sign in to [Hospitable](https://my.hospitable.com).
2. Go to **Apps**.
3. Under **Tools**, click **Webhooks**.
4. Make sure the first **Webhooks** tab is selected.
5. Click **+ Add new**.
6. Name it `Mission Control`.
7. Paste your private webhook address into the URL box.
8. Select **Reservations** first. This is the important one for Calendar, arrivals, tasks, and occupancy.
9. You may also select **Reviews** if you want review-follow-up flags. Add **Messages** later only when you are ready to decide how message-created flags should work.
10. Click **Save**.
11. Click **Test** only after you are sure the URL points to your own private Worker. Hospitable’s test sends the latest selected item, which can be real guest information—never use a third-party test website for this.

Hospitable documents these current clicks as Apps → Webhooks → +Add new, then selecting Properties, Reservations, Messages, and/or Reviews. It sends a JSON POST request and expects a `200 OK`; otherwise it retries. [Hospitable’s official webhook guide](https://help.hospitable.com/en/articles/10008203-webhooks-for-reservations-properties-messages-and-reviews) is the source of truth if its menu changes.

### Bring in the first accepted reservations

After the test works:

1. Stay in Hospitable’s Webhooks area.
2. Open the three-dot menu for the webhook.
3. Choose **Send historic webhooks**.
4. Wait a minute, then refresh your private dashboard.

Hospitable says this historic send includes reservations whose last status is Accepted. It is a useful first fill, but it is not a rewind button for every past webhook event.

## Part 8: open your private dashboard

1. Open your `workers.dev` Mission Control address—not the old `index.html` file in Downloads.
2. Click **Connect my live data**.
3. Paste the same private Worker address.
4. Paste the value you saved as `DASHBOARD_ACCESS_TOKEN`.
5. Click **Connect this dashboard**.
6. Your live data should replace the sample stays.

The dashboard access code stays only until that browser tab closes. That is intentional. You will enter it again in a new tab or on a new approved device.

## Part 9: add PriceLabs only if you want pricing context

Hospitable supplies **your actual booked reservations**. PriceLabs supplies optional **pricing context**. They are different jobs.

| Question | Right source |
| --- | --- |
| How full is my property over the next 30 days? | Hospitable reservations |
| What rate is PriceLabs recommending? | PriceLabs Customer API |
| What is happening across my wider market? | PriceLabs market data / optional MCP analysis |

To turn on the Customer API in PriceLabs:

1. Sign in to PriceLabs.
2. Go to **Account Settings**.
3. Click **API Details**.
4. Click **Enable**.
5. Choose **I Need API Access**.
6. Type `API` in the confirmation box and click **Continue**.
7. Copy the API key that appears.
8. Go back to Cloudflare’s **Variables and Secrets** page for your Worker.
9. Add a new **Secret** named `PRICELABS_API_KEY` and paste the key there.
10. Deploy the secret change.

PriceLabs’ Customer API guide gives those exact current steps and says the key is sent as an `X-API-Key` header by the private server. [Enable the Customer API](https://developers.pricelabs.co/customer-api/api-reference/enable-the-api).

Now go back to your private Mission Control page. In **Connect live data**, click **Find my PriceLabs listings**. You will see only the listings available to the private PriceLabs key already saved in Cloudflare. Pick the property you want, then click **Use this PriceLabs listing**. You never need to find, copy, or paste a listing ID or PMS name yourself.

The Worker uses PriceLabs’ documented `listing_prices` endpoint for the next 30 days, then keeps only a small summary for the dashboard. [PriceLabs listing-price reference](https://developers.pricelabs.co/customer-api/api-reference/customer-api/prices/for-listings)

### What about PriceLabs MCP?

MCP is optional and separate. It connects PriceLabs to an AI assistant for analysis or pricing actions; it is not required to run this dashboard. PriceLabs currently documents a Claude connection flow with its own authorization screen. Use the **Customer API** for the dashboard and MCP only for deliberate AI-assisted work. [PriceLabs MCP overview](https://developers.pricelabs.co/home/overview)

## Final check: five green lights

- [ ] Your private `workers.dev` address opens the complete template.
- [ ] Adding `/health` shows the Worker is running.
- [ ] You added the two required values as Cloudflare **Secrets**, not code or text variables.
- [ ] Hospitable’s Test button returns successfully and a test reservation appears after you connect the dashboard.
- [ ] If you chose PriceLabs, you picked its listing from your private dashboard without putting the API key anywhere else.
- [ ] The public GitHub repository still contains only fictional names, fictional vendors, and no key values.

If one light is not green, stop there. The sample dashboard still works perfectly while you fix one connection at a time.
