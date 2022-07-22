import { ClientInterface } from '@crystallize/js-api-client';
import { BootstrapperContext, Tenant } from '../types';

const query = `
    query GET_TENANT($identifier: String!) {
        tenant {
            get(identifier: $identifier) {
                id
                identifier
                staticAuthToken
            }
        }
    }
`;

export const getTenant = async ({
    ctx,
    client,
}: {
    ctx: BootstrapperContext;
    client: ClientInterface;
}): Promise<Tenant> => {
    if (!ctx.tenantIdentifier) {
        throw new Error('Crystallize tenant identifier must be set');
    }

    const res = await client.pimApi(query, { identifier: ctx.tenantIdentifier });
    const tenant: Tenant | undefined = res?.tenant?.get;

    if (!tenant) {
        throw new Error(`You do not have access to tenant "${ctx.tenantIdentifier}"`);
    }

    if (ctx.logLevel === 'debug') {
        ctx.eventEmitter.emit('DEBUG', res);
    }
    return tenant;
};
