import type { IExecuteFunctions } from 'n8n-workflow';
import type { components } from 'harvest-client';
import type { HarvestClient } from './types';

type CreateProject = components['schemas']['CreateProject'];
type UpdateProject = components['schemas']['UpdateProject'];

type ProjectFilters = {
  isActive?: boolean;
  clientId?: number;
  page?: number;
  perPage?: number;
  updatedSince?: string;
};

type ProjectAdditionalFields = {
  code?: string;
  isActive?: boolean;
  isFixedFee?: boolean;
  hourlyRate?: number;
  budget?: number;
  budgetIsMonthly?: boolean;
  notifyWhenOverBudget?: boolean;
  overBudgetNotificationPercentage?: number;
  showBudgetToAll?: boolean;
  costBudget?: number;
  costBudgetIncludeExpenses?: boolean;
  fee?: number;
  notes?: string;
  startsOn?: string;
  endsOn?: string;
};

type ProjectUpdateFields = {
  clientId?: number;
  name?: string;
  code?: string;
  isActive?: boolean;
  isBillable?: boolean;
  isFixedFee?: boolean;
  billBy?: string;
  hourlyRate?: number;
  budget?: number;
  budgetBy?: string;
  budgetIsMonthly?: boolean;
  notifyWhenOverBudget?: boolean;
  overBudgetNotificationPercentage?: number;
  showBudgetToAll?: boolean;
  costBudget?: number;
  costBudgetIncludeExpenses?: boolean;
  fee?: number;
  notes?: string;
  startsOn?: string;
  endsOn?: string;
};

export async function executeProjectOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const filters = context.getNodeParameter('projectFilters', i) as ProjectFilters;

    const { data, error } = await client.GET('/projects', {
      params: {
        query: {
          is_active: filters.isActive,
          client_id: filters.clientId || undefined,
          page: filters.page,
          per_page: filters.perPage,
          updated_since: filters.updatedSince || undefined,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.projects;
  }

  if (operation === 'get') {
    const projectId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.GET('/projects/{projectId}', {
      params: { path: { projectId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'create') {
    const clientId = context.getNodeParameter('clientId', i) as number;
    const name = context.getNodeParameter('name', i) as string;
    const isBillable = context.getNodeParameter('isBillable', i) as boolean;
    const billBy = context.getNodeParameter('billBy', i) as string;
    const budgetBy = context.getNodeParameter('budgetBy', i) as string;
    const additionalFields = context.getNodeParameter(
      'projectAdditionalFields',
      i
    ) as ProjectAdditionalFields;

    const body: CreateProject = {
      client_id: clientId,
      name,
      is_billable: isBillable,
      bill_by: billBy as CreateProject['bill_by'],
      budget_by: budgetBy as CreateProject['budget_by'],
    };

    if (additionalFields.code) body.code = additionalFields.code;
    if (additionalFields.isActive !== undefined) body.is_active = additionalFields.isActive;
    if (additionalFields.isFixedFee !== undefined) body.is_fixed_fee = additionalFields.isFixedFee;
    if (additionalFields.hourlyRate) body.hourly_rate = additionalFields.hourlyRate;
    if (additionalFields.budget) body.budget = additionalFields.budget;
    if (additionalFields.budgetIsMonthly !== undefined) {
      body.budget_is_monthly = additionalFields.budgetIsMonthly;
    }
    if (additionalFields.notifyWhenOverBudget !== undefined) {
      body.notify_when_over_budget = additionalFields.notifyWhenOverBudget;
    }
    if (additionalFields.overBudgetNotificationPercentage) {
      body.over_budget_notification_percentage = additionalFields.overBudgetNotificationPercentage;
    }
    if (additionalFields.showBudgetToAll !== undefined) {
      body.show_budget_to_all = additionalFields.showBudgetToAll;
    }
    if (additionalFields.costBudget) body.cost_budget = additionalFields.costBudget;
    if (additionalFields.costBudgetIncludeExpenses !== undefined) {
      body.cost_budget_include_expenses = additionalFields.costBudgetIncludeExpenses;
    }
    if (additionalFields.fee) body.fee = additionalFields.fee;
    if (additionalFields.notes) body.notes = additionalFields.notes;
    if (additionalFields.startsOn) body.starts_on = additionalFields.startsOn;
    if (additionalFields.endsOn) body.ends_on = additionalFields.endsOn;

    const { data, error } = await client.POST('/projects', { body });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'update') {
    const projectId = context.getNodeParameter('id', i) as number;
    const updateFields = context.getNodeParameter('projectUpdateFields', i) as ProjectUpdateFields;

    const body: UpdateProject = {};

    if (updateFields.clientId) body.client_id = updateFields.clientId;
    if (updateFields.name) body.name = updateFields.name;
    if (updateFields.code) body.code = updateFields.code;
    if (updateFields.isActive !== undefined) body.is_active = updateFields.isActive;
    if (updateFields.isBillable !== undefined) body.is_billable = updateFields.isBillable;
    if (updateFields.isFixedFee !== undefined) body.is_fixed_fee = updateFields.isFixedFee;
    if (updateFields.billBy) body.bill_by = updateFields.billBy as UpdateProject['bill_by'];
    if (updateFields.hourlyRate) body.hourly_rate = updateFields.hourlyRate;
    if (updateFields.budget) body.budget = updateFields.budget;
    if (updateFields.budgetBy) body.budget_by = updateFields.budgetBy as UpdateProject['budget_by'];
    if (updateFields.budgetIsMonthly !== undefined) {
      body.budget_is_monthly = updateFields.budgetIsMonthly;
    }
    if (updateFields.notifyWhenOverBudget !== undefined) {
      body.notify_when_over_budget = updateFields.notifyWhenOverBudget;
    }
    if (updateFields.overBudgetNotificationPercentage) {
      body.over_budget_notification_percentage = updateFields.overBudgetNotificationPercentage;
    }
    if (updateFields.showBudgetToAll !== undefined) {
      body.show_budget_to_all = updateFields.showBudgetToAll;
    }
    if (updateFields.costBudget) body.cost_budget = updateFields.costBudget;
    if (updateFields.costBudgetIncludeExpenses !== undefined) {
      body.cost_budget_include_expenses = updateFields.costBudgetIncludeExpenses;
    }
    if (updateFields.fee) body.fee = updateFields.fee;
    if (updateFields.notes) body.notes = updateFields.notes;
    if (updateFields.startsOn) body.starts_on = updateFields.startsOn;
    if (updateFields.endsOn) body.ends_on = updateFields.endsOn;

    const { data, error } = await client.PATCH('/projects/{projectId}', {
      params: { path: { projectId } },
      body,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'delete') {
    const projectId = context.getNodeParameter('id', i) as number;
    const { error } = await client.DELETE('/projects/{projectId}', {
      params: { path: { projectId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return { success: true };
  }

  return undefined;
}
