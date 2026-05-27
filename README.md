### Project Documentation Update

This update clarifies the existing features and introduces a new environment variable for improved deployment flexibility.

#### New Features & Components

*   **Discord Motivation Bot**: The core service provides automated motivational content to Discord servers using modern asynchronous patterns.
    *   **Automated Scheduling**: Powered by `node-cron`, the bot is configured to trigger daily at `12:00 PM` server time (calibrated to `10:00 AM` Colombia time, accounting for a 5-hour server timezone offset).
    *   **External API Integration**: Connects to the ZenQuotes API to fetch randomized motivational quotes and author metadata.
    *   **Resilient Delivery Layer**: Includes a validation check to verify API response integrity before dispatching messages, preventing runtime errors during unexpected API outages.
*   **Keep-Alive Web Server**: A built-in Express server provides a health check endpoint to ensure the bot remains active on hosting platforms with auto-sleep features.
    *   **Health Check Endpoint**: `GET /` provides a simple status message confirming the bot's operational state.
    *   **Cloud Compatibility**: Optimized for deployment on platforms like Render and Heroku.
*   **Security & Environment Enhancements**:
    *   **Environment Isolation**: The `.gitignore` has been updated to strictly exclude `.env` files, ensuring sensitive API tokens and local configurations remain secure.
    *   **Modern TypeScript Stack**: The project utilizes `nodenext` module resolution and `esnext` targets for modern Node.js compatibility and optimized process management.

#### New Parameters & Environment Variables

The application relies on the following environment variables for configuration. A new `PORT` variable has been introduced to allow customization of the keep-alive server's port.

| Variable        | Description                                                  | Required | Default |
| :-------------- | :----------------------------------------------------------- | :------- | :------ |
| `DISCORD_TOKEN` | The authentication token for the Discord Bot.                | Yes      | -       |
| `CHANNEL_ID`    | The specific Discord Text Channel ID where quotes will be sent. | Yes      | -       |
| `PORT`          | The port used by the Express keep-alive server.              | No       | `3000`  |