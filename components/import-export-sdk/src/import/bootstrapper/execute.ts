import { createClient, createMassCallClient } from '@crystallize/js-api-client';
import { getTenant } from '../queries/getTenant';
import { BootstrapperContext, ExecutionOptions } from '../types';
import { handleShapes } from './shapes';

export const execute = async ({ ctx, options }: { ctx: BootstrapperContext; options?: ExecutionOptions }) => {
    const { tenantIdentifier, accessTokenId, accessTokenSecret, spec } = ctx;

    if (!accessTokenId || !accessTokenSecret) {
        throw new Error('Crystallize access token id and secret must be set');
    }
    if (!tenantIdentifier) {
        throw new Error('Crystallize tenant identifier must be set');
    }
    if (!spec) {
        throw new Error('Import spec must be set');
    }

    const client = createClient({
        tenantIdentifier,
        accessTokenId,
        accessTokenSecret,
    });
    const tenant = await getTenant({ ctx, client });
    ctx.tenantId = tenant.id;

    const massClient = createMassCallClient(client, {
        afterRequest: async (...args) => {
            if (ctx.logLevel === 'debug') {
                ctx.eventEmitter.emit('DEBUG', args);
            }
        },
    });

    // Stage 1: Shapes, topic maps...

    if (spec.shapes?.length) {
        await handleShapes({ ctx, client, massClient });
    }

    if (options?.dryRun) {
        ctx.eventEmitter.emit('DRY_RUN_DONE', {
            message: 'Dry run completed successfully',
        });
        return;
    }

    await massClient.execute();
};
