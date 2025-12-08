import type { IExecuteFunctions } from 'n8n-workflow';
import type { HarvestClient } from './types';

type ReportOptions = {
  isActive?: boolean;
  page?: number;
  perPage?: number;
};

export async function executeReportOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  const options = context.getNodeParameter('reportOptions', i) as ReportOptions;

  // Time Reports
  if (operation === 'getTimeByClient') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/time/clients', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  if (operation === 'getTimeByProject') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/time/projects', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  if (operation === 'getTimeByTask') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/time/tasks', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  if (operation === 'getTimeByTeam') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/time/team', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  // Expense Reports
  if (operation === 'getExpensesByClient') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/expenses/clients', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  if (operation === 'getExpensesByProject') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/expenses/projects', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  if (operation === 'getExpensesByCategory') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/expenses/categories', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  if (operation === 'getExpensesByTeam') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/expenses/team', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  // Uninvoiced Report
  if (operation === 'getUninvoiced') {
    const from = context.getNodeParameter('fromDate', i) as string;
    const to = context.getNodeParameter('toDate', i) as string;

    const { data, error } = await client.GET('/reports/uninvoiced', {
      params: {
        query: {
          from,
          to,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  // Project Budget Report
  if (operation === 'getProjectBudget') {
    const { data, error } = await client.GET('/reports/project_budget', {
      params: {
        query: {
          is_active: options.isActive,
          page: options.page,
          per_page: options.perPage,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.results;
  }

  return undefined;
}




