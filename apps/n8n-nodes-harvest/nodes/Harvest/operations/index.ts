import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { createHarvestClient } from 'harvest-client';

import { executeTimeEntryOperation } from './timeEntry.operations';
import { executeClientOperation } from './client.operations';
import { executeCompanyOperation } from './company.operations';
import { executeProjectOperation } from './project.operations';
import { executeTaskOperation } from './task.operations';
import { executeUserOperation } from './user.operations';
import { executeInvoiceOperation, isBinaryResponse } from './invoice.operations';
import { executeExpenseOperation } from './expense.operations';
import { executeExpenseCategoryOperation } from './expenseCategory.operations';
import { executeContactOperation } from './contact.operations';
import { executeProjectTaskAssignmentOperation } from './projectTaskAssignment.operations';
import { executeProjectUserAssignmentOperation } from './projectUserAssignment.operations';
import { executeReportOperation } from './report.operations';

const operationHandlers = {
  timeEntry: executeTimeEntryOperation,
  client: executeClientOperation,
  company: executeCompanyOperation,
  project: executeProjectOperation,
  task: executeTaskOperation,
  user: executeUserOperation,
  invoice: executeInvoiceOperation,
  expense: executeExpenseOperation,
  expenseCategory: executeExpenseCategoryOperation,
  contact: executeContactOperation,
  projectTaskAssignment: executeProjectTaskAssignmentOperation,
  projectUserAssignment: executeProjectUserAssignmentOperation,
  report: executeReportOperation,
} as const;

type ResourceType = keyof typeof operationHandlers;

function isValidResource(resource: string): resource is ResourceType {
  return resource in operationHandlers;
}

export async function executeOperation(
  context: IExecuteFunctions
): Promise<INodeExecutionData[][]> {
  const items = context.getInputData();
  const returnData: INodeExecutionData[] = [];

  const credentials = await context.getCredentials('harvestApi');
  const client = createHarvestClient({
    accountId: credentials.accountId as string,
    accessToken: credentials.accessToken as string,
  });

  const resource = context.getNodeParameter('resource', 0) as string;
  const operation = context.getNodeParameter('operation', 0) as string;

  for (let i = 0; i < items.length; i++) {
    try {
      let responseData: unknown;

      if (isValidResource(resource)) {
        const handler = operationHandlers[resource];
        responseData = await handler(context, client, operation, i);
      }

      // Handle binary responses (e.g., PDF downloads)
      if (isBinaryResponse(responseData)) {
        returnData.push({
          ...responseData.data,
          pairedItem: { item: i },
        });
        continue;
      }

      const executionData = context.helpers.constructExecutionMetaData(
        context.helpers.returnJsonArray(responseData as IDataObject | IDataObject[]),
        { itemData: { item: i } }
      );
      returnData.push(...executionData);
    } catch (error) {
      if (context.continueOnFail()) {
        returnData.push({
          json: { error: (error as Error).message },
          pairedItem: { item: i },
        });
        continue;
      }
      throw error;
    }
  }

  return [returnData];
}
