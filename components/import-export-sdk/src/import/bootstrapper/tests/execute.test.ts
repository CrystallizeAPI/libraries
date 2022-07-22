import test from 'ava';
import EventEmitter from 'events';
import { BootstrapperContext, ExecutionOptions } from '../../types';
import { execute } from '../execute';

interface testCase {
    name: string;
    ctx: BootstrapperContext;
    options?: ExecutionOptions;
    error?: Error;
}

const baseCtx: BootstrapperContext = {
    accessTokenId: '123',
    accessTokenSecret: '123',
    tenantId: '123',
    tenantIdentifier: 'some-tenant',
    eventEmitter: new EventEmitter(),
    logLevel: 'debug',
};

const testCases: testCase[] = [
    {
        name: 'throws an error if access tokens are missing',
        ctx: {
            tenantId: '',
            tenantIdentifier: '',
            eventEmitter: new EventEmitter(),
            logLevel: 'debug',
        },
        error: new Error('Crystallize access token id and secret must be set'),
    },
    {
        name: 'throws an error if tenant identifier is missing',
        ctx: {
            tenantId: '',
            tenantIdentifier: '',
            eventEmitter: new EventEmitter(),
            logLevel: 'debug',
            accessTokenId: '123',
            accessTokenSecret: '123',
        },
        error: new Error('Crystallize tenant identifier must be set'),
    },
    {
        name: 'throws an error if schema is missing',
        ctx: baseCtx,
        error: new Error('Import schema must be set'),
    },
];

testCases.forEach((tc) =>
    test(tc.name, async (t) => {
        try {
            await execute({ ctx: tc.ctx, options: tc.options });
            if (tc.error) {
                return t.fail('test case should error');
            }
        } catch (err: any) {
            if (!tc.error) {
                return t.fail('test case should not error');
            }
            t.deepEqual(err, tc.error);
        }
    }),
);
