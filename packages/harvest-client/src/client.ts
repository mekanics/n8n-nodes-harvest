import createClient, { type Middleware } from 'openapi-fetch'
import type { paths } from './types/harvest.js'

/**
 * Fetch function type
 */
type FetchFunction = typeof fetch

/**
 * Configuration options for the Harvest API client
 */
export interface HarvestClientOptions {
	/** Harvest Account ID */
	accountId: string
	/** Personal Access Token or OAuth2 access token */
	accessToken: string
	/** Base URL for the Harvest API (defaults to https://api.harvestapp.com/v2) */
	baseUrl?: string
	/** Custom fetch implementation (optional) */
	fetch?: FetchFunction
}

/**
 * Authentication middleware that adds required headers to all requests
 */
function createAuthMiddleware(options: HarvestClientOptions): Middleware {
	return {
		async onRequest({ request }) {
			request.headers.set('Authorization', `Bearer ${options.accessToken}`)
			request.headers.set('Harvest-Account-Id', options.accountId)
			request.headers.set('User-Agent', 'Harvest-Client/1.0.0')
			return request
		},
	}
}

/**
 * Creates a type-safe Harvest API client
 *
 * @example
 * ```typescript
 * import { createHarvestClient } from 'harvest-client';
 *
 * const client = createHarvestClient({
 *   accountId: 'your-account-id',
 *   accessToken: 'your-access-token',
 * });
 *
 * // List all clients
 * const { data, error } = await client.GET('/clients');
 *
 * // Get a specific project
 * const { data: project } = await client.GET('/projects/{projectId}', {
 *   params: { path: { projectId: 123 } },
 * });
 *
 * // Create a time entry
 * const { data: timeEntry } = await client.POST('/time_entries', {
 *   body: {
 *     project_id: 123,
 *     task_id: 456,
 *     spent_date: '2024-01-15',
 *     hours: 2.5,
 *     notes: 'Worked on feature X',
 *   },
 * });
 * ```
 */
export function createHarvestClient(options: HarvestClientOptions) {
	const client = createClient<paths>({
		baseUrl: options.baseUrl ?? 'https://api.harvestapp.com/v2',
		fetch: options.fetch,
	})

	client.use(createAuthMiddleware(options))

	return client
}

/**
 * Type alias for the Harvest client instance
 */
export type HarvestClient = ReturnType<typeof createHarvestClient>
