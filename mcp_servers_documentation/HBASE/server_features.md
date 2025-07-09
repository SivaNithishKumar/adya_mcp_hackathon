# HBASE MCP Server Documentation

The HBASE MCP server exposes the Apache HBase REST API as Model Context Protocol (MCP) tools for integration with the Adya Hackathon platform. This allows AI and automation clients to interact with HBase clusters using a standardized tool interface.

## Overview
- **Server Name:** HBASE
- **Purpose:** Provide programmatic access to HBase cluster management and data operations via REST, wrapped as MCP tools.
- **Base URL:** http://localhost:8080 (default)

## Supported Tools (Working APIs)

| Tool Name            | Description                                                                 |
|--------------------- |-----------------------------------------------------------------------------|
| healthCheck          | Check HBase cluster health and version. Returns cluster information and version details. |
| listNamespaces       | List all namespaces in HBase cluster. Returns array of namespace names. |
| getNamespace         | Get details of a specific namespace. Returns namespace information and properties. |
| createNamespace      | Create a new namespace in HBase. Requires namespace name and optional properties object. |
| deleteNamespace      | Delete a namespace in HBase. Removes the namespace and all its tables. |
| listTables           | List all tables in HBase cluster. Returns array of table names from root endpoint. |
| getTableSchema       | Get schema information for a specific table. Returns table structure and column families. |
| createOrUpdateTable  | Create or update a table schema. Requires table name and schema object with 'name' and 'ColumnSchema' array. Example: {name: 'table', ColumnSchema: [{name: 'cf'}]} |
| deleteTable          | Delete a table in HBase. Removes the table and all its data. |
| listTableRegions     | List all regions for a specific table. Returns region information and distribution. |
| getRow               | Retrieve a row by key from a table. Returns row data with all cells. |
| putRow               | Insert or update a row in a table. Requires table, row key, and data object with Row array containing key (base64) and Cell array with column (base64) and value (base64). |
| deleteRow            | Delete a specific row from a table. Removes the row and all its cells. |
| getCell              | Get the value of a specific cell (row+column) in a table. Returns cell value and metadata. |
| bulkPutRows          | Bulk insert or update multiple rows in a table. Requires table name and rows array with Row objects containing key (base64) and Cell arrays. |

## Removed Tools (Non-Working APIs)

The following tools were removed due to API limitations or unsupported endpoints:

| Tool Name            | Reason for Removal                                                          |
|--------------------- |-----------------------------------------------------------------------------|
| putCell              | Direct cell PUT operations return 500 errors in this HBase version (2.1.3) |
| scanTable            | Scanner creation fails with 500 errors, likely due to table state or configuration |
| splitRegion          | Region split operations return 404 errors due to region name format issues |
| compactRegion        | Region compact operations return 404 errors due to region name format issues |

## Data Format Requirements

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

### Bulk Row Data Format
```json
[
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
```

## Usage
- Each tool corresponds to a working REST API endpoint in HBase and can be called via the MCP client interface.
- All data (row keys, column names, values) must be base64 encoded as required by HBase REST API.
- For details on parameters and expected results, see the HBase REST API documentation: https://hbase.apache.org/book.html#rest

---

**Note:** This server is designed to be used within the Adya Hackathon platform and follows the no-external-dependencies rule for server logic. Only working APIs are included to ensure reliable operation. 