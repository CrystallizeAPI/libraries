import fetch from 'node-fetch';

export type ClientConfiguration = {
    tenantIdentifier: string;
    accessTokenId?: string;
    accessTokenSecret?: string;
};

export type VariablesType = { [key: string]: string | number | string[] | number[] };
export type ApiCaller<T> = (query: string, variables?: VariablesType) => Promise<T>;

export type ClientInterface = {
    catalogueApi: ApiCaller<any>;
    searchApi: ApiCaller<any>;
    orderApi: ApiCaller<any>;
    subscriptionApi: ApiCaller<any>;
    pimApi: ApiCaller<any>;
};

async function post<T>(
    path: string,
    config: ClientConfiguration,
    query: string,
    variables?: VariablesType,
    init?: RequestInit | any | undefined,
): Promise<T> {
    try {
        const response = await fetch(path, {
            ...init,
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Accept: 'application/json',
                'X-Crystallize-Access-Token-Id': config.accessTokenId || '',
                'X-Crystallize-Access-Token-Secret': config.accessTokenSecret || '',
            },
            body: JSON.stringify({ query, variables }),
        });

        if (response.ok && 204 === response.status) {
            return <T>{};
        }
        if (!response.ok) {
            const json = await response.json();
            throw {
                code: response.status,
                statusText: response.statusText,
                message: json.message,
                errors: json.errors || {},
            };
        }
        return <T>(await response.json()).data;
    } catch (exception) {
        throw exception;
    }
}

function createApiCaller(
    uri: string,
    configuration: ClientConfiguration,
    getTenantId: () => Promise<string>,
): ApiCaller<any> {
    /**
     * Call a crystallize. Will automatically handle access tokens
     * @param query The GraphQL query
     * @param variables Variables to inject into query.
     */
    return async function callApi<T>(query: string, variables?: VariablesType): Promise<T> {
        const tenantId = await getTenantId();
        return post<T>(uri, configuration, query, { tenantId, ...variables });
    };
}

const apiHost = (path: string[], prefix: 'api' | 'pim' = 'api') =>
    `https://${prefix}.crystallize.com/${path.join('/')}`;

/**
 * Create one api client for each api endpoint Crystallize offers (catalogue, search, order, subscription, pim).
 *
 * @param configuration
 * @returns ClientInterface
 */
export function createClient(configuration: ClientConfiguration): ClientInterface {
    const identifier = configuration.tenantIdentifier;

    const getTenantId = async (): Promise<string> => {
        if (process.env?.TENANT_ID) {
            return process.env.TENANT_ID;
        }

        const result = (await post(
            apiHost(['graphql'], 'pim'),
            configuration,
            `query FETCH_TENANT_CONFIG ($identifier: String!) {
                tenant {
                    get(identifier: $identifier) {
                        id 
                    }
                }
            }`,
            { identifier },
        )) as { tenant: { get: { id: string } } };
        return result.tenant.get.id;
    };

    return {
        catalogueApi: createApiCaller(apiHost([identifier, 'catalogue']), configuration, getTenantId),
        searchApi: createApiCaller(apiHost([identifier, 'search']), configuration, getTenantId),
        orderApi: createApiCaller(apiHost([identifier, 'orders']), configuration, getTenantId),
        subscriptionApi: createApiCaller(apiHost([identifier, 'subscriptions']), configuration, getTenantId),
        pimApi: createApiCaller(apiHost(['graphql'], 'pim'), configuration, getTenantId),
    };
}
