import { createClient, CreateClientOptions } from '@crystallize/js-api-client';
import { TStoreFront, TStoreFrontAdapter } from './types';

export type StoreFrontOptions = {
    withSecrets?: boolean;
};

/**
 * Create store TStoreFront
 * Load configuration from adapter and configure an apiClient for the store front
 *
 * @param adapter A TStoreFrontAdapter instance
 * @param options Object with options, or the deprecated syntax of a boolean for just `withSecrets`
 * @returns The loaded config + a configured api client
 */
export const createStoreFront = async (
    adapter: TStoreFrontAdapter,
    options: StoreFrontOptions | boolean = false,
    clientOptions?: CreateClientOptions,
): Promise<TStoreFront> => {
    options = typeof options === 'boolean' ? { withSecrets: options } : options;
    const withSecrets = options?.withSecrets ?? false;

    const config = await adapter.config(withSecrets);
    return {
        config,
        apiClient: createClient(
            {
                tenantIdentifier: config.tenantIdentifier,
                tenantId: config.tenantId,
                accessTokenId: withSecrets ? config.configuration?.CRYSTALLIZE_ACCESS_TOKEN_ID || '' : '',
                accessTokenSecret: withSecrets ? config.configuration?.CRYSTALLIZE_ACCESS_TOKEN_SECRET || '' : '',
            },
            clientOptions,
        ),
    };
};
