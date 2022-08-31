import { ZodError } from 'zod';
import { ObjectId } from 'mongodb';
import { VariablesType } from '@crystallize/js-api-client';
import { item, getItemQuery } from '../../src/item';
import { Item } from '../../src/schema/item';

const mockTenantId = new ObjectId().toString();

interface testCase {
    name: string;
    input: Item;
    existingItem?: Item;
    expectedCalls?: { query: string; variables: VariablesType }[];
    error?: ZodError;
}

const testCases: testCase[] = [
    // {
    //     name: 'Creates a basic item',
    //     input: {
    //         name: 'Some Folder',
    //         type: 'folder',
    //     },
    //     expectedCalls: [
    //         {
    //             getItemQuery()
    //         },
    //     ],
    // },
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
                shape: {
                    update: tc.input,
                },
            });
        } else {
            mockPimApi = mockPimApi.mockResolvedValue({
                shape: {
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
            expect(await item(tc.input)(mockClient)).toThrow(tc.error);
            return;
        }

        if (!tc.expectedCalls?.length) {
            throw new Error('no expected mutations provided for test');
        }

        const { name } = await item(tc.input)(mockClient);
        expect(name).toBe(tc.input.name);
        expect(mockPimApi).toHaveBeenCalledTimes(tc.expectedCalls.length);
        tc.expectedCalls.forEach(({ query, variables }, i) => {
            expect(mockPimApi).toHaveBeenNthCalledWith(i + 1, query, variables);
        });
    }),
);
