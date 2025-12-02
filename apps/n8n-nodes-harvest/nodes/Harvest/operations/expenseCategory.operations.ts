import type { IExecuteFunctions } from 'n8n-workflow';
import type { HarvestClient, AdditionalFields } from './types';

export async function executeExpenseCategoryOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const additionalFields = context.getNodeParameter('additionalFields', i) as AdditionalFields;

    const { data, error } = await client.GET('/expense_categories', {
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
    return data?.expense_categories;
  }

  return undefined;
}

