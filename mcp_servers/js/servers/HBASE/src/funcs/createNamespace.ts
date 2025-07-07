// Create a new namespace in HBase.
// Arguments:
//   __credentials__: { url: string; port: number } - HBase REST API endpoint info
//   namespace: string - Name of the namespace to create
//   data: object - (Optional) Additional data for namespace creation (usually empty)
import { HBaseCoreClient } from '../core.js';

export async function createNamespaceTool(client: HBaseCoreClient, params: { __credentials__?: { url?: string; port?: number }; namespace?: string; data?: any }) {
  const creds = params.__credentials__;
  if (!params || !params.namespace) {
    return { content: [{ type: 'text', text: "Missing required 'namespace' in arguments." }], isError: true };
  }
  if (!creds || !creds.url || !creds.port) {
    return { content: [{ type: 'text', text: "Missing required 'url' or 'port' in __credentials__." }], isError: true };
  }
  if (typeof params.data !== 'object') {
    return { content: [{ type: 'text', text: "Missing or invalid 'data' in arguments (should be an object)." }], isError: true };
  }
  return await client.createNamespace({ url: creds.url, port: creds.port, namespace: params.namespace, data: params.data });
} 