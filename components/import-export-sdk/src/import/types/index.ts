import { z } from 'zod';
import EventEmitter from 'events';
import { ShapeComponentSchema, ShapeTypeEnum } from '../../shape';

const shapeSchema = z.object({
    identifier: z.string().min(1),
    name: z.string().min(1),
    type: ShapeTypeEnum,
    components: z.array(ShapeComponentSchema).optional(),
});

export const importSchema = z.object({
    shapes: z.array(shapeSchema).optional(),
});

export type ImportSchema = z.infer<typeof importSchema>;
export type ShapeSchema = z.infer<typeof shapeSchema>;
export type ShapeComponentSchema = z.infer<typeof ShapeComponentSchema>;

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface Bootstrapper {
    ctx: BootstrapperContext;
    events: EventEmitter;
    setAccessToken: (id: string, secret: string) => void;
    setTenantIdentifier: (identifier: string) => void;
    setSchema: (spec: ImportSchema) => void;
    setLogLevel: (level: LogLevel) => void;
    execute: (options?: ExecutionOptions) => Promise<void>;
}

export interface BootstrapperContext {
    tenantId: string;
    tenantIdentifier: string;
    accessTokenId?: string;
    accessTokenSecret?: string;
    schema?: ImportSchema;
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
