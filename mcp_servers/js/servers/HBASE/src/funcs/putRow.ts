// Insert or update a row in a table in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table
//   row: string - Row key to insert or update
//   data: object - Row data (HBase REST API format)
import { HBaseCoreClient } from '../core.js';

export async function putRowTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; table?: string; row?: string; data?: any }) {
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
  if (typeof params.data !== 'object') {
    return { content: [{ type: 'text', text: "Missing or invalid 'data' in arguments (should be an object)." }], isError: true };
  }
  return await client.putRow({ url: creds.url, port: creds.port, table: params.table, row: params.row, data: params.data });
} 