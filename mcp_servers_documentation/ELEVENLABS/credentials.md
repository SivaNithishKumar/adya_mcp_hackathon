# ElevenLabs MCP Server Credentials

## Overview
The ElevenLabs MCP server requires an API key to access ElevenLabs services. Unlike other servers, the API key is **dynamically injected** on every tool call rather than being stored in environment variables.

## Credential Format

### JSON Structure
```json
{
  "ELEVENLABS": {
    "apiKey": "sk_1dce68e88ffc424feab97c56a67f13f0fee6d1f2699b8f0f"
  }
}
```

### Required Fields
- **`apiKey`** (string): Your ElevenLabs API key starting with `sk_`

## How to Obtain API Key

1. **Sign up/Login**: Go to [ElevenLabs.io](https://elevenlabs.io) and create an account or log in
2. **Access API Key**: Navigate to your profile settings
3. **Generate Key**: Create a new API key or copy your existing one
4. **Copy Key**: The key will start with `sk_` followed by a long string

## Usage in Adya Platform

### Client Configuration
The API key is automatically injected by the client on every tool call. You only need to provide it once in your server credentials configuration.

### Example Configuration
```javascript
// In your client configuration
const serverCredentials = {
  "ELEVENLABS": {
    "apiKey": "sk_1dce68e88ffc424feab97c56a67f13f0fee6d1f2699b8f0f"
  }
}
```

### Dynamic Injection
The client automatically adds the API key to every tool call as:
```json
{
  "credentials": {
    "apiKey": "sk_1dce68e88ffc424feab97c56a67f13f0fee6d1f2699b8f0f"
  }
}
```

## Security Notes

- **No Environment Variables**: The server does not read from `ELEVENLABS_API_KEY` environment variable
- **Per-Call Injection**: Each tool call receives fresh credentials
- **No Persistence**: API keys are not stored in the server process
- **Key Rotation**: You can change the API key mid-session by updating your client configuration

## Cost Considerations

⚠️ **IMPORTANT**: ElevenLabs API calls may incur costs depending on your subscription plan:
- Text-to-Speech: Based on character count
- Speech-to-Text: Based on audio duration  
- Voice Cloning: Per voice creation
- Agent Calls: Per conversation

Always review your ElevenLabs usage dashboard to monitor costs.

## Troubleshooting

### Common Issues
1. **Invalid API Key**: Ensure the key starts with `sk_` and is correctly copied
2. **Rate Limits**: Check your ElevenLabs subscription limits
3. **Authentication Errors**: Verify the API key is active in your ElevenLabs dashboard

### Error Messages
- `"ElevenLabs API key missing"`: No API key provided in credentials
- `"Invalid API key"`: The provided key is not valid
- `"Rate limit exceeded"`: You've hit your ElevenLabs usage limits 