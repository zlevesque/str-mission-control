# Security Rules

This repository is public. Treat every file as if anyone can read it.

Never commit or paste:

- Hospitable personal-access tokens
- PriceLabs API keys or MCP connection credentials
- Cloudflare secrets or dashboard passwords
- Door codes, Wi-Fi names/passwords, alarm details, or lock information
- Guest names, email addresses, phone numbers, reservation codes, or message text
- Property IDs tied to a live account
- Screenshots containing real guest or property details

Use fake names such as Jordan Blake and pretend properties such as The Maple House in examples and screenshots.

For a real dashboard, credentials belong in the hosting provider's private secrets area. The static website and the GitHub repository should only contain code that knows where to look for those secrets, never the secrets themselves.

If an AI tool does not show an official PriceLabs connection, do not try to make one by pasting an API key, MCP client ID, or secret into the chat. Use the PriceLabs Customer API through the private Worker instead. See [AI Tools and PriceLabs](AI-TOOLS-AND-PRICELABS.md).
