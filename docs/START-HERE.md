# Start Here — even if GitHub is brand new to you

You do not need to know code to try STR Mission Control. You do not need GitHub Desktop, a terminal, Cloudflare, Hospitable, or PriceLabs for the safe sample dashboard.

## Get the project onto your computer

GitHub is a website that stores project folders. This project is one of those folders.

1. On the project’s main GitHub page, find the green **Code** button above the file list.
2. Click **Code**.
3. Click **Download ZIP**.
4. Wait for the download to finish.
5. On a Mac, open **Finder → Downloads**. On Windows, open **File Explorer → Downloads**.
6. Double-click `str-mission-control-main.zip`.
7. Your computer creates a normal folder named `str-mission-control-main`. Open it.

Nothing was installed. A ZIP is just a packed-up folder, like a suitcase. Double-clicking it unpacks the suitcase.

## Open the complete sample dashboard

1. In the `str-mission-control-main` folder, find **index.html**.
2. Double-click it.
3. If your computer asks which app to use, choose Chrome, Safari, Edge, or your normal web browser.
4. Click **Try the full demo**.
5. Click the tabs at the top: Today, Week, Upcoming, Calendar, Completed, and Resources.

Everything is made up: names, stays, flags, vendor quotes, and message templates. Your clicks stay inside that browser tab and reset when you refresh.

### If `index.html` does not open as a webpage

1. Right-click `index.html`.
2. Choose **Open With**.
3. Pick Chrome, Safari, Edge, or your usual browser.

Do not open `app.js` or `style.css`. Those are helper files. `index.html` starts the sample dashboard.

## What happens when you want real data

You do not choose cards or create a new dashboard. You keep the exact template you just tried.

1. Click **Connect my live data**.
2. Read [Live Setup](LIVE-SETUP-OUTLINE.md).
3. Deploy the included private Worker in the `worker` folder.
4. Connect Hospitable’s webhook to that Worker.
5. Open your private Worker web address and enter your private dashboard access code.

The Worker is the protected bridge. It lets Hospitable update the dashboard without putting a key or real guest data into this public folder.

If a coding helper will assist with the Worker, first read [Using a coding helper safely](PRIVATE-SETUP.md).

## Helpful words

| Word | Simple meaning |
| --- | --- |
| Dashboard | One screen that helps you see what needs attention. |
| Sample data | Pretend information that is safe to touch. |
| Webhook | A bell that rings automatically when something happens, such as a booking. |
| Cloudflare Worker | The private helper that receives the bell and safely gives the dashboard approved information. |
| Secret | A password-like value that stays out of public files and chats. |
