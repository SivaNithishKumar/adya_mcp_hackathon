# HBase MCP Server

A Model Context Protocol (MCP) server that exposes Apache HBase REST API as tools for integration with AI and automation clients.

## Overview

This server provides programmatic access to HBase cluster management and data operations through a standardized MCP interface. It wraps the HBase REST API endpoints as MCP tools, allowing clients to interact with HBase clusters without direct REST API knowledge.

## Working Tools (15 total)

### Cluster Management
- `healthCheck` - Check HBase cluster health and version
- `listNamespaces` - List all namespaces in HBase cluster
- `getNamespace` - Get details of a specific namespace
- `createNamespace` - Create a new namespace in HBase
- `deleteNamespace` - Delete a namespace in HBase

### Table Management
- `listTables` - List all tables in HBase cluster (uses root endpoint)
- `getTableSchema` - Get schema information for a specific table
- `createOrUpdateTable` - Create or update a table schema
- `deleteTable` - Delete a table in HBase
- `listTableRegions` - List all regions for a specific table

### Data Operations
- `getRow` - Retrieve a row by key from a table
- `putRow` - Insert or update a row in a table
- `deleteRow` - Delete a specific row from a table
- `getCell` - Get the value of a specific cell (row+column) in a table
- `bulkPutRows` - Bulk insert or update multiple rows in a table

## Removed Tools

The following tools were removed due to API limitations or unsupported endpoints in HBase 2.1.3:

- `putCell` - Direct cell PUT operations return 500 errors
- `scanTable` - Scanner creation fails with 500 errors
- `splitRegion` - Region split operations return 404 errors
- `compactRegion` - Region compact operations return 404 errors

## Data Format Requirements

All data (row keys, column names, values) must be base64 encoded as required by HBase REST API.

### Table Schema Format
```json
{
  "name": "table_name",
  "ColumnSchema": [
    { "name": "column_family_name" }
  ]
}
```

### Row Data Format
```json
{
  "Row": [
    {
      "key": "base64_encoded_row_key",
      "Cell": [
        {
          "column": "base64_encoded_column_name",
          "$": "base64_encoded_value"
        }
      ]
    }
  ]
}
```

## Configuration

The server requires the following credentials:
- `url`: HBase REST API base URL (e.g., "http://localhost")
- `port`: HBase REST API port (e.g., 8080)

## Usage

1. Start the HBase REST API server
2. Configure the MCP client with the server credentials
3. Use the MCP tools to interact with HBase

## Testing

Run the test script to verify all working endpoints:
```bash
node src/hbase_api_test.cjs
```

## Dependencies

- Node.js
- HBase REST API server running on the configured endpoint

## License

MIT 