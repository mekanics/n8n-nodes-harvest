import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import { descriptions } from './descriptions';
import { executeOperation } from './operations';

export class Harvest implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Harvest',
    name: 'harvest',
    icon: 'file:harvest.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with Harvest API for time tracking and invoicing',
    defaults: {
      name: 'Harvest',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'harvestApi',
        required: true,
      },
    ],
    properties: descriptions,
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    return executeOperation(this);
  }
}
