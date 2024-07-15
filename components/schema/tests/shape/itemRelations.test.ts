import { ZodError } from 'zod';
import { ItemRelationsComponentConfig, ItemRelationsComponentConfigSchema } from '../../src/shape/index.js';
import { expect, test } from 'vitest';

interface testCase {
    name: string;
    min?: number | null;
    max?: number | null;
    minItems?: number | null;
    maxItems?: number | null;
    minSkus?: number | null;
    maxSkus?: number | null;
    error?: ZodError;
    expected?: ItemRelationsComponentConfig;
}

const testCases: testCase[] = [
    {
        name: 'parses a valid max value',
        max: 1,
        expected: {
            max: 1,
        },
    },
    {
        name: 'parses a valid min and max value',
        min: 1,
        max: 2,
        expected: {
            min: 1,
            max: 2,
        },
    },
    {
        name: 'errors when max is greater than 50 (current hard limit)',
        max: 51,
        error: new ZodError([
            {
                code: 'too_big',
                maximum: 50,
                type: 'number',
                inclusive: true,
                message: 'Max cannot be greater than 50',
                path: [],
            },
        ]),
    },
    {
        name: 'errors when max is greater than 50 (current hard limit)',
        maxItems: 51,
        error: new ZodError([
            {
                code: 'too_big',
                maximum: 50,
                type: 'number',
                inclusive: true,
                message: 'MaxItems cannot be greater than 50',
                path: [],
            },
        ]),
    },
    {
        name: 'errors when max is greater than 50 (current hard limit)',
        maxSkus: 51,
        error: new ZodError([
            {
                code: 'too_big',
                maximum: 50,
                type: 'number',
                inclusive: true,
                message: 'MaxSkus cannot be greater than 50',
                path: [],
            },
        ]),
    },
];

test('itemRelations.test', () => {
    testCases.forEach((tc) => {
        const shouldBeSuccess = tc.expected !== undefined;
        const result: any = ItemRelationsComponentConfigSchema.safeParse({
            min: tc.min,
            max: tc.max,
            maxSkus: tc.maxSkus,
            maxItems: tc.maxItems,
            minSkus: tc.minSkus,
            minItems: tc.minItems,
        });

        // if (!result.success) {
        //     console.log('result', result.error);
        // }
        expect(result.success).toBe(shouldBeSuccess);

        if (shouldBeSuccess) {
            expect(result?.data).toStrictEqual(tc.expected);
        } else {
            expect(result?.error).toStrictEqual(tc.error);
        }
    });
});
