import type { IExecuteFunctions } from 'n8n-workflow';
import type { HarvestClient, AdditionalFields } from './types';

export async function executeProjectUserAssignmentOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const projectId = context.getNodeParameter('projectId', i) as number;
    const additionalFields = context.getNodeParameter('additionalFields', i) as AdditionalFields;

    const { data, error } = await client.GET('/projects/{projectId}/user_assignments', {
      params: {
        path: { projectId },
        query: {
          is_active: additionalFields.isActive,
          page: additionalFields.page,
          per_page: additionalFields.perPage,
          updated_since: additionalFields.updatedSince,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.user_assignments;
  }

  return undefined;
}



