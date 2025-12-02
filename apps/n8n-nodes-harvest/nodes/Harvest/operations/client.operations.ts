import type { IExecuteFunctions } from 'n8n-workflow';
import type { components } from 'harvest-client';
import type { HarvestClient, AdditionalFields } from './types';

type CreateClient = components['schemas']['CreateClient'];
type UpdateClient = components['schemas']['UpdateClient'];

type ClientAdditionalFields = {
  isActive?: boolean;
  address?: string;
  currency?: string;
};

type ClientUpdateFields = {
  name?: string;
  isActive?: boolean;
  address?: string;
  currency?: string;
};

export async function executeClientOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const additionalFields = context.getNodeParameter('additionalFields', i) as AdditionalFields;

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
    return data?.clients;
  }

  if (operation === 'get') {
    const clientId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.GET('/clients/{clientId}', {
      params: { path: { clientId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'create') {
    const name = context.getNodeParameter('name', i) as string;
    const additionalFields = context.getNodeParameter(
      'clientAdditionalFields',
      i
    ) as ClientAdditionalFields;

    const body: CreateClient = { name };

    if (additionalFields.isActive !== undefined) {
      body.is_active = additionalFields.isActive;
    }
    if (additionalFields.address) body.address = additionalFields.address;
    if (additionalFields.currency) body.currency = additionalFields.currency;

    const { data, error } = await client.POST('/clients', { body });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'update') {
    const clientId = context.getNodeParameter('id', i) as number;
    const updateFields = context.getNodeParameter('clientUpdateFields', i) as ClientUpdateFields;

    const body: UpdateClient = {};

    if (updateFields.name) body.name = updateFields.name;
    if (updateFields.isActive !== undefined) body.is_active = updateFields.isActive;
    if (updateFields.address) body.address = updateFields.address;
    if (updateFields.currency) body.currency = updateFields.currency;

    const { data, error } = await client.PATCH('/clients/{clientId}', {
      params: { path: { clientId } },
      body,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'delete') {
    const clientId = context.getNodeParameter('id', i) as number;
    const { error } = await client.DELETE('/clients/{clientId}', {
      params: { path: { clientId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return { success: true };
  }

  return undefined;
}
