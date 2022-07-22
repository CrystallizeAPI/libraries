import EventEmitter from 'events';
import { execute } from './execute';
import { Bootstrapper, BootstrapperContext, CrystallizeJSONSpec, crystallizeJSONSpecSchema, LogLevel } from '../types';
import { ClientInterface, createClient, createMassCallClient } from '@crystallize/js-api-client';

interface CreateBootstrapperProps {
    tenantIdentifier?: string;
    accessTokenId?: string;
    accessTokenSecret?: string;
    spec?: CrystallizeJSONSpec;
    logLevel?: LogLevel;
    silent?: boolean;
}

export const createBootstrapper = ({
    tenantIdentifier = '',
    accessTokenId,
    accessTokenSecret,
    spec,
    logLevel = 'error',
}: CreateBootstrapperProps): Bootstrapper => {
    const events = new EventEmitter();
    const ctx: BootstrapperContext = {
        tenantId: '',
        tenantIdentifier: '',
        logLevel,
        eventEmitter: events,
    };

    const setAccessToken = (id: string, secret: string) => {
        ctx.accessTokenId = id;
        ctx.accessTokenSecret = secret;
    };
    const setTenantIdentifier = (identifier: string) => {
        ctx.tenantIdentifier = identifier;
    };
    const setSpec = (spec: CrystallizeJSONSpec) => {
        ctx.spec = crystallizeJSONSpecSchema.parse(spec);
    };
    const setLogLevel = (logLevel: LogLevel) => {
        ctx.logLevel = logLevel;
    };

    if (accessTokenId && accessTokenSecret) setAccessToken(accessTokenId, accessTokenSecret);
    if (tenantIdentifier) setTenantIdentifier(tenantIdentifier);
    if (spec) setSpec(spec);

    return {
        ctx,
        events,
        setAccessToken,
        setTenantIdentifier,
        setSpec,
        setLogLevel,
        execute: (options) => execute({ ctx, options }),
    };
};
