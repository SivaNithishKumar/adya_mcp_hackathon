// Insert or update a cell value in a row in a table in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table
//   row: string - Row key
//   column: string - Column name (family:qualifier)
//   value: any - Value to set in the cell
import { HBaseCoreClient } from '../core.js';

export async function putCellTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; table?: string; row?: string; column?: string; value?: any }) {
  const creds = params.__credentials__;
  if (!params || !params.table) {
    return { content: [{ type: 'text', text: "Missing required 'table' in arguments." }], isError: true };
  }
  if (!params.row) {
    return { content: [{ type: 'text', text: "Missing required 'row' in arguments." }], isError: true };
  }
  if (!params.column) {
    return { content: [{ type: 'text', text: "Missing required 'column' in arguments." }], isError: true };
  }
  if (typeof params.value === 'undefined') {
    return { content: [{ type: 'text', text: "Missing required 'value' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.putCell({ url: creds.url, port: creds.port, table: params.table, row: params.row, column: params.column, value: params.value });
} 