# Project Documentation Update

## New Features & Components

### Discord Motivation Bot
The core service provides automated motivational content delivery to Discord servers with enhanced scheduling logic.
- **Dynamic Scheduling**: Utilizes `node-cron` to trigger messages. The logic is currently calibrated for a 12:00 PM UTC execution, which aligns with 7:00 AM Colombia time (COT), accounting for standard server time offsets.
- **External API Integration**: Connects to the **ZenQuotes API** to fetch randomized motivational quotes and author attributions.
- **QA-Focused Validation**: Features a resilient data-handling layer that validates the API response payload (checking for empty datasets or malformed JSON) before attempting to dispatch messages to the Discord gateway.

### Keep-Alive Web Server
A lightweight **Express** implementation is integrated to maintain bot uptime on PaaS providers with auto-sleep/hibernation policies (such as Render or Heroku).
- **Health Check Endpoint**: A `GET /` route is exposed to provide a status confirmation, indicating the bot is active and the event loop is responsive.

### Security & Environment Isolation
- **Token Protection**: The project configuration includes strict `.env` exclusion in `.gitignore` to prevent the accidental exposure of sensitive Discord credentials and API tokens.

## Configuration & Environment Variables

The application requires the following environment variables to be defined in a local `.env` file or within your hosting provider's dashboard:

| Variable | Description | Required | Default |
| :--- | :--- | :--- | :--- |
| `DISCORD_TOKEN` | The private authentication token generated in the Discord Developer Portal. | **Yes** | N/A |
| `CHANNEL_ID` | The unique snowflake ID for the text channel where the bot will post quotes. | **Yes** | N/A |
| `PORT` | The network port the Express keep-alive server binds to. | No | `3000` |

## Technical Implementation Details
- **Runtime**: Node.js with TypeScript (`esnext` target, `nodenext` module resolution).
- **Process Management**: Uses `dotenv` for configuration loading and `discord.js` (GatewayIntentBits.Guilds) for optimized, low-privilege interaction with the Discord API.
- **Deployment Note**: Optimized for **Render** deployment with explicit logging during the web server initialization phase.