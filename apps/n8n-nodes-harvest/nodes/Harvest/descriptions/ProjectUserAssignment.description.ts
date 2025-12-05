import type { INodeProperties } from 'n8n-workflow';

export const projectUserAssignmentOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['projectUserAssignment'],
    },
  },
  options: [
    { name: 'Get Many', value: 'getMany', action: 'Get many user assignments for a project' },
  ],
  default: 'getMany',
};

export const projectUserAssignmentFields: INodeProperties[] = [
  {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['projectUserAssignment'],
        operation: ['getMany'],
      },
    },
    description: 'The ID of the project to retrieve user assignments for',
  },
];



