// Get details of a specific namespace in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   namespace: string - Name of the namespace to retrieve
import { HBaseCoreClient } from '../core.js';

export async function getNamespaceTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; namespace?: string }) {
  const creds = params.__credentials__;
  if (!params || !params.namespace) {
    return { content: [{ type: 'text', text: "Missing required 'namespace' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.getNamespace({ url: creds.url, port: creds.port, namespace: params.namespace });
} 