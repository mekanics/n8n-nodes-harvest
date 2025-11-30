import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { createHarvestClient } from 'harvest-client';

export class Harvest implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Harvest',
    name: 'harvest',
    icon: 'file:harvest.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Harvest API for time tracking and invoicing',
    defaults: {
      name: 'Harvest',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'harvestApi',
        required: true,
      },
    ],
    properties: [
      // Resource
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          { name: 'Client', value: 'client' },
          { name: 'Contact', value: 'contact' },
          { name: 'Expense', value: 'expense' },
          { name: 'Invoice', value: 'invoice' },
          { name: 'Project', value: 'project' },
          { name: 'Task', value: 'task' },
          { name: 'Time Entry', value: 'timeEntry' },
          { name: 'User', value: 'user' },
        ],
        default: 'timeEntry',
      },

      // Operations - Time Entry
      {
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
      },

      // Operations - Client
      {
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
      },

      // Operations - Project
      {
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
      },

      // Operations - Task
      {
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
      },

      // Operations - User
      {
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
      },

      // Operations - Invoice
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['invoice'],
          },
        },
        options: [
          { name: 'Create', value: 'create', action: 'Create an invoice' },
          { name: 'Delete', value: 'delete', action: 'Delete an invoice' },
          { name: 'Get', value: 'get', action: 'Get an invoice' },
          { name: 'Get Many', value: 'getMany', action: 'Get many invoices' },
          { name: 'Update', value: 'update', action: 'Update an invoice' },
        ],
        default: 'getMany',
      },

      // Operations - Expense
      {
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
      },

      // Operations - Contact
      {
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
      },

      // Fields - ID (for get, update, delete operations)
      {
        displayName: 'ID',
        name: 'id',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
          show: {
            operation: ['get', 'update', 'delete', 'restart', 'stop'],
          },
        },
        description: 'The ID of the resource',
      },

      // Fields - Time Entry Create
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
      {
        displayName: 'Hours',
        name: 'hours',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        displayOptions: {
          show: {
            resource: ['timeEntry'],
            operation: ['create'],
          },
        },
        description: 'The number of hours tracked',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        default: '',
        displayOptions: {
          show: {
            resource: ['timeEntry'],
            operation: ['create', 'update'],
          },
        },
        description: 'Notes about the time entry',
      },

      // Fields - Client Create
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

      // Additional Options
      {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
          show: {
            operation: ['getMany'],
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
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const credentials = await this.getCredentials('harvestApi');
    const client = createHarvestClient({
      accountId: credentials.accountId as string,
      accessToken: credentials.accessToken as string,
    });

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData: unknown;

        // Time Entry operations
        if (resource === 'timeEntry') {
          if (operation === 'getMany') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              isActive?: boolean;
              page?: number;
              perPage?: number;
              updatedSince?: string;
            };

            const { data, error } = await client.GET('/time_entries', {
              params: {
                query: {
                  is_active: additionalFields.isActive,
                  page: additionalFields.page,
                  per_page: additionalFields.perPage,
                  updated_since: additionalFields.updatedSince,
                },
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data?.time_entries;
          } else if (operation === 'get') {
            const timeEntryId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.GET('/time_entries/{timeEntryId}', {
              params: { path: { timeEntryId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'create') {
            const projectId = this.getNodeParameter('projectId', i) as number;
            const taskId = this.getNodeParameter('taskId', i) as number;
            const spentDate = this.getNodeParameter('spentDate', i) as string;
            const hours = this.getNodeParameter('hours', i) as number;
            const notes = this.getNodeParameter('notes', i) as string;

            const { data, error } = await client.POST('/time_entries', {
              body: {
                project_id: projectId,
                task_id: taskId,
                spent_date: spentDate,
                hours: hours || undefined,
                notes: notes || undefined,
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'delete') {
            const timeEntryId = this.getNodeParameter('id', i) as number;
            const { error } = await client.DELETE('/time_entries/{timeEntryId}', {
              params: { path: { timeEntryId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = { success: true };
          } else if (operation === 'restart') {
            const timeEntryId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.PATCH('/time_entries/{timeEntryId}/restart', {
              params: { path: { timeEntryId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'stop') {
            const timeEntryId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.PATCH('/time_entries/{timeEntryId}/stop', {
              params: { path: { timeEntryId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          }
        }

        // Client operations
        if (resource === 'client') {
          if (operation === 'getMany') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              isActive?: boolean;
              page?: number;
              perPage?: number;
              updatedSince?: string;
            };

            const { data, error } = await client.GET('/clients', {
              params: {
                query: {
                  is_active: additionalFields.isActive,
                  page: additionalFields.page,
                  per_page: additionalFields.perPage,
                  updated_since: additionalFields.updatedSince,
                },
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data?.clients;
          } else if (operation === 'get') {
            const clientId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.GET('/clients/{clientId}', {
              params: { path: { clientId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'create') {
            const name = this.getNodeParameter('name', i) as string;
            const { data, error } = await client.POST('/clients', {
              body: { name },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'delete') {
            const clientId = this.getNodeParameter('id', i) as number;
            const { error } = await client.DELETE('/clients/{clientId}', {
              params: { path: { clientId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = { success: true };
          }
        }

        // Project operations
        if (resource === 'project') {
          if (operation === 'getMany') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              isActive?: boolean;
              page?: number;
              perPage?: number;
              updatedSince?: string;
            };

            const { data, error } = await client.GET('/projects', {
              params: {
                query: {
                  is_active: additionalFields.isActive,
                  page: additionalFields.page,
                  per_page: additionalFields.perPage,
                  updated_since: additionalFields.updatedSince,
                },
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data?.projects;
          } else if (operation === 'get') {
            const projectId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.GET('/projects/{projectId}', {
              params: { path: { projectId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'delete') {
            const projectId = this.getNodeParameter('id', i) as number;
            const { error } = await client.DELETE('/projects/{projectId}', {
              params: { path: { projectId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = { success: true };
          }
        }

        // User operations
        if (resource === 'user') {
          if (operation === 'getMany') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              isActive?: boolean;
              page?: number;
              perPage?: number;
              updatedSince?: string;
            };

            const { data, error } = await client.GET('/users', {
              params: {
                query: {
                  is_active: additionalFields.isActive,
                  page: additionalFields.page,
                  per_page: additionalFields.perPage,
                  updated_since: additionalFields.updatedSince,
                },
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data?.users;
          } else if (operation === 'get') {
            const userId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.GET('/users/{userId}', {
              params: { path: { userId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'getCurrent') {
            const { data, error } = await client.GET('/users/me');

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'delete') {
            const userId = this.getNodeParameter('id', i) as number;
            const { error } = await client.DELETE('/users/{userId}', {
              params: { path: { userId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = { success: true };
          }
        }

        // Task operations
        if (resource === 'task') {
          if (operation === 'getMany') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              isActive?: boolean;
              page?: number;
              perPage?: number;
              updatedSince?: string;
            };

            const { data, error } = await client.GET('/tasks', {
              params: {
                query: {
                  is_active: additionalFields.isActive,
                  page: additionalFields.page,
                  per_page: additionalFields.perPage,
                  updated_since: additionalFields.updatedSince,
                },
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data?.tasks;
          } else if (operation === 'get') {
            const taskId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.GET('/tasks/{taskId}', {
              params: { path: { taskId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'delete') {
            const taskId = this.getNodeParameter('id', i) as number;
            const { error } = await client.DELETE('/tasks/{taskId}', {
              params: { path: { taskId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = { success: true };
          }
        }

        // Invoice operations
        if (resource === 'invoice') {
          if (operation === 'getMany') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              page?: number;
              perPage?: number;
              updatedSince?: string;
            };

            const { data, error } = await client.GET('/invoices', {
              params: {
                query: {
                  page: additionalFields.page,
                  per_page: additionalFields.perPage,
                  updated_since: additionalFields.updatedSince,
                },
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data?.invoices;
          } else if (operation === 'get') {
            const invoiceId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.GET('/invoices/{invoiceId}', {
              params: { path: { invoiceId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'delete') {
            const invoiceId = this.getNodeParameter('id', i) as number;
            const { error } = await client.DELETE('/invoices/{invoiceId}', {
              params: { path: { invoiceId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = { success: true };
          }
        }

        // Expense operations
        if (resource === 'expense') {
          if (operation === 'getMany') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              page?: number;
              perPage?: number;
              updatedSince?: string;
            };

            const { data, error } = await client.GET('/expenses', {
              params: {
                query: {
                  page: additionalFields.page,
                  per_page: additionalFields.perPage,
                  updated_since: additionalFields.updatedSince,
                },
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data?.expenses;
          } else if (operation === 'get') {
            const expenseId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.GET('/expenses/{expenseId}', {
              params: { path: { expenseId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'delete') {
            const expenseId = this.getNodeParameter('id', i) as number;
            const { error } = await client.DELETE('/expenses/{expenseId}', {
              params: { path: { expenseId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = { success: true };
          }
        }

        // Contact operations
        if (resource === 'contact') {
          if (operation === 'getMany') {
            const additionalFields = this.getNodeParameter('additionalFields', i) as {
              page?: number;
              perPage?: number;
              updatedSince?: string;
            };

            const { data, error } = await client.GET('/contacts', {
              params: {
                query: {
                  page: additionalFields.page,
                  per_page: additionalFields.perPage,
                  updated_since: additionalFields.updatedSince,
                },
              },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data?.contacts;
          } else if (operation === 'get') {
            const contactId = this.getNodeParameter('id', i) as number;
            const { data, error } = await client.GET('/contacts/{contactId}', {
              params: { path: { contactId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = data;
          } else if (operation === 'delete') {
            const contactId = this.getNodeParameter('id', i) as number;
            const { error } = await client.DELETE('/contacts/{contactId}', {
              params: { path: { contactId } },
            });

            if (error) throw new Error(JSON.stringify(error));
            responseData = { success: true };
          }
        }

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
          { itemData: { item: i } }
        );
        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: (error as Error).message },
            pairedItem: { item: i },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

