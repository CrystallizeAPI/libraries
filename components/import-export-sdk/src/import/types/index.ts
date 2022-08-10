import { z } from 'zod';
import EventEmitter from 'events';
import { MassClientInterface } from '@crystallize/js-api-client';
import { ImportSpecSchema, ShapeImportSpecSchema, TopicChildImportSpecSchema, TopicImportSpecSchema } from '../schema';

export enum EventTypes {
    error = 'error',
    warn = 'warn',
    debug = 'debug',
    end = 'end',
}

export interface TopicChildImportSpec {
    id?: string;
    name: string;
    pathIdentifier?: string;
    children?: TopicChildImportSpec[];
}

export type ImportSpec = z.infer<typeof ImportSpecSchema>;
export type ShapeImportSpec = z.infer<typeof ShapeImportSpecSchema>;
export type TopicImportSpec = z.infer<typeof TopicImportSpecSchema>;

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface CreateBootstrapperProps {
    tenantIdentifier: string;
    accessTokenId: string;
    accessTokenSecret: string;
    schema: ImportSpec;
    logLevel?: LogLevel;
    silent?: boolean;
}

export interface Bootstrapper {
    ctx: BootstrapperContext;
    events: EventEmitter;
    execute: (options?: ExecutionOptions) => Promise<void>;
}

/**
 * BootstrapperContext is a readonly object passed created when initialising
 * the Bootstrapper, and passed through the execution. The context is not the
 * state (used for caching) and should not be mutated after creation.
 */
export interface BootstrapperContext {
    tenant: Tenant;
    accessTokenId: string;
    accessTokenSecret: string;
    schema: ImportSpec;
    logLevel: LogLevel;
    eventEmitter: EventEmitter;
    massClient: MassClientInterface;
}

export interface ExecutionOptions {
    dryRun?: boolean;
}

export interface Tenant {
    id: string;
    identifier: string;
    staticAuthToken?: string;
    defaults: {
        language: string;
    };
}

export interface Topic {
    id: string;
    path: string;
    descendants?: Topic[];
}

export interface ExistingShape {
    identifier: string;
}

export interface ExistingTopic {
    id: string;
    path: string;
}
