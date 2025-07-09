// Insert or update a row in a table in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table
//   row: string - Row key to insert or update
//   data: object - Row data (can be HBase REST API format, or {column, value}, or {cells: [...]})
import { HBaseCoreClient } from '../core.js';

function toBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

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
  let rowData = params.data;
  // If already in correct format, use as is
  if (rowData && typeof rowData === 'object' && Array.isArray(rowData.Row)) {
    // Optionally, validate base64 encoding here
    return await client.putRow({ url: creds.url, port: creds.port, table: params.table, row: params.row, data: rowData });
  }
  // If data is {column, value}
  if (rowData && typeof rowData === 'object' && rowData.column && rowData.value) {
    rowData = {
      Row: [
        {
          key: toBase64(params.row),
          Cell: [
            {
              column: toBase64(rowData.column),
              '$': toBase64(rowData.value)
            }
          ]
        }
      ]
    };
    return await client.putRow({ url: creds.url, port: creds.port, table: params.table, row: params.row, data: rowData });
  }
  // If data is {cells: [{column, value}, ...]}
  if (rowData && typeof rowData === 'object' && Array.isArray(rowData.cells)) {
    rowData = {
      Row: [
        {
          key: toBase64(params.row),
          Cell: rowData.cells.map((cell: {column: string, value: string}) => ({
            column: toBase64(cell.column),
            '$': toBase64(cell.value)
          }))
        }
      ]
    };
    return await client.putRow({ url: creds.url, port: creds.port, table: params.table, row: params.row, data: rowData });
  }
  return { content: [{ type: 'text', text: "'data' must be either the HBase REST API row format, or {column, value}, or {cells: [...]}.'" }], isError: true };
} 