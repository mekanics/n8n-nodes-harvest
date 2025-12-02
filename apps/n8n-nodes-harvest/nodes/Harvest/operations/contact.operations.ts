import type { IExecuteFunctions } from 'n8n-workflow';
import type { components } from 'harvest-client';
import type { HarvestClient } from './types';

type CreateClientContact = components['schemas']['CreateClientContact'];
type UpdateClientContact = components['schemas']['UpdateClientContact'];

type ContactFilters = {
  clientId?: number;
  page?: number;
  perPage?: number;
  updatedSince?: string;
};

type ContactAdditionalFields = {
  title?: string;
  lastName?: string;
  email?: string;
  phoneOffice?: string;
  phoneMobile?: string;
  fax?: string;
};

type ContactUpdateFields = {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneOffice?: string;
  phoneMobile?: string;
  fax?: string;
};

export async function executeContactOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const filters = context.getNodeParameter('contactFilters', i) as ContactFilters;

    const { data, error } = await client.GET('/contacts', {
      params: {
        query: {
          client_id: filters.clientId || undefined,
          page: filters.page,
          per_page: filters.perPage,
          updated_since: filters.updatedSince || undefined,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.contacts;
  }

  if (operation === 'get') {
    const contactId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.GET('/contacts/{contactId}', {
      params: { path: { contactId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'create') {
    const clientId = context.getNodeParameter('clientId', i) as number;
    const firstName = context.getNodeParameter('firstName', i) as string;
    const additionalFields = context.getNodeParameter(
      'contactAdditionalFields',
      i
    ) as ContactAdditionalFields;

    const body: CreateClientContact = {
      client_id: clientId,
      first_name: firstName,
    };

    if (additionalFields.title) body.title = additionalFields.title;
    if (additionalFields.lastName) body.last_name = additionalFields.lastName;
    if (additionalFields.email) body.email = additionalFields.email;
    if (additionalFields.phoneOffice) body.phone_office = additionalFields.phoneOffice;
    if (additionalFields.phoneMobile) body.phone_mobile = additionalFields.phoneMobile;
    if (additionalFields.fax) body.fax = additionalFields.fax;

    const { data, error } = await client.POST('/contacts', { body });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'update') {
    const contactId = context.getNodeParameter('id', i) as number;
    const updateFields = context.getNodeParameter('contactUpdateFields', i) as ContactUpdateFields;

    const body: UpdateClientContact = {};

    if (updateFields.title) body.title = updateFields.title;
    if (updateFields.firstName) body.first_name = updateFields.firstName;
    if (updateFields.lastName) body.last_name = updateFields.lastName;
    if (updateFields.email) body.email = updateFields.email;
    if (updateFields.phoneOffice) body.phone_office = updateFields.phoneOffice;
    if (updateFields.phoneMobile) body.phone_mobile = updateFields.phoneMobile;
    if (updateFields.fax) body.fax = updateFields.fax;

    const { data, error } = await client.PATCH('/contacts/{contactId}', {
      params: { path: { contactId } },
      body,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'delete') {
    const contactId = context.getNodeParameter('id', i) as number;
    const { error } = await client.DELETE('/contacts/{contactId}', {
      params: { path: { contactId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return { success: true };
  }

  return undefined;
}
