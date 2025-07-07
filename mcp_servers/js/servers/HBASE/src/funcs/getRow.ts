// Get a specific row from a table in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table
//   row: string - Row key to retrieve
import { HBaseCoreClient } from '../core.js';

export async function getRowTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; table?: string; row?: string }) {
  const creds = params.__credentials__;
  if (!params || !params.table) {
    return { content: [{ type: 'text', text: "Missing required 'table' in arguments." }], isError: true };
  }
  if (!params.row) {
    return { content: [{ type: 'text', text: "Missing required 'row' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.getRow({ url: creds.url, port: creds.port, table: params.table, row: params.row });
} 