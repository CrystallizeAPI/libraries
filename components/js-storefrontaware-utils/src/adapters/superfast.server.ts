import { ClientConfiguration, createClient } from '@crystallize/js-api-client';
import crypto from 'crypto';
import { TStoreFrontAdapter, TStoreFrontConfig } from '../types';

type TStorage = {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any, ttl: number) => Promise<void>;
};

export const createSuperFastAdapter = (
    hostname: string,
    credentials: ClientConfiguration,
    storageClient: TStorage,
    ttl: number,
): TStoreFrontAdapter => {
    const memoryCache: Record<
        string,
        {
            expiresAt: number;
            value: any;
        }
    > = {};

    return {
        config: async (withSecrets: boolean): Promise<TStoreFrontConfig> => {
            const domainkey = hostname.split('.')[0];
            if (memoryCache[domainkey]) {
                if (memoryCache[domainkey].expiresAt > Date.now() / 1000) {
                    return memoryCache[domainkey].value;
                }
            }

            const hit = await storageClient.get(domainkey);
            let config: TStoreFrontConfig | undefined = undefined;

            if (!hit) {
                config = await fetchSuperFastConfig(domainkey, credentials);
                memoryCache[domainkey] = {
                    expiresAt: Math.floor(Date.now() / 1000) + ttl,
                    value: config,
                };
                await storageClient.set(domainkey, JSON.stringify(config), ttl);
            } else {
                config = await JSON.parse(hit);
                memoryCache[domainkey] = {
                    expiresAt: Math.floor(Date.now() / 1000) + ttl,
                    value: config,
                };
            }

            if (config !== undefined) {
                if (withSecrets) {
                    config.configuration = cypher(`${process.env.ENCRYPTED_PARAMS_SECRET}`).decryptMap(
                        config.configuration,
                    );
                } else {
                    // this is where we would still decrypt the "public" secret, only PUBLIC_KEY for now
                    config.configuration = {
                        ...config.configuration,
                        PUBLIC_KEY: cypher(`${process.env.ENCRYPTED_PARAMS_SECRET}`).decrypt(
                            config.configuration.PUBLIC_KEY,
                        ),
                    };
                }
                return config;
            }
            throw new Error('Impossible to fetch SuperFast config');
        },
    };
};

async function fetchSuperFastConfig(domainkey: string, credentials: ClientConfiguration): Promise<TStoreFrontConfig> {
    const query = `query {
  catalogue(path:"/tenants/${domainkey}") {
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

    const client = createClient(credentials);
    const tenant = await client.catalogueApi(query);
    const components = tenant.catalogue.components.reduce((result: any, component: any) => {
        function toString(component: any): string | boolean {
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
        return {
            ...result,
            [component.id]: toString(component),
        };
    }, {});
    return {
        identifier: domainkey,
        tenantIdentifier: components['tenant-identifier'],
        language: 'en',
        storefront: components['storefront'],
        logo: components['logos'],
        theme: components['theme'],
        configuration: components['configuration'],
    };
}

export function encryptValue (
    value: string,
    secretKey: string,
    algorithm: string,
): string {
    const initVector = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, initVector);
    let encryptedData = cipher.update(value, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return `${initVector.toString('hex')}:${encryptedData}`;
}

export function decryptValue (
    value: string,
    secretKey: string,
    algorithm: string,
): string {
    const [initVector, encryptedData] = value.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(initVector, 'hex'));
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}

const cypher = (
    secret: string,
): {
    encrypt: (value: string) => string;
    decrypt: (value: string) => string;
    decryptMap: (map: { [key: string]: string }) => { [key: string]: string };
} => {
    const key = crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32);
    const algorithm = 'aes-256-cbc';

    const encrypt = (value: string) => encryptValue(value, key, algorithm)
    const decrypt = (value: string) => decryptValue(value, key, algorithm)

    return {
        encrypt,
        decrypt,
        decryptMap: (map: { [key: string]: string }) => {
            let result = {};
            Object.keys(map).forEach((key: string) => {
                result = {
                    ...result,
                    [key]: decrypt(map[key]),
                };
            });
            return result;
        },
    };
};
