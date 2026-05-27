## Documentation Update

This update reflects a minor but important enhancement to the project's security and environment configuration.

### Security Enhancements
The project's `.gitignore` file has been updated to explicitly include `.env` in the list of ignored files. This ensures that sensitive environment variables and local configurations are never accidentally committed to version control, reinforcing the existing commitment to environment isolation and security best practices.

### Existing Features and Configuration
The core functionalities, including the Discord Motivation Bot with its automated scheduling, external API integration (ZenQuotes API), and resilient delivery layer, along with the Keep-Alive Web Server and its health check endpoint, remain as previously documented.

The application continues to rely on the following environment variables for configuration:

| Variable        | Description                                            | Required | Default  |
| :-------------- | :----------------------------------------------------- | :------- | :------- |
| `DISCORD_TOKEN` | The authentication token for the Discord Bot.          | Yes      | -        |
| `CHANNEL_ID`    | The specific Discord Text Channel ID where quotes will be sent. | Yes      | -        |
| `PORT`          | The port used by the Express keep-alive server.        | No       | `3000`   |

No new features, components, parameters, or environment variables were introduced in this specific update.