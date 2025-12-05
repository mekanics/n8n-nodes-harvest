import type { INodeProperties } from 'n8n-workflow';

export const projectTaskAssignmentOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['projectTaskAssignment'],
    },
  },
  options: [
    { name: 'Get Many', value: 'getMany', action: 'Get many task assignments for a project' },
  ],
  default: 'getMany',
};

export const projectTaskAssignmentFields: INodeProperties[] = [
  {
    displayName: 'Project ID',
    name: 'projectId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['projectTaskAssignment'],
        operation: ['getMany'],
      },
    },
    description: 'The ID of the project to retrieve task assignments for',
  },
];



