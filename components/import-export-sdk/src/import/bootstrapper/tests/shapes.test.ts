import { ClientInterface, MassClientInterface } from '@crystallize/js-api-client';
import test from 'ava';
import { BootstrapperContext, Shape } from '../../types';
import { handleShapes } from '../shapes';

interface testCase {
    name: string;
    existingShapes: Shape[];
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
    test(tc.name, async (t) => {
        const ctx = {
            tenantId: 'some-id',
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

        const mockClient = {
            pimApi: (_query, _variables) =>
                Promise.resolve({
                    shape: {
                        getMany: tc.existingShapes,
                    },
                }),
        } as ClientInterface;

        let createMutations = 0;
        let updateMutations = 0;
        const mockMassClient = {
            enqueue: {
                pimApi: (_, variables) => {
                    variables?.identifier ? updateMutations++ : createMutations++;
                },
            },
        } as MassClientInterface;

        await handleShapes({ ctx, client: mockClient, massClient: mockMassClient });
        t.is(createMutations, tc.expectedCreateMutations || 0);
        t.is(updateMutations, tc.expectedUpdateMutations || 0);
    }),
);
