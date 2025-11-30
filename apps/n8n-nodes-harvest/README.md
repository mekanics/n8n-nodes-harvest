# n8n-nodes-harvest

An n8n community node for [Harvest](https://www.getharvest.com/) time tracking and invoicing.

## Features

- Full integration with Harvest API v2
- Support for all major Harvest resources:
  - Time Entries (create, read, update, delete, start/stop timers)
  - Clients
  - Projects
  - Tasks
  - Users
  - Invoices
  - Expenses
  - Contacts

## Installation

### Community Nodes (Recommended)

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-harvest` in the search field
4. Select **Install**

### Manual Installation

```bash
cd ~/.n8n/custom
npm install n8n-nodes-harvest
```

Then restart n8n.

## Credentials

To use this node, you need to configure Harvest API credentials:

1. **Account ID**: Your Harvest account ID (found in the URL of your Harvest account)
2. **Access Token**: A Personal Access Token from Harvest

### Getting a Personal Access Token

1. Log in to your Harvest account
2. Go to **Developers** > **Personal Access Tokens**
3. Click **Create New Personal Access Token**
4. Give it a name and click **Create**
5. Copy the token (you won't be able to see it again)

## Usage

### Time Entry Operations

#### Get Many Time Entries

Retrieve a list of time entries with optional filtering by date range, user, project, etc.

#### Create Time Entry

Create a new time entry with:
- Project ID
- Task ID
- Spent Date (YYYY-MM-DD format)
- Hours (optional - omit to start a timer)
- Notes (optional)

#### Start/Stop Timer

Use the **Restart** and **Stop** operations to control running timers.

### Client Operations

- **Get Many**: List all clients
- **Get**: Get a specific client by ID
- **Create**: Create a new client
- **Update**: Update an existing client
- **Delete**: Delete a client

### Project Operations

- **Get Many**: List all projects
- **Get**: Get a specific project by ID
- **Create**: Create a new project
- **Update**: Update an existing project
- **Delete**: Delete a project

### User Operations

- **Get Many**: List all users
- **Get**: Get a specific user by ID
- **Get Current**: Get the currently authenticated user
- **Create**: Create a new user
- **Update**: Update an existing user
- **Delete**: Delete a user

### Invoice Operations

- **Get Many**: List all invoices
- **Get**: Get a specific invoice by ID
- **Create**: Create a new invoice
- **Update**: Update an existing invoice
- **Delete**: Delete an invoice

### Task Operations

- **Get Many**: List all tasks
- **Get**: Get a specific task by ID
- **Create**: Create a new task
- **Update**: Update an existing task
- **Delete**: Delete a task

### Expense Operations

- **Get Many**: List all expenses
- **Get**: Get a specific expense by ID
- **Create**: Create a new expense
- **Update**: Update an existing expense
- **Delete**: Delete an expense

### Contact Operations

- **Get Many**: List all client contacts
- **Get**: Get a specific contact by ID
- **Create**: Create a new contact
- **Update**: Update an existing contact
- **Delete**: Delete a contact

## Example Workflows

### Daily Time Entry Report

1. Use **Harvest** node with **Time Entry > Get Many**
2. Set date filters for today
3. Connect to an **Email** node to send the report

### Automatic Invoice Creation

1. Trigger at end of month
2. Use **Harvest** node to get unbilled time entries
3. Calculate totals
4. Create invoice with **Harvest** node

### Sync Time Entries to Spreadsheet

1. Schedule trigger (e.g., every hour)
2. Get new time entries from Harvest
3. Append to Google Sheets or Airtable

## Development

This node is part of the [harvest-clients](https://github.com/mekanics/harvest-clients) monorepo.

```bash
# Clone the repository
git clone https://github.com/mekanics/harvest-clients.git
cd harvest-clients

# Install dependencies
pnpm install

# Build the node
pnpm --filter n8n-nodes-harvest build
```

## Resources

- [Harvest API v2 Documentation](https://help.getharvest.com/api-v2/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT

