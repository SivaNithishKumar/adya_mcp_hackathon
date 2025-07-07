# Browserbase MCP Migration Task List

This checklist will guide the migration of the Browserbase MCP server into the adya_mcp_hackathon repo, following the same pattern used for Asset Management and Analysis servers, with the required structure and dynamic credential handling conventions.

---

## 1. Prepare Directory Structure ✅ COMPLETED
- [x] Directory `adya_mcp_hackathon/mcp_servers/js/servers/BROWSERBASE/` already exists.
- [x] All relevant code from original Browserbase server is already in place.
- [x] `package.json`, `README.md`, and other files are already present.

## 2. Adapt Entry Point for Hackathon Format 🔄 IN PROGRESS
- [ ] **CRITICAL**: Create new `start-server.js` following Asset Management pattern:
  ```javascript
  const { spawn } = require('child_process');
  const path = require('path');
  
  const serverProcess = spawn('node', ['cli.js'], {
    cwd: __dirname,
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  // Handle process signals properly (SIGINT, SIGTERM)
  process.on('SIGINT', () => {
    serverProcess.kill('SIGINT');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    serverProcess.kill('SIGTERM');
    process.exit(0);
  });
  
  serverProcess.stdout.pipe(process.stdout);
  serverProcess.stderr.pipe(process.stderr);
  process.stdin.pipe(serverProcess.stdin);
  ```
- [ ] Update `cli.js` to remove hardcoded credential handling and accept dynamic credentials
- [ ] Ensure the main server entry point works with hackathon conventions

## 3. Dynamic Credential Handling (CRITICAL - Follow Asset Management Pattern) 🔄 IN PROGRESS
- [ ] **CRITICAL**: Modify `src/index.ts` to accept credentials in the hackathon JSON format:
  ```json
  {
    "BROWSERBASE": {
      "browserbaseApiKey": "bb_live_ZEJ_1iI-Bu-GvYpmiOvr2ytjHhU",
      "browserbaseProjectId": "7dffe5b6-fdef-4fd2-bb68-08a149277999"
    }
  }
  ```
- [ ] **CRITICAL**: Update the server creation function to inject `__credentials__` parameter:
  - [ ] Add `__credentials__` schema with `browserbaseApiKey`, `browserbaseProjectId` fields
  - [ ] Add logic to create new Browserbase context when credentials provided
  - [ ] Update tool registration to match Asset Management pattern exactly
- [ ] Remove hardcoded environment variable dependencies from `config.ts`
- [ ] Ensure the server reads credentials dynamically per request instead of startup

## 4. Client Integration 🔄 IN PROGRESS
- [ ] Update the client config (`client_and_server_config.ts`) to include the new server:
  ```javascript
  {
      server_name: "BROWSERBASE",
      server_features_and_capability: "BROWSERBASE", 
      path: "start-server.js"
  }
  ```
- [ ] Add `BROWSERBASE` case to `CallAndExecuteTool` function in `client_and_server_execution.ts`:
  ```javascript
  case "BROWSERBASE":
      args["__credentials__"] = {
          "browserbaseApiKey": server_credentials[selected_server]?.browserbaseApiKey || "",
          "browserbaseProjectId": server_credentials[selected_server]?.browserbaseProjectId || ""
      };
      break;
  ```

## 5. Build System 🔄 IN PROGRESS
- [ ] Run `npm install` to install all dependencies
- [ ] Run `npm run build` to build the server components
- [ ] Verify the build creates necessary executable files
- [ ] Test that `cli.js` works with the new startup script

## 6. Tool Registration Pattern 🔄 IN PROGRESS
- [ ] **CRITICAL**: Update tool registration in `src/index.ts` to follow Asset Management pattern:
  - [ ] Create `createRegisterTool` function similar to Asset Management
  - [ ] Add credential injection logic for each tool
  - [ ] Ensure all 12+ browser automation tools work with dynamic credentials:
    - Navigation tools: navigate, getText, keyboard
    - Session tools: session management, context tools
    - Snapshot tools: screenshot, page capture
    - Common tools: hover, selectOption
- [ ] Verify each tool can access credentials via `__credentials__` parameter

## 7. Documentation 🔄 IN PROGRESS
- [ ] Add `credentials.md` in `mcp_servers_documentation/BROWSERBASE/` with the credential format:
  ```markdown
  # Browserbase MCP Server Credentials
  
  ## Credential Format
  ```json
  {
    "BROWSERBASE": {
      "browserbaseApiKey": "your-browserbase-api-key",
      "browserbaseProjectId": "your-browserbase-project-id"
    }
  }
  ```
  
  ## Required Fields
  - `browserbaseApiKey`: Your Browserbase API key (starts with `bb_live_`)
  - `browserbaseProjectId`: Your Browserbase project ID (UUID format)
  
  ## Optional Configuration
  - `proxies`: Boolean to enable Browserbase proxies
  - `advancedStealth`: Boolean for advanced stealth mode (Scale Plan only)
  - `contextId`: Specific context ID to use
  - `persist`: Boolean to persist browser context
  ```
- [ ] Add `server_features.md` listing all browser automation tools and capabilities:
  - Navigation: navigate, getText, keyboard input
  - Session Management: create/close sessions, context management
  - Screenshots: take screenshots, page snapshots
  - Interaction: hover, select options, click elements
  - Browser Control: viewport settings, cookie management
- [ ] Add `demo_videos.md` in the same documentation folder
- [ ] Update `README.md` for the new server to reflect its usage and integration

## 8. Testing 🔄 IN PROGRESS
- [ ] Test the server standalone: `node start-server.js`
  - [ ] Verify server starts without errors
  - [ ] Test server responds to MCP protocol requests
- [ ] Test integration with the hackathon client:
  - [ ] Verify server appears in connection list
  - [ ] Test tool discovery (should show 12+ browser automation tools)
  - [ ] Test sample tool call with valid credentials
  - [ ] Verify credential injection and dynamic client creation works
- [ ] Test end-to-end browser automation flow

## 9. Dependencies & Scripts 🔄 IN PROGRESS
- [ ] Ensure all dependencies are listed in `package.json` in the new server directory
- [ ] Verify peer dependencies (`@modelcontextprotocol/sdk`, `zod`) are properly configured
- [ ] Add any missing build scripts as needed for the new location
- [ ] Test that all Browserbase SDK dependencies work correctly

## 10. Configuration Migration 🔄 IN PROGRESS
- [ ] **CRITICAL**: Update `src/config.ts` to remove hardcoded environment variable reading
- [ ] Modify `resolveConfig` function to accept dynamic credentials
- [ ] Update `configSchema` to include `__credentials__` parameter
- [ ] Ensure configuration merging works with dynamic credentials

## 11. Context Management 🔄 IN PROGRESS
- [ ] **CRITICAL**: Update `src/context.ts` to work with dynamic credentials
- [ ] Modify context creation to use injected credentials instead of environment variables
- [ ] Ensure browser sessions can be created with dynamic API keys
- [ ] Test context persistence and management with dynamic credentials

## 12. Tool Implementation Updates 🔄 IN PROGRESS
- [ ] Update all tool files in `src/tools/` to access credentials via `__credentials__`:
  - [ ] `navigate.ts` - browser navigation tools
  - [ ] `snapshot.ts` - screenshot and capture tools
  - [ ] `keyboard.ts` - keyboard input tools
  - [ ] `getText.ts` - text extraction tools
  - [ ] `session.ts` - session management tools
  - [ ] `context.ts` - context management tools
  - [ ] `common.ts` - common browser utilities
- [ ] Ensure each tool can create Browserbase client with dynamic credentials

---

## Key Files to Focus On (Based on Asset Management Pattern):

### Must Modify:
1. **`start-server.js`** - create new following Asset Management pattern
2. **`src/index.ts`** - add credential injection logic (most important)
3. **`src/config.ts`** - remove hardcoded env var dependencies
4. **`src/context.ts`** - update to use dynamic credentials
5. **All tool files in `src/tools/`** - update to access credentials via `__credentials__`

### Critical Modifications:
1. **Tool registration pattern** - add credential injection logic identical to Asset Management
2. **Client config files** - add BROWSERBASE server configuration
3. **Documentation** - create credentials.md and server_features.md

### Expected Result:
- 12+ browser automation tools available through MCP
- Dynamic credential handling identical to Asset Management
- Seamless integration with hackathon client
- No hardcoded credentials, all passed dynamically per request
- Full browser automation capabilities with Browserbase API

---

## Current Status:
- ✅ Directory structure exists
- 🔄 Entry point adaptation in progress
- 🔄 Dynamic credential handling implementation needed
- 🔄 Client integration configuration needed
- 🔄 Documentation creation needed
- 🔄 Testing and validation needed

**Use this checklist to track your progress as you migrate and integrate the Browserbase MCP server following the proven Asset Management pattern!** 