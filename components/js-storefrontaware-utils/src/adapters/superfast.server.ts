import { ClientConfiguration, ClientInterface, createClient } from '@crystallize/js-api-client';
import { TStoreFrontAdapter, TStoreFrontConfig } from '../types';
import { cypher } from '../cypher';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

type TStorage = {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any, ttl: number) => Promise<void>;
};

type MemoryCache = Record<string, { expiresAt: number; value: any }>;

const getExpiry = (ttl: number): number => Math.floor(Date.now() / 1000) + ttl;

/**
 * Create Superfast adapter
 *
 * Returns an object with a .config method to load superfast site configuration
 */
export const createSuperFastAdapter = (
    hostname: string,
    credentials: ClientConfiguration,
    storageClient: TStorage,
    ttl: number,
): TStoreFrontAdapter => {
    const memoryCache: MemoryCache = {};
    const { decrypt, decryptMap } = cypher(process.env.ENCRYPTED_PARAMS_SECRET as string);

    /**
     * Fetch superfast configuration object.
     *
     * Order of precedence
     * 1. Memory cache (using ttl)
     * 2. storageClient (using ttl)
     * 3. API
     *
     * @param withSecrets Set to true to decrypt all secrets
     */
    async function config(withSecrets: boolean = false): Promise<TStoreFrontConfig> {
        const domainkey = hostname.split('.')[0];

        // First try to load config from in-memory cache
        if (memoryCache[domainkey]) {
            if (memoryCache[domainkey].expiresAt > Date.now() / 1000) {
                return memoryCache[domainkey].value;
            }
        }

        // Secondly attempt hitting the provided storageClient
        const hit = await storageClient.get(domainkey);
        let config: TStoreFrontConfig | undefined = undefined;

        if (!hit) {
            config = await fetchSuperFastConfig(`/tenants/${domainkey}`, credentials);
            await storageClient.set(domainkey, JSON.stringify(config), ttl);
        } else {
            config = JSON.parse(hit);
        }

        if (config !== undefined) {
            memoryCache[domainkey] = {
                expiresAt: getExpiry(ttl),
                value: config,
            };

            if (withSecrets) {
                config.configuration = decryptMap(config.configuration);
            } else {
                // this is where we would still decrypt the "public" secret
                // @todo: discuss and see if we should let the user decide what to decrypt
                // also should we send the encrypted secrets
                config.configuration = {
                    ...config.configuration,
                    STRIPE_PUBLIC_KEY: decrypt(config.configuration.STRIPE_PUBLIC_KEY),
                    RAZORPAY_ID: decrypt(config.configuration.RAZORPAY_ID),
                    ADYEN_ENV: decrypt(config.configuration.ADYEN_ENV),
                    ADYEN_MERCHANT_ACCOUNT: decrypt(config.configuration.ADYEN_MERCHANT_ACCOUNT),
                    ADYEN_CLIENT_KEY: decrypt(config.configuration.ADYEN_CLIENT_KEY),
                };
            }
            return config;
        }
        throw new Error('Impossible to fetch SuperFast config');
    }
    return { config };
};

export const superFastTenantQueryConfig = {
    id: true,
    name: true,
    path: true,
    components: {
        id: true,
        content: {
            __typename: true,
            __on: [
                {
                    __typeName: 'SingleLineContent',
                    text: true,
                },
                {
                    __typeName: 'RichTextContent',
                    html: true,
                },
                {
                    __typeName: 'SelectionContent',
                    options: {
                        key: true,
                        value: true,
                    },
                },
                {
                    __typeName: 'BooleanContent',
                    value: true,
                },
                {
                    __typeName: 'ImageContent',
                    firstImage: {
                        url: true,
                        key: true,
                        variants: {
                            key: true,
                            url: true,
                            width: true,
                            height: true,
                        },
                    },
                },
                {
                    __typeName: 'PropertiesTableContent',
                    sections: {
                        title: true,
                        properties: {
                            key: true,
                            value: true,
                        },
                    },
                },
            ],
        },
    },
};

function componentToString(component: any): any {
    switch (component?.content?.__typename) {
        case 'SingleLineContent':
            return component.content.text;
        case 'RichTextContent':
            return component.content.html.join('');
        case 'SelectionContent':
            return component.content.options.map((option: any) => option.key);
        case 'BooleanContent':
            return component.content.value;
        case 'ImageContent':
            return component.content.firstImage;
        case 'PropertiesTableContent':
            return component.content.sections.reduce((result: any, section: any) => {
                section.properties.forEach((property: any) => {
                    result[`${section.title.toUpperCase()}_${property.key.toUpperCase()}`] = `${property.value}`;
                });
                return result;
            }, {});
        default:
            return false;
    }
}

export function mapToStoreConfig(data: {
    id: string;
    name: string;
    path: string;
    components: Array<any>;
}): TStoreFrontConfig {
    const components = data.components.reduce<Record<string, any>>((result, component) => {
        return {
            ...result,
            [component.id]: componentToString(component),
        };
    }, {});

    return {
        id: data.id,
        name: data.name,
        identifier: data.path.replace('/tenants/', ''),
        tenantIdentifier: components['tenant-identifier'],
        tenantId: components['tenant-id'] || undefined,
        language: 'en',
        storefront: components.storefront,
        logo: components.logos,
        theme: components.theme[0],
        configuration: components.configuration,
        superfastVersion: components['superfast-version'],
        enabled: components['enabled'],
        paymentMethods: components['payment-methods'],
        taxIncluded: components['taxincluded'],
    };
}

export async function fetchSuperFastConfigWithClient(
    path: string,
    client: ClientInterface,
): Promise<TStoreFrontConfig> {
    const query = {
        catalogue: {
            __args: {
                path,
            },
            ...superFastTenantQueryConfig,
        },
    };
    const tenant = await client.catalogueApi(jsonToGraphQLQuery({ query }));
    return mapToStoreConfig({
        id: tenant.catalogue.id,
        name: tenant.catalogue.name,
        path,
        components: tenant.catalogue.components,
    });
}

async function fetchSuperFastConfig(path: string, credentials: ClientConfiguration): Promise<TStoreFrontConfig> {
    const client = createClient(credentials);
    return fetchSuperFastConfigWithClient(path, client);
}
