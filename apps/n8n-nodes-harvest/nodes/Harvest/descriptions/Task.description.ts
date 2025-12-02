import type { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['task'],
    },
  },
  options: [
    { name: 'Create', value: 'create', action: 'Create a task' },
    { name: 'Delete', value: 'delete', action: 'Delete a task' },
    { name: 'Get', value: 'get', action: 'Get a task' },
    { name: 'Get Many', value: 'getMany', action: 'Get many tasks' },
    { name: 'Update', value: 'update', action: 'Update a task' },
  ],
  default: 'getMany',
};

export const taskFields: INodeProperties[] = [
  // Create required field
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['task'],
        operation: ['create'],
      },
    },
    description: 'The name of the task',
  },

  // Create additional fields
  {
    displayName: 'Additional Fields',
    name: 'taskAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['task'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Billable By Default',
        name: 'billableByDefault',
        type: 'boolean',
        default: true,
        description: 'Whether the task is billable by default when added to projects',
      },
      {
        displayName: 'Default Hourly Rate',
        name: 'defaultHourlyRate',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The default hourly rate for this task',
      },
      {
        displayName: 'Is Default',
        name: 'isDefault',
        type: 'boolean',
        default: false,
        description: 'Whether this task is automatically added to new projects',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the task is active',
      },
    ],
  },

  // Update fields
  {
    displayName: 'Update Fields',
    name: 'taskUpdateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['task'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the task',
      },
      {
        displayName: 'Billable By Default',
        name: 'billableByDefault',
        type: 'boolean',
        default: true,
        description: 'Whether the task is billable by default when added to projects',
      },
      {
        displayName: 'Default Hourly Rate',
        name: 'defaultHourlyRate',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The default hourly rate for this task',
      },
      {
        displayName: 'Is Default',
        name: 'isDefault',
        type: 'boolean',
        default: false,
        description: 'Whether this task is automatically added to new projects',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the task is active',
      },
    ],
  },
];
