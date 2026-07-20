# Start Here — even if you have never used GitHub

You do not need to know code to explore this project. You also do **not** need GitHub Desktop, a terminal, a Cloudflare account, or a Hospitable account for the safe demo.

## First: get the project onto your computer

GitHub is a website that stores project folders. This project is one of those folders. Here is how to take a copy:

1. Go back to the main page for this project.
2. Find the green button named **Code** near the top of the file list.
3. Click **Code**, then click **Download ZIP**.
4. Wait for the download to finish. On a Mac, open **Finder** and then **Downloads**. On Windows, open **File Explorer** and then **Downloads**.
5. Double-click `str-mission-control-main.zip`. Your computer makes a new normal folder named `str-mission-control-main`.
6. Open that new folder.

Nothing has been installed. A ZIP file is just a packed-up folder, like a suitcase. Double-clicking it unpacks the suitcase.

## Next: open the safe demo

1. Inside the `str-mission-control-main` folder, find the file named **index.html**.
2. Double-click it. If your computer asks which app to use, choose Chrome, Safari, Edge, or another web browser.
3. A page titled **STR Mission Control** opens.
4. Click **Try the demo**.

Everything on that page is pretend. The names, stays, percentages, and repair flags are examples only. Your clicks stay in that browser tab and reset when you refresh the page.

### If it does not open as a webpage

- Right-click `index.html`.
- Choose **Open With**.
- Pick Chrome, Safari, Edge, or your usual browser.

Do not open `app.js` or `style.css`; those are helper files. `index.html` is the one that starts the demo.

## When you want a dashboard for your own property

Only after you have played with the demo, click **Build my dashboard**.

1. Type your business name.
2. Type your first property name.
3. Check the cards you want.
4. Click **Preview my dashboard**.
5. Click **Download my settings**. Your browser downloads a file named `config.js`.
6. Open **Downloads**. Drag the new `config.js` file into the `str-mission-control-main` folder you opened earlier. If your computer asks whether to replace the existing `config.js`, choose **Replace**. This changes the name, property, and cards without changing the dashboard design.
7. Double-click `index.html` again. You now see your chosen dashboard shape, still in the exact STR Mission Control style.
8. Only when you are ready for real data, click **Copy private setup prompt**. It tells your preferred AI builder to set up the downloaded starter without redesigning it. [AI Tools and PriceLabs](AI-TOOLS-AND-PRICELABS.md) explains the safe PriceLabs path for Claude, ChatGPT/Codex, and other tools.

## What happens next?

The demo is safe because it has no real connection. A real dashboard needs a private connection to Hospitable, which is covered in [LIVE-SETUP-OUTLINE.md](LIVE-SETUP-OUTLINE.md). Read [PRIVATE-SETUP.md](PRIVATE-SETUP.md) before asking an AI helper to add it.

The first live setup will eventually include screenshots for every click. Until that guide is complete, do not paste a Hospitable token, dashboard password, door code, Wi-Fi detail, or guest information into this public project.

## Helpful words

| Word | Simple meaning |
| --- | --- |
| Dashboard | One screen that helps you see what needs attention. |
| Demo | A pretend version that is safe to touch. |
| Webhook | A bell that rings automatically when something happens, such as a booking. |
| Cloudflare | The secure helper that receives the bell and sends the information to your private dashboard. |
| Configuration | A small settings file that tells the dashboard what to call things and which cards to show. |
