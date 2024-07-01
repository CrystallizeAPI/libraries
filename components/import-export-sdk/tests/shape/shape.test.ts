import { ZodError } from 'zod';
import { ObjectId } from 'bson';
import { VariablesType } from '@crystallize/js-api-client';
import { Shape } from '@crystallize/schema';
import { createShapeMutation, getShapeQuery, shape, updateShapeMutation } from '../../src/shape';

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
                tenantId: mockTenantId,
                identifier: 'some-shape',
            }),
            createShapeMutation({
                input: {
                    tenantId: mockTenantId,
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
                tenantId: mockTenantId,
                identifier: 'some-shape',
            }),
            createShapeMutation({
                input: {
                    tenantId: mockTenantId,
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
                tenantId: mockTenantId,
                identifier: 'some-shape',
            }),
            updateShapeMutation({
                tenantId: mockTenantId,
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
        let mockPimApi = jest.fn().mockResolvedValueOnce({
            shape: {
                get: tc.existingShape || null,
            },
        });

        if (tc.existingShape) {
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
            expect(await shape(tc.input).execute(mockClient)).toThrow(tc.error);
            return;
        }

        if (!tc.expectedCalls?.length) {
            throw new Error('no expected mutations provided for test');
        }

        const s = await shape(tc.input).execute(mockClient);
        expect(s?.name).toBe(tc.input.name);
        expect(s?.identifier).toBe(tc.input.identifier);
        expect(mockPimApi).toHaveBeenCalledTimes(tc.expectedCalls.length);
        tc.expectedCalls.forEach(({ query, variables }, i) => {
            expect(mockPimApi).toHaveBeenNthCalledWith(i + 1, query, variables);
        });
    }),
);
