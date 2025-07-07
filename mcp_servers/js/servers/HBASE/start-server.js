#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(__filename);

const serverProcess = spawn('node', [
    path.join(scriptDir, 'dist/src/index.js')
], {
    stdio: 'inherit',
    cwd: scriptDir
});

serverProcess.on('error', (error) => {
    console.error('Failed to start HBase MCP server:', error);
    process.exit(1);
});

serverProcess.on('exit', (code) => {
    process.exit(code);
});

process.on('SIGINT', () => {
    serverProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
    serverProcess.kill('SIGTERM');
}); 