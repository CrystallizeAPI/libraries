import { BootstrapperContext, CreateBootstrapperProps, Tenant } from '../../types';
import { createBootstrapper } from '..';

jest.mock('../../queries/getTenant', () => ({
    getTenant: async () =>
        ({
            id: 'some-tenant-id',
            identifier: 'some-tenant',
            defaults: {
                language: 'en',
            },
            staticAuthToken: '123',
        } as Tenant),
}));

interface testCase {
    name: string;
    props: CreateBootstrapperProps;
    tenant?: Tenant;
    expected?: BootstrapperContext;
    error?: Error;
}

const testCases: testCase[] = [
    {
        name: 'throws an error when a tenant identifier is not provided',
        props: {} as CreateBootstrapperProps,
        error: new Error('missing tenant identifier'),
    },
    {
        name: 'throws an error when access tokens are not provided',
        props: {
            tenantIdentifier: 'some-tenant',
        } as CreateBootstrapperProps,
        error: new Error('missing access token id or secret'),
    },
    {
        name: 'throws an error when no import schema is provided',
        props: {
            tenantIdentifier: 'some-tenant',
            accessTokenId: '123',
            accessTokenSecret: '123',
        } as CreateBootstrapperProps,
        error: new Error('missing schema'),
    },
    {
        name: 'returns a bootstrapper with the correct context',
        props: {
            tenantIdentifier: 'some-tenant',
            accessTokenId: '123',
            accessTokenSecret: '123',
            schema: {},
        } as CreateBootstrapperProps,
        expected: {
            accessTokenId: '123',
            accessTokenSecret: '123',
            tenant: {
                id: 'some-tenant-id',
                identifier: 'some-tenant',
                defaults: {
                    language: 'en',
                },
                staticAuthToken: '123',
            },
            logLevel: 'error',
        } as BootstrapperContext,
    },
];

describe('createBootstrapper', () => {
    afterAll(() => {
        jest.unmock('../../queries/getTenant');
    });

    testCases.forEach((tc) => {
        it(tc.name, async () => {
            const promise = createBootstrapper(tc.props);
            if (tc.error) {
                await expect(promise).rejects.toEqual(tc.error);
                return;
            }

            await expect(promise.then(({ ctx }) => ctx)).resolves.toEqual(expect.objectContaining(tc.expected));
        });
    });
});
