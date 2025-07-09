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


## Video Link
https://drive.google.com/file/d/1VXuhuRK0BnpIjpHoNw17lKWEcDZAKBEg/view?usp=drive_link