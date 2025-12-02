import type { INodeProperties } from 'n8n-workflow';

export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    { name: 'Client', value: 'client' },
    { name: 'Company', value: 'company' },
    { name: 'Contact', value: 'contact' },
    { name: 'Expense', value: 'expense' },
    { name: 'Expense Category', value: 'expenseCategory' },
    { name: 'Invoice', value: 'invoice' },
    { name: 'Project', value: 'project' },
    { name: 'Project Task Assignment', value: 'projectTaskAssignment' },
    { name: 'Project User Assignment', value: 'projectUserAssignment' },
    { name: 'Report', value: 'report' },
    { name: 'Task', value: 'task' },
    { name: 'Time Entry', value: 'timeEntry' },
    { name: 'User', value: 'user' },
  ],
  default: 'timeEntry',
};

export const idField: INodeProperties = {
  displayName: 'ID',
  name: 'id',
  type: 'number',
  default: 0,
  required: true,
  displayOptions: {
    show: {
      operation: ['get', 'update', 'delete', 'restart', 'stop'],
    },
    hide: {
      resource: ['company'],
    },
  },
  description: 'The ID of the resource',
};

export const additionalFieldsForGetMany: INodeProperties = {
  displayName: 'Additional Fields',
  name: 'additionalFields',
  type: 'collection',
  placeholder: 'Add Field',
  default: {},
  displayOptions: {
    show: {
      operation: ['getMany'],
    },
    hide: {
      resource: ['invoice', 'timeEntry', 'expense', 'contact', 'project'],
    },
  },
  options: [
    {
      displayName: 'Is Active',
      name: 'isActive',
      type: 'boolean',
      default: true,
      description: 'Whether to return only active records',
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
      description: 'Only return records updated since this date',
    },
  ],
};
