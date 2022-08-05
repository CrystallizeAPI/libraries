import { BootstrapperContext, EventTypes, ExistingShape } from '../types';

const query = `
    query GET_EXISTING_SHAPES($tenantId: ID!) {
        shape {
            getMany(tenantId: $tenantId) {
                identifier
            }
        }
    }
`;

export const getExistingShapes = async ({ ctx }: { ctx: BootstrapperContext }): Promise<ExistingShape[]> => {
    const res = await ctx.massClient.pimApi(query, { tenantId: ctx.tenant.id });
    const shapes: ExistingShape[] | undefined = res?.shape?.getMany;

    if (!shapes) {
        throw new Error(`Error fetching existing shapes`);
    }

    if (ctx.logLevel === 'debug') {
        ctx.eventEmitter.emit(EventTypes.debug, res);
    }
    return shapes;
};
