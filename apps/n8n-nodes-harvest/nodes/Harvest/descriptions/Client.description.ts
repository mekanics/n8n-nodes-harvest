import type { INodeProperties } from 'n8n-workflow';

export const clientOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['client'],
    },
  },
  options: [
    { name: 'Create', value: 'create', action: 'Create a client' },
    { name: 'Delete', value: 'delete', action: 'Delete a client' },
    { name: 'Get', value: 'get', action: 'Get a client' },
    { name: 'Get Many', value: 'getMany', action: 'Get many clients' },
    { name: 'Update', value: 'update', action: 'Update a client' },
  ],
  default: 'getMany',
};

export const clientFields: INodeProperties[] = [
  // Create fields
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['create'],
      },
    },
    description: 'The name of the client',
  },
  {
    displayName: 'Additional Fields',
    name: 'clientAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the client is active',
      },
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'The physical address for the client',
      },
      {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: '',
        placeholder: 'USD',
        description: 'The currency code (e.g., USD, EUR)',
      },
    ],
  },

  // Update fields
  {
    displayName: 'Update Fields',
    name: 'clientUpdateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['client'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        description: 'The name of the client',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the client is active',
      },
      {
        displayName: 'Address',
        name: 'address',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'The physical address for the client',
      },
      {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: '',
        placeholder: 'USD',
        description: 'The currency code (e.g., USD, EUR)',
      },
    ],
  },
];
