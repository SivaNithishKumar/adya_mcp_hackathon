// HBase REST API core client (working endpoints only)

export class HBaseCoreClient {
  // Remove baseUrl from constructor
  constructor() {}

  _makeBaseUrl(url: string, port: number): string {
    // Remove trailing slash from url if present
    const cleanUrl = url.replace(/\/$/, "");
    return `${cleanUrl}:${port}`;
  }

  async healthCheck({ url, port }: { url: string; port: number }): Promise<any> {
    return this._get(this._makeBaseUrl(url, port) + "/version/cluster");
  }

  async listNamespaces({ url, port }: { url: string; port: number }): Promise<any> {
    return this._get(this._makeBaseUrl(url, port) + `/namespaces`);
  }

  async getNamespace({ url, port, namespace }: { url: string; port: number; namespace: string }): Promise<any> {
    return this._get(this._makeBaseUrl(url, port) + `/namespaces/${encodeURIComponent(namespace)}`);
  }

  async createNamespace({ url, port, namespace, data }: { url: string; port: number; namespace: string; data?: any }): Promise<any> {
    return this._post(this._makeBaseUrl(url, port) + `/namespaces/${encodeURIComponent(namespace)}`, data || {});
  }

  async deleteNamespace({ url, port, namespace }: { url: string; port: number; namespace: string }): Promise<any> {
    return this._delete(this._makeBaseUrl(url, port) + `/namespaces/${encodeURIComponent(namespace)}`);
  }

  async listTables({ url, port }: { url: string; port: number }): Promise<any> {
    // Use root endpoint instead of /tables which doesn't work
    return this._get(this._makeBaseUrl(url, port) + `/`);
  }

  async getTableSchema({ url, port, table }: { url: string; port: number; table: string }): Promise<any> {
    return this._get(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/schema`);
  }

  async createOrUpdateTable({ url, port, table, schema }: { url: string; port: number; table: string; schema: any }): Promise<any> {
    return this._put(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/schema`, schema);
  }

  async deleteTable({ url, port, table }: { url: string; port: number; table: string }): Promise<any> {
    return this._delete(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/schema`);
  }

  async listTableRegions({ url, port, table }: { url: string; port: number; table: string }): Promise<any> {
    return this._get(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/regions`);
  }

  async getRow({ url, port, table, row }: { url: string; port: number; table: string; row: string }): Promise<any> {
    return this._get(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/${encodeURIComponent(row)}`);
  }

  async putRow({ url, port, table, row, data }: { url: string; port: number; table: string; row: string; data: any }): Promise<any> {
    return this._put(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/${encodeURIComponent(row)}`, data);
  }

  async deleteRow({ url, port, table, row }: { url: string; port: number; table: string; row: string }): Promise<any> {
    return this._delete(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/${encodeURIComponent(row)}`);
  }

  async getCell({ url, port, table, row, column }: { url: string; port: number; table: string; row: string; column: string }): Promise<any> {
    return this._get(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/${encodeURIComponent(row)}/${encodeURIComponent(column)}`);
  }

  async bulkPutRows({ url, port, table, rows }: { url: string; port: number; table: string; rows: any[] }): Promise<any> {
    return this._post(this._makeBaseUrl(url, port) + `/${encodeURIComponent(table)}/row`, rows);
  }

  // --- Internal helpers ---
  async _get(path: string): Promise<any> {
    try {
      const res = await fetch(path, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) return { error: true, status: res.status, statusText: res.statusText };
      return await res.json();
    } catch (err: any) {
      return { error: true, message: err.message || String(err) };
    }
  }

  async _post(path: string, data: any, opts: any = {}): Promise<any> {
    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', ...(opts.headers || {}) },
        body: JSON.stringify(data)
      });
      if (res.status === 201 && res.headers.get('location')) {
        // For scanner creation, return location header
        return { location: res.headers.get('location') };
      }
      if (!res.ok) return { error: true, status: res.status, statusText: res.statusText };
      const text = await res.text();
      if (!text) return { success: true, status: res.status };
      try {
        return JSON.parse(text);
      } catch {
        return { success: true, status: res.status, raw: text };
      }
    } catch (err: any) {
      return { error: true, message: err.message || String(err) };
    }
  }

  async _put(path: string, data: any): Promise<any> {
    try {
      const res = await fetch(path, {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) return { error: true, status: res.status, statusText: res.statusText };
      const text = await res.text();
      if (!text) return { success: true, status: res.status };
      try {
        return JSON.parse(text);
      } catch {
        return { success: true, status: res.status, raw: text };
      }
    } catch (err: any) {
      return { error: true, message: err.message || String(err) };
    }
  }

  async _delete(path: string): Promise<any> {
    try {
      const res = await fetch(path, { method: 'DELETE', headers: { 'Accept': 'application/json' } });
      if (!res.ok) return { error: true, status: res.status, statusText: res.statusText };
      const text = await res.text();
      if (!text) return { success: true, status: res.status };
      try {
        return JSON.parse(text);
      } catch {
        return { success: true, status: res.status, raw: text };
      }
    } catch (err: any) {
      return { error: true, message: err.message || String(err) };
    }
  }
} 