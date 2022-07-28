import { MassClientInterface } from '@crystallize/js-api-client';
import { equal } from 'assert';
import { BootstrapperContext, ExistingTopic, Topic, TopicImportSpec } from '../../types';
import { handleTopics } from '../topics';

interface testCase {
    name: string;
    topics: TopicImportSpec[];
    mockGetTopicsApiResponse: Topic[];
    expectedBulkCreateMutations?: number;
    expectedCreateMutations?: number;
    expectedUpdateMutations?: number;
}

const testCases: testCase[] = [
    {
        name: 'enqueues bulk create mutation when there are no existing topics',
        topics: [
            {
                id: 'parent-topic-1',
                name: 'Parent Topic 1',
                pathIdentifier: 'parent-topic-1',
                children: [
                    {
                        id: 'child-topic-1',
                        name: 'Child Topic 1',
                        pathIdentifier: 'child-topic-1',
                    },
                ],
            },
        ],
        mockGetTopicsApiResponse: [],
        expectedBulkCreateMutations: 1,
    },
    {
        name: 'enqueues an update mutation for a parent that exists and a create mutation for a child that does not exist',
        topics: [
            {
                id: 'parent-topic-1',
                name: 'Parent Topic 1',
                pathIdentifier: 'parent-topic-1',
                children: [
                    {
                        id: 'child-topic-1',
                        name: 'Child Topic 1',
                        pathIdentifier: 'child-topic-1',
                    },
                ],
            },
        ],
        mockGetTopicsApiResponse: [
            {
                id: 'parent-topic-1',
                path: '/parent-topic-1',
            },
        ],
        expectedCreateMutations: 1,
        expectedUpdateMutations: 1,
    },
    {
        name: 'enqueues a bulk create mutation for parents that do not exist, alongside update mutations for parents that do exist, with either update or create mutations for children',
        topics: [
            {
                id: 'parent-topic-1',
                name: 'Parent Topic 1',
                pathIdentifier: 'child-topic-1',
                children: [
                    {
                        id: 'child-topic-1',
                        name: 'Child Topic 1',
                        pathIdentifier: 'child-topic-1',
                    },
                    {
                        id: 'child-topic-2',
                        name: 'Child Topic 2',
                        pathIdentifier: 'child-topic-2',
                    },
                ],
            },
            {
                id: 'parent-topic-2',
                name: 'Parent Topic 2',
                pathIdentifier: 'parent-topic-2',
                children: [
                    {
                        id: 'child-topic-3',
                        name: 'Child Topic 3',
                        pathIdentifier: 'child-topic-3',
                    },
                ],
            },
        ],
        mockGetTopicsApiResponse: [
            {
                id: 'parent-topic-1',
                path: '/parent-topic-1',
                descendants: [
                    {
                        id: 'child-topic-1',
                        path: '/parent-topic-1/child-topic-1',
                    },
                ],
            },
        ],
        expectedBulkCreateMutations: 1,
        expectedCreateMutations: 1,
        expectedUpdateMutations: 2,
    },
];

testCases.forEach((tc) =>
    it(tc.name, async () => {
        const ctx = {
            tenant: {
                id: 'some-id',
                defaults: {
                    language: 'en',
                },
            },
            schema: {
                topics: tc.topics,
            },
        } as BootstrapperContext;

        let bulkCreateMutations = 0;
        let createMutations = 0;
        let updateMutations = 0;

        const mockMassClient = {
            pimApi: async (query, variables) => ({ topic: { getRootTopics: tc.mockGetTopicsApiResponse } }),
            enqueue: {
                pimApi: (query, variables) => {
                    const mutationName = query.split(/ |\(/)[1];
                    switch (mutationName) {
                        case 'BULK_CREATE_TOPICS':
                            bulkCreateMutations++;
                            break;
                        case 'CREATE_TOPIC':
                            createMutations++;
                            break;
                        case 'UPDATE_TOPIC':
                            updateMutations++;
                            break;
                    }
                },
            },
        } as MassClientInterface;

        await handleTopics({
            ctx: {
                ...ctx,
                massClient: mockMassClient,
            },
        });
        equal(bulkCreateMutations, tc.expectedBulkCreateMutations || 0);
        equal(createMutations, tc.expectedCreateMutations || 0);
        equal(updateMutations, tc.expectedUpdateMutations || 0);
    }),
);
