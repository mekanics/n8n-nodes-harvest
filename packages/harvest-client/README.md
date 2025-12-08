# harvest-client

A type-safe TypeScript client for the [Harvest API v2](https://help.getharvest.com/api-v2/).

## Features

- Full TypeScript support with generated types from OpenAPI spec
- Type-safe API calls using `openapi-fetch`
- Automatic authentication handling
- Support for all major Harvest API endpoints

## Installation

```bash
npm install harvest-client
# or
pnpm add harvest-client
# or
yarn add harvest-client
```

## Usage

### Basic Setup

```typescript
import { createHarvestClient } from 'harvest-client';

const client = createHarvestClient({
  accountId: 'your-account-id',
  accessToken: 'your-access-token',
});
```

### Getting Your Credentials

1. **Account ID**: Found in the URL of your Harvest account (e.g., `https://YOUR_SUBDOMAIN.harvestapp.com`)
2. **Access Token**: Create a Personal Access Token at `https://id.getharvest.com/developers`

### API Examples

#### List Time Entries

```typescript
const { data, error } = await client.GET('/time_entries', {
  params: {
    query: {
      from: '2024-01-01',
      to: '2024-01-31',
    },
  },
});

if (data) {
  for (const entry of data.time_entries) {
    console.log(`${entry.spent_date}: ${entry.hours} hours - ${entry.notes}`);
  }
}
```

#### Create a Time Entry

```typescript
const { data, error } = await client.POST('/time_entries', {
  body: {
    project_id: 123,
    task_id: 456,
    spent_date: '2024-01-15',
    hours: 2.5,
    notes: 'Worked on feature X',
  },
});

if (data) {
  console.log(`Created time entry: ${data.id}`);
}
```

#### Start a Timer

```typescript
// Create a time entry without hours to start a timer
const { data } = await client.POST('/time_entries', {
  body: {
    project_id: 123,
    task_id: 456,
    spent_date: '2024-01-15',
  },
});
```

#### Stop a Running Timer

```typescript
const { data } = await client.PATCH('/time_entries/{timeEntryId}/stop', {
  params: { path: { timeEntryId: 789 } },
});
```

#### List Clients

```typescript
const { data } = await client.GET('/clients', {
  params: {
    query: {
      is_active: true,
      per_page: 100,
    },
  },
});

if (data) {
  for (const client of data.clients) {
    console.log(client.name);
  }
}
```

#### Get Current User

```typescript
const { data } = await client.GET('/users/me');

if (data) {
  console.log(`Logged in as: ${data.first_name} ${data.last_name}`);
}
```

#### List Projects

```typescript
const { data } = await client.GET('/projects', {
  params: {
    query: {
      is_active: true,
      client_id: 123, // Optional: filter by client
    },
  },
});
```

#### Create an Invoice

```typescript
const { data } = await client.POST('/invoices', {
  body: {
    client_id: 123,
    subject: 'January 2024 Services',
    payment_term: 'net 30',
    line_items: [
      {
        kind: 'Service',
        description: 'Consulting services',
        quantity: 10,
        unit_price: 150,
      },
    ],
  },
});
```

### Using Generated Types

You can import the generated types for use in your application:

```typescript
import type { components } from 'harvest-client/types';

type TimeEntry = components['schemas']['TimeEntry'];
type Project = components['schemas']['Project'];
type Client = components['schemas']['Client'];

function processTimeEntries(entries: TimeEntry[]) {
  // Type-safe processing
}
```

### Error Handling

```typescript
const { data, error } = await client.GET('/projects/{projectId}', {
  params: { path: { projectId: 999999 } },
});

if (error) {
  console.error('API Error:', error);
} else {
  console.log('Project:', data);
}
```

### Custom Fetch Implementation

You can provide a custom fetch implementation for use in non-browser environments or for testing:

```typescript
import { createHarvestClient } from 'harvest-client';
import nodeFetch from 'node-fetch';

const client = createHarvestClient({
  accountId: 'your-account-id',
  accessToken: 'your-access-token',
  fetch: nodeFetch as unknown as typeof fetch,
});
```

## API Reference

The client supports all Harvest API v2 endpoints:

- **Company**: Get company information
- **Users**: CRUD operations for users
- **Clients**: CRUD operations for clients
- **Client Contacts**: CRUD operations for contacts
- **Projects**: CRUD operations for projects
- **Tasks**: CRUD operations for tasks
- **Time Entries**: CRUD operations + start/stop timers
- **Invoices**: CRUD operations
- **Expenses**: CRUD operations
- **Expense Categories**: List expense categories

For complete API documentation, see the [Harvest API v2 docs](https://help.getharvest.com/api-v2/).

## Development

### Regenerate Types

When the OpenAPI spec is updated:

```bash
pnpm run generate:types
```

### Build

```bash
pnpm run build
```

## License

MIT


