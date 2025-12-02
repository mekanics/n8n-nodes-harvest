import type { INodeProperties } from 'n8n-workflow';

import { resourceProperty, idField, additionalFieldsForGetMany } from './Shared.description';
import { timeEntryOperations, timeEntryFields } from './TimeEntry.description';
import { clientOperations, clientFields } from './Client.description';
import { companyOperations, companyFields } from './Company.description';
import { projectOperations, projectFields } from './Project.description';
import { taskOperations, taskFields } from './Task.description';
import { userOperations, userFields } from './User.description';
import { invoiceOperations, invoiceFields } from './Invoice.description';
import { expenseOperations, expenseFields } from './Expense.description';
import {
  expenseCategoryOperations,
  expenseCategoryFields,
} from './ExpenseCategory.description';
import { contactOperations, contactFields } from './Contact.description';
import {
  projectTaskAssignmentOperations,
  projectTaskAssignmentFields,
} from './ProjectTaskAssignment.description';
import {
  projectUserAssignmentOperations,
  projectUserAssignmentFields,
} from './ProjectUserAssignment.description';
import { reportOperations, reportFields } from './Report.description';

export const descriptions: INodeProperties[] = [
  // Resource selector
  resourceProperty,

  // Operations for each resource
  timeEntryOperations,
  clientOperations,
  companyOperations,
  projectOperations,
  taskOperations,
  userOperations,
  invoiceOperations,
  expenseOperations,
  expenseCategoryOperations,
  contactOperations,
  projectTaskAssignmentOperations,
  projectUserAssignmentOperations,
  reportOperations,

  // Shared fields
  idField,

  // Resource-specific fields
  ...timeEntryFields,
  ...clientFields,
  ...companyFields,
  ...projectFields,
  ...taskFields,
  ...userFields,
  ...invoiceFields,
  ...expenseFields,
  ...expenseCategoryFields,
  ...contactFields,
  ...projectTaskAssignmentFields,
  ...projectUserAssignmentFields,
  ...reportFields,

  // Shared additional fields for getMany (non-invoice resources)
  additionalFieldsForGetMany,
];

