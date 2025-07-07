# Browserbase MCP Server Credentials

## Credential Format

The Browserbase MCP server accepts credentials in the following JSON format:

```json
{
  "BROWSERBASE": {
    "browserbaseApiKey": "your-browserbase-api-key",
    "browserbaseProjectId": "your-browserbase-project-id"
  }
}
```

## Required Fields

- **`browserbaseApiKey`**: Your Browserbase API key (starts with `bb_live_`)
  - Get this from your Browserbase dashboard
  - Example: `bb_live_ZEJ_1iI-Bu-GvYpmiOvr2ytjHhU`

- **`browserbaseProjectId`**: Your Browserbase project ID (UUID format)
  - Get this from your Browserbase dashboard
  - Example: `7dffe5b6-fdef-4fd2-bb68-08a149277999`

## Optional Configuration

The server also supports additional configuration options that can be passed via the `__credentials__` parameter:

- **`proxies`**: Boolean to enable Browserbase proxies (default: false)
- **`advancedStealth`**: Boolean for advanced stealth mode (Scale Plan only, default: false)
- **`contextId`**: Specific context ID to use for session persistence
- **`persist`**: Boolean to persist browser context (default: true)
- **`browserWidth`**: Browser viewport width (default: 1024)
- **`browserHeight`**: Browser viewport height (default: 768)

## Example Usage

```json
{
  "BROWSERBASE": {
    "browserbaseApiKey": "bb_live_ZEJ_1iI-Bu-GvYpmiOvr2ytjHhU",
    "browserbaseProjectId": "7dffe5b6-fdef-4fd2-bb68-08a149277999",
    "proxies": true,
    "advancedStealth": false,
    "browserWidth": 1920,
    "browserHeight": 1080
  }
}
```

## Getting Your Credentials

1. Sign up for a Browserbase account at [https://browserbase.com](https://browserbase.com)
2. Create a new project in your dashboard
3. Copy your API key and project ID from the project settings
4. Use these credentials in your MCP client configuration

## Security Notes

- Keep your API key secure and never expose it in client-side code
- The API key provides access to your Browserbase account and projects
- Use environment variables for production deployments
- Rotate your API keys regularly for security

## Dynamic Credential Handling

The Browserbase MCP server follows the hackathon repo pattern with dynamic credential injection:

- Credentials are passed per request via the `__credentials__` parameter
- No hardcoded credentials are stored in the server
- Each tool call can use different credentials if needed
- Fallback to environment variables if no credentials provided 