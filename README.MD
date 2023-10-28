# Iran CIDR Aggregator

## Overview

This Cloudflare Worker project aims to aggregate and manage Iran-specific CIDR (Classless Inter-Domain Routing) IP address ranges from various sources. It provides a central repository of these ranges for potential use in firewall configurations or access control.

## Project Features

- **Iran CIDR Grep:** Fetches unique CIDR ranges specific to Iran from multiple sources.
- **Merging and Aggregation:** Consolidates and merges the obtained CIDR ranges to create a unified and unique list of addresses.
- **MikroTik Configuration:** Generates commands for adding these CIDR ranges to MikroTik firewall address lists.

## Usage

1. **Fetch Iran CIDR:** Send an HTTP request to retrieve unique Iran CIDR ranges.
    - Endpoint: `/`
2. **MikroTik Configuration:** Access the endpoint to get MikroTik configuration commands for the obtained CIDR ranges.
    - Endpoint: `/mikroTik`

## Installation and Deployment

This project was created by [Bun](https://bun.sh).

```bash
bun install
```

To run:

```bash
bun start
```

To publish:

```bash
bun publish
```

1. Generate `dist/worker.js`.
2. Publish `dist/worker.js` to your Cloudflare Worker through the Cloudflare Dashboard.

## example

```bash
curl http://127.0.0.1:8787/ -o ir-cidr.txt
curl http://127.0.0.1:8787/mikroTik -o mikrotik-ir-cidr.rsc
```

## Contributions

Contributions, bug reports, and feature requests are welcome. Feel free to create issues or pull requests on the project repository.

## License

This project is licensed under the [GNU General Public License v3.0 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.html).
