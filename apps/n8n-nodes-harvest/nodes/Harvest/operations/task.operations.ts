import type { IExecuteFunctions } from 'n8n-workflow';
import type { components } from 'harvest-client';
import type { HarvestClient, AdditionalFields } from './types';

type CreateTask = components['schemas']['CreateTask'];
type UpdateTask = components['schemas']['UpdateTask'];

type TaskAdditionalFields = {
  billableByDefault?: boolean;
  defaultHourlyRate?: number;
  isDefault?: boolean;
  isActive?: boolean;
};

type TaskUpdateFields = {
  name?: string;
  billableByDefault?: boolean;
  defaultHourlyRate?: number;
  isDefault?: boolean;
  isActive?: boolean;
};

export async function executeTaskOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const additionalFields = context.getNodeParameter('additionalFields', i) as AdditionalFields;

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
    return data?.tasks;
  }

  if (operation === 'get') {
    const taskId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.GET('/tasks/{taskId}', {
      params: { path: { taskId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'create') {
    const name = context.getNodeParameter('name', i) as string;
    const additionalFields = context.getNodeParameter(
      'taskAdditionalFields',
      i
    ) as TaskAdditionalFields;

    const body: CreateTask = { name };

    if (additionalFields.billableByDefault !== undefined) {
      body.billable_by_default = additionalFields.billableByDefault;
    }
    if (additionalFields.defaultHourlyRate) {
      body.default_hourly_rate = additionalFields.defaultHourlyRate;
    }
    if (additionalFields.isDefault !== undefined) {
      body.is_default = additionalFields.isDefault;
    }
    if (additionalFields.isActive !== undefined) {
      body.is_active = additionalFields.isActive;
    }

    const { data, error } = await client.POST('/tasks', { body });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'update') {
    const taskId = context.getNodeParameter('id', i) as number;
    const updateFields = context.getNodeParameter('taskUpdateFields', i) as TaskUpdateFields;

    const body: UpdateTask = {};

    if (updateFields.name) body.name = updateFields.name;
    if (updateFields.billableByDefault !== undefined) {
      body.billable_by_default = updateFields.billableByDefault;
    }
    if (updateFields.defaultHourlyRate) {
      body.default_hourly_rate = updateFields.defaultHourlyRate;
    }
    if (updateFields.isDefault !== undefined) {
      body.is_default = updateFields.isDefault;
    }
    if (updateFields.isActive !== undefined) {
      body.is_active = updateFields.isActive;
    }

    const { data, error } = await client.PATCH('/tasks/{taskId}', {
      params: { path: { taskId } },
      body,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'delete') {
    const taskId = context.getNodeParameter('id', i) as number;
    const { error } = await client.DELETE('/tasks/{taskId}', {
      params: { path: { taskId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return { success: true };
  }

  return undefined;
}
