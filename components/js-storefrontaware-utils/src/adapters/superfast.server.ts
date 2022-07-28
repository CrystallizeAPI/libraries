import { ClientConfiguration, createClient } from '@crystallize/js-api-client';
import { TStoreFrontAdapter, TStoreFrontConfig } from '../types';
import { cypher } from '../cypher';

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
            config = await fetchSuperFastConfig(domainkey, credentials);
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
                // this is where we would still decrypt the "public" secret, only PUBLIC_KEY for now
                config.configuration = {
                    ...config.configuration,
                    PUBLIC_KEY: decrypt(config.configuration.PUBLIC_KEY),
                };
            }
            return config;
        }
        throw new Error('Impossible to fetch SuperFast config');
    }

    return { config };
};

const QUERY_SUPERFAST_CONFIG = `query FETCH_SUPERFAST_CONFIG ($path: String!) {
    catalogue(path:$path) {
        name
        components{
            id
            content {
                __typename
                ...on SingleLineContent{
                    text
                }
                ...on RichTextContent {
                    html
                }
                ...on SelectionContent {
                    options {
                        key
                        value
                    }
                }
                ...on BooleanContent {
                    value
                }
                ...on ImageContent {
                    firstImage{
                        url
                    }
                }
                ...on PropertiesTableContent {
                    sections {
                        title
                        properties {
                            key
                            value
                        }
                    }
                }
            }
        }
    }
}`;

function componentToString(component: any): string | boolean {
    switch (component?.content?.__typename) {
        case 'SingleLineContent':
            return component.content.text;
        case 'RichTextContent':
            return component.content.html.join('');
        case 'SelectionContent':
            return component.content.options[0].key;
        case 'BooleanContent':
            return component.content.value;
        case 'ImageContent':
            return component.content.firstImage.url;
        case 'PropertiesTableContent':
            return component.content.sections.reduce((result: any, section: any) => {
                section.properties.forEach((property: any) => {
                    result[property.key] = property.value;
                });
                return result;
            }, {});
        default:
            return false;
    }
}

async function fetchSuperFastConfig(domainkey: string, credentials: ClientConfiguration): Promise<TStoreFrontConfig> {
    const path = `/tenants/${domainkey}`;

    const client = createClient(credentials);
    const tenant = await client.catalogueApi(QUERY_SUPERFAST_CONFIG, { path });

    const data: Array<any> = tenant.catalogue.components;
    const components = data.reduce<Record<string, any>>((result, component) => {
        return {
            ...result,
            [component.id]: componentToString(component),
        };
    }, {});

    return {
        identifier: domainkey,
        tenantIdentifier: components['tenant-identifier'],
        language: 'en',
        storefront: components.storefront,
        logo: components.logos,
        theme: components.theme,
        configuration: components.configuration,
    };
}
