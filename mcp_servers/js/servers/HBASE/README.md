# HBase MCP Server

This is the Model Context Protocol (MCP) server for Apache HBase, designed for the Adya Hackathon platform.

## Purpose
- Exposes HBase REST API operations as MCP tools for integration with AI and automation clients.

## Supported Endpoints (Planned)
- List namespaces
- List tables
- Get table schema
- CRUD operations on rows
- Scan table
- Healthcheck/version

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the server:
   ```bash
   npm run build
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Directory Structure
- `src/` - Source code
- `dist/` - Compiled output

## Notes
- No external runtime dependencies (per hackathon repo rules)
- All logic is implemented in TypeScript

---
*Update this file as the implementation progresses.* 