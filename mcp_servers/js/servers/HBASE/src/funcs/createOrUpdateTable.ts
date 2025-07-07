// Create or update a table in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table to create or update
//   schema: object - Table schema definition
import { HBaseCoreClient } from '../core.js';

export async function createOrUpdateTableTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; table?: string; schema?: any }) {
  const creds = params.__credentials__;
  if (!params || !params.table) {
    return { content: [{ type: 'text', text: "Missing required 'table' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  if (typeof params.schema !== 'object') {
    return { content: [{ type: 'text', text: "Missing or invalid 'schema' in arguments (should be an object)." }], isError: true };
  }
  return await client.createOrUpdateTable({ url: creds.url, port: creds.port, table: params.table, schema: params.schema });
} 