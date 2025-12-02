import type { INodeProperties } from 'n8n-workflow';

export const invoiceOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['invoice'],
    },
  },
  options: [
    { name: 'Create', value: 'create', action: 'Create an invoice' },
    { name: 'Delete', value: 'delete', action: 'Delete an invoice' },
    { name: 'Download PDF', value: 'downloadPdf', action: 'Download an invoice as PDF' },
    { name: 'Get', value: 'get', action: 'Get an invoice' },
    { name: 'Get Many', value: 'getMany', action: 'Get many invoices' },
    { name: 'Update', value: 'update', action: 'Update an invoice' },
  ],
  default: 'getMany',
};

export const invoiceFields: INodeProperties[] = [
  // Invoice Create Fields
  {
    displayName: 'Invoice Type',
    name: 'invoiceType',
    type: 'options',
    default: 'freeform',
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    options: [
      {
        name: 'Free-form Invoice',
        value: 'freeform',
        description: 'Create an invoice with manual line items',
      },
      {
        name: 'From Tracked Time/Expenses',
        value: 'tracked',
        description: 'Create an invoice by importing tracked time entries and expenses',
      },
    ],
    description: 'Choose how to create the invoice',
  },
  {
    displayName: 'Client ID',
    name: 'invoiceClientId',
    type: 'number',
    default: 0,
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    description: 'The ID of the client this invoice belongs to',
  },

  // Free-form Invoice - Line Items
  {
    displayName: 'Line Items',
    name: 'lineItems',
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['freeform'],
      },
    },
    placeholder: 'Add Line Item',
    options: [
      {
        name: 'items',
        displayName: 'Line Item',
        values: [
          {
            displayName: 'Kind',
            name: 'kind',
            type: 'options',
            default: 'Service',
            options: [
              { name: 'Service', value: 'Service' },
              { name: 'Product', value: 'Product' },
            ],
            description: 'The type of line item',
          },
          {
            displayName: 'Description',
            name: 'description',
            type: 'string',
            default: '',
            description: 'Text description of the line item',
          },
          {
            displayName: 'Quantity',
            name: 'quantity',
            type: 'number',
            typeOptions: {
              numberPrecision: 2,
            },
            default: 1,
            description: 'The unit quantity of the item',
          },
          {
            displayName: 'Unit Price',
            name: 'unitPrice',
            type: 'number',
            typeOptions: {
              numberPrecision: 2,
            },
            default: 0,
            description: 'The individual price per unit',
          },
          {
            displayName: 'Taxed',
            name: 'taxed',
            type: 'boolean',
            default: false,
            description: "Whether the invoice's tax percentage applies to this line item",
          },
          {
            displayName: 'Taxed 2',
            name: 'taxed2',
            type: 'boolean',
            default: false,
            description: "Whether the invoice's tax2 percentage applies to this line item",
          },
          {
            displayName: 'Project ID',
            name: 'projectId',
            type: 'number',
            default: 0,
            description: 'The ID of the project associated with this line item (optional)',
          },
        ],
      },
    ],
    description: 'The line items for this invoice',
  },

  // Tracked Time/Expenses Invoice - Project IDs (required, first)
  {
    displayName: 'Project IDs',
    name: 'trackedProjectIds',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
      },
    },
    placeholder: '123,456,789',
    description: 'Comma-separated list of project IDs to import time/expenses from',
  },

  // Billable Hours Section
  {
    displayName: 'Billable Hours',
    name: 'includeHours',
    type: 'options',
    default: 'yes',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
      },
    },
    options: [
      {
        name: 'All Uninvoiced Billable Hours',
        value: 'yes',
        description: 'Include only uninvoiced billable hours',
      },
      {
        name: 'Include Hours From Date Range',
        value: 'range',
        description: 'Include uninvoiced billable hours from a specific date range',
      },
      {
        name: 'Do Not Include Any Hours',
        value: 'no',
        description: 'Skip importing time entries',
      },
    ],
    description: 'What billable hours to include on the invoice',
  },
  {
    displayName: 'Hours From Date',
    name: 'hoursFromDate',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
        includeHours: ['range'],
      },
    },
    placeholder: '2025-01-01',
    description: 'Start date for included time entries (YYYY-MM-DD)',
  },
  {
    displayName: 'Hours To Date',
    name: 'hoursToDate',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
        includeHours: ['range'],
      },
    },
    placeholder: '2025-01-31',
    description: 'End date for included time entries (YYYY-MM-DD)',
  },
  {
    displayName: 'How to Display Hours',
    name: 'hoursSummaryType',
    type: 'options',
    default: 'task',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
        includeHours: ['yes', 'range'],
      },
    },
    options: [
      {
        name: 'By Task',
        value: 'task',
        description: 'Combine all hours for one task into one line',
      },
      {
        name: 'By Person',
        value: 'people',
        description: 'Combine all hours for one person into one line',
      },
      {
        name: 'By Project',
        value: 'project',
        description: 'Combine all hours for one project into one line',
      },
      {
        name: 'Detailed',
        value: 'detailed',
        description: 'Display each time entry as one line',
      },
    ],
    description: 'How to summarize time entries on the invoice',
  },

  // Expenses Section
  {
    displayName: 'Expenses',
    name: 'includeExpenses',
    type: 'options',
    default: 'yes',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
      },
    },
    options: [
      {
        name: 'All Uninvoiced Billable Expenses',
        value: 'yes',
        description: 'Include only uninvoiced billable expenses',
      },
      {
        name: 'Include Expenses From Date Range',
        value: 'range',
        description: 'Include uninvoiced billable expenses from a specific date range',
      },
      {
        name: 'Do Not Include Any Expenses',
        value: 'no',
        description: 'Skip importing expenses',
      },
    ],
    description: 'What expenses to include on the invoice',
  },
  {
    displayName: 'Expenses From Date',
    name: 'expensesFromDate',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
        includeExpenses: ['range'],
      },
    },
    placeholder: '2025-01-01',
    description: 'Start date for included expenses (YYYY-MM-DD)',
  },
  {
    displayName: 'Expenses To Date',
    name: 'expensesToDate',
    type: 'string',
    default: '',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
        includeExpenses: ['range'],
      },
    },
    placeholder: '2025-01-31',
    description: 'End date for included expenses (YYYY-MM-DD)',
  },
  {
    displayName: 'How to Display Expenses',
    name: 'expensesSummaryType',
    type: 'options',
    default: 'category',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
        includeExpenses: ['yes', 'range'],
      },
    },
    options: [
      {
        name: 'By Category',
        value: 'category',
        description: 'Combine all expenses for one category into one line',
      },
      {
        name: 'By Person',
        value: 'people',
        description: 'Combine all expenses for one person into one line',
      },
      {
        name: 'By Project',
        value: 'project',
        description: 'Combine all expenses for one project into one line',
      },
      {
        name: 'Detailed',
        value: 'detailed',
        description: 'Display each expense entry as one line',
      },
    ],
    description: 'How to summarize expenses on the invoice',
  },
  {
    displayName: 'Attach Receipts',
    name: 'attachReceipts',
    type: 'boolean',
    default: false,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        invoiceType: ['tracked'],
        includeExpenses: ['yes', 'range'],
      },
    },
    description: 'Attach a PDF expense report with receipts to the invoice',
  },

  // Invoice Payment Term (top-level for conditional due date)
  {
    displayName: 'Payment Term',
    name: 'paymentTerm',
    type: 'options',
    default: 'net 15',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    options: [
      { name: 'Upon Receipt', value: 'upon receipt' },
      { name: 'Net 15', value: 'net 15' },
      { name: 'Net 30', value: 'net 30' },
      { name: 'Net 45', value: 'net 45' },
      { name: 'Net 60', value: 'net 60' },
      { name: 'Custom', value: 'custom' },
    ],
    description: 'The timeframe in which the invoice should be paid',
  },
  {
    displayName: 'Custom Due Date',
    name: 'customDueDate',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
        paymentTerm: ['custom'],
      },
    },
    placeholder: '2024-02-15',
    description: 'Date the invoice is due (YYYY-MM-DD). Required when using custom payment term.',
  },

  // Invoice Additional Fields (for both create types)
  {
    displayName: 'Additional Fields',
    name: 'invoiceAdditionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['create'],
      },
    },
    options: [
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
        description: 'The invoice subject',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Any additional notes to include on the invoice',
      },
      {
        displayName: 'Number',
        name: 'number',
        type: 'string',
        default: '',
        description: 'The invoice number. If not provided, it will be auto-generated.',
      },
      {
        displayName: 'Purchase Order',
        name: 'purchaseOrder',
        type: 'string',
        default: '',
        description: 'The purchase order number',
      },
      {
        displayName: 'Tax (%)',
        name: 'tax',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description:
          'This percentage is applied to the subtotal, including line items and discounts',
      },
      {
        displayName: 'Tax 2 (%)',
        name: 'tax2',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description:
          'This percentage is applied to the subtotal, including line items and discounts',
      },
      {
        displayName: 'Discount (%)',
        name: 'discount',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'This percentage is subtracted from the subtotal',
      },
      {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: '',
        placeholder: 'USD',
        description:
          "The currency code (e.g., USD, EUR). If not provided, the client's currency will be used.",
      },
      {
        displayName: 'Issue Date',
        name: 'issueDate',
        type: 'string',
        default: '',
        placeholder: '2024-01-15',
        description: 'Date the invoice was issued (YYYY-MM-DD)',
      },
      {
        displayName: 'Payment Options',
        name: 'paymentOptions',
        type: 'multiOptions',
        default: [],
        options: [
          { name: 'ACH', value: 'ach' },
          { name: 'Credit Card', value: 'credit_card' },
          { name: 'PayPal', value: 'paypal' },
        ],
        description: 'The payment options available to pay the invoice',
      },
      {
        displayName: 'Retainer ID',
        name: 'retainerId',
        type: 'number',
        default: 0,
        description: 'The ID of the retainer associated with this invoice',
      },
      {
        displayName: 'Estimate ID',
        name: 'estimateId',
        type: 'number',
        default: 0,
        description: 'The ID of the estimate associated with this invoice',
      },
    ],
  },

  // Invoice Update Fields
  {
    displayName: 'Update Fields',
    name: 'invoiceUpdateFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['update'],
      },
    },
    options: [
      {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'number',
        default: 0,
        description: 'The ID of the client this invoice belongs to',
      },
      {
        displayName: 'Subject',
        name: 'subject',
        type: 'string',
        default: '',
        description: 'The invoice subject',
      },
      {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        typeOptions: {
          rows: 4,
        },
        default: '',
        description: 'Any additional notes to include on the invoice',
      },
      {
        displayName: 'Number',
        name: 'number',
        type: 'string',
        default: '',
        description: 'The invoice number',
      },
      {
        displayName: 'Purchase Order',
        name: 'purchaseOrder',
        type: 'string',
        default: '',
        description: 'The purchase order number',
      },
      {
        displayName: 'Tax (%)',
        name: 'tax',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'This percentage is applied to the subtotal',
      },
      {
        displayName: 'Tax 2 (%)',
        name: 'tax2',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'This percentage is applied to the subtotal',
      },
      {
        displayName: 'Discount (%)',
        name: 'discount',
        type: 'number',
        typeOptions: {
          numberPrecision: 2,
        },
        default: 0,
        description: 'This percentage is subtracted from the subtotal',
      },
      {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: '',
        placeholder: 'USD',
        description: 'The currency code (e.g., USD, EUR)',
      },
      {
        displayName: 'Issue Date',
        name: 'issueDate',
        type: 'string',
        default: '',
        placeholder: '2024-01-15',
        description: 'Date the invoice was issued (YYYY-MM-DD)',
      },
      {
        displayName: 'Payment Options',
        name: 'paymentOptions',
        type: 'multiOptions',
        default: [],
        options: [
          { name: 'ACH', value: 'ach' },
          { name: 'Credit Card', value: 'credit_card' },
          { name: 'PayPal', value: 'paypal' },
        ],
        description: 'The payment options available to pay the invoice',
      },
    ],
  },

  // Invoice Update Payment Term (top-level for conditional due date)
  {
    displayName: 'Payment Term',
    name: 'updatePaymentTerm',
    type: 'options',
    default: '',
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['update'],
      },
    },
    options: [
      { name: 'No Change', value: '' },
      { name: 'Upon Receipt', value: 'upon receipt' },
      { name: 'Net 15', value: 'net 15' },
      { name: 'Net 30', value: 'net 30' },
      { name: 'Net 45', value: 'net 45' },
      { name: 'Net 60', value: 'net 60' },
      { name: 'Custom', value: 'custom' },
    ],
    description: 'The timeframe in which the invoice should be paid',
  },
  {
    displayName: 'Custom Due Date',
    name: 'updateCustomDueDate',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['update'],
        updatePaymentTerm: ['custom'],
      },
    },
    placeholder: '2024-02-15',
    description: 'Date the invoice is due (YYYY-MM-DD). Required when using custom payment term.',
  },

  // Invoice List Filter Options
  {
    displayName: 'Filter Options',
    name: 'invoiceFilters',
    type: 'collection',
    placeholder: 'Add Filter',
    default: {},
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['getMany'],
      },
    },
    options: [
      {
        displayName: 'Client ID',
        name: 'clientId',
        type: 'number',
        default: 0,
        description: 'Only return invoices belonging to this client',
      },
      {
        displayName: 'Project ID',
        name: 'projectId',
        type: 'number',
        default: 0,
        description: 'Only return invoices associated with this project',
      },
      {
        displayName: 'State',
        name: 'state',
        type: 'options',
        default: '',
        options: [
          { name: 'All', value: '' },
          { name: 'Draft', value: 'draft' },
          { name: 'Open', value: 'open' },
          { name: 'Paid', value: 'paid' },
          { name: 'Closed', value: 'closed' },
        ],
        description: 'Only return invoices with this state',
      },
      {
        displayName: 'From Date',
        name: 'from',
        type: 'string',
        default: '',
        placeholder: '2024-01-01',
        description: 'Only return invoices with an issue_date on or after this date (YYYY-MM-DD)',
      },
      {
        displayName: 'To Date',
        name: 'to',
        type: 'string',
        default: '',
        placeholder: '2024-12-31',
        description: 'Only return invoices with an issue_date on or before this date (YYYY-MM-DD)',
      },
      {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        description: 'Page number for pagination',
      },
      {
        displayName: 'Per Page',
        name: 'perPage',
        type: 'number',
        default: 100,
        description: 'Number of records to return per page (max 2000)',
      },
      {
        displayName: 'Updated Since',
        name: 'updatedSince',
        type: 'dateTime',
        default: '',
        description: 'Only return invoices updated since this date',
      },
    ],
  },

  // Download PDF - Client Key field
  {
    displayName: 'Client Key',
    name: 'clientKey',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['invoice'],
        operation: ['downloadPdf'],
      },
    },
    description:
      'The client_key of the invoice. This can be retrieved from the invoice object using the "Get" operation.',
  },
];
