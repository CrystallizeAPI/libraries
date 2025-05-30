import { ZodError } from 'zod';
import { ObjectId } from 'bson';
import { VariablesType } from '@crystallize/js-api-client';
import { Shape } from '@crystallize/schema';
import { createShapeMutation, getShapeQuery, shape, updateShapeMutation } from '../../src/shape';
import { expect, it, vi } from 'vitest';

const mockTenantId = new ObjectId().toString();

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
                identifier: 'some-shape',
            }),
            createShapeMutation({
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
            }),
        ],
    },
    {
        name: 'Creates an item relations component with quick select config',
        input: {
            identifier: 'some-shape',
            name: 'Some Shape',
            type: 'product',
            components: [
                {
                    id: 'componentId',
                    name: 'Some Component',
                    type: 'itemRelations',
                    config: {
                        quickSelect: {
                            folders: [
                                {
                                    folderId: '5dc3fce0ff634e6254b41f90',
                                },
                                {
                                    folderId: '62e8cc2b01c1e875dce7e061',
                                },
                            ],
                        },
                    },
                },
            ],
        },
        expectedCalls: [
            getShapeQuery({
                identifier: 'some-shape',
            }),
            createShapeMutation({
                input: {
                    identifier: 'some-shape',
                    name: 'Some Shape',
                    type: 'product',
                    components: [
                        {
                            id: 'componentId',
                            name: 'Some Component',
                            type: 'itemRelations',
                            config: {
                                itemRelations: {
                                    quickSelect: {
                                        folders: [
                                            {
                                                folderId: '5dc3fce0ff634e6254b41f90',
                                            },
                                            {
                                                folderId: '62e8cc2b01c1e875dce7e061',
                                            },
                                        ],
                                    },
                                },
                            },
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
                identifier: 'some-shape',
            }),
            updateShapeMutation({
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
        let mockPimApi = vi.fn().mockResolvedValueOnce({
            shape: {
                get: tc.existingShape || null,
            },
        });

        let mockNextPimApi = vi.fn().mockResolvedValueOnce({
            shape: tc.existingShape || null,
        });

        if (tc.existingShape) {
            mockPimApi = mockPimApi.mockResolvedValue({
                shape: {
                    update: tc.input,
                },
            });
            mockNextPimApi = mockNextPimApi.mockResolvedValue({
                updateShape: tc.input,
            });
        } else {
            mockPimApi = mockPimApi.mockResolvedValue({
                shape: {
                    create: tc.input,
                },
            });
            mockNextPimApi = mockNextPimApi.mockResolvedValue({
                createShape: tc.input,
            });
        }

        const mockClient = {
            pimApi: mockPimApi,
            nextPimApi: mockNextPimApi,
            config: {
                tenantIdentifier: 'some-tenant-identifier',
                tenantId: mockTenantId,
            },
        } as any;

        if (tc.error) {
            expect(await shape(tc.input).execute(mockClient)).toThrow(tc.error);
            return;
        }

        if (!tc.expectedCalls?.length) {
            throw new Error('no expected mutations provided for test');
        }

        const s = await shape(tc.input).execute(mockClient);
        expect(s?.name).toBe(tc.input.name);
        expect(s?.identifier).toBe(tc.input.identifier);
        expect(mockNextPimApi).toHaveBeenCalledTimes(tc.expectedCalls.length);
        tc.expectedCalls.forEach(({ query, variables }, i) => {
            expect(mockNextPimApi).toHaveBeenNthCalledWith(i + 1, query, variables);
        });
    }),
);
