import type { INodeProperties } from 'n8n-workflow';

export const expenseOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['expense'],
    },
  },
  options: [
    { name: 'Create', value: 'create', action: 'Create an expense' },
    { name: 'Delete', value: 'delete', action: 'Delete an expense' },
    { name: 'Get', value: 'get', action: 'Get an expense' },
    { name: 'Get Many', value: 'getMany', action: 'Get many expenses' },
    { name: 'Update', value: 'update', action: 'Update an expense' },
  ],
  default: 'getMany',
};

export const expenseFields: INodeProperties[] = [
  // Create required fields
  {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['expense'],
        operation: ['create'],
      },
    },
    description: 'The ID of the project associated with this expense',
  },
  {
    displayName: 'Expense Category ID',
    name: 'expenseCategoryId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['expense'],
        operation: ['create'],
      },
    },
    description: 'The ID of the expense category this expense is categorized under',
  },
  {
    displayName: 'Spent Date',
    name: 'spentDate',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['expense'],
        operation: ['create'],
      },
    },
    placeholder: '2024-01-15',
    description: 'The date the expense was incurred (YYYY-MM-DD format)',
  },

  // Create additional fields
  {
    displayName: 'Additional Fields',
    name: 'expenseAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['expense'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'User ID',
        name: 'userId',
        type: 'number',
        default: 0,
        description:
          'The ID of the user associated with this expense. Defaults to the authenticated user.',
      },
      {
        displayName: 'Units',
        name: 'units',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The quantity of units for unit-based expense categories',
      },
      {
        displayName: 'Total Cost',
        name: 'totalCost',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The total cost of the expense',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes about the expense',
      },
      {
        displayName: 'Billable',
        name: 'billable',
        type: 'boolean',
        default: true,
        description: 'Whether this expense is billable',
      },
    ],
  },

  // Update fields
  {
    displayName: 'Update Fields',
    name: 'expenseUpdateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['expense'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Project ID',
        name: 'projectId',
        type: 'number',
        default: 0,
        description: 'The ID of the project associated with this expense',
      },
      {
        displayName: 'Expense Category ID',
        name: 'expenseCategoryId',
        type: 'number',
        default: 0,
        description: 'The ID of the expense category this expense is categorized under',
      },
      {
        displayName: 'Spent Date',
        name: 'spentDate',
        type: 'string',
        default: '',
        placeholder: '2024-01-15',
        description: 'The date the expense was incurred (YYYY-MM-DD format)',
      },
      {
        displayName: 'Units',
        name: 'units',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The quantity of units for unit-based expense categories',
      },
      {
        displayName: 'Total Cost',
        name: 'totalCost',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The total cost of the expense',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes about the expense',
      },
      {
        displayName: 'Billable',
        name: 'billable',
        type: 'boolean',
        default: true,
        description: 'Whether this expense is billable',
      },
      {
        displayName: 'Delete Receipt',
        name: 'deleteReceipt',
        type: 'boolean',
        default: false,
        description: 'Whether to delete the attached receipt',
      },
    ],
  },

  // Filter options for getMany
  {
    displayName: 'Filter Options',
    name: 'expenseFilters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['expense'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'User ID',
        name: 'userId',
        type: 'number',
        default: 0,
        description: 'Only return expenses belonging to this user',
      },
      {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'number',
        default: 0,
        description: 'Only return expenses belonging to this client',
      },
      {
        displayName: 'Project ID',
        name: 'projectId',
        type: 'number',
        default: 0,
        description: 'Only return expenses belonging to this project',
      },
      {
        displayName: 'Is Billed',
        name: 'isBilled',
        type: 'boolean',
        default: false,
        description: 'Whether to filter by billed status',
      },
      {
        displayName: 'From Date',
        name: 'from',
        type: 'string',
        default: '',
        placeholder: '2024-01-01',
        description: 'Only return expenses with a spent_date on or after this date (YYYY-MM-DD)',
      },
      {
        displayName: 'To Date',
        name: 'to',
        type: 'string',
        default: '',
        placeholder: '2024-12-31',
        description: 'Only return expenses with a spent_date on or before this date (YYYY-MM-DD)',
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
      {
        displayName: 'Updated Since',
        name: 'updatedSince',
        type: 'dateTime',
        default: '',
        description: 'Only return expenses updated since this date',
      },
    ],
  },
];
