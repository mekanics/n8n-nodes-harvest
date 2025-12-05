# Examples

This directory contains example workflows and integrations for the Harvest clients monorepo.

## n8n Workflows

### Weekly Hours Report Workflow

**Location:** `examples/n8n-workflows/weekly-hours-report.json`

A comprehensive automated workflow for tracking project budget consumption and sending weekly reports:

**Features:**

- Runs every Monday at 8:00 AM
- Fetches project budget directly from Harvest
- Tracks hours across last week, month-to-date, and year-to-date
- Calculates recommended workload (days/week) to use full budget
- Sends beautiful HTML email reports with progress bars

**Setup:**

1. Import `examples/n8n-workflows/weekly-hours-report.json` into n8n
2. Configure your project ID in the Config node
3. Set up Harvest and SMTP credentials
4. Ensure your Harvest project has a budget configured

**What it includes:**

- **Budget from Harvest**: No hardcoding - reads budget directly from project settings
- **Pace Indicators**: Shows if you're on track to use the full budget
- **Workload Calculator**: Calculates how many days/week 1 person should work
- **Visual Progress**: Progress bars and status badges in email
- **Complete Documentation**: Sticky notes explain every step

**Requirements:**

- n8n instance
- [n8n-nodes-harvest](https://github.com/mekanics/harvest-clients/tree/main/apps/n8n-nodes-harvest) community node
- Harvest account with API access
- SMTP server for sending emails

## Other Examples

More examples will be added as the monorepo grows.
