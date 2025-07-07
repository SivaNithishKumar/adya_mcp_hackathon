// MCP server logic for HBase (full tool registration)
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
import { putCellTool } from "../funcs/putCell.js";
import { bulkPutRowsTool } from "../funcs/bulkPutRows.js";
import { scanTableTool } from "../funcs/scanTable.js";
import { splitRegionTool } from "../funcs/splitRegion.js";
import { compactRegionTool } from "../funcs/compactRegion.js";

const credentialsSchema = z.object({
  url: z.string().url(),
  port: z.number().int(),
});

export function registerHBaseTools(server: McpServer) {
  const client = new HBaseCoreClient();

  server.tool(
    "healthCheck",
    "Check the health/status of the HBase REST API server.",
    { __credentials__: credentialsSchema },
    async (args: any) => healthCheckTool(client, args)
  );

  server.tool(
    "listNamespaces",
    "List all namespaces in HBase.",
    { __credentials__: credentialsSchema },
    async (args: any) => listNamespacesTool(client, args)
  );

  server.tool(
    "getNamespace",
    "Get details of a specific namespace in HBase.",
    { __credentials__: credentialsSchema, namespace: z.string() },
    async (args: any) => getNamespaceTool(client, args)
  );

  server.tool(
    "createNamespace",
    "Create a new namespace in HBase.",
    { __credentials__: credentialsSchema, namespace: z.string(), data: z.record(z.any()) },
    async (args: any) => createNamespaceTool(client, args)
  );

  server.tool(
    "deleteNamespace",
    "Delete a namespace in HBase.",
    { __credentials__: credentialsSchema, namespace: z.string() },
    async (args: any) => deleteNamespaceTool(client, args)
  );

  server.tool(
    "listTables",
    "List all tables in HBase.",
    { __credentials__: credentialsSchema },
    async (args: any) => listTablesTool(client, args)
  );

  server.tool(
    "getTableSchema",
    "Get the schema of a specific table in HBase.",
    { __credentials__: credentialsSchema, table: z.string() },
    async (args: any) => getTableSchemaTool(client, args)
  );

  server.tool(
    "createOrUpdateTable",
    "Create or update a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string(), schema: z.record(z.any()) },
    async (args: any) => createOrUpdateTableTool(client, args)
  );

  server.tool(
    "deleteTable",
    "Delete a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string() },
    async (args: any) => deleteTableTool(client, args)
  );

  server.tool(
    "listTableRegions",
    "List all regions of a specific table in HBase.",
    { __credentials__: credentialsSchema, table: z.string() },
    async (args: any) => listTableRegionsTool(client, args)
  );

  server.tool(
    "getRow",
    "Get a specific row from a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string() },
    async (args: any) => getRowTool(client, args)
  );

  server.tool(
    "putRow",
    "Insert or update a row in a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string(), data: z.record(z.any()) },
    async (args: any) => putRowTool(client, args)
  );

  server.tool(
    "deleteRow",
    "Delete a specific row from a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string() },
    async (args: any) => deleteRowTool(client, args)
  );

  server.tool(
    "getCell",
    "Get a specific cell value from a row in a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string(), column: z.string() },
    async (args: any) => getCellTool(client, args)
  );

  server.tool(
    "putCell",
    "Insert or update a cell value in a row in a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string(), row: z.string(), column: z.string(), value: z.any() },
    async (args: any) => putCellTool(client, args)
  );

  server.tool(
    "bulkPutRows",
    "Insert or update multiple rows in a table in HBase (bulk operation).",
    { __credentials__: credentialsSchema, table: z.string(), rows: z.array(z.any()) },
    async (args: any) => bulkPutRowsTool(client, args)
  );

  server.tool(
    "scanTable",
    "Scan all rows in a table in HBase using a scanner.",
    { __credentials__: credentialsSchema, table: z.string(), scanOptions: z.record(z.any()) },
    async (args: any) => scanTableTool(client, args)
  );

  server.tool(
    "splitRegion",
    "Split a specific region of a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string(), region: z.string() },
    async (args: any) => splitRegionTool(client, args)
  );

  server.tool(
    "compactRegion",
    "Compact a specific region of a table in HBase.",
    { __credentials__: credentialsSchema, table: z.string(), region: z.string() },
    async (args: any) => compactRegionTool(client, args)
  );
} 