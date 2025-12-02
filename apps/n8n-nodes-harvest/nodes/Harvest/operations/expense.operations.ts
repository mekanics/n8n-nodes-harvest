import type { IExecuteFunctions } from 'n8n-workflow';
import type { components } from 'harvest-client';
import type { HarvestClient } from './types';

type CreateExpense = components['schemas']['CreateExpense'];
type UpdateExpense = components['schemas']['UpdateExpense'];

type ExpenseFilters = {
  userId?: number;
  clientId?: number;
  projectId?: number;
  isBilled?: boolean;
  from?: string;
  to?: string;
  page?: number;
  perPage?: number;
  updatedSince?: string;
};

type ExpenseAdditionalFields = {
  userId?: number;
  units?: number;
  totalCost?: number;
  notes?: string;
  billable?: boolean;
};

type ExpenseUpdateFields = {
  projectId?: number;
  expenseCategoryId?: number;
  spentDate?: string;
  units?: number;
  totalCost?: number;
  notes?: string;
  billable?: boolean;
  deleteReceipt?: boolean;
};

export async function executeExpenseOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const filters = context.getNodeParameter('expenseFilters', i) as ExpenseFilters;

    const { data, error } = await client.GET('/expenses', {
      params: {
        query: {
          user_id: filters.userId || undefined,
          client_id: filters.clientId || undefined,
          project_id: filters.projectId || undefined,
          is_billed: filters.isBilled,
          from: filters.from || undefined,
          to: filters.to || undefined,
          page: filters.page,
          per_page: filters.perPage,
          updated_since: filters.updatedSince || undefined,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.expenses;
  }

  if (operation === 'get') {
    const expenseId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.GET('/expenses/{expenseId}', {
      params: { path: { expenseId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'create') {
    const projectId = context.getNodeParameter('projectId', i) as number;
    const expenseCategoryId = context.getNodeParameter('expenseCategoryId', i) as number;
    const spentDate = context.getNodeParameter('spentDate', i) as string;
    const additionalFields = context.getNodeParameter(
      'expenseAdditionalFields',
      i
    ) as ExpenseAdditionalFields;

    const body: CreateExpense = {
      project_id: projectId,
      expense_category_id: expenseCategoryId,
      spent_date: spentDate,
    };

    if (additionalFields.userId) body.user_id = additionalFields.userId;
    if (additionalFields.units) body.units = additionalFields.units;
    if (additionalFields.totalCost) body.total_cost = additionalFields.totalCost;
    if (additionalFields.notes) body.notes = additionalFields.notes;
    if (additionalFields.billable !== undefined) body.billable = additionalFields.billable;

    const { data, error } = await client.POST('/expenses', { body });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'update') {
    const expenseId = context.getNodeParameter('id', i) as number;
    const updateFields = context.getNodeParameter('expenseUpdateFields', i) as ExpenseUpdateFields;

    const body: UpdateExpense = {};

    if (updateFields.projectId) body.project_id = updateFields.projectId;
    if (updateFields.expenseCategoryId) body.expense_category_id = updateFields.expenseCategoryId;
    if (updateFields.spentDate) body.spent_date = updateFields.spentDate;
    if (updateFields.units) body.units = updateFields.units;
    if (updateFields.totalCost) body.total_cost = updateFields.totalCost;
    if (updateFields.notes) body.notes = updateFields.notes;
    if (updateFields.billable !== undefined) body.billable = updateFields.billable;
    if (updateFields.deleteReceipt !== undefined) body.delete_receipt = updateFields.deleteReceipt;

    const { data, error } = await client.PATCH('/expenses/{expenseId}', {
      params: { path: { expenseId } },
      body,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'delete') {
    const expenseId = context.getNodeParameter('id', i) as number;
    const { error } = await client.DELETE('/expenses/{expenseId}', {
      params: { path: { expenseId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return { success: true };
  }

  return undefined;
}
