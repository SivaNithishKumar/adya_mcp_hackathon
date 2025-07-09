// Create or update a table in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table to create or update (should be 'namespace:table')
//   schema: object - Table schema definition (should have 'name' and 'ColumnSchema')
import { HBaseCoreClient } from '../core.js';

export async function createOrUpdateTableTool(
  client: HBaseCoreClient,
  params: { __credentials__?: { url?: string; port?: number }; table?: string; schema?: any }
) {
  const creds = params.__credentials__;
  if (!params || !params.table) {
    return { content: [{ type: 'text', text: "Missing required 'table' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  let schema = params.schema;
  // If schema is an array, treat it as ColumnSchema
  if (Array.isArray(schema)) {
    schema = { name: params.table, ColumnSchema: schema };
  }
  // If schema is not an object or missing required fields, error
  if (!schema || typeof schema !== 'object' || !Array.isArray(schema.ColumnSchema) || !schema.name) {
    return {
      content: [{ type: 'text', text: "'schema' must be an object with 'name' and 'ColumnSchema' array. Example: {name: 'namespace:table', ColumnSchema: [{name: 'cf'}]}" }],
      isError: true
    };
  }
  // Ensure schema.name matches table
  if (schema.name !== params.table) {
    schema.name = params.table;
  }
  // Ensure ColumnSchema is an array of objects with 'name'
  if (!Array.isArray(schema.ColumnSchema) || !schema.ColumnSchema.every((cs: any) => cs && typeof cs.name === 'string')) {
    return { content: [{ type: 'text', text: "'ColumnSchema' must be an array of objects with a 'name' field." }], isError: true };
  }
  return await client.createOrUpdateTable({ url: creds.url, port: creds.port, table: params.table, schema });
} 