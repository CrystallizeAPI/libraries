import { MassClientInterface } from '@crystallize/js-api-client';
import { equal } from 'assert';
import { BootstrapperContext, ExistingShape } from '../../types';
import { handleShapes } from '../shapes';

interface testCase {
    name: string;
    existingShapes: ExistingShape[];
    expectedCreateMutations?: number;
    expectedUpdateMutations?: number;
}

const testCases: testCase[] = [
    {
        name: 'enqueues create mutations when there are no existing shapes',
        existingShapes: [],
        expectedCreateMutations: 2,
    },
    {
        name: 'enqueues create mutations when there are no existing shapes that match the spec',
        existingShapes: [
            {
                identifier: 'some-other-shape',
            },
        ],
        expectedCreateMutations: 2,
    },
    {
        name: 'enqueues update mutations when there are existing shapes that match the spec',
        existingShapes: [
            {
                identifier: 'some-shape-1',
            },
        ],
        expectedCreateMutations: 1,
        expectedUpdateMutations: 1,
    },
];

testCases.forEach((tc) =>
    it(tc.name, async () => {
        const ctx = {
            tenant: {
                id: 'some-id',
            },
            schema: {
                shapes: [
                    {
                        name: 'Some Shape',
                        identifier: 'some-shape-1',
                        type: 'folder',
                    },
                    {
                        name: 'Some Shape',
                        identifier: 'some-shape-2',
                        type: 'folder',
                    },
                ],
            },
        } as BootstrapperContext;

        let createMutations = 0;
        let updateMutations = 0;
        const mockMassClient = {
            pimApi: (_query, { identifier }: { identifier: string }) =>
                Promise.resolve({
                    shape: {
                        get: tc.existingShapes.find((existing) => existing.identifier === identifier),
                    },
                }),
            enqueue: {
                pimApi: (_query, variables) => {
                    variables?.identifier ? updateMutations++ : createMutations++;
                },
            },
            config: {
                tenantIdentifier: 'some-tenant-identifier',
                tenantId: 'some-tenant-id',
            },
        } as MassClientInterface;

        await handleShapes({
            ctx: {
                ...ctx,
                massClient: mockMassClient,
            },
        });
        equal(createMutations, tc.expectedCreateMutations || 0);
        equal(updateMutations, tc.expectedUpdateMutations || 0);
    }),
);
