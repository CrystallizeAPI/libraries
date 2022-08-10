import { z, ZodError } from 'zod';
import { createShapeMutation } from '../../src/shape/mutations/create';
import { CreateShapeInput, CreateShapeInputSchema } from '../../src/schema/shape';
import { deepEqual, equal, fail } from 'assert';

interface testCase {
    name: string;
    input: CreateShapeInput;
    error?: ZodError;
}

const testCases: testCase[] = [
    {
        name: 'Returns the query and variables for a basic shape',
        input: {
            tenantId: '123',
            name: 'Some Shape',
            type: 'product',
        },
    },
    {
        name: 'Returns the query and variables for a shape with components',
        input: {
            tenantId: '123',
            name: 'Some Shape',
            type: 'product',
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
        name: 'Throws a validation error when structure does not match ShapeCreateInputSchema',
        input: {
            name: 'some invalid shape',
            type: 'product',
        } as z.infer<typeof CreateShapeInputSchema>,
        error: new ZodError([
            {
                code: 'invalid_type',
                expected: 'string',
                received: 'undefined',
                path: ['tenantId'],
                message: 'Required',
            },
        ]),
    },
    {
        name: 'Throws a validation error when component config does not match component type',
        input: {
            tenantId: '123',
            name: 'some invalid shape',
            type: 'product',
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
    it(tc.name, () => {
        if (tc.error) {
            expect(() => createShapeMutation({ input: tc.input })).toThrow(tc.error);
            return;
        }

        const { query, variables } = createShapeMutation({ input: tc.input });
        const re = / /g;
        equal(
            query.replace(re, ''),
            `
                mutation CREATE_SHAPE($input: CreateShapeInput!) {
                    shape {
                        create(input: $input) {
                            identifier
                            name
                        }
                    }
                }
            `.replace(re, ''),
        );
        deepEqual(variables, { input: tc.input });
    }),
);
