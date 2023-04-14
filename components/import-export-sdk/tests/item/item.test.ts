import { ZodError } from 'zod';
import { ObjectId } from 'mongodb';
import { VariablesType } from '@crystallize/js-api-client';
import { Item } from '@crystallize/schema';
import { getItemQuery, item, updateFolderMutation } from '../../src/item';

const mockTenantId = new ObjectId().toString();
const mockItemId = new ObjectId().toString();

interface testCase {
    name: string;
    input: Item;
    existingItem?: Item;
    expectedCalls?: { query: string; variables: VariablesType }[];
    error?: ZodError;
}

const testCases: testCase[] = [
    {
        name: 'Creates a basic folder',
        input: {
            language: 'en',
            tenantId: mockTenantId,
            id: mockItemId,
            name: 'Some Folder',
            type: 'folder',
            shape: {
                identifier: 'some-shape',
                name: 'some shape',
                type: 'folder',
            },
        },
        existingItem: {
            id: mockItemId,
            tenantId: mockTenantId,
            language: 'en',
            name: 'Some Folder',
            type: 'folder',
            shape: {
                identifier: 'some-shape',
                name: 'some shape',
                type: 'folder',
            },
            tree: {
                path: '/some-folder',
            },
        },
        expectedCalls: [
            getItemQuery({ id: mockItemId, language: 'en', versionLabel: 'current' }),
            updateFolderMutation({
                id: mockItemId,
                input: {
                    name: 'Some Folder',
                },
                language: 'en',
            }),
        ],
    },
];

testCases.forEach((tc) =>
    it(tc.name, async () => {
        let mockPimApi = jest.fn().mockResolvedValueOnce({
            item: {
                get: tc.existingItem || null,
            },
        });

        if (tc.existingItem) {
            mockPimApi = mockPimApi.mockResolvedValue({
                [tc.input.type]: {
                    update: tc.input,
                },
            });
        } else {
            mockPimApi = mockPimApi.mockResolvedValue({
                [tc.input.type]: {
                    create: tc.input,
                },
            });
        }

        const mockClient = {
            pimApi: mockPimApi,
            config: {
                tenantIdentifier: 'some-tenant-identifier',
                tenantId: mockTenantId,
            },
        } as any;

        if (tc.error) {
            expect(await item(tc.input).execute(mockClient)).toThrow(tc.error);
            return;
        }

        if (!tc.expectedCalls?.length) {
            throw new Error('no expected mutations provided for test');
        }

        const i = await item(tc.input).execute(mockClient);

        expect(mockPimApi).toHaveBeenCalledTimes(tc.expectedCalls.length);
        tc.expectedCalls.forEach(({ query, variables }, i) => {
            expect(mockPimApi).toHaveBeenNthCalledWith(i + 1, query, variables);
        });

        expect(i?.name).toBe(tc.input.name);
    }),
);
