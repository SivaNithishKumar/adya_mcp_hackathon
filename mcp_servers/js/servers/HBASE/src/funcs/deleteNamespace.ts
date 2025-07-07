// Delete a namespace in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   namespace: string - Name of the namespace to delete
import { HBaseCoreClient } from '../core.js';

export async function deleteNamespaceTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; namespace?: string }) {
  const creds = params.__credentials__;
  if (!params || !params.namespace) {
    return { content: [{ type: 'text', text: "Missing required 'namespace' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  return await client.deleteNamespace({ url: creds.url, port: creds.port, namespace: params.namespace });
} 