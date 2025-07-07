#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerHBaseTools } from "./mcp-server/server.js";

const server = new McpServer({
  name: "hbase",
  version: "0.1.0",
});
registerHBaseTools(server);

const transport = new StdioServerTransport();
server.connect(transport); 