// Standalone script to test HBase REST API endpoints directly (not via MCP tools)
// Run with: node src/hbase_api_test.cjs

const fetch = (...args) => import('node-fetch').then(m => m.default(...args));

const BASE_URL = 'http://localhost:8080';
const NAMESPACE = 'testns';
const TABLE = `${NAMESPACE}:testtable`;
const COLUMN_FAMILY = 'cf';
const ROW_KEY = 'row1';
const COLUMN = 'cf:greeting';
const CELL_VALUE = 'hello world';

function toBase64(str) {
  return Buffer.from(str).toString('base64');
}

async function main() {
  // 1. Create Namespace
  console.log('--- Create Namespace ---');
  let res = await fetch(`${BASE_URL}/namespaces/${NAMESPACE}`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  console.log('Status:', res.status, await res.text());

  // 2. List Namespaces
  console.log('--- List Namespaces ---');
  res = await fetch(`${BASE_URL}/namespaces`, { headers: { 'Accept': 'application/json' } });
  console.log('Status:', res.status, await res.text());

  // 3. Create Table
  console.log('--- Create Table ---');
  res = await fetch(`${BASE_URL}/${TABLE}/schema`, {
    method: 'PUT',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: TABLE,
      ColumnSchema: [ { name: COLUMN_FAMILY } ]
    })
  });
  console.log('Status:', res.status, await res.text());

  // 4. List Tables
  console.log('--- List Tables ---');
  res = await fetch(`${BASE_URL}/tables`, { headers: { 'Accept': 'application/json' } });
  console.log('Status:', res.status, await res.text());

  // 5. Put Row
  console.log('--- Put Row ---');
  res = await fetch(`${BASE_URL}/${TABLE}/${ROW_KEY}`, {
    method: 'PUT',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Row: [
        {
          key: toBase64(ROW_KEY),
          Cell: [
            {
              column: toBase64(COLUMN),
              '$': toBase64(CELL_VALUE)
            }
          ]
        }
      ]
    })
  });
  console.log('Status:', res.status, await res.text());

  // 6. Get Row
  console.log('--- Get Row ---');
  res = await fetch(`${BASE_URL}/${TABLE}/${ROW_KEY}`, { headers: { 'Accept': 'application/json' } });
  console.log('Status:', res.status, await res.text());

  // 7. Get Cell
  console.log('--- Get Cell ---');
  res = await fetch(`${BASE_URL}/${TABLE}/${ROW_KEY}/${COLUMN}`, { headers: { 'Accept': 'application/json' } });
  console.log('Status:', res.status, await res.text());

  // 8. Scan Table
  console.log('--- Scan Table ---');
  // Create scanner
  res = await fetch(`${BASE_URL}/${TABLE}/scanner`, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  if (res.status === 201 && res.headers.get('location')) {
    const scannerUrl = res.headers.get('location');
    const rowsRes = await fetch(scannerUrl, { headers: { 'Accept': 'application/json' } });
    console.log('Scan Rows Status:', rowsRes.status, await rowsRes.text());
    // Delete scanner
    await fetch(scannerUrl, { method: 'DELETE', headers: { 'Accept': 'application/json' } });
  } else {
    console.log('Scanner creation failed:', res.status, await res.text());
  }

  // 9. Delete Row
  console.log('--- Delete Row ---');
  res = await fetch(`${BASE_URL}/${TABLE}/${ROW_KEY}`, { method: 'DELETE', headers: { 'Accept': 'application/json' } });
  console.log('Status:', res.status, await res.text());

  // 10. Delete Table
  console.log('--- Delete Table ---');
  res = await fetch(`${BASE_URL}/${TABLE}/schema`, { method: 'DELETE', headers: { 'Accept': 'application/json' } });
  console.log('Status:', res.status, await res.text());

  // 11. Delete Namespace
  console.log('--- Delete Namespace ---');
  res = await fetch(`${BASE_URL}/namespaces/${NAMESPACE}`, { method: 'DELETE', headers: { 'Accept': 'application/json' } });
  console.log('Status:', res.status, await res.text());
}

main().catch(err => {
  console.error('Error in HBase API test:', err);
}); 