# n8n-nodes-harvest

An n8n community node for [Harvest](https://www.getharvest.com/) time tracking and invoicing.

> **Note**: This is a community-maintained node and is **not an official product from Harvest**. It is not affiliated with, endorsed by, or supported by Harvest. For official Harvest integrations, please visit [Harvest Integrations](https://www.getharvest.com/integrations).

## Why This Node?

This community node provides a **more complete implementation** than n8n's built-in Harvest integration:

- **More Resources**: Includes Company, Expense Categories, Project Assignments, and comprehensive Reports
- **Invoice PDF Downloads**: Download invoices as PDF files directly within your workflows
- **Advanced Invoice Creation**: Create invoices from tracked time and expenses with flexible date ranges and summary options
- **Complete Report Suite**: Access all Harvest reports including time reports, expense reports, uninvoiced amounts, and project budgets
- **Project Assignments**: Manage task and user assignments for projects

## Features

Full integration with Harvest API v2, supporting **14 resources**:

| Resource                 | Operations                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| Time Entries             | Get Many, Get, Create, Update, Delete, Restart Timer, Stop Timer                                       |
| Clients                  | Get Many, Get, Create, Update, Delete                                                                  |
| Company                  | Get                                                                                                    |
| Projects                 | Get Many, Get, Create, Update, Delete                                                                  |
| Tasks                    | Get Many, Get, Create, Update, Delete                                                                  |
| Users                    | Get Many, Get, Get Current, Create, Update, Delete                                                     |
| Invoices                 | Get Many, Get, Create, Update, Delete, Download PDF                                                    |
| Expenses                 | Get Many, Get, Create, Update, Delete                                                                  |
| Expense Categories       | Get Many                                                                                               |
| Contacts                 | Get Many, Get, Create, Update, Delete                                                                  |
| Project Task Assignments | Get Many                                                                                               |
| Project User Assignments | Get Many                                                                                               |
| Reports                  | Time by Client/Project/Task/Team, Expenses by Client/Project/Category/Team, Uninvoiced, Project Budget |

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

- **Get Many**: List time entries with filtering by date, user, project, client, task, billed status, and running status
- **Get**: Get a specific time entry by ID
- **Create**: Create a new time entry with project, task, date, hours, notes, and external references
- **Update**: Update an existing time entry
- **Delete**: Delete a time entry
- **Restart Timer**: Restart a stopped timer
- **Stop Timer**: Stop a running timer

### Client Operations

- **Get Many**: List all clients with pagination and filtering
- **Get**: Get a specific client by ID
- **Create**: Create a new client
- **Update**: Update an existing client
- **Delete**: Delete a client

### Company Operations

- **Get**: Retrieve your company information including name, domain, and settings

### Project Operations

- **Get Many**: List all projects with filtering options
- **Get**: Get a specific project by ID
- **Create**: Create a new project
- **Update**: Update an existing project
- **Delete**: Delete a project

### Task Operations

- **Get Many**: List all tasks
- **Get**: Get a specific task by ID
- **Create**: Create a new task
- **Update**: Update an existing task
- **Delete**: Delete a task

### User Operations

- **Get Many**: List all users
- **Get**: Get a specific user by ID
- **Get Current**: Get the currently authenticated user
- **Create**: Create a new user
- **Update**: Update an existing user
- **Delete**: Delete a user

### Invoice Operations

- **Get Many**: List invoices with filtering by client, project, state, and date range
- **Get**: Get a specific invoice by ID
- **Create**: Create invoices either as free-form with line items or from tracked time and expenses
- **Update**: Update an existing invoice
- **Delete**: Delete an invoice
- **Download PDF**: Download an invoice as a PDF file using the client key

### Expense Operations

- **Get Many**: List all expenses with filtering
- **Get**: Get a specific expense by ID
- **Create**: Create a new expense
- **Update**: Update an existing expense
- **Delete**: Delete an expense

### Expense Category Operations

- **Get Many**: List all expense categories with filtering by active status

### Contact Operations

- **Get Many**: List all client contacts
- **Get**: Get a specific contact by ID
- **Create**: Create a new contact
- **Update**: Update an existing contact
- **Delete**: Delete a contact

### Project Task Assignment Operations

- **Get Many**: List all task assignments for a specific project

### Project User Assignment Operations

- **Get Many**: List all user assignments for a specific project

### Report Operations

Access comprehensive reporting data with date range filtering:

**Time Reports**

- **Time by Client**: Get time tracked grouped by client
- **Time by Project**: Get time tracked grouped by project
- **Time by Task**: Get time tracked grouped by task
- **Time by Team**: Get time tracked grouped by team member

**Expense Reports**

- **Expenses by Client**: Get expenses grouped by client
- **Expenses by Project**: Get expenses grouped by project
- **Expenses by Category**: Get expenses grouped by category
- **Expenses by Team**: Get expenses grouped by team member

**Other Reports**

- **Uninvoiced**: Get uninvoiced time and expenses
- **Project Budget**: Get project budget status and consumption

## Example Workflows

### Weekly Hours Report Workflow

A comprehensive automated workflow for tracking project budget consumption and sending weekly reports:

**Features:**

- Runs every Monday at 8:00 AM
- Fetches project budget directly from Harvest
- Tracks hours across last week, month-to-date, and year-to-date
- Calculates recommended workload (days/week) to use full budget
- Sends beautiful HTML email reports with progress bars

**Setup:**

1. Import `examples/n8n-workflows/weekly-hours-report.json`
2. Configure your project ID in the Config node
3. Set up Harvest and SMTP credentials
4. Ensure your Harvest project has a budget configured

**What it includes:**

- **Budget from Harvest**: No hardcoding - reads budget directly from project settings
- **Pace Indicators**: Shows if you're on track to use the full budget
- **Workload Calculator**: Calculates how many days/week 1 person should work
- **Visual Progress**: Progress bars and status badges in email
- **Complete Documentation**: Sticky notes explain every step

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

### Download Invoice PDFs

1. Use **Harvest** node with **Invoice > Get** to retrieve invoice details
2. Extract the `client_key` from the response
3. Use **Harvest** node with **Invoice > Download PDF** to download the PDF
4. Save or email the PDF attachment

### Weekly Project Budget Report

1. Schedule trigger (every Monday)
2. Use **Harvest** node with **Report > Project Budget**
3. Filter for active projects
4. Send summary via Slack or Email

## Development

```bash
# Clone the repository
git clone https://github.com/mekanics/n8n-nodes-harvest.git
cd n8n-nodes-harvest

# Install dependencies
pnpm install

# Build the node
pnpm build
```

## Resources

- [Harvest API v2 Documentation](https://help.getharvest.com/api-v2/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT

