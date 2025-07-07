ClientsConfig =[
    "MCP_CLIENT_AZURE_AI",
    "MCP_CLIENT_OPENAI",
	"MCP_CLIENT_GEMINI"
]
ServersConfig = [
	{
		"server_name": "MCP-GSUITE",
		"command":"uv",
		"args": [
			"--directory",
			"../servers/MCP-GSUITE/mcp-gsuite",
			"run",
			"mcp-gsuite"
		]
	},
    {
        "server_name": "ELEVENLABS",
        "command": "python",
        "args": [
            "../servers/ELEVENLABS/start-server.py"
        ]
    },
    {
        "server_name": "META_PROMPT",
        "command": "uv",
        "args": [
            "--directory",
            "../servers/META_PROMPT/meta-prompt-mcp-server",
            "run",
            "mcp-meta-prompt"
        ]
    }
]