# HBASE MCP Server Documentation

The HBASE MCP server exposes the Apache HBase REST API as Model Context Protocol (MCP) tools for integration with the Adya Hackathon platform. This allows AI and automation clients to interact with HBase clusters using a standardized tool interface.

## Overview
- **Server Name:** HBASE
- **Purpose:** Provide programmatic access to HBase cluster management and data operations via REST, wrapped as MCP tools.
- **Base URL:** http://localhost:8080 (default)

## Supported Tools

| Tool Name            | Description                                                                 |
|--------------------- |-----------------------------------------------------------------------------|
| healthCheck          | Check HBase cluster health and version (/version/cluster).                   |
| listNamespaces       | List all namespaces in the HBase cluster.                                    |
| getNamespace         | Get information about a specific namespace.                                  |
| createNamespace      | Create a new namespace.                                                      |
| deleteNamespace      | Delete a namespace.                                                          |
| listTables           | List all tables in the HBase cluster.                                        |
| getTableSchema       | Get schema/info for a specific table.                                        |
| createOrUpdateTable  | Create or update a table schema.                                             |
| deleteTable          | Delete a table.                                                              |
| listTableRegions     | List all regions for a table.                                                |
| getRow               | Retrieve a row by key from a table.                                          |
| putRow               | Insert or update a row in a table.                                           |
| deleteRow            | Delete a row from a table.                                                   |
| getCell              | Get the value of a specific cell (row+column) in a table.                    |
| putCell              | Update the value of a specific cell in a table.                              |
| bulkPutRows          | Bulk insert or update multiple rows in a table.                              |
| scanTable            | Scan rows in a table using a scanner (supports filters, ranges, etc).        |
| splitRegion          | Split a region in a table (admin operation).                                 |
| compactRegion        | Compact a region in a table (admin operation).                               |

## Usage
- Each tool corresponds to a REST API endpoint in HBase and can be called via the MCP client interface.
- For details on parameters and expected results, see the HBase REST API documentation: https://hbase.apache.org/book.html#rest

---

**Note:** This server is designed to be used within the Adya Hackathon platform and follows the no-external-dependencies rule for server logic. 