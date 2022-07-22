import EventEmitter from 'events';
import { execute } from './execute';
import { Bootstrapper, BootstrapperContext, LogLevel, importSchema, ImportSchema } from '../types';

interface ICreateBootstrapperProps {
    tenantIdentifier?: string;
    accessTokenId?: string;
    accessTokenSecret?: string;
    schema?: ImportSchema;
    logLevel?: LogLevel;
    silent?: boolean;
}

export const createBootstrapper = ({
    tenantIdentifier = '',
    accessTokenId,
    accessTokenSecret,
    schema,
    logLevel = 'error',
}: ICreateBootstrapperProps): Bootstrapper => {
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
    const setSchema = (spec: ImportSchema) => {
        ctx.schema = importSchema.parse(spec);
    };
    const setLogLevel = (logLevel: LogLevel) => {
        ctx.logLevel = logLevel;
    };

    if (accessTokenId && accessTokenSecret) setAccessToken(accessTokenId, accessTokenSecret);
    if (tenantIdentifier) setTenantIdentifier(tenantIdentifier);
    if (schema) setSchema(schema);

    return {
        ctx,
        events,
        setAccessToken,
        setTenantIdentifier,
        setSchema,
        setLogLevel,
        execute: (options) => execute({ ctx, options }),
    };
};
