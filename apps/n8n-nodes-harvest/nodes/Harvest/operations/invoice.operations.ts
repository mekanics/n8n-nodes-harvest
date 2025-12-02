import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import type { components } from 'harvest-client';
import type { HarvestClient } from './types';

// Buffer is available globally in Node.js runtime
declare const Buffer: {
  from(data: ArrayBuffer | ArrayLike<number>): { length: number } & ArrayLike<number>;
};

export type BinaryResponse = {
  __binary: true;
  data: INodeExecutionData;
};

export function isBinaryResponse(value: unknown): value is BinaryResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    '__binary' in value &&
    (value as BinaryResponse).__binary === true
  );
}

type CreateInvoice = components['schemas']['CreateInvoice'];
type UpdateInvoice = components['schemas']['UpdateInvoice'];

type InvoiceFilters = {
  clientId?: number;
  projectId?: number;
  state?: string;
  from?: string;
  to?: string;
  page?: number;
  perPage?: number;
  updatedSince?: string;
};

type InvoiceAdditionalFields = {
  subject?: string;
  notes?: string;
  number?: string;
  purchaseOrder?: string;
  tax?: number;
  tax2?: number;
  discount?: number;
  currency?: string;
  issueDate?: string;
  paymentOptions?: string[];
  retainerId?: number;
  estimateId?: number;
};

type InvoiceUpdateFields = {
  clientId?: number;
  subject?: string;
  notes?: string;
  number?: string;
  purchaseOrder?: string;
  tax?: number;
  tax2?: number;
  discount?: number;
  currency?: string;
  issueDate?: string;
  paymentOptions?: string[];
};

type LineItem = {
  kind: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxed: boolean;
  taxed2: boolean;
  projectId: number;
};

export async function executeInvoiceOperation(
  context: IExecuteFunctions,
  client: HarvestClient,
  operation: string,
  i: number
): Promise<unknown> {
  if (operation === 'getMany') {
    const invoiceFilters = context.getNodeParameter('invoiceFilters', i) as InvoiceFilters;

    const { data, error } = await client.GET('/invoices', {
      params: {
        query: {
          client_id: invoiceFilters.clientId || undefined,
          project_id: invoiceFilters.projectId || undefined,
          state: (invoiceFilters.state as 'draft' | 'open' | 'paid' | 'closed') || undefined,
          from: invoiceFilters.from || undefined,
          to: invoiceFilters.to || undefined,
          page: invoiceFilters.page,
          per_page: invoiceFilters.perPage,
          updated_since: invoiceFilters.updatedSince,
        },
      },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data?.invoices;
  }

  if (operation === 'get') {
    const invoiceId = context.getNodeParameter('id', i) as number;
    const { data, error } = await client.GET('/invoices/{invoiceId}', {
      params: { path: { invoiceId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'create') {
    const invoiceType = context.getNodeParameter('invoiceType', i) as string;
    const clientId = context.getNodeParameter('invoiceClientId', i) as number;
    const paymentTerm = context.getNodeParameter('paymentTerm', i) as string;
    const additionalFields = context.getNodeParameter(
      'invoiceAdditionalFields',
      i
    ) as InvoiceAdditionalFields;

    const invoiceBody: CreateInvoice = {
      client_id: clientId,
    };

    // Add payment term and custom due date
    if (paymentTerm) {
      invoiceBody.payment_term = paymentTerm as CreateInvoice['payment_term'];
      if (paymentTerm === 'custom') {
        const customDueDate = context.getNodeParameter('customDueDate', i) as string;
        if (customDueDate) {
          invoiceBody.due_date = customDueDate;
        }
      }
    }

    // Add optional fields from additionalFields
    if (additionalFields.subject) invoiceBody.subject = additionalFields.subject;
    if (additionalFields.notes) invoiceBody.notes = additionalFields.notes;
    if (additionalFields.number) invoiceBody.number = additionalFields.number;
    if (additionalFields.purchaseOrder) invoiceBody.purchase_order = additionalFields.purchaseOrder;
    if (additionalFields.tax) invoiceBody.tax = additionalFields.tax;
    if (additionalFields.tax2) invoiceBody.tax2 = additionalFields.tax2;
    if (additionalFields.discount) invoiceBody.discount = additionalFields.discount;
    if (additionalFields.currency) invoiceBody.currency = additionalFields.currency;
    if (additionalFields.issueDate) invoiceBody.issue_date = additionalFields.issueDate;
    if (additionalFields.paymentOptions && additionalFields.paymentOptions.length > 0) {
      invoiceBody.payment_options =
        additionalFields.paymentOptions as CreateInvoice['payment_options'];
    }
    if (additionalFields.retainerId) invoiceBody.retainer_id = additionalFields.retainerId;
    if (additionalFields.estimateId) invoiceBody.estimate_id = additionalFields.estimateId;

    if (invoiceType === 'freeform') {
      // Free-form invoice with manual line items
      const lineItemsData = context.getNodeParameter('lineItems', i) as {
        items?: LineItem[];
      };

      if (lineItemsData.items && lineItemsData.items.length > 0) {
        invoiceBody.line_items = lineItemsData.items.map((item) => ({
          kind: item.kind as 'Service' | 'Product',
          description: item.description || undefined,
          quantity: item.quantity || undefined,
          unit_price: item.unitPrice || undefined,
          taxed: item.taxed || undefined,
          taxed2: item.taxed2 || undefined,
          project_id: item.projectId || undefined,
        }));
      }
    } else if (invoiceType === 'tracked') {
      // Invoice from tracked time and expenses using line_items_import
      const projectIdsStr = context.getNodeParameter('trackedProjectIds', i) as string;
      const includeHours = context.getNodeParameter('includeHours', i) as string;
      const includeExpenses = context.getNodeParameter('includeExpenses', i) as string;

      if (!projectIdsStr) {
        throw new Error('At least one valid project ID is required');
      }

      // Parse project IDs
      const projectIds = String(projectIdsStr)
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id));

      if (projectIds.length === 0) {
        throw new Error('At least one valid project ID is required');
      }

      invoiceBody.line_items_import = {
        project_ids: projectIds,
      };

      // Add time import settings if hours are included
      if (includeHours !== 'no') {
        const hoursSummaryType = context.getNodeParameter('hoursSummaryType', i) as string;

        invoiceBody.line_items_import.time = {
          summary_type: hoursSummaryType as 'project' | 'task' | 'people' | 'detailed',
        };

        // Add date range if specified
        if (includeHours === 'range') {
          const hoursFromDate = context.getNodeParameter('hoursFromDate', i) as string;
          const hoursToDate = context.getNodeParameter('hoursToDate', i) as string;

          if (hoursFromDate) {
            invoiceBody.line_items_import.time.from = hoursFromDate;
          }
          if (hoursToDate) {
            invoiceBody.line_items_import.time.to = hoursToDate;
          }
        }
      }

      // Add expenses import settings if expenses are included
      if (includeExpenses !== 'no') {
        const expensesSummaryType = context.getNodeParameter('expensesSummaryType', i) as string;
        const attachReceipts = context.getNodeParameter('attachReceipts', i) as boolean;

        invoiceBody.line_items_import.expenses = {
          summary_type: expensesSummaryType as 'project' | 'category' | 'people' | 'detailed',
        };

        // Add date range if specified
        if (includeExpenses === 'range') {
          const expensesFromDate = context.getNodeParameter('expensesFromDate', i) as string;
          const expensesToDate = context.getNodeParameter('expensesToDate', i) as string;

          if (expensesFromDate) {
            invoiceBody.line_items_import.expenses.from = expensesFromDate;
          }
          if (expensesToDate) {
            invoiceBody.line_items_import.expenses.to = expensesToDate;
          }
        }

        // Add attach receipts option
        if (attachReceipts) {
          invoiceBody.line_items_import.expenses.attach_receipts = true;
        }
      }
    }

    const { data, error } = await client.POST('/invoices', {
      body: invoiceBody,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'update') {
    const invoiceId = context.getNodeParameter('id', i) as number;
    const updatePaymentTerm = context.getNodeParameter('updatePaymentTerm', i) as string;
    const updateFields = context.getNodeParameter('invoiceUpdateFields', i) as InvoiceUpdateFields;

    const updateBody: UpdateInvoice = {};

    // Add payment term and custom due date if specified
    if (updatePaymentTerm) {
      updateBody.payment_term = updatePaymentTerm as UpdateInvoice['payment_term'];
      if (updatePaymentTerm === 'custom') {
        const updateCustomDueDate = context.getNodeParameter('updateCustomDueDate', i) as string;
        if (updateCustomDueDate) {
          updateBody.due_date = updateCustomDueDate;
        }
      }
    }

    if (updateFields.clientId) updateBody.client_id = updateFields.clientId;
    if (updateFields.subject) updateBody.subject = updateFields.subject;
    if (updateFields.notes) updateBody.notes = updateFields.notes;
    if (updateFields.number) updateBody.number = updateFields.number;
    if (updateFields.purchaseOrder) updateBody.purchase_order = updateFields.purchaseOrder;
    if (updateFields.tax !== undefined) updateBody.tax = updateFields.tax;
    if (updateFields.tax2 !== undefined) updateBody.tax2 = updateFields.tax2;
    if (updateFields.discount !== undefined) updateBody.discount = updateFields.discount;
    if (updateFields.currency) updateBody.currency = updateFields.currency;
    if (updateFields.issueDate) updateBody.issue_date = updateFields.issueDate;
    if (updateFields.paymentOptions && updateFields.paymentOptions.length > 0) {
      updateBody.payment_options = updateFields.paymentOptions as UpdateInvoice['payment_options'];
    }

    const { data, error } = await client.PATCH('/invoices/{invoiceId}', {
      params: { path: { invoiceId } },
      body: updateBody,
    });

    if (error) throw new Error(JSON.stringify(error));
    return data;
  }

  if (operation === 'delete') {
    const invoiceId = context.getNodeParameter('id', i) as number;
    const { error } = await client.DELETE('/invoices/{invoiceId}', {
      params: { path: { invoiceId } },
    });

    if (error) throw new Error(JSON.stringify(error));
    return { success: true };
  }

  if (operation === 'downloadPdf') {
    const clientKey = context.getNodeParameter('clientKey', i) as string;

    if (!clientKey) {
      throw new Error(
        'Client Key is required. You can retrieve it from the invoice using the "Get" operation.'
      );
    }

    // Get company info to retrieve the full_domain
    const { data: companyData, error: companyError } = await client.GET('/company');
    if (companyError) throw new Error(JSON.stringify(companyError));
    if (!companyData?.full_domain) {
      throw new Error('Could not retrieve company domain');
    }

    // Construct the PDF URL using the client_key
    // Per Harvest API docs: https://{SUBDOMAIN}.harvestapp.com/client/invoices/{CLIENT_KEY}.pdf
    const pdfUrl = `https://${companyData.full_domain}/client/invoices/${clientKey}.pdf`;

    // Download the PDF (this is a public client URL, no auth needed)
    const pdfBuffer = await context.helpers.httpRequest({
      method: 'GET',
      url: pdfUrl,
      encoding: 'arraybuffer',
    });

    // Prepare binary data
    const fileName = `invoice-${clientKey}.pdf`;
    const binaryData = await context.helpers.prepareBinaryData(
      Buffer.from(pdfBuffer as ArrayBuffer),
      fileName,
      'application/pdf'
    );

    const response: BinaryResponse = {
      __binary: true,
      data: {
        json: {
          clientKey,
          fileName,
        },
        binary: { data: binaryData },
      },
    };

    return response;
  }

  return undefined;
}
