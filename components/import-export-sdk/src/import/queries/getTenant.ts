import { ClientInterface } from '@crystallize/js-api-client';
import { Tenant } from '../types';

const query = `
    query GET_TENANT($identifier: String!) {
        tenant {
            get(identifier: $identifier) {
                id
                identifier
                staticAuthToken
                defaults {
                    language
                }
            }
        }
    }
`;

export const getTenant = async ({
    tenantIdentifier,
    client,
}: {
    tenantIdentifier: string;
    client: ClientInterface;
}): Promise<Tenant> => {
    if (!tenantIdentifier) {
        throw new Error('missing tenant identifier');
    }

    let tenant: Tenant;
    try {
        const res = await client.pimApi(query, { identifier: tenantIdentifier });
        tenant = res?.tenant?.get as Tenant;
    } catch (err: any) {
        if (err.code === 403) {
            throw new Error(`provided access tokens do not have access to tenant "${tenantIdentifier}"`);
        }
        throw err;
    }

    if (!tenant) {
        throw new Error(`unable to get tenant "${tenantIdentifier}"`);
    }

    return tenant;
};
