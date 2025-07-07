export const ClientsConfig:any = [
    "MCP_CLIENT_OPENAI",
    "MCP_CLIENT_AZURE_AI",
    "MCP_CLIENT_GEMINI",
    // "CLAUDE",
]

export const ServersConfig:any = [
    {
        server_name :"WORDPRESS",
        server_features_and_capability:`WORDPRESS`,
        path : "build/index.js"
    },
    {
        server_name :"ASSET_MANAGEMENT",
        server_features_and_capability:`ASSET_MANAGEMENT`,
        path : "start-server.js"
    },
    {
        server_name :"ANALYSIS",
        server_features_and_capability:`ANALYSIS`,
        path : "start-server.js"
    },
    {
        server_name :"ENVIRONMENT_CONFIG",
        server_features_and_capability:`ENVIRONMENT_CONFIG`,
        path : "start-server.js"
    },
    {
        server_name :"STRUCTURED_METADATA",
        server_features_and_capability:`STRUCTURED_METADATA`,
        path : "start-server.js"
    },
    {
        server_name :"ELEVENLABS",
        server_features_and_capability:`ELEVENLABS`,
        command: "python",
        args: [
            "../../python/servers/ELEVENLABS/start-server.py"
        ]
    },
    {
        server_name :"META_PROMPT",
        server_features_and_capability:`META_PROMPT`,
        command: "uv",
        args: [
            "--directory",
            "../../python/servers/META_PROMPT/meta-prompt-mcp-server",
            "run",
            "mcp-meta-prompt"
        ]
    },
    {
        server_name :"HBASE",
        server_features_and_capability:`HBASE`,
        path : "start-server.js"
    },
    // {
    //     server_name :"WORDPRESS",
    //     server_features_and_capability:`WORDPRESS`,
    //     path : "build/index.js"
    // }
]

