import type { INodeProperties } from 'n8n-workflow';

export const timeEntryOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['timeEntry'],
    },
  },
  options: [
    { name: 'Create', value: 'create', action: 'Create a time entry' },
    { name: 'Delete', value: 'delete', action: 'Delete a time entry' },
    { name: 'Get', value: 'get', action: 'Get a time entry' },
    { name: 'Get Many', value: 'getMany', action: 'Get many time entries' },
    { name: 'Restart', value: 'restart', action: 'Restart a time entry' },
    { name: 'Stop', value: 'stop', action: 'Stop a time entry' },
    { name: 'Update', value: 'update', action: 'Update a time entry' },
  ],
  default: 'getMany',
};

export const timeEntryFields: INodeProperties[] = [
  // Create required fields
  {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['create'],
      },
    },
    description: 'The ID of the project to associate with the time entry',
  },
  {
    displayName: 'Task ID',
    name: 'taskId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['create'],
      },
    },
    description: 'The ID of the task to associate with the time entry',
  },
  {
    displayName: 'Spent Date',
    name: 'spentDate',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['create'],
      },
    },
    placeholder: '2024-01-15',
    description: 'The date the time entry was spent (YYYY-MM-DD format)',
  },

  // Create additional fields
  {
    displayName: 'Additional Fields',
    name: 'timeEntryAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['timeEntry'],
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
          'The ID of the user to associate with the time entry. Defaults to the authenticated user.',
      },
      {
        displayName: 'Hours',
        name: 'hours',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The number of hours tracked',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes about the time entry',
      },
      {
        displayName: 'Started Time',
        name: 'startedTime',
        type: 'string',
        default: '',
        placeholder: '09:00',
        description: 'Time of day in HH:MM format (24 hour)',
      },
      {
        displayName: 'Ended Time',
        name: 'endedTime',
        type: 'string',
        default: '',
        placeholder: '17:00',
        description: 'Time of day in HH:MM format (24 hour)',
      },
      {
        displayName: 'External Reference ID',
        name: 'externalReferenceId',
        type: 'string',
        default: '',
        description: 'External reference ID for integration purposes',
      },
      {
        displayName: 'External Reference Group ID',
        name: 'externalReferenceGroupId',
        type: 'string',
        default: '',
        description: 'External reference group ID for integration purposes',
      },
      {
        displayName: 'External Reference Permalink',
        name: 'externalReferencePermalink',
        type: 'string',
        default: '',
        description: 'External reference permalink URL',
      },
    ],
  },

  // Update fields
  {
    displayName: 'Update Fields',
    name: 'timeEntryUpdateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Project ID',
        name: 'projectId',
        type: 'number',
        default: 0,
        description: 'The ID of the project to associate with the time entry',
      },
      {
        displayName: 'Task ID',
        name: 'taskId',
        type: 'number',
        default: 0,
        description: 'The ID of the task to associate with the time entry',
      },
      {
        displayName: 'Spent Date',
        name: 'spentDate',
        type: 'string',
        default: '',
        placeholder: '2024-01-15',
        description: 'The date the time entry was spent (YYYY-MM-DD format)',
      },
      {
        displayName: 'Hours',
        name: 'hours',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The number of hours tracked',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Notes about the time entry',
      },
      {
        displayName: 'Started Time',
        name: 'startedTime',
        type: 'string',
        default: '',
        placeholder: '09:00',
        description: 'Time of day in HH:MM format (24 hour)',
      },
      {
        displayName: 'Ended Time',
        name: 'endedTime',
        type: 'string',
        default: '',
        placeholder: '17:00',
        description: 'Time of day in HH:MM format (24 hour)',
      },
      {
        displayName: 'External Reference ID',
        name: 'externalReferenceId',
        type: 'string',
        default: '',
        description: 'External reference ID for integration purposes',
      },
      {
        displayName: 'External Reference Group ID',
        name: 'externalReferenceGroupId',
        type: 'string',
        default: '',
        description: 'External reference group ID for integration purposes',
      },
      {
        displayName: 'External Reference Permalink',
        name: 'externalReferencePermalink',
        type: 'string',
        default: '',
        description: 'External reference permalink URL',
      },
    ],
  },

  // Filter options for getMany
  {
    displayName: 'Filter Options',
    name: 'timeEntryFilters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['timeEntry'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'User ID',
        name: 'userId',
        type: 'number',
        default: 0,
        description: 'Only return time entries belonging to this user',
      },
      {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'number',
        default: 0,
        description: 'Only return time entries belonging to this client',
      },
      {
        displayName: 'Project ID',
        name: 'projectId',
        type: 'number',
        default: 0,
        description: 'Only return time entries belonging to this project',
      },
      {
        displayName: 'Task ID',
        name: 'taskId',
        type: 'number',
        default: 0,
        description: 'Only return time entries belonging to this task',
      },
      {
        displayName: 'External Reference ID',
        name: 'externalReferenceId',
        type: 'string',
        default: '',
        description: 'Only return time entries with this external reference ID',
      },
      {
        displayName: 'Is Billed',
        name: 'isBilled',
        type: 'boolean',
        default: false,
        description: 'Whether to filter by billed status',
      },
      {
        displayName: 'Is Running',
        name: 'isRunning',
        type: 'boolean',
        default: false,
        description: 'Whether to filter by running status',
      },
      {
        displayName: 'From Date',
        name: 'from',
        type: 'string',
        default: '',
        placeholder: '2024-01-01',
        description:
          'Only return time entries with a spent_date on or after this date (YYYY-MM-DD)',
      },
      {
        displayName: 'To Date',
        name: 'to',
        type: 'string',
        default: '',
        placeholder: '2024-12-31',
        description:
          'Only return time entries with a spent_date on or before this date (YYYY-MM-DD)',
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
        description: 'Only return time entries updated since this date',
      },
    ],
  },
];
