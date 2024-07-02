import { z, ZodError } from 'zod';
import { ObjectId } from 'bson';
import { UpdateShapeInput } from '@crystallize/schema';
import { updateShapeMutation } from '../../src/shape/mutations/update';
import { deepEqual, equal } from 'assert';
import { expect, it } from 'vitest';

const mockTenantId = new ObjectId().toString();

interface testCase {
    name: string;
    input: UpdateShapeInput;
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
    it(tc.name, () => {
        if (tc.error) {
            expect(() =>
                updateShapeMutation({
                    input: tc.input,
                    identifier: 'shape-identifier',
                }),
            ).toThrow(tc.error);
            return;
        }

        const { query, variables } = updateShapeMutation({
            input: tc.input,
            identifier: 'shape-identifier',
        });
        const re = / /g;
        equal(
            query.replace(re, ''),
            `
                    mutation UPDATE_SHAPE($tenantId: ID!, $identifier: String!, $input: UpdateShapeInput!) {
                        shape {
                            update (tenantId: $tenantId, identifier: $identifier, input: $input) {
                                identifier
                                name
                                type
                            }
                        }
                    }
                `.replace(re, ''),
        );
        deepEqual(variables, { input: tc.input, identifier: 'shape-identifier', tenantId: mockTenantId });
    }),
);
