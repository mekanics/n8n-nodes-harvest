import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['contact'],
    },
  },
  options: [
    { name: 'Create', value: 'create', action: 'Create a contact' },
    { name: 'Delete', value: 'delete', action: 'Delete a contact' },
    { name: 'Get', value: 'get', action: 'Get a contact' },
    { name: 'Get Many', value: 'getMany', action: 'Get many contacts' },
    { name: 'Update', value: 'update', action: 'Update a contact' },
  ],
  default: 'getMany',
};

export const contactFields: INodeProperties[] = [
  // Create fields
  {
    displayName: 'Client ID',
    name: 'clientId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    description: 'The ID of the client this contact belongs to',
  },
  {
    displayName: 'First Name',
    name: 'firstName',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    description: 'The first name of the contact',
  },
  {
    displayName: 'Additional Fields',
    name: 'contactAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        description: 'The title of the contact',
      },
      {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        default: '',
        description: 'The last name of the contact',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'The email address of the contact',
      },
      {
        displayName: 'Phone Office',
        name: 'phoneOffice',
        type: 'string',
        default: '',
        description: 'The office phone number of the contact',
      },
      {
        displayName: 'Phone Mobile',
        name: 'phoneMobile',
        type: 'string',
        default: '',
        description: 'The mobile phone number of the contact',
      },
      {
        displayName: 'Fax',
        name: 'fax',
        type: 'string',
        default: '',
        description: 'The fax number of the contact',
      },
    ],
  },

  // Update fields
  {
    displayName: 'Update Fields',
    name: 'contactUpdateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        description: 'The title of the contact',
      },
      {
        displayName: 'First Name',
        name: 'firstName',
        type: 'string',
        default: '',
        description: 'The first name of the contact',
      },
      {
        displayName: 'Last Name',
        name: 'lastName',
        type: 'string',
        default: '',
        description: 'The last name of the contact',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        placeholder: 'name@email.com',
        default: '',
        description: 'The email address of the contact',
      },
      {
        displayName: 'Phone Office',
        name: 'phoneOffice',
        type: 'string',
        default: '',
        description: 'The office phone number of the contact',
      },
      {
        displayName: 'Phone Mobile',
        name: 'phoneMobile',
        type: 'string',
        default: '',
        description: 'The mobile phone number of the contact',
      },
      {
        displayName: 'Fax',
        name: 'fax',
        type: 'string',
        default: '',
        description: 'The fax number of the contact',
      },
    ],
  },

  // Filter options for getMany
  {
    displayName: 'Filter Options',
    name: 'contactFilters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['contact'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'number',
        default: 0,
        description: 'Only return contacts belonging to this client',
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
        description: 'Only return contacts updated since this date',
      },
    ],
  },
];
