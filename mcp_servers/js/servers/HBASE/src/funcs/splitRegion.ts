// Split a specific region of a table in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   table: string - Name of the table
//   region: string - Region name to split
import { HBaseCoreClient } from '../core.js';

export async function splitRegionTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; table?: string; region?: string }) {
  const creds = params.__credentials__;
  if (!params || !params.table) {
    return { content: [{ type: 'text', text: "Missing required 'table' in arguments." }], isError: true };
  }
  if (!params.region) {
    return { content: [{ type: 'text', text: "Missing required 'region' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.splitRegion({ url: creds.url, port: creds.port, table: params.table, region: params.region });
} 