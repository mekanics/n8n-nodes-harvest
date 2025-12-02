import type { IExecuteFunctions } from 'n8n-workflow';
import type { components } from 'harvest-client';
import type { HarvestClient, AdditionalFields } from './types';

type CreateUser = components['schemas']['CreateUser'];
type UpdateUser = components['schemas']['UpdateUser'];

type UserAdditionalFields = {
  telephone?: string;
  timezone?: string;
  hasAccessToAllFutureProjects?: boolean;
  isContractor?: boolean;
  isActive?: boolean;
  defaultHourlyRate?: number;
  costRate?: number;
  roles?: string[];
  accessRoles?: string[];
};

type UserUpdateFields = {
  firstName?: string;
  lastName?: string;
  email?: string;
  telephone?: string;
  timezone?: string;
  hasAccessToAllFutureProjects?: boolean;
  isContractor?: boolean;
  isActive?: boolean;
  defaultHourlyRate?: number;
  costRate?: number;
  roles?: string[];
  accessRoles?: string[];
};

export async function executeUserOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const additionalFields = context.getNodeParameter('additionalFields', i) as AdditionalFields;

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
    return data?.users;
  }

  if (operation === 'get') {
    const userId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.GET('/users/{userId}', {
      params: { path: { userId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'getCurrent') {
    const { data, error } = await client.GET('/users/me');

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'create') {
    const firstName = context.getNodeParameter('firstName', i) as string;
    const lastName = context.getNodeParameter('lastName', i) as string;
    const email = context.getNodeParameter('email', i) as string;
    const additionalFields = context.getNodeParameter(
      'userAdditionalFields',
      i
    ) as UserAdditionalFields;

    const body: CreateUser = {
      first_name: firstName,
      last_name: lastName,
      email,
    };

    if (additionalFields.telephone) body.telephone = additionalFields.telephone;
    if (additionalFields.timezone) body.timezone = additionalFields.timezone;
    if (additionalFields.hasAccessToAllFutureProjects !== undefined) {
      body.has_access_to_all_future_projects = additionalFields.hasAccessToAllFutureProjects;
    }
    if (additionalFields.isContractor !== undefined) {
      body.is_contractor = additionalFields.isContractor;
    }
    if (additionalFields.isActive !== undefined) {
      body.is_active = additionalFields.isActive;
    }
    if (additionalFields.defaultHourlyRate) {
      body.default_hourly_rate = additionalFields.defaultHourlyRate;
    }
    if (additionalFields.costRate) {
      body.cost_rate = additionalFields.costRate;
    }
    if (additionalFields.roles && additionalFields.roles.length > 0) {
      body.roles = additionalFields.roles;
    }
    if (additionalFields.accessRoles && additionalFields.accessRoles.length > 0) {
      body.access_roles = additionalFields.accessRoles;
    }

    const { data, error } = await client.POST('/users', { body });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'update') {
    const userId = context.getNodeParameter('id', i) as number;
    const updateFields = context.getNodeParameter('userUpdateFields', i) as UserUpdateFields;

    const body: UpdateUser = {};

    if (updateFields.firstName) body.first_name = updateFields.firstName;
    if (updateFields.lastName) body.last_name = updateFields.lastName;
    if (updateFields.email) body.email = updateFields.email;
    if (updateFields.telephone) body.telephone = updateFields.telephone;
    if (updateFields.timezone) body.timezone = updateFields.timezone;
    if (updateFields.hasAccessToAllFutureProjects !== undefined) {
      body.has_access_to_all_future_projects = updateFields.hasAccessToAllFutureProjects;
    }
    if (updateFields.isContractor !== undefined) {
      body.is_contractor = updateFields.isContractor;
    }
    if (updateFields.isActive !== undefined) {
      body.is_active = updateFields.isActive;
    }
    if (updateFields.defaultHourlyRate) {
      body.default_hourly_rate = updateFields.defaultHourlyRate;
    }
    if (updateFields.costRate) {
      body.cost_rate = updateFields.costRate;
    }
    if (updateFields.roles && updateFields.roles.length > 0) {
      body.roles = updateFields.roles;
    }
    if (updateFields.accessRoles && updateFields.accessRoles.length > 0) {
      body.access_roles = updateFields.accessRoles;
    }

    const { data, error } = await client.PATCH('/users/{userId}', {
      params: { path: { userId } },
      body,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'delete') {
    const userId = context.getNodeParameter('id', i) as number;
    const { error } = await client.DELETE('/users/{userId}', {
      params: { path: { userId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return { success: true };
  }

  return undefined;
}
