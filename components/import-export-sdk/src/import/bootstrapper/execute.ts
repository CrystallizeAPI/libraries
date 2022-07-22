import { createClient, createMassCallClient } from '@crystallize/js-api-client';
import { getTenant } from '../queries/getTenant';
import { BootstrapperContext, ExecutionOptions, Tenant } from '../types';
import { handleShapes } from './shapes';

export const execute = async ({ ctx, options }: { ctx: BootstrapperContext; options?: ExecutionOptions }) => {
    const { tenantIdentifier, accessTokenId, accessTokenSecret, schema } = ctx;

    if (!accessTokenId || !accessTokenSecret) {
        throw new Error('Crystallize access token id and secret must be set');
    }
    if (!tenantIdentifier) {
        throw new Error('Crystallize tenant identifier must be set');
    }
    if (!schema) {
        throw new Error('Import schema must be set');
    }

    const client = createClient({
        tenantIdentifier,
        accessTokenId,
        accessTokenSecret,
    });
    const tenant = await getTenant({ ctx, client });
    ctx.tenantId = tenant.id;

    const massClient = createMassCallClient(client, {
        onFailure: async (batch, exception, promise) => {
            ctx.eventEmitter.emit('ERROR', exception);
            return false;
        },
        afterRequest: async (batch, promise, results) => {
            if (ctx.logLevel === 'debug') {
                ctx.eventEmitter.emit('DEBUG', results);
            }
        },
    });

    // Stage 1: Shapes, topic maps...

    if (schema.shapes?.length) {
        await handleShapes({ ctx, client, massClient });
    }

    if (options?.dryRun) {
        ctx.eventEmitter.emit('DRY_RUN_DONE', {
            message: 'Dry run completed successfully',
        });
        return;
    }

    ctx.eventEmitter.emit('DEBUG', `Executing ${massClient.queue.length} mutations`);
    await massClient.execute();
    ctx.eventEmitter.emit('DONE');
};
