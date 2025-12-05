# Harvest Clients Monorepo

A TypeScript monorepo containing a type-safe Harvest API client and n8n community node for Harvest integration.

## Structure

```
harvest-clients/
├── apps/
│   └── n8n-nodes-harvest/     # n8n community node for Harvest
├── examples/                  # Example workflows and integrations
│   └── n8n-workflows/
├── packages/
│   ├── harvest-client/        # Type-safe Harvest API client
│   ├── eslint-config/         # Shared ESLint configuration
│   └── typescript-config/     # Shared TypeScript configuration
```

## Tech Stack

- **Package Manager:** pnpm (v9+)
- **Build System:** Turborepo
- **Language:** TypeScript (v5+)
- **Type Generation:** openapi-typescript

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/mekanics/harvest-clients.git
cd harvest-clients

# Install dependencies
pnpm install

# Generate types from OpenAPI spec
pnpm --filter harvest-client generate:types

# Build all packages
pnpm build
```

## Development

### Available Scripts

```bash
# Build all packages
pnpm build

# Start development mode (watch)
pnpm dev

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Run type checking
pnpm type-check

# Format code
pnpm format

# Clean all build outputs
pnpm clean
```

### Working with Packages

```bash
# Build a specific package
pnpm --filter harvest-client build

# Run commands in a specific package
pnpm --filter n8n-nodes-harvest dev

# Add a dependency to a package
pnpm --filter harvest-client add <package-name>
```

## Packages

### harvest-client

A type-safe TypeScript client for the Harvest API v2. See the [harvest-client README](./packages/harvest-client/README.md) for detailed usage.

### n8n-nodes-harvest

An n8n community node for Harvest time tracking and invoicing. See the [n8n-nodes-harvest README](./apps/n8n-nodes-harvest/README.md) for installation and usage instructions.

## Examples

The [examples directory](./examples/) contains ready-to-use workflows and integrations:

### Weekly Hours Report Workflow

A comprehensive n8n workflow for automated project budget tracking:

- **Runs weekly** on Mondays at 8:00 AM
- **Reads project budget** directly from Harvest
- **Tracks hours** across last week, month-to-date, and year-to-date
- **Calculates workload** recommendations (days/week needed)
- **Sends beautiful HTML reports** with progress bars

**Location:** `examples/n8n-workflows/weekly-hours-report.json`

See the [examples README](./examples/README.md) for setup instructions and more examples.

## API Documentation

This project implements the [Harvest API v2](https://help.getharvest.com/api-v2/). The OpenAPI specification is located at `packages/harvest-client/src/openapi/harvest-v2.yaml`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
