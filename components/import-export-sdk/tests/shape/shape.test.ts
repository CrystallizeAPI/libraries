import { ZodError } from 'zod';
import { VariablesType } from '@crystallize/js-api-client';
import { createShapeMutation, getShapeQuery, shape, updateShapeMutation } from '../../src/shape';
import { Shape } from '../../src/schema/shape';

interface testCase {
    name: string;
    input: Shape;
    existingShape?: Shape;
    expectedCalls?: { query: string; variables: VariablesType }[];
    error?: ZodError;
}

const testCases: testCase[] = [
    {
        name: 'Creates a basic shape',
        input: {
            identifier: 'some-shape',
            name: 'Some Shape',
            type: 'product',
            components: [
                {
                    id: 'componentId',
                    name: 'Some Component',
                    type: 'boolean',
                },
            ],
            variantComponents: [
                {
                    id: 'variantComponentId',
                    name: 'Some Variant Component',
                    type: 'singleLine',
                },
            ],
        },
        expectedCalls: [
            getShapeQuery({
                tenantId: 'some-tenant-id',
                identifier: 'some-shape',
            }),
            createShapeMutation({
                input: {
                    tenantId: 'some-tenant-id',
                    identifier: 'some-shape',
                    name: 'Some Shape',
                    type: 'product',
                    components: [
                        {
                            id: 'componentId',
                            name: 'Some Component',
                            type: 'boolean',
                        },
                    ],
                    variantComponents: [
                        {
                            id: 'variantComponentId',
                            name: 'Some Variant Component',
                            type: 'singleLine',
                        },
                    ],
                },
            }),
        ],
    },
    {
        name: 'Updates a basic shape',
        existingShape: {
            identifier: 'some-shape',
            name: 'Some Shape',
            type: 'product',
        },
        input: {
            identifier: 'some-shape',
            name: 'Some Shape 2',
            type: 'product',
            components: [
                {
                    id: 'componentId',
                    name: 'Some Component',
                    type: 'boolean',
                },
            ],
            variantComponents: [
                {
                    id: 'variantComponentId',
                    name: 'Some Variant Component',
                    type: 'singleLine',
                },
            ],
        },
        expectedCalls: [
            getShapeQuery({
                tenantId: 'some-tenant-id',
                identifier: 'some-shape',
            }),
            updateShapeMutation({
                tenantId: 'some-tenant-id',
                identifier: 'some-shape',
                input: {
                    name: 'Some Shape 2',
                    components: [
                        {
                            id: 'componentId',
                            name: 'Some Component',
                            type: 'boolean',
                        },
                    ],
                    variantComponents: [
                        {
                            id: 'variantComponentId',
                            name: 'Some Variant Component',
                            type: 'singleLine',
                        },
                    ],
                },
            }),
        ],
    },
];

testCases.forEach((tc) =>
    it(tc.name, async () => {
        let mockPimApi = jest
            .fn()
            .mockResolvedValueOnce({
                shape: {
                    get: tc.existingShape || null,
                },
            })
            .mockResolvedValue({
                shape: {
                    create: {
                        identifier: 'some-shape',
                    },
                },
            });

        const mockClient = {
            pimApi: mockPimApi,
            config: {
                tenantIdentifier: 'some-tenant-identifier',
                tenantId: 'some-tenant-id',
            },
        } as any;

        if (tc.error) {
            expect(await shape({ client: mockClient, data: tc.input })).toThrow(tc.error);
            return;
        }

        if (!tc.expectedCalls?.length) {
            throw new Error('no expected mutations provided for test');
        }

        await shape({ client: mockClient, data: tc.input });
        expect(mockPimApi).toHaveBeenCalledTimes(tc.expectedCalls.length);
        tc.expectedCalls.forEach(({ query, variables }, i) => {
            expect(mockPimApi).toHaveBeenNthCalledWith(i + 1, query, variables);
        });
    }),
);
