import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['user'],
    },
  },
  options: [
    { name: 'Create', value: 'create', action: 'Create a user' },
    { name: 'Delete', value: 'delete', action: 'Delete a user' },
    { name: 'Get', value: 'get', action: 'Get a user' },
    { name: 'Get Current', value: 'getCurrent', action: 'Get current user' },
    { name: 'Get Many', value: 'getMany', action: 'Get many users' },
    { name: 'Update', value: 'update', action: 'Update a user' },
  ],
  default: 'getMany',
};

export const userFields: INodeProperties[] = [
  // Create fields
  {
    displayName: 'First Name',
    name: 'firstName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['create'],
      },
    },
    description: 'The first name of the user',
  },
  {
    displayName: 'Last Name',
    name: 'lastName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['create'],
      },
    },
    description: 'The last name of the user',
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    placeholder: 'name@email.com',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['create'],
      },
    },
    description: 'The email address of the user',
  },
  {
    displayName: 'Additional Fields',
    name: 'userAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Telephone',
        name: 'telephone',
        type: 'string',
        default: '',
        description: 'The telephone number of the user',
      },
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        default: '',
        placeholder: 'America/New_York',
        description: 'The timezone of the user (e.g., America/New_York)',
      },
      {
        displayName: 'Has Access to All Future Projects',
        name: 'hasAccessToAllFutureProjects',
        type: 'boolean',
        default: false,
        description: 'Whether the user should be automatically added to future projects',
      },
      {
        displayName: 'Is Contractor',
        name: 'isContractor',
        type: 'boolean',
        default: false,
        description: 'Whether the user is a contractor',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: true,
        description: 'Whether the user is active',
      },
      {
        displayName: 'Default Hourly Rate',
        name: 'defaultHourlyRate',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The default hourly rate for the user',
      },
      {
        displayName: 'Cost Rate',
        name: 'costRate',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The cost rate for the user',
      },
      {
        displayName: 'Roles',
        name: 'roles',
        type: 'multiOptions',
        default: [],
        options: [
          { name: 'Administrator', value: 'administrator' },
          { name: 'Manager', value: 'manager' },
          { name: 'Member', value: 'member' },
        ],
        description: 'The roles of the user',
      },
      {
        displayName: 'Access Roles',
        name: 'accessRoles',
        type: 'multiOptions',
        default: [],
        options: [
          { name: 'Administrator', value: 'administrator' },
          { name: 'Manager', value: 'manager' },
          { name: 'Member', value: 'member' },
        ],
        description: 'The access roles of the user',
      },
    ],
  },

  // Update fields
  {
    displayName: 'Update Fields',
    name: 'userUpdateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['user'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        default: '',
        description: 'The first name of the user',
      },
      {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        default: '',
        description: 'The last name of the user',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'The email address of the user',
      },
      {
        displayName: 'Telephone',
        name: 'telephone',
        type: 'string',
        default: '',
        description: 'The telephone number of the user',
      },
      {
        displayName: 'Timezone',
        name: 'timezone',
        type: 'string',
        default: '',
        placeholder: 'America/New_York',
        description: 'The timezone of the user (e.g., America/New_York)',
      },
      {
        displayName: 'Has Access to All Future Projects',
        name: 'hasAccessToAllFutureProjects',
        type: 'boolean',
        default: false,
        description: 'Whether the user should be automatically added to future projects',
      },
      {
        displayName: 'Is Contractor',
        name: 'isContractor',
        type: 'boolean',
        default: false,
        description: 'Whether the user is a contractor',
      },
      {
        displayName: 'Is Active',
        name: 'isActive',
        type: 'boolean',
        default: false,
        description: 'Whether the user is active',
      },
      {
        displayName: 'Default Hourly Rate',
        name: 'defaultHourlyRate',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The default hourly rate for the user',
      },
      {
        displayName: 'Cost Rate',
        name: 'costRate',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'The cost rate for the user',
      },
      {
        displayName: 'Roles',
        name: 'roles',
        type: 'multiOptions',
        default: [],
        options: [
          { name: 'Administrator', value: 'administrator' },
          { name: 'Manager', value: 'manager' },
          { name: 'Member', value: 'member' },
        ],
        description: 'The roles of the user',
      },
      {
        displayName: 'Access Roles',
        name: 'accessRoles',
        type: 'multiOptions',
        default: [],
        options: [
          { name: 'Administrator', value: 'administrator' },
          { name: 'Manager', value: 'manager' },
          { name: 'Member', value: 'member' },
        ],
        description: 'The access roles of the user',
      },
    ],
  },
];
