# META_PROMPT Server Credentials

_No credentials required to run the Meta-Prompt MCP server locally. The server operates entirely client-side and does not connect to any third-party services._ 

---

## Prerequisite: Install `uv`

The Meta-Prompt MCP server is started via the ultra-fast Python package manager **uv**. If you do not have it yet, install it first (PowerShell example):

```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

macOS / Linux:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

After installation make sure `uv --version` works in your terminal.

---

## Quick Test (Python client @ port 5001)

Start the Python client:

```powershell
cd adya_mcp_hackathon\mcp_servers\python\clients
python run.py
```

Then, from another terminal run the working **curl**:

```bash
curl -X POST http://localhost:5001/api/v1/mcp/process_message \
  -H "Content-Type: application/json" \
  -d '{
    "selected_server_credentials": {
      "META_PROMPT": {}
    },
    "client_details": {
      "api_key": "YOUR_OPENAI_KEY",
      "temperature": 0.2,
      "max_tokens": 800,
      "input": "meta_model_prompt: What are three novel startup ideas in 2025 AI space?",
      "input_type": "text",
      "prompt": "",
      "chat_model": "gpt-4o-mini",
      "chat_history": []
    },
    "selected_client": "MCP_CLIENT_OPENAI",
    "selected_servers": ["META_PROMPT"]
  }'
```

You should receive a JSON response with `Status: true` and the model’s answer. Replace `YOUR_OPENAI_KEY` with a valid key, or switch `selected_client` / `chat_model` to an LLM for which you have credentials. 