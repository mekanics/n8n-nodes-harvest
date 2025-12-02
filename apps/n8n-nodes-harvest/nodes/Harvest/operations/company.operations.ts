import type { IExecuteFunctions } from 'n8n-workflow';
import type { HarvestClient } from './types';

export async function executeCompanyOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  _i: number
): Promise<unknown> {
  if (operation === 'get') {
    const { data, error } = await client.GET('/company');

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  return undefined;
}

