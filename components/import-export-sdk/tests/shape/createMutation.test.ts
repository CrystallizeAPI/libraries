import { ZodError } from 'zod';
import { NextPimCreateShapeInput } from '@crystallize/schema';
import { createShapeMutation } from '../../src/shape/mutations/create';
import { deepEqual, equal } from 'assert';
import { expect, it } from 'vitest';

interface testCase {
    name: string;
    input: NextPimCreateShapeInput;
    error?: ZodError;
}

const testCases: testCase[] = [
    {
        name: 'Returns the query and variables for a basic shape',
        input: {
            identifier: 'shape',
            name: 'Some Shape',
            type: 'product',
        },
    },
    {
        name: 'Returns the query and variables for a shape with components',
        input: {
            name: 'Some Shape',
            type: 'product',
            identifier: 'shape',
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
            type: 'product',
        } as NextPimCreateShapeInput,
        error: new ZodError([
            {
                code: 'invalid_type',
                expected: 'string',
                received: 'undefined',
                path: ['identifier'],
                message: 'Required',
            },
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
            type: 'product',
            identifier: 'shape',
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
                mutation CREATE_SHAPE ($input: CreateShapeInput!) {
                    createShape(input: $input) {
                        ... on Shape {
                            identifier
                            name
                            type
                        }
                    }
                }
            `.replace(re, ''),
        );
        deepEqual(variables, { input: tc.input });
    }),
);
