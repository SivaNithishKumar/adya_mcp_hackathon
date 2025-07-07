// Get the schema of a specific table in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table to retrieve schema for
import { HBaseCoreClient } from '../core.js';

export async function getTableSchemaTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; table?: string }) {
  const creds = params.__credentials__;
  if (!params || !params.table) {
    return { content: [{ type: 'text', text: "Missing required 'table' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.getTableSchema({ url: creds.url, port: creds.port, table: params.table });
} 