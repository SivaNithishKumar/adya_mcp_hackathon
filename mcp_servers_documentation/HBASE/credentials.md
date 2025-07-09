# HBase MCP Server Credentials

## Overview
This server requires only a running HBase Docker container. No additional credentials or API keys are needed.

---

## How to Start HBase
1. Use the following `docker-compose.yml` to start the HBase cluster locally:

```yaml
services:
  hbase:
    image: harisekhon/hbase
    container_name: hbase-server
    ports:
      - "8080:8080"    # REST API
      - "8085:8085"    # REST Web UI
      - "9090:9090"    # Thrift API
      - "16010:16010"  # HBase Master Web UI
      - "16020:16020"  # RegionServer Web UI
    environment:
      - HBASE_CONF_hbase_rootdir=/hbase
      - HBASE_CONF_hbase_zookeeper_quorum=localhost
    volumes:
      - hbase_data:/hbase
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/version/cluster"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  hbase_data:
```

2. Run the following command in the directory containing the above file:

```sh
docker-compose up -d
```

This will start the HBase cluster at `localhost:8080`.

---

## Notes
- No username, password, or API key is required.
- Ensure Docker is installed and running on your system. 

## Video
https://drive.google.com/file/d/1Wdx_iOOpeqzKUJ8isv-kcDJQQog79-2w/view?usp=drive_link