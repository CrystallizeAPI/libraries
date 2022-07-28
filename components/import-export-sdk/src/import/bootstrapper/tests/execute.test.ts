import { MassClientInterface } from '@crystallize/js-api-client';
import { deepEqual } from 'assert';
import EventEmitter from 'events';
import { BootstrapperContext, ExecutionOptions } from '../../types';
import { execute } from '../execute';

interface testCase {
    name: string;
    ctx: BootstrapperContext;
    options?: ExecutionOptions;
    error?: Error;
}

const testCases: testCase[] = [
    {
        name: 'does not call massClient.exucute() during a dry run',
        ctx: {
            eventEmitter: new EventEmitter(),
            logLevel: 'debug',
            massClient: {
                execute: async (): Promise<any> => {
                    throw new Error('should not execute');
                },
            } as MassClientInterface,
            schema: {},
        } as BootstrapperContext,
        options: {
            dryRun: true,
        },
    },
];

testCases.forEach((tc) =>
    it(tc.name, async () => {
        const promise = execute({ ctx: tc.ctx, options: tc.options });
        if (tc.error) {
            await expect(promise).rejects.toEqual(tc.error);
            return;
        }

        await expect(promise).resolves.toBeUndefined();
    }),
);
