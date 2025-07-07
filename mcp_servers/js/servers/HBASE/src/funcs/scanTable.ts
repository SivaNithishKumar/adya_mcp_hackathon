// Scan all rows in a table in HBase using a scanner.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table
//   scanOptions: object - Scanner options (HBase REST API format)
import { HBaseCoreClient } from '../core.js';

export async function scanTableTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; table?: string; scanOptions?: any }) {
  const creds = params.__credentials__;
  if (!params || !params.table) {
    return { content: [{ type: 'text', text: "Missing required 'table' in arguments." }], isError: true };
  }
  if (typeof params.scanOptions !== 'object') {
    return { content: [{ type: 'text', text: "Missing or invalid 'scanOptions' in arguments (should be an object)." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.scanTable({ url: creds.url, port: creds.port, table: params.table, scanOptions: params.scanOptions });
} 