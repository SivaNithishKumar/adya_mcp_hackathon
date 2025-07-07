// List all tables in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
import { HBaseCoreClient } from '../core.js';

export async function listTablesTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number } }) {
  const creds = params.__credentials__;
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.listTables({ url: creds.url, port: creds.port });
} 