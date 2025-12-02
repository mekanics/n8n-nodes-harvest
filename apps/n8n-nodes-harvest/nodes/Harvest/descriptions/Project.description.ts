import type { INodeProperties } from 'n8n-workflow';

export const projectOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['project'],
    },
  },
  options: [
    { name: 'Create', value: 'create', action: 'Create a project' },
    { name: 'Delete', value: 'delete', action: 'Delete a project' },
    { name: 'Get', value: 'get', action: 'Get a project' },
    { name: 'Get Many', value: 'getMany', action: 'Get many projects' },
    { name: 'Update', value: 'update', action: 'Update a project' },
  ],
  default: 'getMany',
};

export const projectFields: INodeProperties[] = [
  // Create required fields
  {
    displayName: 'Client ID',
    name: 'clientId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    description: 'The ID of the client this project belongs to',
  },
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    description: 'The name of the project',
  },
  {
    displayName: 'Is Billable',
    name: 'isBillable',
    type: 'boolean',
    default: true,
    required: true,
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    description: 'Whether the project is billable',
  },
  {
    displayName: 'Bill By',
    name: 'billBy',
    type: 'options',
    default: 'Project',
    required: true,
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Project', value: 'Project' },
      { name: 'Tasks', value: 'Tasks' },
      { name: 'People', value: 'People' },
      { name: 'None', value: 'none' },
    ],
    description: 'The method by which the project is invoiced',
  },
  {
    displayName: 'Budget By',
    name: 'budgetBy',
    type: 'options',
    default: 'project',
    required: true,
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Project (Total Hours)', value: 'project' },
      { name: 'Project (Total Cost)', value: 'project_cost' },
      { name: 'Task', value: 'task' },
      { name: 'Task (Fees)', value: 'task_fees' },
      { name: 'Person', value: 'person' },
      { name: 'None', value: 'none' },
    ],
    description: 'The budgeting method for the project',
  },

  // Create additional fields
  {
    displayName: 'Additional Fields',
    name: 'projectAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'The project code',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the project is active',
      },
      {
        displayName: 'Is Fixed Fee',
        name: 'isFixedFee',
        type: 'boolean',
        default: false,
        description: 'Whether the project is a fixed-fee project',
      },
      {
        displayName: 'Hourly Rate',
        name: 'hourlyRate',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The hourly rate for the project',
      },
      {
        displayName: 'Budget',
        name: 'budget',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The budget for the project',
      },
      {
        displayName: 'Budget Is Monthly',
        name: 'budgetIsMonthly',
        type: 'boolean',
        default: false,
        description: 'Whether the budget resets every month',
      },
      {
        displayName: 'Notify When Over Budget',
        name: 'notifyWhenOverBudget',
        type: 'boolean',
        default: false,
        description: 'Whether to send a notification when the project goes over budget',
      },
      {
        displayName: 'Over Budget Notification Percentage',
        name: 'overBudgetNotificationPercentage',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 80,
        description: 'Percentage of budget to trigger notification',
      },
      {
        displayName: 'Show Budget to All',
        name: 'showBudgetToAll',
        type: 'boolean',
        default: false,
        description: 'Whether to show the budget to all users',
      },
      {
        displayName: 'Cost Budget',
        name: 'costBudget',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The cost budget for the project',
      },
      {
        displayName: 'Cost Budget Include Expenses',
        name: 'costBudgetIncludeExpenses',
        type: 'boolean',
        default: false,
        description: 'Whether to include expenses in the cost budget',
      },
      {
        displayName: 'Fee',
        name: 'fee',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The fixed fee for the project (for fixed-fee projects)',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes about the project',
      },
      {
        displayName: 'Starts On',
        name: 'startsOn',
        type: 'string',
        default: '',
        placeholder: '2024-01-01',
        description: 'The start date of the project (YYYY-MM-DD)',
      },
      {
        displayName: 'Ends On',
        name: 'endsOn',
        type: 'string',
        default: '',
        placeholder: '2024-12-31',
        description: 'The end date of the project (YYYY-MM-DD)',
      },
    ],
  },

  // Update fields
  {
    displayName: 'Update Fields',
    name: 'projectUpdateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'number',
        default: 0,
        description: 'The ID of the client this project belongs to',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the project',
      },
      {
        displayName: 'Code',
        name: 'code',
        type: 'string',
        default: '',
        description: 'The project code',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the project is active',
      },
      {
        displayName: 'Is Billable',
        name: 'isBillable',
        type: 'boolean',
        default: true,
        description: 'Whether the project is billable',
      },
      {
        displayName: 'Is Fixed Fee',
        name: 'isFixedFee',
        type: 'boolean',
        default: false,
        description: 'Whether the project is a fixed-fee project',
      },
      {
        displayName: 'Bill By',
        name: 'billBy',
        type: 'options',
        default: 'Project',
        options: [
          { name: 'Project', value: 'Project' },
          { name: 'Tasks', value: 'Tasks' },
          { name: 'People', value: 'People' },
          { name: 'None', value: 'none' },
        ],
        description: 'The method by which the project is invoiced',
      },
      {
        displayName: 'Hourly Rate',
        name: 'hourlyRate',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The hourly rate for the project',
      },
      {
        displayName: 'Budget',
        name: 'budget',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The budget for the project',
      },
      {
        displayName: 'Budget By',
        name: 'budgetBy',
        type: 'options',
        default: 'project',
        options: [
          { name: 'Project (Total Hours)', value: 'project' },
          { name: 'Project (Total Cost)', value: 'project_cost' },
          { name: 'Task', value: 'task' },
          { name: 'Task (Fees)', value: 'task_fees' },
          { name: 'Person', value: 'person' },
          { name: 'None', value: 'none' },
        ],
        description: 'The budgeting method for the project',
      },
      {
        displayName: 'Budget Is Monthly',
        name: 'budgetIsMonthly',
        type: 'boolean',
        default: false,
        description: 'Whether the budget resets every month',
      },
      {
        displayName: 'Notify When Over Budget',
        name: 'notifyWhenOverBudget',
        type: 'boolean',
        default: false,
        description: 'Whether to send a notification when the project goes over budget',
      },
      {
        displayName: 'Over Budget Notification Percentage',
        name: 'overBudgetNotificationPercentage',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 80,
        description: 'Percentage of budget to trigger notification',
      },
      {
        displayName: 'Show Budget to All',
        name: 'showBudgetToAll',
        type: 'boolean',
        default: false,
        description: 'Whether to show the budget to all users',
      },
      {
        displayName: 'Cost Budget',
        name: 'costBudget',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The cost budget for the project',
      },
      {
        displayName: 'Cost Budget Include Expenses',
        name: 'costBudgetIncludeExpenses',
        type: 'boolean',
        default: false,
        description: 'Whether to include expenses in the cost budget',
      },
      {
        displayName: 'Fee',
        name: 'fee',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The fixed fee for the project (for fixed-fee projects)',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes about the project',
      },
      {
        displayName: 'Starts On',
        name: 'startsOn',
        type: 'string',
        default: '',
        placeholder: '2024-01-01',
        description: 'The start date of the project (YYYY-MM-DD)',
      },
      {
        displayName: 'Ends On',
        name: 'endsOn',
        type: 'string',
        default: '',
        placeholder: '2024-12-31',
        description: 'The end date of the project (YYYY-MM-DD)',
      },
    ],
  },

  // Filter options for getMany
  {
    displayName: 'Filter Options',
    name: 'projectFilters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['project'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether to return only active projects',
      },
      {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'number',
        default: 0,
        description: 'Only return projects belonging to this client',
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
        description: 'Only return projects updated since this date',
      },
    ],
  },
];
