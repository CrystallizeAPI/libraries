import { ZodError } from 'zod';
import { ObjectId } from 'bson';
import { CreateTopicInput } from '@crystallize/schema';
import { deepEqual, equal } from 'assert';
import { createTopicMutation } from '../../src/topic/mutations/create';
import { expect, it } from 'vitest';

const mockTenantId = new ObjectId().toString();

interface testCase {
    name: string;
    input: CreateTopicInput;
    error?: ZodError;
}

const testCases: testCase[] = [
    {
        name: 'Returns the query and variables for a basic topic',
        input: {
            tenantId: mockTenantId,
            name: 'Some Topic ',
        },
    },
    {
        name: 'Returns the query and variables for a topic with children',
        input: {
            tenantId: mockTenantId,
            name: 'Some Topic',
            children: [
                {
                    name: 'Some child 1',
                    children: [
                        {
                            name: 'Some grandchild 1',
                        },
                    ],
                },
                {
                    name: 'Some child 2',
                },
            ],
        },
    },
];

testCases.forEach((tc) =>
    it(tc.name, () => {
        if (tc.error) {
            expect(() => createTopicMutation({ input: tc.input, language: 'en' })).toThrow(tc.error);
            return;
        }

        const { query, variables } = createTopicMutation({ input: tc.input, language: 'en' });
        const re = / /g;
        equal(
            query.replace(re, ''),
            `
                mutation CREATE_TOPIC($language: String!, $input: CreateTopicInput!) {
                    topic {
                        create(language: $language, input: $input) {
                            id
                        }
                    }
                }
            `.replace(re, ''),
        );
        deepEqual(variables, { input: tc.input, language: 'en' });
    }),
);
