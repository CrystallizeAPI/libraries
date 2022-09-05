import { ZodError } from 'zod';
import { UpdateTopicInput } from '@crystallize/schema/topic';
import { deepEqual, equal } from 'assert';
import { updateTopicMutation } from '../../src/topic/mutations/update';

interface testCase {
    name: string;
    input: UpdateTopicInput;
    error?: ZodError;
}

const testCases: testCase[] = [
    {
        name: 'Returns the query and variables for a basic topic update',
        input: {
            name: 'Some Topic',
        },
    },
];

testCases.forEach((tc) =>
    it(tc.name, () => {
        if (tc.error) {
            expect(() => updateTopicMutation({ input: tc.input, id: '123', language: 'en' })).toThrow(tc.error);
            return;
        }

        const { query, variables } = updateTopicMutation({ input: tc.input, id: '123', language: 'en' });
        const re = / /g;
        equal(
            query.replace(re, ''),
            `
                mutation UPDATE_TOPIC($id: ID!, $language: String!, $input: UpdateTopicInput!) {
                    topic {
                        update(id: $id, language: $language, input: $input) {
                            id
                        }
                    }
                }
            `.replace(re, ''),
        );
        deepEqual(variables, { input: tc.input, id: '123', language: 'en' });
    }),
);
