import dotenv from "dotenv";
dotenv.config();

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { Tool } from "./tools/tool.js";

import navigate from "./tools/navigate.js";
import snapshot from "./tools/snapshot.js";
import keyboard from "./tools/keyboard.js";
import getText from "./tools/getText.js";
import session from "./tools/session.js";
import common from "./tools/common.js";
import contextTools from "./tools/context.js";

import { Context } from "./context.js";
import type { Config } from "./config.js";

// Configuration schema for Smithery - matches existing Config interface
export const configSchema = z.object({
  browserbaseApiKey: z.string().optional().describe("The Browserbase API Key to use"),
  browserbaseProjectId: z.string().optional().describe("The Browserbase Project ID to use"),
  proxies: z.boolean().optional().describe("Whether or not to use Browserbase proxies"),
  advancedStealth: z.boolean().optional().describe("Use advanced stealth mode. Only available to Browserbase Scale Plan users"),
  context: z.object({
    contextId: z.string().optional().describe("The ID of the context to use"),
    persist: z.boolean().optional().describe("Whether or not to persist the context")
  }).optional(),
  viewPort: z.object({
    browserWidth: z.number().optional().describe("The width of the browser"),
    browserHeight: z.number().optional().describe("The height of the browser")
  }).optional(),
  cookies: z.array(z.object({ // Playwright Cookies Type in Zod format
    name: z.string(),
    value: z.string(),
    domain: z.string(),
    path: z.string().optional(),
    expires: z.number().optional(),
    httpOnly: z.boolean().optional(),
    secure: z.boolean().optional(),
    sameSite: z.enum(['Strict', 'Lax', 'None']).optional()
  })).optional().describe("Cookies to inject into the Browserbase context"),
  server: z.object({
    port: z.number().optional().describe("The port to listen on for SSE or MCP transport"),
    host: z.string().optional().describe("The host to bind the server to. Default is localhost. Use 0.0.0.0 to bind to all interfaces")
  }).optional(),
  tools: z.object({
    browserbase_take_screenshot: z.object({
      omitBase64: z.boolean().optional().describe("Whether to disable base64-encoded image responses")
    }).optional()
  }).optional()
});

// Default function for Smithery
export default function ({ config }: { config: z.infer<typeof configSchema> }) {
  const server = new McpServer({
    name: 'Browserbase MCP Server',
    version: '1.0.6'
  });

  // Create a default config with fallback values
  const defaultConfig: Config = {
    browserbaseApiKey: config.browserbaseApiKey || process.env.BROWSERBASE_API_KEY,
    browserbaseProjectId: config.browserbaseProjectId || process.env.BROWSERBASE_PROJECT_ID,
    proxies: config.proxies || false,
    advancedStealth: config.advancedStealth,
    context: config.context,
    viewPort: config.viewPort || { browserWidth: 1024, browserHeight: 768 },
    cookies: config.cookies as any, // Type assertion to handle Cookie[] compatibility
    server: config.server
  };

  // Create the default context with fallback config
  const defaultContext = new Context(server.server, defaultConfig);

  const tools: Tool<any>[] = [
    ...common,
    ...snapshot,
    ...keyboard,
    ...getText,
    ...navigate,
    ...session,
    ...contextTools,
  ];

  // Register each tool with credential injection logic
  tools.forEach(tool => {
    if (tool.schema.inputSchema instanceof z.ZodObject) {
      // Add credentials parameter to all tools automatically
      const argsWithCredentials = {
        ...tool.schema.inputSchema.shape,
        __credentials__: z.object({
          browserbaseApiKey: z.string().optional(),
          browserbaseProjectId: z.string().optional(),
        }).optional(),
      };
      
      server.tool(
        tool.schema.name,
        tool.schema.description,
        argsWithCredentials,
        async (params: any) => {
          try {
            // Check for credentials in params and create new context if needed
            let contextToUse = defaultContext;
            if (params.__credentials__) {
              const { browserbaseApiKey, browserbaseProjectId } = params.__credentials__;
              if (browserbaseApiKey && browserbaseProjectId) {
                // Create new config with dynamic credentials
                const dynamicConfig: Config = {
                  ...defaultConfig,
                  browserbaseApiKey,
                  browserbaseProjectId,
                };
                // Create new context with dynamic credentials
                contextToUse = new Context(server.server, dynamicConfig);
              }
            }
            
            const result = await contextToUse.run(tool, params);
            return result;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            process.stderr.write(`[Browserbase Error] ${new Date().toISOString()} Error running tool ${tool.schema.name}: ${errorMessage}\n`);
            throw new Error(`Failed to run tool '${tool.schema.name}': ${errorMessage}`);
          }
        }
      );
    } else {
      console.warn(
        `Tool "${tool.schema.name}" has an input schema that is not a ZodObject. Schema type: ${tool.schema.inputSchema.constructor.name}`
      );
    }
  });

  return server.server;
}