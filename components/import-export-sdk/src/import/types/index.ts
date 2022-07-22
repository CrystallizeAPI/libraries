import { z } from 'zod';
import { CreateInputSchema as CreateShapeInputSchema, UpdateInputSchema as UpdateShapeInputSchema } from '../../shape';
import EventEmitter from 'events';

export const crystallizeJSONSpecSchema = z.object({
    shapes: z.array(CreateShapeInputSchema).optional(),
});

export type CrystallizeJSONSpec = z.infer<typeof crystallizeJSONSpecSchema>;
export type CrystallizeJSONShapeSpec = z.infer<typeof CreateShapeInputSchema>;

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Bootstrapper {
    ctx: BootstrapperContext;
    events: EventEmitter;
    setAccessToken: (id: string, secret: string) => void;
    setTenantIdentifier: (identifier: string) => void;
    setSpec: (spec: CrystallizeJSONSpec) => void;
    setLogLevel: (level: LogLevel) => void;
    execute: (options?: ExecutionOptions) => Promise<void>;
}

export interface BootstrapperContext {
    tenantId: string;
    tenantIdentifier: string;
    accessTokenId?: string;
    accessTokenSecret?: string;
    spec?: CrystallizeJSONSpec;
    logLevel: LogLevel;
    eventEmitter: EventEmitter;
}

export interface ExecutionOptions {
    dryRun?: boolean;
}

export interface Tenant {
    id: string;
    identifier: string;
    staticAuthToken?: string;
}

export interface Shape {
    identifier: string;
}
