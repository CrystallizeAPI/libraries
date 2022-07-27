import test from 'ava';
import { z, ZodError } from 'zod';
import { updateShapeMutation } from '../update';
import { ShapeUpdateInputSchema } from '../../schema';

interface testCase {
    name: string;
    input: z.infer<typeof ShapeUpdateInputSchema>;
    error?: ZodError;
}

const testCases: testCase[] = [
    {
        name: 'Returns the query and variables for a basic shape',
        input: {
            name: 'Some Shape',
        },
    },
    {
        name: 'Returns the query and variables for a shape with components',
        input: {
            name: 'Some Shape',
            components: [
                {
                    id: 'someSingleLine',
                    name: 'Some Single Line',
                    type: 'singleLine',
                },
                {
                    id: 'someComponentChoice',
                    name: 'Some Component Choice',
                    type: 'componentChoice',
                    config: {
                        componentChoice: {
                            choices: [
                                {
                                    id: 'choiceA',
                                    name: 'Choice A',
                                    type: 'singleLine',
                                },
                                {
                                    id: 'choiceB',
                                    name: 'Choice B',
                                    type: 'singleLine',
                                },
                            ],
                        },
                    },
                },
            ],
        },
    },
    {
        name: 'Throws a validation error when structure does not match ShapeUpdateInputSchema',
        input: {} as z.infer<typeof ShapeUpdateInputSchema>,
        error: new ZodError([
            {
                code: 'invalid_type',
                expected: 'string',
                received: 'undefined',
                path: ['name'],
                message: 'Required',
            },
        ]),
    },
    {
        name: 'Throws a validation error when component config does not match component type',
        input: {
            name: 'some invalid shape',
            components: [
                {
                    id: 'someSingleLine',
                    name: 'Some Single Line',
                    type: 'singleLine',
                    config: {
                        componentChoice: {
                            choices: [
                                {
                                    id: 'choiceA',
                                    name: 'Choice A',
                                    type: 'singleLine',
                                },
                                {
                                    id: 'choiceB',
                                    name: 'Choice B',
                                    type: 'singleLine',
                                },
                            ],
                        },
                    },
                },
            ],
        },
        error: new ZodError([
            {
                code: 'custom',
                message: 'Incorrect config type provided on shape component',
                path: ['components', 0],
            },
        ]),
    },
];

testCases.forEach((tc) =>
    test(tc.name, (t) => {
        try {
            const { query, variables } = updateShapeMutation({
                input: tc.input,
                identifier: 'shape-identifier',
                tenantId: '123',
            });
            if (tc.error) {
                t.fail();
            }

            const re = / /g;
            t.is(
                query.replace(re, ''),
                `
                    mutation UPDATE_SHAPE($tenantId: ID!, $identifier: String!, $input: UpdateShapeInput!) {
                        shape {
                            update (tenantId: $tenantId, identifier: $identifier, input: $input) {
                                identifier
                                name
                            }
                        }
                    }
                `.replace(re, ''),
            );
            t.deepEqual(variables, { input: tc.input, identifier: 'shape-identifier', tenantId: '123' });
        } catch (err: any) {
            if (!tc.error) {
                t.fail();
            }
            t.deepEqual(err.issues, tc.error?.issues);
        }
    }),
);
