#!/usr/bin/env python
"""Launcher script for ElevenLabs MCP server within Adya hackathon repo.

Starts the server from local source (no installed wheel) and forwards
stdio so Claude can communicate via MCP protocol.

Usage: python start-server.py
"""

import subprocess
import sys
import os
from pathlib import Path

here = Path(__file__).resolve().parent
repo_root = here.parent.parent.parent.parent.parent  # navigate back to workspace root

server_path = here / "elevenlabs_mcp" / "server.py"
if not server_path.exists():
    sys.stderr.write(f"Could not locate server.py at {server_path}\n")
    sys.exit(1)

# Ensure we run with the same Python executable that invoked this script
python_executable = sys.executable

proc = subprocess.Popen(
    [python_executable, str(server_path)],
    stdin=sys.stdin.buffer,
    stdout=sys.stdout.buffer,
    stderr=sys.stderr.buffer,
    cwd=str(here),
    env=os.environ.copy(),
)

try:
    proc.wait()
except KeyboardInterrupt:
    proc.terminate()
    proc.wait() 