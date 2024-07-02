import { ZodError } from 'zod';
import { ObjectId } from 'bson';
import { VariablesType } from '@crystallize/js-api-client';
import { Topic } from '@crystallize/schema';
import { getTopicQuery, createTopicMutation, updateTopicMutation, topic } from '../../src/topic';
import { expect, it, vi } from 'vitest';

interface testCase {
    name: string;
    input: Topic;
    existingTopic?: Topic;
    expectedCalls?: { query: string; variables: VariablesType }[];
    error?: ZodError;
}

const mockTenantId = new ObjectId().toString();
const mockParentId = new ObjectId().toString();
const mockChildId = new ObjectId().toString();

const testCases: testCase[] = [
    {
        name: 'Creates a simple topic',
        input: {
            name: 'Some Topic',
            language: 'en',
            parentId: mockParentId,
            pathIdentifier: 'some-path-identifier',
        },
        expectedCalls: [
            createTopicMutation({
                language: 'en',
                input: {
                    tenantId: mockTenantId,
                    name: 'Some Topic',
                    parentId: mockParentId,
                    pathIdentifier: 'some-path-identifier',
                },
            }),
        ],
    },
    {
        name: 'Creates a simple topic with a small number of children',
        input: {
            name: 'Some Topic',
            parentId: mockParentId,
            pathIdentifier: 'some-path-identifier',
            children: [
                {
                    name: 'Some Child 1',
                    pathIdentifier: 'some-child-1',
                    children: [
                        {
                            name: 'Some Grandchild 1',
                        },
                        {
                            name: 'Some Grandchild 2',
                        },
                    ],
                },
                {
                    name: 'Some Child 2',
                },
            ],
        },
        expectedCalls: [
            createTopicMutation({
                language: 'en',
                input: {
                    tenantId: mockTenantId,
                    name: 'Some Topic',
                    parentId: mockParentId,
                    pathIdentifier: 'some-path-identifier',
                    children: [
                        {
                            name: 'Some Child 1',
                            pathIdentifier: 'some-child-1',
                            children: [
                                {
                                    name: 'Some Grandchild 1',
                                },
                                {
                                    name: 'Some Grandchild 2',
                                },
                            ],
                        },
                        {
                            name: 'Some Child 2',
                        },
                    ],
                },
            }),
        ],
    },
    {
        name: 'Creates topics in batches when there are too many children for 1 query',
        input: {
            name: 'Some Topic',
            parentId: mockParentId,
            pathIdentifier: 'some-path-identifier',
            children: [
                {
                    name: 'Some Child 1',
                    pathIdentifier: 'some-child-1',
                    children: new Array(100).fill('').map((_, i) => ({
                        name: `Some Grandchild ${i + 1}`,
                    })),
                },
                {
                    name: 'Some Child 2',
                    children: new Array(50).fill('').map((_, i) => ({
                        name: `Some Grandchild ${i + 1}`,
                    })),
                },
            ],
        },
        expectedCalls: [
            createTopicMutation({
                language: 'en',
                input: {
                    tenantId: mockTenantId,
                    name: 'Some Topic',
                    parentId: mockParentId,
                    pathIdentifier: 'some-path-identifier',
                    children: [],
                },
            }),
            createTopicMutation({
                language: 'en',
                input: {
                    tenantId: mockTenantId,
                    parentId: mockChildId,
                    name: 'Some Child 1',
                    pathIdentifier: 'some-child-1',
                    children: [],
                },
            }),
            ...new Array(100).fill('').map((_, i) =>
                createTopicMutation({
                    language: 'en',
                    input: {
                        tenantId: mockTenantId,
                        name: `Some Grandchild ${i + 1}`,
                        parentId: mockChildId,
                    },
                }),
            ),
            createTopicMutation({
                language: 'en',
                input: {
                    tenantId: mockTenantId,
                    name: 'Some Child 2',
                    parentId: mockChildId,
                    children: new Array(50).fill('').map((_, i) => ({
                        name: `Some Grandchild ${i + 1}`,
                    })),
                },
            }),
        ],
    },
    {
        name: 'Updates a topic when topic.id is provided and the topic already exists',
        input: {
            id: 'someMockedId',
            name: 'Some Topic',
            parentId: mockParentId,
            pathIdentifier: 'some-path-identifier',
        },
        existingTopic: {
            id: 'some-topic-id',
        } as Topic,
        expectedCalls: [
            getTopicQuery({
                id: 'someMockedId',
                language: 'en',
            }),
            updateTopicMutation({
                id: 'someMockedId',
                language: 'en',
                input: {
                    name: 'Some Topic',
                    parentId: mockParentId,
                    pathIdentifier: 'some-path-identifier',
                },
            }),
        ],
    },
    {
        name: 'Creates a topic when topic.id is provided and the topic does not already exist',
        input: {
            id: 'someMockedId',
            name: 'Some Topic',
            parentId: mockParentId,
            pathIdentifier: 'some-path-identifier',
        },
        expectedCalls: [
            getTopicQuery({
                id: 'someMockedId',
                language: 'en',
            }),
            createTopicMutation({
                language: 'en',
                input: {
                    tenantId: mockTenantId,
                    name: 'Some Topic',
                    parentId: mockParentId,
                    pathIdentifier: 'some-path-identifier',
                },
            }),
        ],
    },
];

testCases.forEach((tc) =>
    it(tc.name, async () => {
        let mockPimApi = vi.fn();

        if (tc.existingTopic) {
            mockPimApi = mockPimApi
                .mockResolvedValueOnce({
                    topic: {
                        get: tc.existingTopic,
                    },
                })
                .mockResolvedValue({
                    topic: {
                        update: {
                            id: mockChildId,
                        },
                    },
                });
        } else {
            mockPimApi = mockPimApi.mockResolvedValue({
                topic: {
                    create: {
                        id: mockChildId,
                    },
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
            expect(await topic(tc.input).execute(mockClient)).toThrow(tc.error);
            return;
        }

        if (!tc.expectedCalls?.length) {
            throw new Error('no expected mutations provided for test');
        }

        const t = await topic(tc.input).execute(mockClient);
        expect(t?.id).toBe(mockChildId);
        expect(mockPimApi).toHaveBeenCalledTimes(tc.expectedCalls.length);
        tc.expectedCalls.forEach(({ query, variables }, i) => {
            expect(mockPimApi).toHaveBeenNthCalledWith(i + 1, query, variables);
        });
    }),
);
