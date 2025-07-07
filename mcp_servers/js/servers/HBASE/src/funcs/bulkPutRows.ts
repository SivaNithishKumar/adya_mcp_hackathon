// Insert or update multiple rows in a table in HBase (bulk operation).
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table
//   rows: any[] - Array of row data (HBase REST API format)
import { HBaseCoreClient } from '../core.js';

export async function bulkPutRowsTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; table?: string; rows?: any[] }) {
  const creds = params.__credentials__;
  if (!params || !params.table) {
    return { content: [{ type: 'text', text: "Missing required 'table' in arguments." }], isError: true };
  }
  if (!Array.isArray(params.rows)) {
    return { content: [{ type: 'text', text: "Missing or invalid 'rows' in arguments (should be an array)." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.bulkPutRows({ url: creds.url, port: creds.port, table: params.table, rows: params.rows });
} 