import { ClientInterface } from '@crystallize/js-api-client';
import { BootstrapperContext, Shape } from '../types';

const query = `
    query GET_EXISTING_SHAPES($tenantId: ID!) {
        shape {
            getMany(tenantId: $tenantId) {
                identifier
            }
        }
    }
`;

export const getExistingShapes = async ({
    ctx,
    client,
}: {
    ctx: BootstrapperContext;
    client: ClientInterface;
}): Promise<Shape[]> => {
    if (!ctx.tenantId) {
        throw new Error('Missing tenant id in context');
    }

    const res = await client.pimApi(query, { tenantId: ctx.tenantId });
    const shapes: Shape[] | undefined = res?.shape?.getMany;

    if (!shapes) {
        throw new Error(`Error fetching existing shapes`);
    }

    if (ctx.logLevel === 'debug') {
        ctx.eventEmitter.emit('DEBUG', res);
    }
    return shapes;
};
