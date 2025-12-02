import type { IExecuteFunctions } from 'n8n-workflow';
import type { components } from 'harvest-client';
import type { HarvestClient } from './types';

type CreateTimeEntry = components['schemas']['CreateTimeEntry'];
type UpdateTimeEntry = components['schemas']['UpdateTimeEntry'];

type TimeEntryFilters = {
  userId?: number;
  clientId?: number;
  projectId?: number;
  taskId?: number;
  externalReferenceId?: string;
  isBilled?: boolean;
  isRunning?: boolean;
  from?: string;
  to?: string;
  page?: number;
  perPage?: number;
  updatedSince?: string;
};

type TimeEntryAdditionalFields = {
  userId?: number;
  hours?: number;
  notes?: string;
  startedTime?: string;
  endedTime?: string;
  externalReferenceId?: string;
  externalReferenceGroupId?: string;
  externalReferencePermalink?: string;
};

type TimeEntryUpdateFields = {
  projectId?: number;
  taskId?: number;
  spentDate?: string;
  hours?: number;
  notes?: string;
  startedTime?: string;
  endedTime?: string;
  externalReferenceId?: string;
  externalReferenceGroupId?: string;
  externalReferencePermalink?: string;
};

export async function executeTimeEntryOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const filters = context.getNodeParameter('timeEntryFilters', i) as TimeEntryFilters;

    const { data, error } = await client.GET('/time_entries', {
      params: {
        query: {
          user_id: filters.userId || undefined,
          client_id: filters.clientId || undefined,
          project_id: filters.projectId || undefined,
          task_id: filters.taskId || undefined,
          external_reference_id: filters.externalReferenceId || undefined,
          is_billed: filters.isBilled,
          is_running: filters.isRunning,
          from: filters.from || undefined,
          to: filters.to || undefined,
          page: filters.page,
          per_page: filters.perPage,
          updated_since: filters.updatedSince || undefined,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.time_entries;
  }

  if (operation === 'get') {
    const timeEntryId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.GET('/time_entries/{timeEntryId}', {
      params: { path: { timeEntryId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'create') {
    const projectId = context.getNodeParameter('projectId', i) as number;
    const taskId = context.getNodeParameter('taskId', i) as number;
    const spentDate = context.getNodeParameter('spentDate', i) as string;
    const additionalFields = context.getNodeParameter(
      'timeEntryAdditionalFields',
      i
    ) as TimeEntryAdditionalFields;

    const body: CreateTimeEntry = {
      project_id: projectId,
      task_id: taskId,
      spent_date: spentDate,
    };

    if (additionalFields.userId) body.user_id = additionalFields.userId;
    if (additionalFields.hours) body.hours = additionalFields.hours;
    if (additionalFields.notes) body.notes = additionalFields.notes;
    if (additionalFields.startedTime) body.started_time = additionalFields.startedTime;
    if (additionalFields.endedTime) body.ended_time = additionalFields.endedTime;

    // Handle external reference
    if (
      additionalFields.externalReferenceId ||
      additionalFields.externalReferenceGroupId ||
      additionalFields.externalReferencePermalink
    ) {
      body.external_reference = {};
      if (additionalFields.externalReferenceId) {
        body.external_reference.id = additionalFields.externalReferenceId;
      }
      if (additionalFields.externalReferenceGroupId) {
        body.external_reference.group_id = additionalFields.externalReferenceGroupId;
      }
      if (additionalFields.externalReferencePermalink) {
        body.external_reference.permalink = additionalFields.externalReferencePermalink;
      }
    }

    const { data, error } = await client.POST('/time_entries', { body });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'update') {
    const timeEntryId = context.getNodeParameter('id', i) as number;
    const updateFields = context.getNodeParameter(
      'timeEntryUpdateFields',
      i
    ) as TimeEntryUpdateFields;

    const body: UpdateTimeEntry = {};

    if (updateFields.projectId) body.project_id = updateFields.projectId;
    if (updateFields.taskId) body.task_id = updateFields.taskId;
    if (updateFields.spentDate) body.spent_date = updateFields.spentDate;
    if (updateFields.hours) body.hours = updateFields.hours;
    if (updateFields.notes) body.notes = updateFields.notes;
    if (updateFields.startedTime) body.started_time = updateFields.startedTime;
    if (updateFields.endedTime) body.ended_time = updateFields.endedTime;

    // Handle external reference
    if (
      updateFields.externalReferenceId ||
      updateFields.externalReferenceGroupId ||
      updateFields.externalReferencePermalink
    ) {
      body.external_reference = {};
      if (updateFields.externalReferenceId) {
        body.external_reference.id = updateFields.externalReferenceId;
      }
      if (updateFields.externalReferenceGroupId) {
        body.external_reference.group_id = updateFields.externalReferenceGroupId;
      }
      if (updateFields.externalReferencePermalink) {
        body.external_reference.permalink = updateFields.externalReferencePermalink;
      }
    }

    const { data, error } = await client.PATCH('/time_entries/{timeEntryId}', {
      params: { path: { timeEntryId } },
      body,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'delete') {
    const timeEntryId = context.getNodeParameter('id', i) as number;
    const { error } = await client.DELETE('/time_entries/{timeEntryId}', {
      params: { path: { timeEntryId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return { success: true };
  }

  if (operation === 'restart') {
    const timeEntryId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.PATCH('/time_entries/{timeEntryId}/restart', {
      params: { path: { timeEntryId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'stop') {
    const timeEntryId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.PATCH('/time_entries/{timeEntryId}/stop', {
      params: { path: { timeEntryId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  return undefined;
}
