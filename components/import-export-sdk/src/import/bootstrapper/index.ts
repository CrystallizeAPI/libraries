import EventEmitter from 'events';
import { execute } from './execute';
import { Bootstrapper, BootstrapperContext, EventTypes, CreateBootstrapperProps } from '../types';
import { getTenant } from '../queries/getTenant';
import { createClient, createMassCallClient } from '@crystallize/js-api-client';

export const createBootstrapper = async ({
    tenantIdentifier,
    accessTokenId,
    accessTokenSecret,
    schema,
    logLevel = 'error',
}: CreateBootstrapperProps): Promise<Bootstrapper> => {
    if (!tenantIdentifier) {
        throw new Error('missing tenant identifier');
    }
    if (!accessTokenId || !accessTokenSecret) {
        throw new Error('missing access token id or secret');
    }
    if (!schema) {
        throw new Error('missing schema');
    }

    const client = createClient({
        tenantIdentifier,
        accessTokenId,
        accessTokenSecret,
    });

    const tenant = await getTenant({ tenantIdentifier, client });

    const events = new EventEmitter();
    const massClient = createMassCallClient(client, {
        onFailure: async (batch, exception, promise) => {
            ctx.eventEmitter.emit(EventTypes.error, exception);
            return false;
        },
        afterRequest: async (batch, promise, results) => {
            if (ctx.logLevel === 'debug') {
                ctx.eventEmitter.emit(EventTypes.debug, results);
            }
        },
    });

    const ctx: BootstrapperContext = {
        tenant,
        accessTokenId,
        accessTokenSecret,
        logLevel,
        schema,
        eventEmitter: events,
        massClient,
    };

    return {
        ctx,
        events,
        execute: (options) => execute({ ctx, options }),
    };
};
