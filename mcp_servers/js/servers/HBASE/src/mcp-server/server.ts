// MCP server logic for HBase (working tools only)
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { HBaseCoreClient } from "../core.js";
import { healthCheckTool } from "../funcs/healthCheck.js";
import { listNamespacesTool } from "../funcs/listNamespaces.js";
import { getNamespaceTool } from "../funcs/getNamespace.js";
import { createNamespaceTool } from "../funcs/createNamespace.js";
import { deleteNamespaceTool } from "../funcs/deleteNamespace.js";
import { listTablesTool } from "../funcs/listTables.js";
import { getTableSchemaTool } from "../funcs/getTableSchema.js";
import { createOrUpdateTableTool } from "../funcs/createOrUpdateTable.js";
import { deleteTableTool } from "../funcs/deleteTable.js";
import { listTableRegionsTool } from "../funcs/listTableRegions.js";
import { getRowTool } from "../funcs/getRow.js";
import { putRowTool } from "../funcs/putRow.js";
import { deleteRowTool } from "../funcs/deleteRow.js";
import { getCellTool } from "../funcs/getCell.js";
import { bulkPutRowsTool } from "../funcs/bulkPutRows.js";

const credentialsSchema = z.object({
  url: z.string().url(),
  port: z.number().int(),
});

export function registerHBaseTools(server: McpServer) {
  const client = new HBaseCoreClient();

  server.tool(
    "healthCheck",
    "Check HBase cluster health and version. Returns cluster information and version details.",
    { __credentials__: credentialsSchema },
    async (args: any) => healthCheckTool(client, args)
  );

  server.tool(
    "listNamespaces",
    "List all namespaces in HBase cluster. Returns array of namespace names.",
    { __credentials__: credentialsSchema },
    async (args: any) => listNamespacesTool(client, args)
  );

  server.tool(
    "getNamespace",
    "Get details of a specific namespace. Returns namespace information and properties.",
    { __credentials__: credentialsSchema, namespace: z.string() },
    async (args: any) => getNamespaceTool(client, args)
  );

  server.tool(
    "createNamespace",
    "Create a new namespace in HBase. Requires namespace name and optional properties object.",
    { __credentials__: credentialsSchema, namespace: z.string(), data: z.record(z.any()).optional() },
    async (args: any) => createNamespaceTool(client, args)
  );

  server.tool(
    "deleteNamespace",
    "Delete a namespace in HBase. Removes the namespace and all its tables.",
    { __credentials__: credentialsSchema, namespace: z.string() },
    async (args: any) => deleteNamespaceTool(client, args)
  );

  server.tool(
    "listTables",
    "List all tables in HBase cluster. Returns array of table names from root endpoint.",
    { __credentials__: credentialsSchema },
    async (args: any) => listTablesTool(client, args)
  );

  server.tool(
    "getTableSchema",
    "Get schema information for a specific table. Returns table structure and column families.",
    { __credentials__: credentialsSchema, table: z.string() },
    async (args: any) => getTableSchemaTool(client, args)
  );

  server.tool(
    "createOrUpdateTable",
    "Create or update a table schema. Requires table name and schema object with 'name' and 'ColumnSchema' array. Example: {name: 'table', ColumnSchema: [{name: 'cf'}]}",
    { __credentials__: credentialsSchema, table: z.string(), schema: z.record(z.any()) },
    async (args: any) => createOrUpdateTableTool(client, args)
  );

  server.tool(
    "deleteTable",
    "Delete a table in HBase. Removes the table and all its data.",
    { __credentials__: credentialsSchema, table: z.string() },
    async (args: any) => deleteTableTool(client, args)
  );

  server.tool(
    "listTableRegions",
    "List all regions for a specific table. Returns region information and distribution.",
    { __credentials__: credentialsSchema, table: z.string() },
    async (args: any) => listTableRegionsTool(client, args)
  );

  server.tool(
    "getRow",
    "Retrieve a row by key from a table. Returns row data with all cells.",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string() },
    async (args: any) => getRowTool(client, args)
  );

  server.tool(
    "putRow",
    "Insert or update a row in a table. Requires table, row key, and data object with Row array containing key (base64) and Cell array with column (base64) and value (base64).",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string(), data: z.record(z.any()) },
    async (args: any) => putRowTool(client, args)
  );

  server.tool(
    "deleteRow",
    "Delete a specific row from a table. Removes the row and all its cells.",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string() },
    async (args: any) => deleteRowTool(client, args)
  );

  server.tool(
    "getCell",
    "Get the value of a specific cell (row+column) in a table. Returns cell value and metadata.",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string(), column: z.string() },
    async (args: any) => getCellTool(client, args)
  );

  server.tool(
    "bulkPutRows",
    "Bulk insert or update multiple rows in a table. Requires table name and rows array with Row objects containing key (base64) and Cell arrays.",
    { __credentials__: credentialsSchema, table: z.string(), rows: z.array(z.any()) },
    async (args: any) => bulkPutRowsTool(client, args)
  );
} 