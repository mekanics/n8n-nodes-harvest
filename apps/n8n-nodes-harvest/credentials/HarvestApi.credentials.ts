import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class HarvestApi implements ICredentialType {
  name = 'harvestApi';
  displayName = 'Harvest API';
  documentationUrl = 'https://help.getharvest.com/api-v2/authentication/authentication/';

  properties: INodeProperties[] = [
    {
      displayName: 'Account ID',
      name: 'accountId',
      type: 'string',
      default: '',
      required: true,
      description: 'Your Harvest Account ID. You can find this in the URL of your Harvest account.',
      placeholder: '123456',
    },
    {
      displayName: 'Access Token',
      name: 'accessToken',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      required: true,
      description:
        'Personal Access Token from Harvest. Go to Developers > Personal Access Tokens in your Harvest account.',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.accessToken}}',
        'Harvest-Account-Id': '={{$credentials.accountId}}',
        'User-Agent': 'n8n-nodes-harvest',
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.harvestapp.com/v2',
      url: '/users/me',
    },
  };
}

