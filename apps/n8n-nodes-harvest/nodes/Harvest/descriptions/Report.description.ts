import type { INodeProperties } from 'n8n-workflow';

export const reportOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['report'],
    },
  },
  options: [
    // Time Reports
    {
      name: 'Get Time Report by Client',
      value: 'getTimeByClient',
      action: 'Get time report grouped by client',
    },
    {
      name: 'Get Time Report by Project',
      value: 'getTimeByProject',
      action: 'Get time report grouped by project',
    },
    {
      name: 'Get Time Report by Task',
      value: 'getTimeByTask',
      action: 'Get time report grouped by task',
    },
    {
      name: 'Get Time Report by Team',
      value: 'getTimeByTeam',
      action: 'Get time report grouped by team member',
    },
    // Expense Reports
    {
      name: 'Get Expense Report by Client',
      value: 'getExpensesByClient',
      action: 'Get expense report grouped by client',
    },
    {
      name: 'Get Expense Report by Project',
      value: 'getExpensesByProject',
      action: 'Get expense report grouped by project',
    },
    {
      name: 'Get Expense Report by Category',
      value: 'getExpensesByCategory',
      action: 'Get expense report grouped by category',
    },
    {
      name: 'Get Expense Report by Team',
      value: 'getExpensesByTeam',
      action: 'Get expense report grouped by team member',
    },
    // Other Reports
    {
      name: 'Get Uninvoiced Report',
      value: 'getUninvoiced',
      action: 'Get uninvoiced time and expenses report',
    },
    {
      name: 'Get Project Budget Report',
      value: 'getProjectBudget',
      action: 'Get project budget report',
    },
  ],
  default: 'getTimeByClient',
};

export const reportFields: INodeProperties[] = [
  // Date range fields for time-based reports
  {
    displayName: 'From Date',
    name: 'fromDate',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['report'],
        operation: [
          'getTimeByClient',
          'getTimeByProject',
          'getTimeByTask',
          'getTimeByTeam',
          'getExpensesByClient',
          'getExpensesByProject',
          'getExpensesByCategory',
          'getExpensesByTeam',
          'getUninvoiced',
        ],
      },
    },
    placeholder: '2024-01-01',
    description: 'Start date for the report (YYYY-MM-DD format)',
  },
  {
    displayName: 'To Date',
    name: 'toDate',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['report'],
        operation: [
          'getTimeByClient',
          'getTimeByProject',
          'getTimeByTask',
          'getTimeByTeam',
          'getExpensesByClient',
          'getExpensesByProject',
          'getExpensesByCategory',
          'getExpensesByTeam',
          'getUninvoiced',
        ],
      },
    },
    placeholder: '2024-12-31',
    description: 'End date for the report (YYYY-MM-DD format)',
  },

  // Pagination options for all reports
  {
    displayName: 'Options',
    name: 'reportOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['report'],
      },
    },
    options: [
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether to return only active projects (for Project Budget Report)',
        displayOptions: {
          show: {
            '/operation': ['getProjectBudget'],
          },
        },
      },
      {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        description: 'Page number for pagination',
      },
      {
        displayName: 'Per Page',
        name: 'perPage',
        type: 'number',
        default: 100,
        description: 'Number of records to return per page (max 2000)',
      },
    ],
  },
];



